
import React, { useState, useEffect } from 'react';
import { playClick, playHover, playSuccess, playError } from '../services/audioService';

const Contact: React.FC = () => {
  const [intent, setIntent] = useState('project'); // project, hiring, partnership
  const [budget, setBudget] = useState(5000);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  
  // Advanced State
  const [keywords, setKeywords] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Smart meter logic
  const getScopeLevel = () => {
     const len = message.length;
     if (len < 50) return { label: 'Undefined', color: 'bg-gray-200 dark:bg-gray-700', width: '10%' };
     if (len < 150) return { label: 'Basic', color: 'bg-yellow-400', width: '40%' };
     if (len < 300) return { label: 'Detailed', color: 'bg-brand-blue', width: '70%' };
     return { label: 'Comprehensive', color: 'bg-green-500', width: '100%' };
  };

  const scope = getScopeLevel();
  const isReady = name.length > 2 && email.includes('@') && message.length > 10;

  // Real-time keyword detection
  useEffect(() => {
      const techTerms = ['ai', 'llm', 'gpt', 'vision', 'automation', 'data', 'cloud', 'api', 'bot', 'react', 'python', 'security', 'scale'];
      const found = techTerms.filter(term => message.toLowerCase().includes(term));
      setKeywords(found);
  }, [message]);

  // Clock
  useEffect(() => {
      const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
      return () => clearInterval(timer);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          playClick();
          const selectedFile = e.target.files[0];
          setFile(selectedFile);
          
          // Simulate upload scan
          let progress = 0;
          const interval = setInterval(() => {
              progress += 5;
              setUploadProgress(progress);
              if (progress >= 100) clearInterval(interval);
          }, 50);
      }
  };

  const handleSubmit = () => {
      if (!isReady) {
          playError();
          return;
      }
      playClick();
      // Simulate network request
      setTimeout(() => {
          playSuccess();
          setIsSent(true);
      }, 1500);
  };

  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full pt-32 md:pt-44 pb-24 flex flex-col items-center justify-start z-10 min-h-screen">
        
        <div className="text-center px-4 mb-12 relative z-10 animate-fadeIn">
            <h1 className="font-sans font-extrabold text-5xl md:text-7xl leading-[1.1] text-black dark:text-white mb-6 transition-colors duration-500 tracking-tighter">
              Secure <span className="text-brand-orange">Uplink</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-xl max-w-xl mx-auto transition-colors duration-500">
              Establish a direct connection with our solutions architects.
            </p>
        </div>

        {/* Smart Terminal Card */}
        <div className="relative z-20 w-full max-w-6xl bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-2xl rounded-[40px] shadow-2xl dark:shadow-[0_0_50px_rgba(255,255,255,0.05)] border border-white/50 dark:border-white/10 p-0 mx-4 animate-slideUp overflow-hidden flex flex-col lg:flex-row transition-all duration-500">
            
            {/* Left Panel: Configuration */}
            <div className="w-full lg:w-4/12 bg-gray-50 dark:bg-black/50 p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-white/10 flex flex-col justify-between transition-colors duration-500 relative overflow-hidden">
                {/* Decorative Grid */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[size:20px_20px] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]"></div>
                
                <div className="space-y-8 relative z-10">
                    <div>
                         <div className="flex items-center gap-2 mb-4">
                             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                             <span className="text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest">System Status: Online</span>
                         </div>
                         <h3 className="font-bold text-xl mb-2 text-black dark:text-white">Signal Configuration</h3>
                         <p className="text-sm text-gray-500 dark:text-gray-400">Calibrate your inquiry parameters.</p>
                    </div>

                    {/* Intent Selector */}
                    <div>
                        <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-widest">Protocol Type</label>
                        <div className="space-y-2">
                            {['project', 'hiring', 'partnership'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => { setIntent(type); playClick(); }}
                                    onMouseEnter={playHover}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all border text-sm ${
                                        intent === type 
                                        ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-md' 
                                        : 'bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20'
                                    }`}
                                >
                                    <span className="capitalize">{type}</span>
                                    {intent === type && <span className="text-brand-orange">●</span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Budget Slider */}
                    {intent === 'project' && (
                        <div className="animate-fadeIn">
                            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-widest flex justify-between">
                                <span>Resource Allocation</span>
                                <span className="text-brand-blue font-mono">${budget.toLocaleString()}</span>
                            </label>
                            <div className="relative h-12 bg-white dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10 flex items-center px-4">
                                <input 
                                    type="range" 
                                    min="1000" 
                                    max="50000" 
                                    step="1000" 
                                    value={budget}
                                    onChange={(e) => setBudget(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-black dark:accent-brand-blue"
                                />
                            </div>
                            <div className="flex justify-between text-[9px] text-gray-400 mt-2 font-mono uppercase tracking-wider">
                                <span>Prototype</span>
                                <span>Enterprise</span>
                            </div>
                        </div>
                    )}

                    {/* File Upload */}
                    <div>
                        <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-widest">Data Attachment</label>
                        <div className={`relative border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl p-6 text-center transition-all hover:border-brand-blue dark:hover:border-brand-blue group ${file ? 'bg-brand-blue/5 border-brand-blue' : ''}`}>
                            <input 
                                type="file" 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                onChange={handleFileChange}
                            />
                            {file ? (
                                <div>
                                    <div className="text-sm font-bold text-brand-blue truncate mb-2">{file.name}</div>
                                    <div className="w-full h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-brand-blue transition-all duration-300" 
                                            style={{ width: `${uploadProgress}%` }}
                                        ></div>
                                    </div>
                                    <div className="mt-2 text-[10px] text-gray-400 font-mono uppercase">
                                        {uploadProgress < 100 ? 'Encrypting & Scanning...' : 'Securely Attached'}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    <div className="w-8 h-8 mx-auto bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                    </div>
                                    <p className="text-xs text-gray-500">Drop RFP or Spec Sheet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel: Payload */}
            <div className="w-full lg:w-8/12 bg-white dark:bg-black/20 relative transition-colors duration-500 flex flex-col">
                {!isSent ? (
                    <div className="flex-1 p-8 md:p-12 flex flex-col justify-between relative z-10">
                        
                        {/* Header */}
                        <div className="flex justify-between items-start mb-8 border-b border-gray-100 dark:border-white/5 pb-6">
                            <div>
                                <h3 className="font-bold text-2xl text-black dark:text-white">Payload Details</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Encrypted Transmission • AES-256</p>
                            </div>
                            <div className="hidden md:block text-right">
                                <div className="text-xs font-mono text-gray-400 uppercase">Local Time</div>
                                <div className="text-xl font-mono text-black dark:text-white">{currentTime}</div>
                            </div>
                        </div>

                        {/* Inputs */}
                        <div className="space-y-6 flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className={`relative group transition-all duration-300 ${activeField === 'name' ? 'scale-[1.01]' : ''}`}>
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gray-300 dark:border-white/20 group-hover:border-black dark:group-hover:border-brand-blue transition-colors"></div>
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gray-300 dark:border-white/20 group-hover:border-black dark:group-hover:border-brand-blue transition-colors"></div>
                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gray-300 dark:border-white/20 group-hover:border-black dark:group-hover:border-brand-blue transition-colors"></div>
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gray-300 dark:border-white/20 group-hover:border-black dark:group-hover:border-brand-blue transition-colors"></div>
                                    
                                    <input 
                                        type="text" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        onFocus={() => setActiveField('name')}
                                        onBlur={() => setActiveField(null)}
                                        className="w-full bg-transparent p-4 text-black dark:text-white focus:outline-none placeholder-gray-300 dark:placeholder-gray-700 font-mono text-sm" 
                                        placeholder="IDENTIFIER_NAME" 
                                    />
                                    <label className="absolute -top-2 left-4 bg-white dark:bg-[#0c0c0c] px-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Identify</label>
                                </div>

                                <div className={`relative group transition-all duration-300 ${activeField === 'email' ? 'scale-[1.01]' : ''}`}>
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gray-300 dark:border-white/20 group-hover:border-black dark:group-hover:border-brand-blue transition-colors"></div>
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gray-300 dark:border-white/20 group-hover:border-black dark:group-hover:border-brand-blue transition-colors"></div>
                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gray-300 dark:border-white/20 group-hover:border-black dark:group-hover:border-brand-blue transition-colors"></div>
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gray-300 dark:border-white/20 group-hover:border-black dark:group-hover:border-brand-blue transition-colors"></div>

                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={() => setActiveField('email')}
                                        onBlur={() => setActiveField(null)}
                                        className="w-full bg-transparent p-4 text-black dark:text-white focus:outline-none placeholder-gray-300 dark:placeholder-gray-700 font-mono text-sm" 
                                        placeholder="RETURN_ADDRESS@CORP.COM" 
                                    />
                                    <label className="absolute -top-2 left-4 bg-white dark:bg-[#0c0c0c] px-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contact</label>
                                </div>
                            </div>

                            <div className={`relative group transition-all duration-300 ${activeField === 'message' ? 'scale-[1.01]' : ''}`}>
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gray-300 dark:border-white/20 group-hover:border-black dark:group-hover:border-brand-blue transition-colors"></div>
                                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gray-300 dark:border-white/20 group-hover:border-black dark:group-hover:border-brand-blue transition-colors"></div>
                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gray-300 dark:border-white/20 group-hover:border-black dark:group-hover:border-brand-blue transition-colors"></div>
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gray-300 dark:border-white/20 group-hover:border-black dark:group-hover:border-brand-blue transition-colors"></div>

                                <textarea 
                                    rows={8}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onFocus={() => setActiveField('message')}
                                    onBlur={() => setActiveField(null)}
                                    className="w-full bg-transparent p-4 text-black dark:text-white focus:outline-none placeholder-gray-300 dark:placeholder-gray-700 font-mono text-sm resize-none" 
                                    placeholder="Execute transmission sequence. Describe protocol requirements..." 
                                />
                                <label className="absolute -top-2 left-4 bg-white dark:bg-[#0c0c0c] px-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    Message Body
                                    <span className={`w-2 h-2 rounded-full ${scope.color}`}></span>
                                </label>
                                
                                {/* Live Neural Analysis Overlay */}
                                {keywords.length > 0 && (
                                    <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                                        {keywords.map(k => (
                                            <span key={k} className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-brand-blue/10 text-brand-blue border border-brand-blue/30 animate-fadeIn">
                                                DETECTED: {k}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="mt-8 flex items-center gap-6">
                            <button 
                                onClick={handleSubmit}
                                disabled={!isReady}
                                onMouseEnter={playHover}
                                className={`flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                                    isReady 
                                    ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-200 hover:shadow-lg hover:-translate-y-1' 
                                    : 'bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-600 cursor-not-allowed border border-dashed border-gray-200 dark:border-white/10'
                                }`}
                            >
                                <span>Initiate Handshake</span>
                                {isReady && <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn p-12">
                        <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6 animate-blob border border-green-500/20">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 className="font-sans font-bold text-4xl mb-4 text-black dark:text-white tracking-tight">Uplink Established</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-10 text-lg">
                            Transmission successful. Protocol ID <span className="font-mono text-black dark:text-white">#{Math.floor(Math.random() * 99999)}</span> generated.<br/> A senior architect will respond to <span className="font-bold text-black dark:text-white">{email}</span> within 4 hours.
                        </p>
                        <button 
                            onClick={() => { setIsSent(false); setMessage(''); setName(''); setEmail(''); setFile(null); setUploadProgress(0); setKeywords([]); }}
                            className="text-sm font-bold border-b border-black dark:border-white text-black dark:text-white hover:text-brand-orange dark:hover:text-brand-orange hover:border-brand-orange transition-colors pb-1"
                        >
                            Establish new connection
                        </button>
                    </div>
                )}
            </div>

        </div>
    </div>
  );
};

export default Contact;
