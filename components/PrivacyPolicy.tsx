import React, { useEffect } from 'react';

const PrivacyPolicy: React.FC = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full pt-32 md:pt-44 pb-24 flex flex-col items-center justify-start z-10 min-h-screen">
        
        <div className="text-center px-4 mb-12 relative z-10 animate-fadeIn">
            <h1 className="font-pixel text-5xl md:text-7xl leading-[1.1] text-black mb-6">
              Data <span className="text-brand-blue">Protocols</span>
            </h1>
            <p className="text-gray-500 text-xl max-w-xl mx-auto">
              How we secure, process, and delete your intelligence.
            </p>
        </div>

        {/* White Card Container */}
        <div className="relative z-20 w-full max-w-4xl bg-white/90 backdrop-blur-2xl rounded-[40px] shadow-xl border border-white/50 p-8 md:p-16 mx-4 animate-slideUp">
            
            <div className="prose prose-lg max-w-none">
                <div className="mb-10 border-b border-gray-100 pb-8">
                    <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-2">Last Updated: {new Date().toLocaleDateString()}</p>
                    <p className="text-gray-600">
                        At Spell Agency, we treat data privacy as an engineering problem, not just a legal requirement. Our infrastructure is designed to minimize data retention and maximize security.
                    </p>
                </div>

                <div className="space-y-12">
                    <section>
                        <h3 className="font-bold text-2xl mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-pixel">01</span>
                            Data Collection
                        </h3>
                        <p className="text-gray-600 mb-4">
                            We collect information necessary to train custom models and provide automation services. This includes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 marker:text-brand-blue">
                            <li><strong>Identity Data:</strong> Name, email, and corporate affiliation.</li>
                            <li><strong>Technical Data:</strong> API logs, IP addresses, and browser telemetry for security auditing.</li>
                            <li><strong>Training Data:</strong> Proprietary datasets you explicitly upload for model fine-tuning.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="font-bold text-2xl mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-pixel">02</span>
                            Model Isolation & Security
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Unlike generalist AI providers, we enforce strict <strong>Model Isolation</strong>.
                        </p>
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <p className="text-sm font-medium text-gray-800">
                                "Your data is never used to train our foundational models or shared across client instances. Each client operates within a sandboxed environment (VPC) with encrypted ingress/egress."
                            </p>
                        </div>
                    </section>

                    <section>
                        <h3 className="font-bold text-2xl mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-pixel">03</span>
                            Data Retention
                        </h3>
                        <p className="text-gray-600">
                            We retain training data only as long as your subscription is active. Upon contract termination, all proprietary models and datasets are cryptographically shredded within 72 hours.
                        </p>
                    </section>

                    <section>
                        <h3 className="font-bold text-2xl mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-pixel">04</span>
                            Third-Party Processors
                        </h3>
                        <p className="text-gray-600">
                            We utilize trusted infrastructure providers (GCP, AWS) to host our services. We have Data Processing Agreements (DPAs) in place with all sub-processors to ensure GDPR and CCPA compliance.
                        </p>
                    </section>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 text-center">
                    <p className="text-gray-500 text-sm">
                        Questions about our architecture? <br/>
                        <a href="mailto:security@spell.agency" className="text-black font-bold border-b border-black hover:text-brand-blue hover:border-brand-blue transition-colors">security@spell.agency</a>
                    </p>
                </div>
            </div>

        </div>
    </div>
  );
};

export default PrivacyPolicy;