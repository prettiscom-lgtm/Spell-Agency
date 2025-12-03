import React from 'react';

const items = [
    { title: "The 'PoC' Trap", desc: "87% of AI projects die in the 'Proof of Concept' phase. We don't build demos. We build production-hardened systems integrated into your actual VPC and ERPs." },
    { title: "Data Sovereignty", desc: "Enterprise AI isn't about sending your data to OpenAI. It's about owning the model. We deploy isolated, fine-tuned instances that YOU control." },
    { title: "The Talent Vacuum", desc: "Hiring a senior AI engineer takes 6 months and costs $300k+. Spell deploys a full squad of architects, ML engineers, and backend devs instantly." },
    { title: "Day 1 ROI", desc: "We target low-hanging fruit first. Our 'Revenue-First' architecture ensures your first deployed agent pays for the entire engagement." }
];

const Advantages: React.FC = () => {
    return (
        <section id="advantages" className="w-full bg-white text-black py-24 px-6 pt-32 relative z-20">
            {/* Top Gradient to blend from Hero white fade - seamless match */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white via-white to-transparent pointer-events-none transform -translate-y-full"></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
                
                {/* Left - The Problem Statement */}
                <div className="md:col-span-4 flex flex-col justify-start pt-4">
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-8">( THE STRATEGIC GAP )</span>
                    <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8">
                        Why most AI<br/>
                        <span className="italic-accent font-normal text-blue-600">initiatives</span><br/>
                        fail to <span className="italic-accent font-normal border-b border-black">launch</span>
                    </h2>
                    <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                        The gap between a cool demo and a business-critical system is immense. We bridge that gap with engineering rigor, not hype.
                    </p>
                    <button className="group flex items-center justify-between w-48 px-6 py-3 border border-gray-200 rounded-full text-xs font-bold hover:bg-black hover:text-white transition-all uppercase tracking-wider">
                        Our Solution
                        <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </button>
                </div>

                {/* Right - Accordion List */}
                <div className="md:col-span-8">
                    <div className="border-t border-gray-200">
                        {items.map((item, idx) => (
                            <div key={idx} className="group border-b border-gray-200 py-10 cursor-pointer transition-colors hover:bg-gray-50 px-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold text-gray-900 w-1/3 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                                    <div className="w-2/3 flex justify-between gap-8">
                                        <p className="text-sm text-gray-600 font-normal leading-relaxed max-w-md">{item.desc}</p>
                                        <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all">
                                            <span className="text-lg font-light group-hover:rotate-90 transition-transform">→</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Advantages;