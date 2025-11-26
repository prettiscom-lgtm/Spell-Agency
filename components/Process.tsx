
import React, { useEffect, useState, useRef } from 'react';

const steps = [
  {
    step: "01",
    title: "The Friction Audit",
    desc: "We don't guess. We analyze your workflows to find exactly where you are bleeding money and time. You get a clear roadmap of what to automate."
  },
  {
    step: "02",
    title: "Rapid Injection",
    desc: "We don't do 6-month consulting gigs. We build and deploy your custom agents in 2-4 weeks. We connect to your existing stack—no rewriting code."
  },
  {
    step: "03",
    title: "Autopilot Scaling",
    desc: "Once deployed, the agents learn. As your data grows, they get smarter, faster, and cheaper to run. You focus on strategy; they handle the ops."
  }
];

const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveStep(index);
          }
        });
      },
      { threshold: 0.6 }
    );

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto border-t border-gray-100 dark:border-white/5 relative transition-colors duration-500">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
        
        <div className="md:w-1/3 md:sticky md:top-32 self-start transition-all duration-500">
          <h2 className="font-sans font-bold text-4xl md:text-5xl mb-6 leading-tight text-black dark:text-white tracking-tight">From Chaos to Autopilot</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-8">
            Stop waiting for "digital transformation." We deploy practical intelligence that works immediately.
          </p>
          
          {/* Progress Indicator */}
          <div className="hidden md:flex gap-2">
             {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 rounded-full transition-all duration-500 ${activeStep === i ? 'w-12 bg-black dark:bg-white' : 'w-4 bg-gray-200 dark:bg-white/20'}`}
                />
             ))}
          </div>
        </div>

        <div className="md:w-2/3 space-y-24 md:space-y-32 pb-24">
          {steps.map((item, idx) => (
            <div 
              key={idx} 
              ref={el => { stepRefs.current[idx] = el; }}
              data-index={idx}
              className={`flex gap-6 group transition-all duration-700 ${activeStep === idx ? 'opacity-100 scale-100' : 'opacity-40 scale-95 blur-[1px]'}`}
            >
              <div className="font-sans font-extrabold text-5xl md:text-6xl text-gray-100 dark:text-white/10 group-hover:text-brand-orange/50 transition-colors duration-300 tracking-tighter">
                {item.step}
              </div>
              <div className="pt-3">
                <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Process;
