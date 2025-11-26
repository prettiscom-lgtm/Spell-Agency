
import React, { useState } from 'react';
import { playClick, playSuccess, playError } from '../services/audioService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const countryCodes = [
  { code: '+1', country: 'US/CA' },
  { code: '+44', country: 'UK' },
  { code: '+61', country: 'AU' },
  { code: '+49', country: 'DE' },
  { code: '+33', country: 'FR' },
  { code: '+81', country: 'JP' },
  { code: '+86', country: 'CN' },
  { code: '+91', country: 'IN' },
  { code: '+971', country: 'UAE' },
];

const CallModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'input' | 'success'>('input');
  const [country, setCountry] = useState('+1');
  const [number, setNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (number.length < 5) {
        playError();
        return;
    }
    
    playClick();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
        setIsSubmitting(false);
        setStep('success');
        playSuccess();
    }, 1500);
  };

  const handleClose = () => {
      setStep('input');
      setNumber('');
      setIsSubmitting(false);
      onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn p-4">
       
       <div className="relative w-full max-w-md bg-white dark:bg-[#0a0a0a] rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden animate-slideUp">
           
           {/* Close Button */}
           <button 
             onClick={handleClose}
             className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors z-20"
           >
             <svg className="w-4 h-4 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
           </button>

           {/* Header / Harry Avatar */}
           <div className="bg-gray-50 dark:bg-black/50 p-8 text-center border-b border-gray-100 dark:border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(45deg,transparent_25%,#000_25%,#000_50%,transparent_50%,transparent_75%,#000_75%,#000_100%)] dark:bg-[linear-gradient(45deg,transparent_25%,#fff_25%,#fff_50%,transparent_50%,transparent_75%,#fff_75%,#fff_100%)] bg-[length:20px_20px]"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-black dark:bg-white flex items-center justify-center mb-4 shadow-lg shadow-brand-blue/20 relative">
                        {step === 'input' && !isSubmitting && (
                            <div className="w-full h-full absolute inset-0 rounded-full border-2 border-brand-blue opacity-50 animate-ping"></div>
                        )}
                        <div className="font-pixel text-4xl text-white dark:text-black font-bold">H</div>
                    </div>
                    <h3 className="font-bold text-xl text-black dark:text-white mb-1">Harry</h3>
                    <p className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        Spell Agency • Lead Architect
                    </p>
                </div>
           </div>

           {/* Content */}
           <div className="p-8">
               {step === 'input' ? (
                   <form onSubmit={handleSubmit}>
                       <p className="text-center text-gray-600 dark:text-gray-300 mb-8 text-sm leading-relaxed">
                           "I'm ready to discuss your infrastructure needs. Enter your direct line, and I'll initiate a secure voice uplink immediately."
                       </p>

                       <div className="space-y-4">
                           <div className="flex gap-3">
                               <div className="w-1/3 relative">
                                   <select 
                                     value={country}
                                     onChange={(e) => setCountry(e.target.value)}
                                     className="w-full h-12 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-3 text-sm font-bold text-black dark:text-white focus:outline-none focus:border-brand-blue appearance-none cursor-pointer"
                                   >
                                       {countryCodes.map(c => (
                                           <option key={c.code} value={c.code}>{c.code} ({c.country})</option>
                                       ))}
                                   </select>
                                   <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                   </div>
                               </div>
                               <div className="flex-1">
                                   <input 
                                     type="tel" 
                                     placeholder="Phone Number"
                                     value={number}
                                     onChange={(e) => setNumber(e.target.value)}
                                     className="w-full h-12 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 text-sm font-medium text-black dark:text-white focus:outline-none focus:border-brand-blue placeholder-gray-400"
                                     required
                                   />
                               </div>
                           </div>

                           <button 
                             type="submit"
                             disabled={isSubmitting}
                             className="w-full h-12 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                           >
                               {isSubmitting ? (
                                   <>
                                     <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                     <span>Establishing Connection...</span>
                                   </>
                               ) : (
                                   <>
                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                     <span>Request Immediate Call</span>
                                   </>
                               )}
                           </button>
                       </div>
                   </form>
               ) : (
                   <div className="text-center py-4">
                       <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                       </div>
                       <h4 className="font-bold text-xl text-black dark:text-white mb-2">Signal Received</h4>
                       <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                           Harry is dialing <strong>{country} {number}</strong> right now. <br/>Keep your line open.
                       </p>
                       <button 
                         onClick={handleClose}
                         className="text-sm font-bold text-black dark:text-white border-b border-black dark:border-white pb-0.5 hover:opacity-70 transition-opacity"
                       >
                           Close Window
                       </button>
                   </div>
               )}
           </div>

       </div>
    </div>
  );
};

export default CallModal;
