
import React from 'react';
import { Page } from '../types';

interface Props {
    onNavigate: (page: Page, sectionId?: string) => void;
}

const Footer: React.FC<Props> = ({ onNavigate }) => {
  const handleLink = (page: Page, id?: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(page, id);
  };

  return (
    <footer className="bg-white dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-white/5 pt-20 pb-10 px-6 md:px-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-2">
            <div className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black mb-6 transition-colors">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            </div>
            <h4 className="font-sans font-bold text-2xl mb-4 text-black dark:text-white tracking-tight">Spell Agency</h4>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm">
              We build the intelligent infrastructure of tomorrow. 
              Helping businesses transcend their limits with generative AI.
            </p>
          </div>

          <div>
            <h5 className="font-bold mb-4 text-black dark:text-white">Services</h5>
            <ul className="space-y-3 text-gray-500 dark:text-gray-400 text-sm">
              <li><a href="/services" onClick={handleLink('services')} className="hover:text-black dark:hover:text-white transition-colors">Full Catalog</a></li>
              <li><a href="/services" onClick={handleLink('services')} className="hover:text-black dark:hover:text-white transition-colors">Custom LLMs</a></li>
              <li><a href="/services" onClick={handleLink('services')} className="hover:text-black dark:hover:text-white transition-colors">Computer Vision</a></li>
              <li><a href="#contact" onClick={handleLink('contact')} className="hover:text-black dark:hover:text-white transition-colors">Consulting</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-4 text-black dark:text-white">Company</h5>
            <ul className="space-y-3 text-gray-500 dark:text-gray-400 text-sm">
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Blog</a></li>
              <li><a href="#contact" onClick={handleLink('contact')} className="hover:text-black dark:hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 dark:border-white/5">
          <p className="text-gray-400 text-xs mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Spell Agency Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
             <a href="/privacy" onClick={handleLink('privacy')} className="text-gray-400 hover:text-black dark:hover:text-white text-xs transition-colors">Privacy Policy</a>
             <a href="/terms" onClick={handleLink('terms')} className="text-gray-400 hover:text-black dark:hover:text-white text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
