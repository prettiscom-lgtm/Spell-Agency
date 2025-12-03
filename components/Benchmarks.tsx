import React from 'react';

const cases = [
    { 
        client: "Global Logistics Corp", 
        metric: "$12M", 
        label: "Annual Savings",
        desc: "Automated customs document processing, reducing manual entry by 94%."
    },
    { 
        client: "FinTech Unicorn", 
        metric: "140k", 
        label: "Support Hours Saved",
        desc: "Deployed a Tier-1 support swarm that resolves 65% of tickets without human intervention."
    },
    { 
        client: "Retail Giant", 
        metric: "+22%", 
        label: "Conversion Uplift",
        desc: "Implemented visual search and hyper-personalized product bundling agents."
    }
];

const Benchmarks: React.FC = () => {
    return (
        <section id="benchmarks" className="w-full bg-[#020617] py-24 px-6 relative z-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
                
                {/* Left Text */}
                <div className="md:col-span-4">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-8 block">( CASE STUDIES )</span>
                    <h2 className="text-4xl font-light mb-6 text-white leading-tight">
                        Results that<br/>
                        <span className="italic-accent">scale</span>
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                        We don't sell models; we sell outcomes. Here is the tangible impact we have delivered for our enterprise partners in the last 12 months.
                    </p>
                    <button className="mt-8 text-white border-b border-white pb-1 text-xs uppercase tracking-widest hover:text-blue-400 hover:border-blue-400 transition-colors">
                        Read Full Reports →
                    </button>
                </div>

                {/* Right Cards */}
                <div className="md:col-span-8 grid grid-cols-1 gap-6">
                    {cases.map((c, i) => (
                        <div key={i} className="group flex flex-col md:flex-row items-center bg-white/5 border border-white/5 rounded-2xl p-8 hover:border-blue-500/30 transition-all hover:bg-white/10">
                            <div className="w-full md:w-1/3 mb-4 md:mb-0">
                                <div className="text-4xl md:text-5xl font-light text-white mb-1 group-hover:text-blue-400 transition-colors">{c.metric}</div>
                                <div className="text-[10px] uppercase tracking-widest text-gray-500">{c.label}</div>
                            </div>
                            <div className="w-full md:w-2/3 border-l border-white/10 md:pl-8">
                                <h4 className="font-bold text-white mb-2">{c.client}</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">{c.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Benchmarks;