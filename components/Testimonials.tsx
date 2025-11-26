import React from 'react';

const testimonials = [
  {
    quote: "We cut our customer support response time by 90% while increasing satisfaction scores. The AI doesn't just answer, it empathizes.",
    author: "Sarah Jenkins",
    role: "CTO, FinStream",
    color: "bg-brand-purple/20 text-brand-purple"
  },
  {
    quote: "Spell Agency built a predictive model that saved us $2M in inventory waste in the first quarter alone. Absolute wizardry.",
    author: "Marcus Chen",
    role: "Ops Director, LogiTech",
    color: "bg-brand-blue/20 text-brand-blue"
  },
  {
    quote: "The custom LLM they trained on our legal archives is more accurate than our senior paralegals. It's changed how we work forever.",
    author: "Elena Rodriguez",
    role: "Partner, Rodriguez & Associates",
    color: "bg-brand-orange/20 text-brand-orange"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 px-6 w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((item, idx) => (
          <div key={idx} className="bg-white/50 dark:bg-white/5 backdrop-blur-sm p-8 rounded-[32px] border border-gray-100 dark:border-white/10 flex flex-col justify-between hover:bg-white dark:hover:bg-black transition-colors duration-300 group">
            
            <div className="mb-6">
               <svg className="w-8 h-8 text-gray-300 dark:text-gray-600 mb-4 group-hover:text-black dark:group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.067 15.583 14.5 17.517 14.5C19.45 14.5 21.017 16.067 21.017 18L21.017 21L14.017 21ZM14.017 13.5L14.017 10.5C14.017 8.567 15.583 7 17.517 7L20.017 7L20.017 3L17.517 3C13.375 3 10.017 6.358 10.017 10.5L10.017 13.5L14.017 13.5ZM5.017 21L5.017 18C5.017 16.067 6.583 14.5 8.517 14.5C10.45 14.5 12.017 16.067 12.017 18L12.017 21L5.017 21ZM5.017 13.5L5.017 10.5C5.017 8.567 6.583 7 8.517 7L11.017 7L11.017 3L8.517 3C4.375 3 1.017 6.358 1.017 10.5L1.017 13.5L5.017 13.5Z"/></svg>
               <p className="text-lg font-medium leading-relaxed text-gray-800 dark:text-gray-200">"{item.quote}"</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-lg font-bold`}>
                {item.author.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-sm text-black dark:text-white">{item.author}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{item.role}</div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;