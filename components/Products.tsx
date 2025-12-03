import React from 'react';

const items = [
    { label: "Sprint", title: "Proof of Value", desc: "4-week rapid engagement to build a working, production-ready pilot. We validate the ROI before you commit to scale.", btn: "Start Sprint" },
    { label: "Squad", title: "Integrated Team", desc: "We deploy a full AI pod (Architect, ML Engineer, Backend) into your Slack. We become your internal AI department.", btn: "Hire Squad" },
    { label: "Project", title: "Fixed Scope", desc: "End-to-end delivery of a specific system (e.g., Support Automation) with guaranteed deliverables and timeline.", btn: "Scope Project" },
    { label: "Audit", title: "Security & Arch", desc: "Deep-dive analysis of your current data infrastructure and security posture to prepare for AI injection.", btn: "Book Audit" }
];

const Products: React.FC = () => {
    return (
        <section className="w-full bg-[#020617] px-6 py-24 pb-48">
            <div className="max-w-7xl mx-auto">
                <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-8 block">( ENGAGEMENT )</span>
                <h2 className="text-4xl font-light mb-16 text-white">
                    Flexible models for<br/>
                    <span className="italic-accent">every stage</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {items.map((item, idx) => (
                        <div key={idx} className="group relative bg-[#0B1121] border border-white/5 hover:border-blue-500/30 transition-all rounded-2xl overflow-hidden min-h-[400px] flex flex-col justify-end p-6 hover:-translate-y-1 duration-500">
                            
                            {/* Visual Abstract */}
                            <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
                            </div>

                            {/* Label */}
                            <div className="absolute top-6 left-6 bg-white/5 backdrop-blur border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider group-hover:bg-blue-500 group-hover:border-blue-500 transition-colors">
                                {item.label}
                            </div>

                            <div className="relative z-10">
                                <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
                                <p className="text-xs text-gray-400 leading-relaxed mb-6 h-12">{item.desc}</p>
                                <button className="flex items-center gap-2 text-[10px] uppercase tracking-wider border border-white/10 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors w-max group-hover:border-white">
                                    {item.btn}
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;