
import React, { useState } from 'react';

const faqs = [
  {
    q: "How does your AI differ from public tools like ChatGPT?",
    a: "We engineer enterprise-grade systems, not general-purpose chatbots. Our solutions are deployed within your secure infrastructure (VPC), trained on your proprietary data, and designed to execute specific business workflows with high reliability and compliance."
  },
  {
    q: "How do you ensure data security and privacy?",
    a: "Security is our foundation. We operate on a 'zero-retention' architecture for sensitive data. Your information remains within your environment and is never used to train our foundational models. We are fully compliant with SOC 2, GDPR, and HIPAA standards."
  },
  {
    q: "What is the expected timeline for deployment?",
    a: "Our modular architecture allows for rapid deployment. A typical pilot can be live within 14 days. Full-scale enterprise integration generally takes 4-8 weeks, depending on the complexity of your existing legacy systems."
  },
  {
    q: "What is the ROI structure?",
    a: "We prioritize measurable outcomes. Our engagements are structured around clear KPIs—whether that's operational cost reduction, revenue uplift, or efficiency gains. We aim for a minimum 5x return on investment within the first 12 months."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6 w-full max-w-4xl mx-auto">
      <h2 className="font-sans font-bold text-4xl md:text-5xl mb-12 text-center text-black dark:text-white transition-colors tracking-tight">Frequently Asked Questions</h2>
      
      <div className="space-y-4">
        {faqs.map((item, idx) => (
          <div 
            key={idx} 
            className="border border-gray-200 dark:border-white/10 rounded-2xl bg-white dark:bg-white/5 overflow-hidden transition-all duration-300 hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          >
            <button 
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
            >
              <span className="font-bold text-lg pr-4 text-black dark:text-white">{item.q}</span>
              <span className={`transform transition-transform duration-300 ${openIndex === idx ? 'rotate-45' : ''} text-2xl text-black dark:text-white`}>+</span>
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-6 pt-0 text-gray-500 dark:text-gray-400 leading-relaxed">
                {item.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
