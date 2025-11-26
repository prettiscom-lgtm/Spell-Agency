import React from 'react';

interface Props {
  onOpenConsultant: () => void;
}

const Intro: React.FC<Props> = ({ onOpenConsultant }) => {
  return (
    <div className="flex flex-col items-center text-center pt-16 md:pt-24 pb-12 px-6 sm:px-12 w-full max-w-5xl mx-auto">
      
      <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/5">
          <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-widest">Enterprise-Grade Intelligence</span>
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-black dark:text-white mb-8 leading-tight tracking-tight transition-colors duration-500 max-w-4xl">
        We engineer the <br/>
        <span className="text-gray-400 dark:text-gray-500 italic">autonomous future.</span>
      </h2>
      
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mb-12 leading-relaxed">
        Manual workflows are the bottleneck of the digital era. Spell Agency deploys bespoke neural architectures that automate complex decision-making, allowing your organization to scale without friction.
      </p>

      <div className="flex flex-wrap gap-4 justify-center mb-16">
        <button 
          onClick={onOpenConsultant}
          className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-all hover:-translate-y-1 shadow-xl hover:shadow-2xl active:scale-95"
        >
          Consult with an Architect
        </button>
      </div>

      {/* Stats Divider - Proven Results */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-gray-100 dark:border-white/5">
         {[
             { label: "Revenue Generated", value: "$45M+" },
             { label: "Operational Savings", value: "120k Hrs" },
             { label: "Deployment Velocity", value: "14 Days" },
             { label: "Model Accuracy", value: "99.9%" },
         ].map((stat, i) => (
             <div key={i} className="flex flex-col items-center group cursor-default">
                 <span className="text-2xl md:text-3xl font-pixel font-bold text-black dark:text-white group-hover:text-brand-blue transition-colors">{stat.value}</span>
                 <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">{stat.label}</span>
             </div>
         ))}
      </div>
    </div>
  );
};

export default Intro;