
import React from 'react';
import { playClick } from '../services/audioService';

const services = [
  {
    title: "Knowledge Retrieval Systems",
    description: "Synthesize institutional knowledge into a queryable semantic layer. Index Slack, Drive, and Notion for instant answers.",
    result: "RESULT: 65% reduction in support tickets.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
    )
  },
  {
    title: "Computer Vision Analysis",
    description: "Automated quality control and defect detection. Our models process visual streams with higher accuracy than human inspection.",
    result: "RESULT: $1.2M annual waste reduction.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 5 8.268 7.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
    )
  },
  {
    title: "Predictive Analytics Engine",
    description: "Forecast demand and inventory requirements with precision. Analyze multi-variable datasets to optimize supply chains.",
    result: "RESULT: 85% reduction in stockouts.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
    )
  },
  {
    title: "Autonomous Operations",
    description: "End-to-end automation for invoicing, scheduling, and data processing. Agents that integrate directly with your ERP.",
    result: "RESULT: 200+ operational hours saved weekly.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
    )
  },
  {
    title: "Legal Risk Assessment",
    description: "Rapid contract analysis to identify non-compliant clauses and liabilities across thousands of documents instantly.",
    result: "RESULT: 10,000+ contracts processed.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
    )
  },
  {
    title: "Conversational AI Agents",
    description: "Human-parity voice and chat agents for sales qualification and customer support. Empathy-driven interaction at scale.",
    result: "RESULT: 3x increase in qualified leads.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
    )
  }
];

const Services: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto" id="solutions">
      <div className="mb-16 text-center">
        <div className="inline-block mb-4 px-3 py-1 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-xs font-mono text-gray-500 dark:text-gray-400 tracking-wider uppercase transition-colors duration-500">
           Core Capabilities
        </div>
        <h2 className="font-sans font-bold text-4xl md:text-5xl mb-6 text-black dark:text-white transition-colors duration-500 tracking-tight">Intelligent Infrastructure</h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto transition-colors duration-500">
          We deploy production-grade systems designed for reliability, security, and measurable ROI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {services.map((service, idx) => (
          <div key={idx} className="relative overflow-hidden bg-gray-50/50 dark:bg-white/5 hover:bg-white dark:hover:bg-black p-8 rounded-3xl border border-transparent hover:border-blue-500/30 dark:hover:border-brand-blue/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(160,216,239,0.1)] transition-all duration-500 group flex flex-col">
            
            <div className="relative z-10 flex-1">
                <div className="w-12 h-12 bg-white dark:bg-black border border-gray-100 dark:border-white/10 shadow-sm text-black dark:text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="font-bold text-xl mb-3 text-black dark:text-white transition-colors duration-500">{service.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 transition-colors duration-500">{service.description}</p>
            </div>
            
            {/* Result */}
            <div className="relative z-10 mt-auto pt-4 border-t border-dashed border-gray-200 dark:border-white/20">
                <p className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <svg className="w-3 h-3 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                    Proven Impact
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{service.result}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <a 
          href="/services"
          className="inline-flex items-center gap-2 text-black dark:text-white font-bold border-b border-black dark:border-white pb-1 hover:text-blue-600 dark:hover:text-brand-blue hover:border-blue-600 dark:hover:border-brand-blue transition-colors cursor-pointer"
        >
          <span>View Full Service Catalog</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </a>
      </div>
    </section>
  );
};

export default Services;
