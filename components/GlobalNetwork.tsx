import React, { useState, useEffect } from 'react';

const logs = [
    "INITIALIZING_NEURAL_HANDSHAKE...",
    "NODE_Tokyo_01: ONLINE (12ms)",
    "NODE_NewYork_04: OPTIMIZING TRAFFIC",
    "DETECTED_USER_INTENT: [HIGH_VALUE]",
    "ALLOCATING_GPU_CLUSTER_09...",
    "SECURE_CHANNEL_ESTABLISHED",
    "GEMINI_3_PRO: STANDBY",
    "SYNCING_LOCAL_CONTEXT..."
];

const GlobalNetwork: React.FC = () => {
    const [logIndex, setLogIndex] = useState(0);
    const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            if (logIndex < logs.length) {
                setDisplayedLogs(prev => [logs[logIndex], ...prev].slice(0, 6));
                setLogIndex(prev => prev + 1);
            } else {
                // Random generated logs after initial sequence
                const randomLog = `PROCESS_${Math.floor(Math.random() * 9999)}: OK (${Math.floor(Math.random() * 50)}ms)`;
                setDisplayedLogs(prev => [randomLog, ...prev].slice(0, 6));
            }
        }, 800);
        return () => clearInterval(interval);
    }, [logIndex]);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="w-full max-w-7xl mx-auto px-6 py-24">
            <div className="bg-black text-white rounded-[40px] border border-white/10 p-8 md:p-12 overflow-hidden relative shadow-2xl">
                
                {/* Grid Overlay */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                <div className="flex flex-col md:flex-row gap-12 relative z-10">
                    
                    {/* Left: HUD */}
                    <div className="w-full md:w-1/3 flex flex-col justify-between h-full min-h-[300px]">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <h3 className="text-xs font-bold text-green-500 tracking-widest uppercase">System Status: Operational</h3>
                            </div>
                            <h2 className="font-pixel text-4xl mb-4">Command<br/>Center</h2>
                            <p className="text-gray-400 text-sm mb-8">
                                Monitoring global inference nodes and active agent deployments in real-time.
                            </p>
                        </div>

                        {/* Terminal */}
                        <div className="bg-gray-900/50 rounded-xl p-4 border border-white/10 font-mono text-xs h-40 overflow-hidden flex flex-col-reverse">
                            {displayedLogs.map((log, i) => (
                                <div key={i} className={`mb-1 ${i === 0 ? 'text-brand-blue' : 'text-gray-500'}`}>
                                    > {log}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Map Visualization */}
                    <div className="w-full md:w-2/3 bg-gray-900/30 rounded-3xl border border-white/5 relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden group cursor-crosshair">
                        
                        {/* World Map SVG (Abstract) */}
                        <svg viewBox="0 0 800 400" className="w-full h-full opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                             <path d="M150,100 Q200,50 300,100 T500,100 T700,150" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700" />
                             <path d="M100,200 Q250,250 400,200 T700,250" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700" />
                             {/* Nodes */}
                             <circle cx="200" cy="120" r="4" className="fill-brand-blue animate-ping" />
                             <circle cx="200" cy="120" r="2" className="fill-white" />
                             
                             <circle cx="500" cy="180" r="4" className="fill-brand-orange animate-ping animation-delay-1000" />
                             <circle cx="500" cy="180" r="2" className="fill-white" />

                             <circle cx="350" cy="250" r="4" className="fill-brand-purple animate-ping animation-delay-2000" />
                             <circle cx="350" cy="250" r="2" className="fill-white" />
                        </svg>

                        {/* Floating Time Widget */}
                        <div className="absolute top-6 right-6 bg-black/80 backdrop-blur border border-white/10 px-4 py-2 rounded-lg text-right">
                             <div className="text-[10px] text-gray-400 uppercase tracking-widest">Local Sync</div>
                             <div className="font-mono text-lg font-bold text-white">{time}</div>
                        </div>

                        {/* Connection Lines (CSS) */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-1/2 left-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent animate-pulse"></div>
                            <div className="absolute top-1/2 left-1/2 h-full w-[1px] bg-gradient-to-b from-transparent via-brand-blue/20 to-transparent animate-pulse"></div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default GlobalNetwork;