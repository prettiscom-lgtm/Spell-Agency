import React, { useState } from 'react';
import { playClick } from '../services/audioService';

interface Props {
  onChatStart: (message: string) => void;
}

const Hero: React.FC<Props> = ({ onChatStart }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      playClick();
      onChatStart(input);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center pt-40 pb-64 px-4 overflow-hidden bg-[#050A1F]">
      
      {/* Aurora Background */}
      <div className="absolute top-0 left-0 w-full h-[120vh] bg-gradient-to-b from-blue-900/40 via-[#050A1F] to-[#020617] pointer-events-none z-0"></div>
      <div className="absolute -top-[20%] left-[20%] w-[60vw] h-[60vw] bg-blue-500/20 rounded-full blur-[120px] animate-blob"></div>
      <div className="absolute -top-[10%] right-[20%] w-[50vw] h-[50vw] bg-purple-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>

      {/* Modern Transition to White - Pushed lower and made subtler */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-transparent via-[#050A1F]/50 to-white z-10 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-5xl mx-auto mt-10 md:mt-16 text-center">
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-white leading-[1.1] mb-12 tracking-tight">
          Spell Agency — The <span className="italic-accent font-normal text-blue-300">Architects</span><br/>
          of enterprise <span className="italic-accent font-normal border-b border-white/20 pb-1">intelligence</span>
        </h1>

        {/* Glass Input Box */}
        <div className="w-full max-w-3xl relative group mb-32">
          <form onSubmit={handleSubmit}>
            <div className="glass-input rounded-[2rem] p-2 pl-6 flex items-center gap-4 transition-all duration-500 focus-within:bg-white/10 focus-within:shadow-[0_0_50px_rgba(59,130,246,0.15)] focus-within:border-white/30">
                
                {/* Icons Left */}
                <div className="flex items-center gap-3 text-gray-400">
                    <button type="button" className="hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                    </button>
                    {/* SpellThink Badge */}
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-400/20 rounded-full">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
                        <span className="text-[10px] text-blue-200 font-medium tracking-wide">SpellThink</span>
                    </div>
                </div>

                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Harry to audit your workflow..."
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 font-light text-lg h-12"
                />

                <button 
                    type="submit"
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors mr-1"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path></svg>
                </button>

            </div>
          </form>
        </div>

      </div>

      {/* Bottom Right Content - Lifted UP to sit above the gradient transition */}
      <div className="absolute bottom-40 right-12 max-w-xs text-right z-30 hidden md:block">
        <p className="text-[10px] text-white font-medium leading-relaxed tracking-wide opacity-90 drop-shadow-lg">
          We bridge the gap between "AI Hype" and <br/>deployed, revenue-generating reality.
        </p>
        <button 
          onClick={() => document.getElementById('benchmarks')?.scrollIntoView({behavior: 'smooth'})}
          className="mt-4 border border-white text-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-widest text-[9px] font-bold backdrop-blur-sm"
        >
          View Case Studies ↗
        </button>
      </div>

    </section>
  );
};

export default Hero;