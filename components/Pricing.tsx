
import React, { useState } from 'react';

interface Props {
  onConsult: () => void;
}

const Pricing: React.FC<Props> = ({ onConsult }) => {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 px-6 w-full max-w-7xl mx-auto relative">
      
      <div className="text-center mb-16">
        <h2 className="font-sans font-bold text-4xl md:text-5xl mb-6 text-black dark:text-white tracking-tight">Invest in Intelligence</h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto mb-8">
          Transparent pricing for every stage of your AI maturity.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className={`text-sm font-bold transition-colors ${!annual ? 'text-black dark:text-white' : 'text-gray-400'}`}>Monthly</span>
          <button 
            onClick={() => setAnnual(!annual)}
            className="w-14 h-8 bg-black dark:bg-white rounded-full relative transition-colors focus:outline-none"
          >
            <div className={`absolute top-1 w-6 h-6 bg-white dark:bg-black rounded-full transition-transform duration-300 ${annual ? 'left-7' : 'left-1'}`}></div>
          </button>
          <span className={`text-sm font-bold transition-colors ${annual ? 'text-black dark:text-white' : 'text-gray-400'}`}>
            Yearly <span className="text-xs text-brand-orange font-normal ml-1">(-20%)</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Starter Plan */}
        <div className="p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:shadow-xl transition-all duration-300 flex flex-col">
          <div className="mb-6">
            <h3 className="font-bold text-xl mb-2 text-black dark:text-white">Prototyping</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 h-10">For startups validating AI use-cases.</p>
          </div>
          <div className="mb-8">
            <span className="text-4xl font-bold font-sans text-black dark:text-white tracking-tight">${annual ? '2,900' : '3,500'}</span>
            <span className="text-gray-400">/mo</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <svg className="w-5 h-5 text-brand-orange" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              1 Custom MVP Agent
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <svg className="w-5 h-5 text-brand-orange" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              Weekly Strategy Call
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <svg className="w-5 h-5 text-brand-orange" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              Basic API Integration
            </li>
          </ul>
          <button className="w-full py-3 rounded-xl border border-black dark:border-white text-black dark:text-white font-bold hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">Get Started</button>
        </div>

        {/* Scale Plan - Highlighted */}
        <div className="p-8 rounded-3xl border border-brand-blue bg-black dark:bg-brand-blue/10 text-white hover:shadow-2xl hover:shadow-brand-blue/20 transition-all duration-300 transform md:-translate-y-4 flex flex-col relative overflow-hidden">
           <div className="absolute top-0 right-0 bg-brand-blue text-black text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
          <div className="mb-6 relative z-10">
            <h3 className="font-bold text-xl mb-2 text-brand-blue">Scaling</h3>
            <p className="text-sm text-gray-400 h-10">For companies integrating AI into core workflows.</p>
          </div>
          <div className="mb-8 relative z-10">
            <span className="text-4xl font-bold font-sans text-white tracking-tight">${annual ? '7,500' : '8,900'}</span>
            <span className="text-gray-500">/mo</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1 relative z-10">
            <li className="flex items-center gap-3 text-sm text-gray-300">
              <svg className="w-5 h-5 text-brand-blue" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              3 Custom Neural Networks
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-300">
              <svg className="w-5 h-5 text-brand-blue" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              24/7 Model Monitoring
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-300">
              <svg className="w-5 h-5 text-brand-blue" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              Dedicated AI Engineer
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-300">
              <svg className="w-5 h-5 text-brand-blue" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              On-premise Deployment Option
            </li>
          </ul>
          <button className="w-full py-3 rounded-xl bg-brand-blue text-black font-bold hover:bg-white transition-all relative z-10">Join Scaling Program</button>
          
          {/* Background Glow */}
          <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-brand-blue/20 blur-[80px] rounded-full pointer-events-none"></div>
        </div>

        {/* Enterprise Plan */}
        <div className="p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:shadow-xl transition-all duration-300 flex flex-col">
          <div className="mb-6">
            <h3 className="font-bold text-xl mb-2 text-black dark:text-white">Dominion</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 h-10">Full-scale digital transformation.</p>
          </div>
          <div className="mb-8">
            <span className="text-4xl font-bold font-sans text-black dark:text-white tracking-tight">Custom</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <svg className="w-5 h-5 text-brand-orange" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              Unlimited Custom Models
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <svg className="w-5 h-5 text-brand-orange" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              SLA & Enterprise Security
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <svg className="w-5 h-5 text-brand-orange" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              Dedicated Team of 5
            </li>
          </ul>
          <button className="w-full py-3 rounded-xl border border-black dark:border-white text-black dark:text-white font-bold hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">Contact Sales</button>
        </div>

      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm mb-3">Not sure which spell you need?</p>
        <button 
          onClick={onConsult}
          className="text-black dark:text-white font-bold border-b border-black dark:border-white hover:text-brand-orange hover:border-brand-orange transition-colors"
        >
          Ask our AI Consultant for a recommendation →
        </button>
      </div>
    </section>
  );
};

export default Pricing;
