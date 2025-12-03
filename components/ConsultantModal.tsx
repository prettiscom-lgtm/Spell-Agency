import React, { useState, useEffect, useRef } from 'react';
import { sendMessageToAgent } from '../services/geminiService';
import { playClick, playSuccess, playError } from '../services/audioService';
import { ChatMessage, Slide, PresentationData, VideoData, ModalProps } from '../types';

const ConsultantModal: React.FC<ModalProps> = ({ isOpen, onClose, initialMessage }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize with Harry greeting or Hero input
  useEffect(() => {
      if (isOpen && messages.length === 0) {
          const initMsg: ChatMessage = {
              id: 'init',
              role: 'assistant',
              type: 'text',
              text: "System Online. I am Harry, your strategic AI architect. I'm ready to analyze your business requirements.",
              timestamp: Date.now()
          };
          setMessages([initMsg]);

          // If user typed in Hero, send it immediately
          if (initialMessage) {
              handleSend(initialMessage);
          }
      }
  }, [isOpen]);

  useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (msgText: string = input) => {
    if (!msgText.trim()) return;
    
    const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        type: 'text',
        text: msgText,
        timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const currentHistory = [...messages, userMsg];
      const response = await sendMessageToAgent(userMsg.text, currentHistory);
      
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617]/90 backdrop-blur-md animate-fadeIn p-4">
       <div className="relative w-full max-w-6xl h-[85vh] bg-[#050A1F] rounded-3xl overflow-hidden border border-white/10 flex flex-col shadow-2xl ring-1 ring-white/5">
           
           {/* Header */}
           <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0B1121]">
               <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                   <span className="font-bold text-white tracking-widest text-sm uppercase">SpellThink Command</span>
               </div>
               <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2">✕</button>
           </div>

           {/* Layout Grid */}
           <div className="flex flex-1 overflow-hidden">
               
               {/* Left: Chat Stream */}
               <div className="flex-1 flex flex-col bg-gradient-to-b from-[#050A1F] to-[#020617]">
                   <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                       {messages.map((msg) => (
                           <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                               {msg.role === 'assistant' && (
                                   <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                       <span className="text-[10px] font-bold text-blue-400">AI</span>
                                   </div>
                               )}
                               <div className={`max-w-[75%] ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm' : 'text-gray-300'}`}>
                                   <div className={`px-6 py-4 ${msg.role === 'assistant' ? 'bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm backdrop-blur-sm' : ''}`}>
                                       <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
                                   </div>
                                   {/* Render Data Components here if needed */}
                               </div>
                           </div>
                       ))}
                       {loading && (
                           <div className="flex items-center gap-2 ml-12">
                               <span className="text-xs text-blue-400 animate-pulse">Processing Inference...</span>
                           </div>
                       )}
                       <div ref={chatEndRef} />
                   </div>

                   {/* Input Area */}
                   <div className="p-6 bg-[#0B1121]/80 backdrop-blur border-t border-white/5">
                       <div className="relative max-w-4xl mx-auto">
                           <input 
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Issue command or query..."
                                className="w-full bg-[#050A1F] border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all"
                           />
                           <button 
                                onClick={() => handleSend()}
                                className="absolute right-2 top-2 bg-white/10 hover:bg-white text-white hover:text-black p-2 rounded-lg transition-colors"
                           >
                               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7-7 7M5 12h16"></path></svg>
                           </button>
                       </div>
                       <div className="text-center mt-3">
                           <span className="text-[9px] text-gray-600 uppercase tracking-widest">Spell Agency Private Model v3.0</span>
                       </div>
                   </div>
               </div>

           </div>
       </div>
    </div>
  );
};

export default ConsultantModal;