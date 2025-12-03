import React from 'react';
import { Page } from '../types';
import { playClick, playHover } from '../services/audioService';

interface Props {
  onNavigate: (page: Page, sectionId?: string) => void;
  onOpenCallModal: () => void;
}

const Navbar: React.FC<Props> = ({ onNavigate, onOpenCallModal }) => {
  
  const scrollTo = (id: string) => {
    playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 flex justify-between items-center text-xs font-medium tracking-wide">
      
      {/* Logo Area */}
      <div 
        onClick={() => { playClick(); onNavigate('home'); }}
        className="cursor-pointer text-white hover:opacity-80 transition-opacity flex items-center gap-2"
      >
        <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
        </div>
        <span className="font-bold tracking-widest uppercase">Spell Agency</span>
      </div>

      {/* Center Links - Made White for better visibility */}
      <div className="hidden md:flex gap-10 uppercase tracking-widest text-[10px] text-white/80">
        <button onClick={() => scrollTo('advantages')} onMouseEnter={playHover} className="hover:text-white transition-colors">Strategy</button>
        <button onClick={() => scrollTo('features')} onMouseEnter={playHover} className="hover:text-white transition-colors">Capabilities</button>
        <button onClick={() => scrollTo('methodology')} onMouseEnter={playHover} className="hover:text-white transition-colors">Process</button>
        <button onClick={() => scrollTo('benchmarks')} onMouseEnter={playHover} className="hover:text-white transition-colors">Case Studies</button>
        <button onClick={() => onNavigate('services')} onMouseEnter={playHover} className="hover:text-white transition-colors flex items-center gap-1">
          Catalog
          <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
         <button 
            onClick={onOpenCallModal}
            className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
         >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
            <span className="text-[10px] uppercase tracking-widest hidden sm:block">Speak with Spell</span>
         </button>
         <div className="h-4 w-[1px] bg-white/30 hidden sm:block"></div>
         <div className="flex items-center gap-3 text-[10px] uppercase text-white font-medium">
             <span className="cursor-pointer hover:text-blue-300 transition-colors">EN</span>
             <span className="text-white/30">/</span>
             <span className="cursor-pointer hover:text-blue-300 transition-colors">AR</span>
         </div>
      </div>
    </nav>
  );
};

export default Navbar;