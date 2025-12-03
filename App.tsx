import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import ConsultantModal from './components/ConsultantModal';
import VoiceAssistant from './components/VoiceAssistant';
import Footer from './components/Footer';
import Home from './components/Home';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ServicesPage from './components/ServicesPage';
import { Page } from './types';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [initialMessage, setInitialMessage] = useState('');
  
  const openModal = () => {
      setInitialMessage('');
      setIsModalOpen(true);
  };
  
  const handleChatStart = (msg: string) => {
      setInitialMessage(msg);
      setIsModalOpen(true);
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

  return (
    <div className="dark">
      <div className="min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden flex flex-col">
        <Navbar 
            onNavigate={handleNavigate} 
            onOpenCallModal={openVoice}
        />
        
        <main className="relative w-full flex flex-col items-center flex-grow z-10">
          {currentPage === 'home' && <Home onOpenConsultant={openModal} onChatStart={handleChatStart} />}
          {currentPage === 'contact' && <Contact />}
          {currentPage === 'privacy' && <PrivacyPolicy />}
          {currentPage === 'terms' && <TermsOfService />}
          {currentPage === 'services' && <ServicesPage onConsult={openModal} />}
        </main>

        <Footer onNavigate={handleNavigate} />

        <ConsultantModal isOpen={isModalOpen} onClose={closeModal} initialMessage={initialMessage} />
        <VoiceAssistant isOpen={isVoiceOpen} onClose={closeVoice} />
      </div>
    </div>
  );
}

export default App;