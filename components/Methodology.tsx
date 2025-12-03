import React from 'react';

const steps = [
    { num: "01", title: "Friction Audit", desc: "We don't guess. We deploy probes to analyze your workflows and identify the highest-ROI automation targets." },
    { num: "02", title: "Architecture", desc: "We design a secure, event-driven agent architecture that integrates with your legacy stack (SAP, Salesforce, etc)." },
    { num: "03", title: "Injection", desc: "Rapid deployment. We target a 14-day sprint to get the first agents live and generating value." },
    { num: "04", title: "Handover", desc: "We don't lock you in. We train your internal team to manage the agents, or we handle it via our Managed Service." }
];

const Methodology: React.FC = () => {
    return (
        <section id="methodology" className="w-full bg-[#020617] py-24 px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
                <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-8 block">( METHODOLOGY )</span>
                <h2 className="text-4xl font-light mb-16 text-white">
                    Engineering <span className="italic-accent text-blue-400">rigor</span>,<br/>
                    not just prompt engineering.
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {steps.map((step, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors group">
                            <div className="font-mono text-4xl text-white/20 mb-6 group-hover:text-blue-500/50 transition-colors">{step.num}</div>
                            <h3 className="text-white font-bold text-lg mb-4">{step.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Methodology;