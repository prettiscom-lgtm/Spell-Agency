import React from 'react';

const techs = [
    "Google Gemini", "OpenAI Enterprise", "Llama 3", "Pinecone", "LangChain", "AWS Bedrock", "Azure OpenAI", "Python", "Kubernetes", "Docker"
];

const TechStack: React.FC = () => {
    return (
        <section className="w-full bg-[#020617] py-12 border-y border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
                <span className="text-[10px] uppercase tracking-widest text-gray-600">Built on Giants</span>
            </div>
            
            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex gap-16">
                    {[...techs, ...techs, ...techs].map((tech, i) => (
                        <span key={i} className="text-xl md:text-2xl font-light text-gray-600 uppercase tracking-tight hover:text-white transition-colors cursor-default">
                            {tech}
                        </span>
                    ))}
                </div>
                
                {/* Gradient Masks */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#020617] to-transparent z-10"></div>
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#020617] to-transparent z-10"></div>
            </div>
        </section>
    );
};

export default TechStack;