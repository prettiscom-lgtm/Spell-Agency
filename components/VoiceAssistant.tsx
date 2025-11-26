
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";

// --- Audio Worklet Code (Blob) ---
// This runs on a separate thread to prevent UI lag
const workletCode = `
class RecorderProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.bufferSize = 2048; 
    this.buffer = new Float32Array(this.bufferSize);
    this.index = 0;
  }
  process(inputs) {
    const input = inputs[0];
    if (input.length > 0) {
      const channel = input[0];
      for (let i = 0; i < channel.length; i++) {
        this.buffer[this.index++] = channel[i];
        if (this.index >= this.bufferSize) {
          this.port.postMessage(this.buffer);
          this.index = 0;
        }
      }
    }
    return true;
  }
}
registerProcessor('recorder-processor', RecorderProcessor);
`;

// --- Audio Utilities ---

function floatTo16BitPCM(input: Float32Array): Int16Array {
  const output = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  return output;
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function base64ToArrayBuffer(base64: string) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type CallState = 'idle' | 'calling' | 'active' | 'ended';

const VoiceAssistant: React.FC<Props> = ({ isOpen, onClose }) => {
  const [callState, setCallState] = useState<CallState>('idle');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0); 
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  
  // Draggable State
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  
  // Performance Throttling
  const lastVolumeUpdate = useRef<number>(0);

  // Timer Logic
  useEffect(() => {
    let interval: any;
    if (callState === 'active') {
        interval = setInterval(() => {
            setDuration(prev => prev + 1);
        }, 1000);
    } else {
        setDuration(0);
    }
    return () => clearInterval(interval);
  }, [callState]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Draggable Logic
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
    dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging.current) {
            setPosition({
                x: e.clientX - dragOffset.current.x,
                y: e.clientY - dragOffset.current.y
            });
        }
    };
    const handleMouseUp = () => {
        isDragging.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Center initial position
  useEffect(() => {
      if (isOpen) {
          setPosition({
              x: window.innerWidth / 2 - (isMinimized ? 150 : 200), // Approximate half-widths
              y: window.innerHeight / 2 - (isMinimized ? 50 : 300)
          });
      }
  }, [isOpen, isMinimized]);


  // --- Connection Logic ---

  const startCall = async () => {
    setError(null);
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        // 24kHz matches output, but input is usually native to hardware
        const ctx = new AudioContext({ sampleRate: 24000 });
        audioContextRef.current = ctx;
        await ctx.resume();
        nextStartTimeRef.current = ctx.currentTime;

        // Load Worklet
        const blob = new Blob([workletCode], { type: 'application/javascript' });
        const workletUrl = URL.createObjectURL(blob);
        await ctx.audioWorklet.addModule(workletUrl);

        // Input Stream - Ask for 16kHz but browser might not respect it, we handle it.
        const stream = await navigator.mediaDevices.getUserMedia({ audio: {
            channelCount: 1,
            echoCancellation: true,
            autoGainControl: true,
            noiseSuppression: true
        }});
        mediaStreamRef.current = stream;

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const sessionPromise = ai.live.connect({
            model: 'gemini-2.5-flash-native-audio-preview-09-2025',
            callbacks: {
                onopen: () => {
                    console.log("Gemini Voice Connected");
                    setCallState('active');
                    
                    // Initial Prompt to force greeting
                    sessionPromise.then(session => {
                        session.send({
                            parts: [{ text: "System: The user has connected. Greet them immediately with: 'Hello, this is Harry from Spell. How can I assist you today?'" }],
                            turnComplete: true 
                        });
                    });
                },
                onmessage: async (message: LiveServerMessage) => {
                    const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                    if (audioData && audioContextRef.current) {
                        const buffer = base64ToArrayBuffer(audioData);
                        const audioBuffer = await decodeAudioData(buffer, audioContextRef.current);
                        playAudioBuffer(audioBuffer);
                    }
                    if (message.serverContent?.interrupted) {
                        nextStartTimeRef.current = audioContextRef.current?.currentTime || 0;
                    }
                },
                onclose: () => {
                    console.log("Gemini Voice Closed");
                    endCall();
                },
                onerror: (e) => {
                    console.error("Gemini Voice Error", e);
                    setError("Connection unstable. Reconnecting...");
                }
            },
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Fenrir' } }
                },
                systemInstruction: `
                    You are Harry, the Lead AI Solutions Architect for Spell Agency.
                    
                    BEHAVIOR:
                    - You are speaking to a potential enterprise client via a voice interface.
                    - Keep your responses concise (under 3 sentences) to avoid boring the user.
                    - Be professional, witty, and extremely intelligent.
                    - If you hear silence or background noise, DO NOT speak. Only speak when you are directly addressed or to answer a question.
                    - Never hallucinate a user's response.
                    - Start every conversation with the greeting provided in the first system turn.
                `
            }
        });

        const source = ctx.createMediaStreamSource(stream);
        const workletNode = new AudioWorkletNode(ctx, 'recorder-processor');
        
        workletNode.port.onmessage = (e) => {
            if (isMuted) return;
            
            const inputData = e.data; // Float32Array from worklet
            
            // Visualizer Throttling (15fps)
            const now = Date.now();
            if (now - lastVolumeUpdate.current > 66) {
                let sum = 0;
                for(let i = 0; i < inputData.length; i += 8) sum += inputData[i] * inputData[i];
                const rms = Math.sqrt(sum / (inputData.length / 8));
                setVolume(Math.min(100, rms * 400));
                lastVolumeUpdate.current = now;
            }

            const pcmData = floatTo16BitPCM(inputData);
            const base64 = arrayBufferToBase64(pcmData.buffer);

            sessionPromise.then(session => {
                session.sendRealtimeInput({
                    media: {
                        mimeType: "audio/pcm",
                        data: base64
                    }
                });
            });
        };

        source.connect(workletNode);
        workletNode.connect(ctx.destination); // Connect to dest to keep graph alive, but maybe mute it?
        
        sourceRef.current = source;
        workletNodeRef.current = workletNode;

    } catch (err) {
        console.error("Failed to start voice:", err);
        setError("Microphone access denied.");
        setCallState('ended');
    }
  };

  const endCall = () => {
    if (workletNodeRef.current) { workletNodeRef.current.disconnect(); workletNodeRef.current = null; }
    if (sourceRef.current) { sourceRef.current.disconnect(); sourceRef.current = null; }
    if (mediaStreamRef.current) { mediaStreamRef.current.getTracks().forEach(track => track.stop()); mediaStreamRef.current = null; }
    if (audioContextRef.current) { audioContextRef.current.close(); audioContextRef.current = null; }
    
    setCallState('ended');
    setTimeout(() => {
        setCallState('idle');
        onClose();
    }, 1000);
  };

  const decodeAudioData = async (arrayBuffer: ArrayBuffer, ctx: AudioContext) => {
      const dataView = new DataView(arrayBuffer);
      // Gemini sends 24kHz mono 16-bit PCM
      const float32Data = new Float32Array(arrayBuffer.byteLength / 2);
      for (let i = 0; i < float32Data.length; i++) {
          float32Data[i] = dataView.getInt16(i * 2, true) / 32768.0;
      }
      const audioBuffer = ctx.createBuffer(1, float32Data.length, 24000);
      audioBuffer.getChannelData(0).set(float32Data);
      return audioBuffer;
  };

  const playAudioBuffer = (buffer: AudioBuffer) => {
      if (!audioContextRef.current) return;
      const ctx = audioContextRef.current;
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      
      const start = Math.max(ctx.currentTime, nextStartTimeRef.current);
      source.start(start);
      nextStartTimeRef.current = start + buffer.duration;
  };

  useEffect(() => {
      if (isOpen && callState === 'idle') {
          setCallState('calling');
      }
  }, [isOpen]);

  if (!isOpen) return null;

  // --- UI Renders ---

  const windowStyle: React.CSSProperties = {
      position: 'fixed',
      left: position.x,
      top: position.y,
      cursor: 'default',
      zIndex: 150,
      userSelect: 'none' as const
  };

  if (isMinimized && callState === 'active') {
      return (
          <div style={windowStyle} className="animate-fadeIn shadow-2xl">
              <div className="bg-black/90 backdrop-blur-xl border border-white/10 text-white rounded-full px-4 py-2 flex items-center gap-4 transition-transform duration-300 hover:scale-105">
                  <div onMouseDown={handleMouseDown} className="cursor-move text-gray-500 hover:text-white mr-2">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"></path></svg>
                  </div>
                  <div onClick={() => setIsMinimized(false)} className="flex items-center gap-4 cursor-pointer">
                      <div className="flex gap-1 h-3 items-end">
                          {[1,2,3].map(i => (
                              <div key={i} className="w-1 bg-green-500 rounded-full animate-pulse" style={{ height: `${Math.max(30, volume * 1.5)}%` }}></div>
                          ))}
                      </div>
                      <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-green-400 leading-none tracking-wider">HARRY</span>
                          <span className="text-xs font-mono leading-none">{formatTime(duration)}</span>
                      </div>
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div style={windowStyle} className="animate-fadeIn">
        <div className="w-[380px] h-[550px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/5 relative">
            
            {/* Window Header */}
            <div onMouseDown={handleMouseDown} className="h-10 bg-white/5 border-b border-white/5 flex items-center justify-between px-4 cursor-move">
                <div className="flex gap-2 group">
                    <button onClick={endCall} className="w-3 h-3 rounded-full bg-red-500/80 group-hover:bg-red-500 border border-red-600 transition-colors"></button>
                    <button onClick={() => setIsMinimized(true)} className="w-3 h-3 rounded-full bg-yellow-500/80 group-hover:bg-yellow-500 border border-yellow-600 transition-colors"></button>
                    <button className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600 opacity-50 cursor-default"></button>
                </div>
                <div className="text-[10px] font-medium text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Secure Uplink
                </div>
                <div className="w-10"></div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center relative p-8">
                <div className="relative mb-12">
                    {/* Visualizer Ring - Optimized for performance */}
                    <div 
                        className="absolute inset-0 bg-brand-blue blur-[40px] transition-all duration-100 ease-out rounded-full"
                        style={{ opacity: 0.1 + (volume / 200), transform: `scale(${1 + volume/100})` }}
                    ></div>
                    
                    <div className="w-40 h-40 rounded-full bg-gradient-to-b from-[#1a1a1a] to-black border border-white/10 flex items-center justify-center relative z-10 shadow-2xl">
                         {callState === 'calling' ? (
                             <div className="absolute inset-0 rounded-full border border-brand-blue opacity-50 animate-[ping_1.5s_infinite]"></div>
                         ) : (
                             <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-2 opacity-50">
                                 <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" fill="none" className="text-gray-700" />
                                 <circle 
                                    cx="50" cy="50" r="48" 
                                    stroke="#A0D8EF" strokeWidth="2" fill="none" 
                                    strokeDasharray="300" strokeDashoffset={300 - (volume * 3)}
                                    className="transition-all duration-75 ease-linear rotate-[-90deg] origin-center"
                                 />
                             </svg>
                         )}
                         
                         <div className="w-20 h-20 rounded-full bg-black border border-white/5 flex items-center justify-center relative overflow-hidden">
                             <div className="absolute inset-0 bg-brand-blue opacity-10 animate-pulse"></div>
                             <span className="font-sans font-bold text-3xl text-white z-10">H</span>
                         </div>
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Harry</h2>
                    <p className="text-gray-400 text-xs uppercase tracking-widest font-medium">Lead Solutions Architect</p>
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                        {callState === 'calling' && <span className="text-brand-blue text-xs animate-pulse">Connecting...</span>}
                        {callState === 'active' && <span className="text-white text-xs font-mono">{formatTime(duration)}</span>}
                        {callState === 'ended' && <span className="text-red-500 text-xs">Terminated</span>}
                    </div>
                    {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                </div>
            </div>

            {/* Controls */}
            <div className="h-24 bg-[#0a0a0a] border-t border-white/5 flex items-center justify-center gap-8">
                {callState === 'calling' ? (
                    <>
                        <button onClick={endCall} className="flex flex-col items-center gap-1 group">
                            <div className="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center group-hover:bg-red-500 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.36 7.46 6 12 6s8.66 2.36 11.71 5.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"></path></svg>
                            </div>
                            <span className="text-[10px] text-gray-500 uppercase font-bold">Decline</span>
                        </button>
                        <button onClick={startCall} className="flex flex-col items-center gap-1 group">
                            <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)] animate-pulse group-hover:scale-105 transition-transform">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            </div>
                            <span className="text-[10px] text-green-500 uppercase font-bold">Accept</span>
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setIsMuted(!isMuted)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors border ${isMuted ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/20 hover:bg-white/10'}`}>
                             {isMuted ? (
                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path></svg>
                             ) : (
                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                             )}
                        </button>
                        <button onClick={endCall} className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg hover:scale-105 transform duration-200">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.36 7.46 6 12 6s8.66 2.36 11.71 5.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"></path></svg>
                        </button>
                    </>
                )}
            </div>
        </div>
    </div>
  );
};

export default VoiceAssistant;
