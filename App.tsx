
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Background from './components/Background';
import ConsultantModal from './components/ConsultantModal';
import CallModal from './components/CallModal'; 
import VoiceAssistant from './components/VoiceAssistant'; // Import Voice
import Footer from './components/Footer';
import Home from './components/Home';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ServicesPage from './components/ServicesPage';
import { Page } from './types';
import { playClick } from './services/audioService';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false); // Changed from CallModal to Voice
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const konamiBuffer = useRef<string[]>([]);

  const openModal = () => {
      setIsModalOpen(true);
      playClick();
  };
  
  const closeModal = () => setIsModalOpen(false);

  const openVoice = () => setIsVoiceOpen(true);
  const closeVoice = () => setIsVoiceOpen(false);


  const handleNavigate = (page: Page, sectionId?: string) => {
    setCurrentPage(page);
    if (page === 'home' && sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
          if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
              e.preventDefault();
              setIsModalOpen(prev => !prev);
              return;
          }
          if (e.key === 'Escape') {
              if (isModalOpen) setIsModalOpen(false);
              if (isVoiceOpen) setIsVoiceOpen(false);
              return;
          }

          konamiBuffer.current = [...konamiBuffer.current, e.key];
          if (konamiBuffer.current.length > 10) konamiBuffer.current.shift();
          
          const code = konamiBuffer.current.join('');
          if (code.includes('ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba')) {
              alert("GOD MODE ENABLED: Contacting Priority Support...");
              setIsModalOpen(true);
              konamiBuffer.current = []; 
          }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, isVoiceOpen]);

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      
      <div className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-gray-200 font-sans selection:bg-brand-blue selection:text-black overflow-x-hidden flex flex-col transition-colors duration-700 ease-in-out">
        <Navbar 
            onNavigate={handleNavigate} 
            currentPage={currentPage} 
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            onOpenCallModal={openVoice} // Triggers Voice Assistant
        />
        <Background />
        
        <main className="relative w-full flex flex-col items-center flex-grow z-10">
          {currentPage === 'home' && <Home onOpenConsultant={openModal} />}
          {currentPage === 'contact' && <Contact />}
          {currentPage === 'privacy' && <PrivacyPolicy />}
          {currentPage === 'terms' && <TermsOfService />}
          {currentPage === 'services' && <ServicesPage onConsult={openModal} />}
        </main>

        <div className="w-full max-w-[1200px] mx-auto relative z-20 bg-white dark:bg-[#0a0a0a] rounded-b-[50px] sm:rounded-b-[80px] mb-10 border-t border-gray-100 dark:border-white/5 transition-colors duration-500">
           <Footer onNavigate={handleNavigate} />
        </div>

        <ConsultantModal isOpen={isModalOpen} onClose={closeModal} />
        {/* Replaced CallModal with VoiceAssistant */}
        <VoiceAssistant isOpen={isVoiceOpen} onClose={closeVoice} />
      </div>
    </div>
  );
}

export default App;
