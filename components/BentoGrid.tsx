import React from 'react';
import Magnetic from './ui/Magnetic';
import GlitchText from './ui/GlitchText';
import { playHover } from '../services/audioService';

const BentoGrid: React.FC = () => {
    return (
        <section className="w-full max-w-7xl mx-auto px-6 py-20">
            <div className="mb-12">
                <h2 className="font-pixel text-4xl md:text-5xl mb-4 text-black dark:text-white">
                    <GlitchText text="Capabilities_Matrix" />
                </h2>
                <p className="text-gray-500 dark:text-gray-400">Deploying intelligence across all vectors.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
                
                {/* Card 1: Large Video/Feature */}
                <div className="md:col-span-2 md:row-span-2 rounded-[32px] overflow-hidden relative group border border-gray-200 dark:border-white/10 bg-black">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0">
                         {/* Abstract Shape Animation */}
                         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-[100px] animate-blob"></div>
                    </div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                         <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    </div>

                    <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20">
                        <Magnetic>
                            <div className="inline-block bg-white dark:bg-white text-black text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                                Core Engine
                            </div>
                        </Magnetic>
                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">Autonomous Agents<br/>That Sleep When You Do.</h3>
                        <p className="text-gray-400 max-w-md">Our specialized models run 24/7, handling customer support, server monitoring, and data synthesis with zero downtime.</p>
                    </div>
                </div>

                {/* Card 2: Code Snippet */}
                <div className="md:col-span-1 rounded-[32px] bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-6 flex flex-col justify-between hover:border-brand-orange transition-colors duration-300 relative overflow-hidden group">
                     <div className="font-mono text-[10px] text-gray-400 mb-2">/lib/neural_config.json</div>
                     <div className="bg-black/5 dark:bg-black/50 p-4 rounded-xl font-mono text-xs text-gray-600 dark:text-gray-300 overflow-hidden relative">
                         <div className="absolute top-0 left-0 w-1 h-full bg-brand-orange"></div>
                         <p><span className="text-brand-purple">const</span> <span className="text-brand-blue">agent</span> = <span className="text-yellow-600">new</span> Gemini();</p>
                         <p><span className="text-brand-blue">agent</span>.connect(<span className="text-green-500">'WSS_SECURE'</span>);</p>
                         <p><span className="text-gray-400">// Latency: 12ms</span></p>
                     </div>
                     <div className="mt-4">
                         <h4 className="font-bold text-lg text-black dark:text-white">Dev-First API</h4>
                         <p className="text-xs text-gray-500">Drop-in SDKs for React, Python, and Node.</p>
                     </div>
                </div>

                {/* Card 3: Interactive Metric */}
                <div 
                    onMouseEnter={playHover}
                    className="md:col-span-1 rounded-[32px] bg-brand-blue/10 border border-brand-blue/20 p-6 flex flex-col justify-center items-center text-center hover:bg-brand-blue/20 transition-all cursor-pointer group"
                >
                    <div className="text-6xl font-pixel font-bold text-brand-blue mb-2 group-hover:scale-110 transition-transform duration-300">99%</div>
                    <div className="text-sm font-bold text-black dark:text-white uppercase tracking-widest">Accuracy Rate</div>
                    <p className="text-xs text-gray-500 mt-2 px-4">Benchmarked against GPT-4 on proprietary datasets.</p>
                </div>

            </div>
        </section>
    );
};

export default BentoGrid;