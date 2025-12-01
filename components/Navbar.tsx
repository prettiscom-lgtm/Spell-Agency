
import React from 'react';
import { NavItem, Page } from '../types';
import { playClick, playHover, playToggle } from '../services/audioService';

const navItems: NavItem[] = [
  { label: 'Services', id: 'services', type: 'link' }, 
  { label: 'Process', id: 'process', type: 'scroll' },
  { label: 'Pricing', id: 'pricing', type: 'scroll' },
  { label: 'FAQ', id: 'faq', type: 'scroll' },
];

interface Props {
  onNavigate: (page: Page, sectionId?: string) => void;
  currentPage: Page;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenCallModal: () => void; 
}

const Navbar: React.FC<Props> = ({ onNavigate, currentPage, isDarkMode, onToggleDarkMode, onOpenCallModal }) => {
  
  const handleNavClick = (item: NavItem) => {
    playClick();
    
    if (item.type === 'link') {
        onNavigate(item.id as Page);
        return;
    }

    if (currentPage !== 'home') {
      onNavigate('home', item.id);
    } else {
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = () => {
      playClick();
      onNavigate('home');
  };

  const handleThemeToggle = () => {
      playToggle(!isDarkMode);
      onToggleDarkMode();
  };

  return (
    <nav className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2 md:gap-3 max-w-full">
        
        {/* Left: Logo */}
        <button 
          onClick={handleLogoClick}
          onMouseEnter={playHover}
          className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-sm rounded-full h-10 md:h-12 px-3 md:px-4 flex items-center justify-center transition-all duration-500 hover:scale-105 group"
        >
          <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
          </div>
          <span className="ml-2 font-sans font-bold text-sm md:text-base text-black dark:text-white hidden sm:block tracking-tight">Spell</span>
        </button>

        {/* Center: Navigation - Scrollable on mobile */}
        <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-sm rounded-full h-10 md:h-12 px-4 md:px-6 flex items-center gap-3 md:gap-6 transition-all duration-500 overflow-x-auto no-scrollbar max-w-[200px] sm:max-w-none">
          {navItems.map((item) => (
            <button 
              key={item.label} 
              onClick={() => handleNavClick(item)}
              onMouseEnter={playHover}
              className={`text-xs md:text-sm font-medium transition-colors focus:outline-none whitespace-nowrap ${currentPage === item.id ? 'text-black dark:text-white font-bold' : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
            >
              {item.label}
            </button>
          ))}
          <div className="w-px h-3 md:h-4 bg-gray-300 dark:bg-gray-700 mx-1 shrink-0"></div>
          <button
             onClick={() => { playClick(); onNavigate('contact'); }}
             onMouseEnter={playHover}
             className={`text-xs md:text-sm font-medium transition-colors focus:outline-none whitespace-nowrap ${currentPage === 'contact' ? 'text-black dark:text-white font-bold' : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
          >
            Contact
          </button>
        </div>

        {/* Right: Actions */}
        <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-sm rounded-full h-10 md:h-12 px-2 flex items-center gap-1 transition-all duration-500">
            
            {/* Dark Mode Toggle */}
            <button
                onClick={handleThemeToggle}
                onMouseEnter={playHover}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-black dark:text-white"
                aria-label="Toggle Dark Mode"
            >
                {isDarkMode ? (
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                )}
            </button>

            {/* Voice Assistant Button */}
            <button 
                onClick={() => { playClick(); onOpenCallModal(); }}
                onMouseEnter={playHover}
                className="bg-black dark:bg-white text-white dark:text-black px-3 md:px-4 py-1.5 rounded-full text-xs font-bold hover:opacity-80 transition-opacity flex items-center gap-2 ml-1 whitespace-nowrap"
            >
                <div className="relative flex h-2 w-2 md:h-3 md:w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-full w-full bg-red-500"></span>
                </div>
                <span className="hidden sm:inline">Speak With Spell</span>
                <span className="sm:hidden">Speak</span>
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
