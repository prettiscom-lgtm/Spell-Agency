import React from 'react';

const techs = [
    { name: "Google Gemini", type: "Reasoning Engine" },
    { name: "PyTorch", type: "Deep Learning" },
    { name: "React", type: "Interface" },
    { name: "TensorFlow", type: "Model Training" },
    { name: "AWS", type: "Infrastructure" },
    { name: "Python", type: "Core Logic" },
    { name: "LangChain", type: "Orchestration" },
    { name: "Pinecone", type: "Vector DB" }
];

const TechStack: React.FC = () => {
    return (
        <section className="py-20 border-t border-gray-100 dark:border-white/5 w-full">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-12">Powered By The Engine Room</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {techs.map((tech, idx) => (
                        <div key={idx} className="group flex flex-col items-center justify-center p-6 bg-gray-50/50 dark:bg-white/5 rounded-2xl hover:bg-white dark:hover:bg-white/10 transition-colors duration-300 cursor-default border border-transparent hover:border-gray-200 dark:hover:border-white/10">
                            <span className="font-pixel text-lg md:text-xl text-gray-800 dark:text-gray-200 group-hover:text-brand-blue transition-colors">{tech.name}</span>
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider mt-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">{tech.type}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;