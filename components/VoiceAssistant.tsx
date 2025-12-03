import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";

// --- Audio Worklet Code (Blob) ---
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
  const [isMobile, setIsMobile] = useState(false);
  
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const lastVolumeUpdate = useRef<number>(0);

  useEffect(() => {
    const checkMobile = () => { setIsMobile(window.innerWidth < 768); };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let interval: any;
    if (callState === 'active') {
        interval = setInterval(() => { setDuration(prev => prev + 1); }, 1000);
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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    isDragging.current = true;
    const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging.current && !isMobile) {
            setPosition({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
        }
    };
    const handleMouseUp = () => { isDragging.current = false; };
    if (!isMobile) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMobile]);

  useEffect(() => {
      if (isOpen && !isMobile) {
          setPosition({ x: window.innerWidth / 2 - (isMinimized ? 150 : 200), y: window.innerHeight / 2 - (isMinimized ? 50 : 275) });
      }
  }, [isOpen, isMinimized, isMobile]);

  const startCall = async () => {
    setError(null);
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContext({ sampleRate: 24000 });
        audioContextRef.current = ctx;
        await ctx.resume();
        nextStartTimeRef.current = ctx.currentTime;

        const blob = new Blob([workletCode], { type: 'application/javascript' });
        const workletUrl = URL.createObjectURL(blob);
        await ctx.audioWorklet.addModule(workletUrl);

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
                    setCallState('active');
                    sessionPromise.then(session => {
                        session.send({
                            parts: [{ text: "System: The user has connected. Greet them immediately with: 'Hello, this is Harry from Spell Agency. How can I help you today?'" }],
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
                onclose: () => { endCall(); },
                onerror: (e) => { setError("Connection unstable. Reconnecting..."); }
            },
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Fenrir' } } },
                systemInstruction: "You are Harry, the Lead AI Solutions Architect for Spell Agency. BEHAVIOR: Professional, witty, and extremely intelligent."
            }
        });

        const source = ctx.createMediaStreamSource(stream);
        const workletNode = new AudioWorkletNode(ctx, 'recorder-processor');
        
        workletNode.port.onmessage = (e) => {
            if (isMuted) return;
            const inputData = e.data; 
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
                session.sendRealtimeInput({ media: { mimeType: "audio/pcm", data: base64 } });
            });
        };

        source.connect(workletNode);
        workletNode.connect(ctx.destination); 
        sourceRef.current = source;
        workletNodeRef.current = workletNode;

    } catch (err) {
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
    setTimeout(() => { setCallState('idle'); onClose(); }, 1000);
  };

  const decodeAudioData = async (arrayBuffer: ArrayBuffer, ctx: AudioContext) => {
      const dataView = new DataView(arrayBuffer);
      const float32Data = new Float32Array(arrayBuffer.byteLength / 2);
      for (let i = 0; i < float32Data.length; i++) { float32Data[i] = dataView.getInt16(i * 2, true) / 32768.0; }
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

  useEffect(() => { if (isOpen && callState === 'idle') { setCallState('calling'); } }, [isOpen]);
  if (!isOpen) return null;

  const containerClass = isMobile 
    ? "fixed inset-0 z-[150] bg-[#050A1F] text-white flex flex-col" 
    : "fixed z-[150] w-[380px] h-[550px] bg-[#050A1F]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/5 animate-fadeIn";

  const windowStyle: React.CSSProperties = isMobile ? {} : { position: 'fixed', left: position.x, top: position.y };

  if (isMinimized && callState === 'active') {
      const minStyle: React.CSSProperties = isMobile 
        ? { position: 'fixed', bottom: '20px', right: '20px', zIndex: 150 } 
        : { position: 'fixed', left: position.x, top: position.y, cursor: 'default', zIndex: 150 };
      return (
          <div style={minStyle} className="animate-fadeIn shadow-2xl">
              <div className="bg-[#050A1F] border border-white/20 text-white rounded-full px-4 py-2 flex items-center gap-4 hover:border-blue-500 transition-colors">
                  {!isMobile && (
                      <div onMouseDown={handleMouseDown} className="cursor-move text-gray-500 hover:text-white mr-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"></path></svg>
                      </div>
                  )}
                  <div onClick={() => setIsMinimized(false)} className="flex items-center gap-4 cursor-pointer">
                      <div className="flex gap-1 h-3 items-end">
                          {[1,2,3].map(i => (
                              <div key={i} className="w-1 bg-blue-500 rounded-full animate-pulse" style={{ height: `${Math.max(30, volume * 1.5)}%` }}></div>
                          ))}
                      </div>
                      <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-blue-400 leading-none tracking-wider">HARRY</span>
                          <span className="text-xs font-mono leading-none">{formatTime(duration)}</span>
                      </div>
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div style={windowStyle} className={containerClass}>
        <div onMouseDown={handleMouseDown} className={`h-14 md:h-10 bg-white/5 border-b border-white/5 flex items-center justify-between px-4 ${isMobile ? '' : 'cursor-move'}`}>
            <div className="flex gap-2 group">
                <button onClick={endCall} className="w-3 h-3 rounded-full bg-red-500/80 group-hover:bg-red-500 transition-colors"></button>
                <button onClick={() => setIsMinimized(true)} className="w-3 h-3 rounded-full bg-yellow-500/80 group-hover:bg-yellow-500 transition-colors"></button>
                <button className="w-3 h-3 rounded-full bg-green-500/80 cursor-default"></button>
            </div>
            <div className="text-[10px] font-medium text-blue-200 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                Secure Uplink
            </div>
            <div className="w-10"></div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center relative p-8 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-90">
            <div className="relative mb-12">
                <div 
                    className="absolute inset-0 bg-blue-500 blur-[60px] transition-all duration-100 ease-out rounded-full"
                    style={{ opacity: 0.2 + (volume / 200), transform: `scale(${1 + volume/100})` }}
                ></div>
                <div className="w-40 h-40 md:w-40 md:h-40 rounded-full bg-[#020617] border border-blue-500/30 flex items-center justify-center relative z-10 shadow-2xl">
                        {callState === 'calling' ? (
                            <div className="absolute inset-0 rounded-full border border-blue-500 opacity-50 animate-[ping_1.5s_infinite]"></div>
                        ) : (
                            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-2 opacity-80">
                                <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" fill="none" className="text-gray-800" />
                                <circle 
                                cx="50" cy="50" r="48" 
                                stroke="#60A5FA" strokeWidth="2" fill="none" 
                                strokeDasharray="300" strokeDashoffset={300 - (volume * 3)}
                                className="transition-all duration-75 ease-linear rotate-[-90deg] origin-center"
                                />
                            </svg>
                        )}
                        <div className="w-20 h-20 rounded-full bg-black border border-blue-500/20 flex items-center justify-center relative overflow-hidden">
                            <span className="font-sans font-bold text-3xl text-white z-10">H</span>
                        </div>
                </div>
            </div>
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white tracking-tight">Harry</h2>
                <p className="text-blue-400 text-xs uppercase tracking-widest font-medium">Spell Architect</p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                    {callState === 'calling' && <span className="text-blue-400 text-xs animate-pulse">Connecting...</span>}
                    {callState === 'active' && <span className="text-white text-xs font-mono">{formatTime(duration)}</span>}
                    {callState === 'ended' && <span className="text-red-500 text-xs">Terminated</span>}
                </div>
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </div>
        </div>
        <div className="h-32 md:h-24 bg-[#020617] border-t border-white/5 flex items-center justify-center gap-8 pb-8 md:pb-0">
            {callState === 'calling' ? (
                <>
                    <button onClick={endCall} className="flex flex-col items-center gap-1 group">
                        <div className="w-16 h-16 md:w-12 md:h-12 rounded-full bg-gray-800 text-white flex items-center justify-center group-hover:bg-red-500 transition-colors">
                            <svg className="w-6 h-6 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.36 7.46 6 12 6s8.66 2.36 11.71 5.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"></path></svg>
                        </div>
                    </button>
                    <button onClick={startCall} className="flex flex-col items-center gap-1 group">
                        <div className="w-20 h-20 md:w-16 md:h-16 rounded-full bg-green-500 text-white flex items-center justify-center animate-pulse group-hover:scale-105 transition-transform">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        </div>
                    </button>
                </>
            ) : (
                <>
                    <button onClick={() => setIsMuted(!isMuted)} className={`w-14 h-14 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors border ${isMuted ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/20 hover:bg-white/10'}`}>
                            {isMuted ? (
                                <svg className="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path></svg>
                            ) : (
                                <svg className="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                            )}
                    </button>
                    <button onClick={endCall} className="w-20 h-20 md:w-16 md:h-16 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg hover:scale-105 transform duration-200">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.36 7.46 6 12 6s8.66 2.36 11.71 5.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"></path></svg>
                    </button>
                </>
            )}
        </div>
    </div>
  );
};

export default VoiceAssistant;