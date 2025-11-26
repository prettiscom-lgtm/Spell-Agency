
import React, { useState, useEffect, useRef } from 'react';
import { sendMessageToAgent } from '../services/geminiService';
import { playClick, playHover, playSuccess, playError, playTyping } from '../services/audioService';
import { ChatMessage, PresentationData, VideoData, CaseStudyData, Slide } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// --- Sub-Components ---

const SlideRenderer: React.FC<{ slide: Slide }> = ({ slide }) => {
  if (!slide) return null;
  
  switch (slide.layout) {
    case 'title':
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gradient-to-br from-gray-900 to-black text-white">
           <div className="mb-4 w-16 h-1 bg-brand-blue shadow-[0_0_10px_#A0D8EF]"></div>
           <h2 className="text-3xl font-pixel mb-4">{slide.title}</h2>
           <p className="text-sm text-gray-400 tracking-widest uppercase">{slide.subtitle}</p>
        </div>
      );
    case 'big_stat':
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-black">
           <h3 className="text-lg text-gray-400 mb-4">{slide.title}</h3>
           <div className="text-6xl font-bold text-brand-blue font-pixel mb-2 text-shadow-glow">
             {slide.statValue}
           </div>
           <p className="text-sm text-gray-300 font-mono">{slide.statLabel}</p>
        </div>
      );
    case 'split_image_right':
      return (
        <div className="flex h-full">
           <div className="w-1/2 p-6 flex flex-col justify-center bg-white text-black">
              <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{slide.content}</p>
           </div>
           <div className="w-1/2 bg-gray-800 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/40 to-purple-500/40"></div>
              <div className="absolute bottom-2 left-2 right-2 bg-black/50 backdrop-blur p-2 rounded text-[10px] text-white">
                 {slide.imagePrompt}
              </div>
           </div>
        </div>
      );
    case 'quote':
      return (
         <div className="flex flex-col items-center justify-center h-full p-8 bg-brand-blue text-black text-center">
            <blockquote className="text-xl font-bold italic mb-4">"{slide.content}"</blockquote>
            <cite className="text-xs font-bold uppercase">— {slide.quoteAuthor}</cite>
         </div>
      );
    default:
      return (
        <div className="p-6 h-full flex flex-col bg-white text-black">
          <h3 className="text-xl font-bold mb-4 border-b-2 border-black pb-2">{slide.title}</h3>
          <ul className="space-y-2">
            {slide.bullets?.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-brand-orange font-bold">•</span> {b}
              </li>
            ))}
          </ul>
        </div>
      );
  }
};

const SlideDeck: React.FC<{ data: PresentationData }> = ({ data }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // FIX: Add robust check for slides array
    if (!data || !data.slides || !Array.isArray(data.slides) || data.slides.length === 0) {
        return (
            <div className="bg-gray-900/50 border border-red-900/50 p-4 rounded-lg text-red-400 text-xs font-mono">
                [ERR_RENDER: NO_SLIDE_DATA]
            </div>
        );
    }

    // Ensure current slide index is valid
    const safeSlideIndex = Math.min(currentSlide, data.slides.length - 1);
    const slide = data.slides[safeSlideIndex];

    if (!slide) return null;

    return (
        <div className="bg-black rounded-lg overflow-hidden shadow-lg my-2 aspect-[16/9] flex flex-col border border-gray-700">
            <div className="flex-1 relative bg-gray-900">
               <SlideRenderer slide={slide} />
            </div>
            <div className="bg-gray-900 p-2 flex justify-between items-center border-t border-gray-800">
                <button 
                  onClick={() => setCurrentSlide(c => Math.max(0, c-1))} 
                  disabled={currentSlide === 0}
                  className="text-white hover:text-brand-blue px-2 disabled:opacity-30"
                >
                  ←
                </button>
                <span className="text-[10px] text-gray-500 font-mono">SLIDE {safeSlideIndex + 1}/{data.slides.length}</span>
                <button 
                  onClick={() => setCurrentSlide(c => Math.min(data.slides.length-1, c+1))} 
                  disabled={currentSlide === data.slides.length - 1}
                  className="text-white hover:text-brand-blue px-2 disabled:opacity-30"
                >
                  →
                </button>
            </div>
        </div>
    );
};

const VideoConcept: React.FC<{ data: VideoData }> = ({ data }) => (
    <div className="bg-gray-900 rounded-xl border border-gray-700 p-4 my-2 shadow-lg">
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-red-400 uppercase">Video Concept</span>
            </div>
            <span className="text-xs font-mono text-gray-500">{data.duration}</span>
        </div>
        <h4 className="text-white font-bold text-lg mb-2">{data.title}</h4>
        <div className="bg-black/50 p-3 rounded border-l-2 border-brand-blue mb-3">
            <p className="text-gray-300 text-sm italic">"{data.script}"</p>
        </div>
        <p className="text-xs text-gray-500 font-mono">Style: {data.visualStyle}</p>
    </div>
);

// --- Main Component ---

const ConsultantModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [psychometrics, setPsychometrics] = useState<any>({
      userMood: "Calm",
      personalityType: "Analyzing...",
      engagementLevel: 0,
      sentiment: "neutral",
      harryThought: "I'm ready to connect."
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isMaximized, setIsMaximized] = useState(false);

  // Initialization
  useEffect(() => {
      if (isOpen && messages.length === 0) {
          const initMsg: ChatMessage = {
              id: 'init',
              role: 'assistant',
              type: 'text',
              text: "Hello. I'm Harry, your dedicated Solutions Architect. I'm connected to the agency's core. What challenges are you facing today?",
              timestamp: Date.now()
          };
          setMessages([initMsg]);
      }
  }, [isOpen]);

  useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    playClick();
    
    const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        type: 'text',
        text: input,
        timestamp: Date.now()
    };

    // Optimistically add user message
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Pass the NEW full history (prev messages + current userMsg)
      // Since setMessages is async, we reconstruct the array manually for the service call
      const currentHistory = [...messages, userMsg];
      
      const response = await sendMessageToAgent(userMsg.text, currentHistory);
      
      if (response.content.psychometrics) {
          setPsychometrics(response.content.psychometrics);
      }

      const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          type: response.type as any,
          text: response.content.textResponse || "Analysis complete.",
          data: response.content.presentationData || response.content.videoData || response.content.caseStudyData,
          timestamp: Date.now()
      };

      playSuccess();
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      console.error(e);
      playError();
    } finally {
      setLoading(false);
    }
  };

  const toggleVoice = () => {
      if (isListening) { setIsListening(false); return; }
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) return;
      
      setIsListening(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.onresult = (event: any) => {
          // FIX: Check for valid results safely
          if (event.results && event.results.length > 0 && event.results[0] && event.results[0].length > 0) {
            const transcript = event.results[0][0].transcript;
            setInput(prev => prev + " " + transcript);
          }
          setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
  };

  if (!isOpen) return null;

  const getGlowColor = () => {
      switch(psychometrics.sentiment) {
          case 'excited': return 'shadow-[0_0_100px_rgba(255,169,107,0.3)] border-brand-orange/30';
          case 'skeptical': return 'shadow-[0_0_100px_rgba(255,50,50,0.2)] border-red-500/30';
          case 'curious': return 'shadow-[0_0_100px_rgba(224,195,252,0.3)] border-brand-purple/30';
          default: return 'shadow-[0_0_100px_rgba(160,216,239,0.2)] border-brand-blue/30';
      }
  };

  const getCoreColor = () => {
      switch(psychometrics.sentiment) {
          case 'excited': return 'bg-brand-orange';
          case 'skeptical': return 'bg-red-500';
          case 'curious': return 'bg-brand-purple';
          default: return 'bg-brand-blue';
      }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
       <div className={`relative bg-[#050505] w-full max-w-[95vw] h-[90vh] md:max-w-[1100px] rounded-3xl overflow-hidden border border-white/10 flex flex-col md:flex-row transition-all duration-1000 ${getGlowColor()} ${isMaximized ? 'h-screen w-screen max-w-none rounded-none' : ''}`}>
           
           {/* --- LEFT PANEL: Harry's Core --- */}
           <div className="w-full md:w-80 bg-[#0a0a0a] border-r border-white/5 flex flex-col p-6 relative overflow-hidden">
               <div className="absolute inset-0 opacity-[0.03] bg-[length:30px_30px] bg-[linear-gradient(0deg,transparent_24%,#fff_25%,#fff_26%,transparent_27%,transparent_74%,#fff_75%,#fff_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,#fff_25%,#fff_26%,transparent_27%,transparent_74%,#fff_75%,#fff_76%,transparent_77%,transparent)]"></div>

               <div className="flex justify-between items-center mb-8 relative z-10">
                   <span className="font-pixel text-xl text-white">HARRY<span className="text-xs align-top text-gray-500">CORE</span></span>
                   <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-red-500 hover:opacity-80 cursor-pointer" onClick={onClose}></div>
                       <div className="w-3 h-3 rounded-full bg-green-500 hover:opacity-80 cursor-pointer" onClick={() => setIsMaximized(!isMaximized)}></div>
                   </div>
               </div>

               <div className="flex-1 flex flex-col items-center justify-center relative z-10 min-h-[200px]">
                   <div className="relative w-32 h-32">
                       <div className={`absolute inset-0 rounded-full blur-3xl opacity-30 animate-pulse ${getCoreColor()}`}></div>
                       {loading ? (
                           // Thinking State
                           <div className="absolute inset-0 flex items-center justify-center">
                               <div className="w-20 h-20 border-4 border-t-brand-blue border-r-transparent border-b-transparent border-l-brand-blue rounded-full animate-spin"></div>
                           </div>
                       ) : (
                           // Idle/Active State
                           <div className={`absolute inset-4 rounded-full blur-md opacity-80 animate-blob ${getCoreColor()}`}></div>
                       )}
                       <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
                       <div className="absolute inset-2 border border-white/5 rounded-full animate-[spin_5s_linear_infinite_reverse]"></div>
                   </div>
                   <p className="mt-8 text-xs font-mono text-gray-500 uppercase tracking-widest">
                       Status: <span className={`${loading ? 'text-brand-blue animate-pulse' : 'text-white'}`}>{loading ? 'PROCESSING' : 'ONLINE'}</span>
                   </p>
               </div>

               <div className="bg-white/5 rounded-xl p-4 border border-white/5 backdrop-blur-md relative z-10 mt-auto">
                   <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-4 tracking-wider border-b border-white/10 pb-2">Analysis Protocol</h4>
                   
                   <div className="space-y-4">
                       <div>
                           <div className="flex justify-between text-xs mb-1 text-gray-400">
                               <span>Mood</span>
                               <span className="text-white">{psychometrics.userMood}</span>
                           </div>
                           <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                               <div className={`h-full ${getCoreColor()} transition-all duration-1000`} style={{ width: '100%' }}></div>
                           </div>
                       </div>

                       <div>
                           <div className="flex justify-between text-xs mb-1 text-gray-400">
                               <span>Engagement</span>
                               <span className="text-white">{psychometrics.engagementLevel}%</span>
                           </div>
                           <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                               <div className={`h-full bg-green-400 transition-all duration-1000`} style={{ width: `${psychometrics.engagementLevel}%` }}></div>
                           </div>
                       </div>
                   </div>

                   <div className="mt-4 pt-3 border-t border-white/10">
                       <p className="text-[10px] text-gray-400 italic leading-relaxed">
                           <span className="text-brand-blue not-italic font-bold mr-1">THOUGHT:</span>
                           "{psychometrics.harryThought}"
                       </p>
                   </div>
               </div>
           </div>

           {/* --- RIGHT PANEL: Chat --- */}
           <div className="flex-1 flex flex-col bg-[#050505] relative">
               
               <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 space-y-8">
                   {messages.map((msg) => (
                       <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slideUp`}>
                           {msg.role === 'assistant' && (
                               <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3 mt-1 text-[10px] font-bold text-white border border-white/20 shrink-0">H</div>
                           )}
                           
                           <div className={`max-w-[85%] rounded-2xl px-6 py-4 ${
                               msg.role === 'user' 
                               ? 'bg-white text-black rounded-br-sm shadow-lg' 
                               : 'bg-white/5 text-gray-200 border border-white/10 rounded-bl-sm'
                           }`}>
                               <div className="text-sm md:text-base leading-relaxed whitespace-pre-wrap font-sans">
                                   {msg.text}
                               </div>
                               
                               {msg.type === 'presentation' && msg.data && <SlideDeck data={msg.data} />}
                               {msg.type === 'video_concept' && msg.data && <VideoConcept data={msg.data} />}
                               {msg.type === 'case_study' && msg.data && (
                                   <div className="mt-4 bg-black/40 border-l-2 border-brand-orange p-4 rounded">
                                       <h5 className="font-bold text-white mb-1">{msg.data.companyName}</h5>
                                       <p className="text-xs text-gray-400 mb-2">{msg.data.challenge}</p>
                                       <div className="flex gap-2 flex-wrap">
                                           {msg.data.results?.map((r: string, i: number) => (
                                               <span key={i} className="text-[10px] bg-brand-orange/20 text-brand-orange px-2 py-0.5 rounded">{r}</span>
                                           ))}
                                       </div>
                                   </div>
                               )}
                           </div>

                           {msg.role === 'user' && (
                               <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center ml-3 mt-1 text-[10px] font-bold shrink-0">U</div>
                           )}
                       </div>
                   ))}
                   {loading && (
                       <div className="flex justify-start animate-pulse">
                           <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3 text-[10px] font-bold text-white border border-white/20">H</div>
                           <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                               <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                               <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                               <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                           </div>
                       </div>
                   )}
                   <div ref={chatEndRef} />
               </div>

               <div className="p-6 bg-[#0a0a0a] border-t border-white/5">
                   <div className="relative flex gap-4">
                       <div className="flex-1 relative">
                           <input 
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about AI solutions, request a demo deck, or just chat..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-blue/50 focus:bg-white/10 transition-all"
                           />
                           <button 
                                onClick={toggleVoice}
                                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${isListening ? 'text-red-500 bg-red-500/10 animate-pulse' : 'text-gray-500 hover:text-white'}`}
                           >
                               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                           </button>
                       </div>
                       <button 
                            onClick={handleSend}
                            disabled={!input.trim() || loading}
                            className="bg-white text-black px-6 rounded-xl font-bold hover:bg-brand-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                       >
                           Send
                       </button>
                   </div>
               </div>
           </div>

       </div>
    </div>
  );
};

export default ConsultantModal;
