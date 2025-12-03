import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#020617] to-blue-950/20 pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
          
          <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-8 block">( START NOW )</span>
          
          <div className="flex flex-col md:flex-row items-end justify-between border-b border-white/10 pb-20 mb-12">
              <div className="max-w-2xl">
                  <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">
                      Join the <span className="italic-accent">revolution</span>
                  </h2>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-lg">
                      Spell-V3-0324 isn't just a model — it's a movement. Developers worldwide are building on Spell, with 2.5M+ downloads of derivatives on Hugging Face. Be part of the future of generative models.
                  </p>
              </div>
              <button className="bg-white text-black px-8 py-3 rounded-md font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-gray-200 transition-colors mt-8 md:mt-0">
                  START NOW
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              <div>
                  <h4 className="font-bold text-xs text-white mb-4">Research</h4>
                  <ul className="space-y-2 text-[10px] text-gray-400">
                      <li className="hover:text-white cursor-pointer">DeepSeek R1</li>
                      <li className="hover:text-white cursor-pointer">DeepSeek V3</li>
                      <li className="hover:text-white cursor-pointer">DeepSeek Coder V2</li>
                      <li className="hover:text-white cursor-pointer">DeepSeek VL</li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-bold text-xs text-white mb-4">Product</h4>
                  <ul className="space-y-2 text-[10px] text-gray-400">
                      <li className="hover:text-white cursor-pointer">DeepSeek app</li>
                      <li className="hover:text-white cursor-pointer">DeepSeek chat</li>
                      <li className="hover:text-white cursor-pointer">DeepSeek platform</li>
                      <li className="hover:text-white cursor-pointer">API pricing</li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-bold text-xs text-white mb-4">Legal & safety</h4>
                  <ul className="space-y-2 text-[10px] text-gray-400">
                      <li className="hover:text-white cursor-pointer">Privacy policy</li>
                      <li className="hover:text-white cursor-pointer">Terms of use</li>
                      <li className="hover:text-white cursor-pointer">Report vulnerabilities</li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-bold text-xs text-white mb-4">Join us</h4>
                  <ul className="space-y-2 text-[10px] text-gray-400">
                      <li className="hover:text-white cursor-pointer">Job description</li>
                  </ul>
              </div>
          </div>

          <div className="flex justify-between items-center text-[10px] text-gray-600">
              <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-white/10"></div>
                  <span className="font-bold text-gray-400">spell agency</span>
              </div>
              <div>© 2025 Spell Agency. All rights reserved.</div>
              <div>中文</div>
          </div>
      </div>
    </footer>
  );
};

export default Footer;