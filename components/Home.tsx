import React from 'react';
import Hero from './Hero';
import Intro from './Intro';
import TrustedBy from './TrustedBy';
import Services from './Services';
import Process from './Process';
import Pricing from './Pricing';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import StatsStrip from './StatsStrip';

interface Props {
  onOpenConsultant: () => void;
}

const Home: React.FC<Props> = ({ onOpenConsultant }) => {
  return (
    <>
      <Hero />
      
      {/* High-Tech Stats Strip - Kept as social proof of activity */}
      <div className="w-full relative z-20 mb-12 md:mb-20">
        <StatsStrip />
      </div>
        
      {/* The Content Card */}
      <div className="relative z-20 w-full max-w-[1200px] bg-white/80 dark:bg-[#080808]/90 backdrop-blur-3xl rounded-t-[40px] md:rounded-t-[60px] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_-10px_rgba(255,255,255,0.05)] mx-4 flex flex-col items-center border-t border-white/60 dark:border-white/10 transition-colors duration-700">
          
          {/* Decorative top highlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent blur-[2px]"></div>
          
          <Intro onOpenConsultant={onOpenConsultant} />
          
          <TrustedBy />
          
          <Services />
          
          <Process />

          <div id="pricing" className="w-full px-4 md:px-12">
             <div className="bg-gray-50/50 dark:bg-white/5 rounded-[40px] my-12 transition-colors duration-700 border border-gray-100 dark:border-white/5">
                <Pricing onConsult={onOpenConsultant} />
             </div>
          </div>
          
          <Testimonials />

          <FAQ />
          
          {/* CTA Section */}
          <div className="w-full px-6 py-20 mb-10">
            <div className="bg-black dark:bg-white rounded-[40px] p-12 md:p-20 text-center text-white dark:text-black relative overflow-hidden group">
               {/* Animated background blob */}
               <div className="absolute top-[-50%] left-[-20%] w-full h-full bg-brand-blue/20 dark:bg-brand-blue/30 blur-[100px] rounded-full animate-blob group-hover:bg-brand-orange/20 transition-colors duration-1000"></div>
               
               <h2 className="font-pixel text-4xl md:text-6xl relative z-10 mb-6 tracking-tight">Stop leaving money on the table.</h2>
               <p className="text-gray-400 dark:text-gray-600 text-lg md:text-xl max-w-2xl mx-auto relative z-10 mb-10 font-light">
                 Your competitors are already automating. The gap widens every day you wait.
               </p>
               <button 
                 onClick={onOpenConsultant}
                 className="relative z-10 bg-white dark:bg-black text-black dark:text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-brand-blue/10"
               >
                 Book Your Strategy Audit
               </button>
            </div>
          </div>
      </div>
    </>
  );
};

export default Home;