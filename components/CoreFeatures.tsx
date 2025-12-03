import React from 'react';

const features = [
    { title: "Knowledge Synthesis", desc: "We turn your 'dark data'—PDFs, Slack logs, Notion—into a structured, queryable semantic layer. Your employees get instant, accurate answers." },
    { title: "Autonomous Ops", desc: "Agents that don't just chat—they do. We build swarms that can execute refunds, schedule engineers, and update CRMs without human oversight." },
    { title: "Computer Vision", desc: "Automating the physical world. From defect detection on assembly lines to analyzing satellite imagery for logistics optimization." },
    { title: "Private Foundation Models", desc: "We fine-tune Llama 3 and Mistral on your proprietary data, giving you a custom brain that outperforms generic models on your specific tasks." }
];

const CoreFeatures: React.FC = () => {
    return (
        <section id="features" className="relative w-full bg-white text-black py-24 pb-48 px-6 overflow-hidden">
            
            {/* Smooth Transition to Dark - Glassy Gradient Mask */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent pointer-events-none z-10"></div>
            
            <div className="relative z-0 max-w-7xl mx-auto">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-8 block">( CAPABILITIES )</span>
                
                <h2 className="text-4xl md:text-5xl font-light mb-16 text-black">
                    What we actually <br/>
                    <span className="italic-accent border-b border-black pb-1">deliver</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {features.map((f, i) => (
                        <div key={i} className="flex flex-col gap-4 group">
                            <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center mb-2 group-hover:bg-black group-hover:text-white transition-colors">
                                <span className="font-mono text-xs">{i + 1}</span>
                            </div>
                            <h3 className="font-bold text-lg text-black">{f.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoreFeatures;