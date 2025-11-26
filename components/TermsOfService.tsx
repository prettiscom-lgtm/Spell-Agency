import React, { useEffect } from 'react';

const TermsOfService: React.FC = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full pt-32 md:pt-44 pb-24 flex flex-col items-center justify-start z-10 min-h-screen">
        
        <div className="text-center px-4 mb-12 relative z-10 animate-fadeIn">
            <h1 className="font-pixel text-5xl md:text-7xl leading-[1.1] text-black mb-6">
              Service <span className="text-brand-orange">Agreement</span>
            </h1>
            <p className="text-gray-500 text-xl max-w-xl mx-auto">
              The rules of engagement for our digital services.
            </p>
        </div>

        {/* White Card Container */}
        <div className="relative z-20 w-full max-w-4xl bg-white/90 backdrop-blur-2xl rounded-[40px] shadow-xl border border-white/50 p-8 md:p-16 mx-4 animate-slideUp">
            
            <div className="prose prose-lg max-w-none">
                <div className="mb-10 border-b border-gray-100 pb-8">
                    <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-2">Effective Date: {new Date().toLocaleDateString()}</p>
                    <p className="text-gray-600">
                        By accessing Spell Agency's platform or services, you agree to be bound by these Terms. If you do not agree, you must discontinue use immediately.
                    </p>
                </div>

                <div className="space-y-12">
                    <section>
                        <h3 className="font-bold text-2xl mb-4 font-pixel">1. Usage Rights</h3>
                        <p className="text-gray-600 mb-4">
                            Spell Agency grants you a limited, non-exclusive, non-transferable license to access our AI services. You agree not to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 marker:text-brand-orange">
                            <li>Reverse engineer our models or API endpoints.</li>
                            <li>Use our services to generate illegal, harmful, or abusive content.</li>
                            <li>Resell our API access without an Enterprise License.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="font-bold text-2xl mb-4 font-pixel">2. Intellectual Property</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <h4 className="font-bold text-sm uppercase mb-2 text-gray-400">Our IP</h4>
                                <p className="text-sm text-gray-600">
                                    The underlying architecture, pre-training methodologies, and UI code remain the exclusive property of Spell Agency.
                                </p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <h4 className="font-bold text-sm uppercase mb-2 text-gray-400">Your IP</h4>
                                <p className="text-sm text-gray-600">
                                    Fine-tuned model weights and any content generated specifically for your business remain your sole property.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="font-bold text-2xl mb-4 font-pixel">3. Service Level Agreement (SLA)</h3>
                        <p className="text-gray-600">
                            For <strong>Scaling</strong> and <strong>Dominion</strong> plans, we guarantee 99.9% uptime. Credits are issued for downtime exceeding this threshold, calculated monthly. Prototyping plans are provided "as is" without uptime guarantees.
                        </p>
                    </section>

                    <section>
                        <h3 className="font-bold text-2xl mb-4 font-pixel">4. Liability Limitation</h3>
                        <p className="text-gray-600">
                            AI outputs are probabilistic. Spell Agency is not liable for business decisions made based on AI predictions or generated content. Human-in-the-loop verification is recommended for critical workflows.
                        </p>
                    </section>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 text-center">
                    <p className="text-gray-500 text-sm">
                        Legal inquiries? <br/>
                        <a href="mailto:legal@spell.agency" className="text-black font-bold border-b border-black hover:text-brand-orange hover:border-brand-orange transition-colors">legal@spell.agency</a>
                    </p>
                </div>
            </div>

        </div>
    </div>
  );
};

export default TermsOfService;