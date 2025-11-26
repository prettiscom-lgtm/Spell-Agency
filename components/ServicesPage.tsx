
import React, { useState, useEffect } from 'react';
import { playClick, playHover } from '../services/audioService';

const categories = [
  "All", "Finance", "Healthcare", "E-commerce", "Retail", "Manufacturing", "Legal", "Cybersecurity", "Creative"
];

// Reusable SVG Icons
const Icons = {
  Chart: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>,
  Shield: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  Scale: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>,
  Pulse: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  UserMedical: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  Dna: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  UserCheck: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Camera: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Tag: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>,
  Gear: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Layers: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  FileText: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  Building: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  Radar: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Lock: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
  Palette: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Mic: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>,
  Cube: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  ShoppingBag: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
  Scan: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>,
  Message: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
  TrendingUp: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
};

const fullCatalog = [
  // Finance
  {
    id: 1,
    title: "Algorithmic Trading Bots",
    category: "Finance",
    description: "Low-latency agents executing trades based on multi-modal sentiment analysis (news, social, charts).",
    stack: ["Python", "TensorFlow", "Redis"],
    impact: "+14% APY",
    icon: Icons.TrendingUp
  },
  {
    id: 2,
    title: "Fraud Detection Sentinel",
    category: "Finance",
    description: "Real-time transaction monitoring using anomaly detection to flag suspicious patterns instantly.",
    stack: ["Scikit-learn", "Kafka", "AWS"],
    impact: "99.9% Prevention",
    icon: Icons.Shield
  },
  {
    id: 3,
    title: "Automated Compliance Auditing",
    category: "Finance",
    description: "LLMs that parse thousands of regulatory documents to ensure internal processes meet SEC/GDPR standards.",
    stack: ["Gemini Pro", "LangChain"],
    impact: "Hrs -> Mins",
    icon: Icons.Scale
  },
  {
    id: 99,
    title: "Portfolio Optimization Engine",
    category: "Finance",
    description: "AI-driven asset allocation using Monte Carlo simulations and predictive market covariance.",
    stack: ["NumPy", "Pandas", "GCP"],
    impact: "Risk Minimized",
    icon: Icons.Chart
  },

  // Healthcare
  {
    id: 4,
    title: "Diagnostic Imaging Assistant",
    category: "Healthcare",
    description: "Computer vision models that assist radiologists by highlighting potential anomalies in X-rays and MRIs.",
    stack: ["PyTorch", "CUDA", "DICOM"],
    impact: "95% Accuracy",
    icon: Icons.UserMedical
  },
  {
    id: 5,
    title: "Patient Triage Bots",
    category: "Healthcare",
    description: "Empathetic voice agents that collect patient history and vitals before a doctor's visit.",
    stack: ["Neural Voice", "NLP"],
    impact: "-40% Wait Time",
    icon: Icons.Pulse
  },
  {
    id: 6,
    title: "Drug Discovery Simulation",
    category: "Healthcare",
    description: "Generative models simulating molecular interactions to accelerate pharmaceutical R&D.",
    stack: ["AlphaFold", "Python"],
    impact: "2x Speed",
    icon: Icons.Dna
  },

  // E-commerce (NEW)
  {
    id: 20,
    title: "Virtual Try-On Mirror",
    category: "E-commerce",
    description: "Augmented reality capability allowing customers to visualize clothing or products on themselves instantly.",
    stack: ["AR.js", "Three.js", "Vision"],
    impact: "-30% Returns",
    icon: Icons.Scan
  },
  {
    id: 21,
    title: "Smart Product Bundler",
    category: "E-commerce",
    description: "Reinforcement learning agents that generate dynamic high-conversion bundles at checkout.",
    stack: ["RecSys", "Node.js"],
    impact: "+25% AOV",
    icon: Icons.ShoppingBag
  },
  {
    id: 22,
    title: "Abandonment Recovery Agent",
    category: "E-commerce",
    description: "Hyper-personalized SMS/Email generation that references specific cart items and user style preferences.",
    stack: ["GPT-4", "Twilio API"],
    impact: "18% Recovery",
    icon: Icons.Message
  },
  {
    id: 23,
    title: "Inventory Forecasting",
    category: "E-commerce",
    description: "Predict seasonal spikes and stockouts with granular SKU-level precision using time-series AI.",
    stack: ["Prophet", "Snowflake"],
    impact: "Optimal Stock",
    icon: Icons.Chart
  },

  // Retail
  {
    id: 7,
    title: "Hyper-Personalization Engine",
    category: "Retail",
    description: "Dynamic website content generation tailored to individual user behavior and purchase history.",
    stack: ["RecSys", "Node.js"],
    impact: "+30% Conversion",
    icon: Icons.UserCheck
  },
  {
    id: 8,
    title: "Visual Inventory Search",
    category: "Retail",
    description: "Allow customers to upload photos to find matching products in your catalog instantly.",
    stack: ["Vision API", "Vector DB"],
    impact: "Seamless UX",
    icon: Icons.Camera
  },
  {
    id: 9,
    title: "Dynamic Pricing Agent",
    category: "Retail",
    description: "Real-time price adjustment based on competitor data, demand surges, and inventory levels.",
    stack: ["RL", "Python"],
    impact: "+12% Margin",
    icon: Icons.Tag
  },

  // Manufacturing
  {
    id: 10,
    title: "Predictive Maintenance",
    category: "Manufacturing",
    description: "IoT sensor analysis to predict machinery failure weeks before it happens.",
    stack: ["IoT", "Time-Series"],
    impact: "Zero Downtime",
    icon: Icons.Gear
  },
  {
    id: 11,
    title: "Digital Twin Simulation",
    category: "Manufacturing",
    description: "Virtual replicas of physical systems to test efficiency changes without risk.",
    stack: ["Unity", "SimPy"],
    impact: "Risk Free",
    icon: Icons.Layers
  },

  // Legal
  {
    id: 12,
    title: "Contract Review Automator",
    category: "Legal",
    description: "Instantly scan NDAs and MSAs for risky clauses and non-standard terms.",
    stack: ["NLP", "OCR"],
    impact: "10x Faster",
    icon: Icons.FileText
  },
  {
    id: 13,
    title: "Case Law Retrieval",
    category: "Legal",
    description: "Semantic search across millions of legal precedents to find relevant case arguments.",
    stack: ["Vector Search", "Elastic"],
    impact: "Deep Insight",
    icon: Icons.Building
  },

  // Cybersecurity
  {
    id: 14,
    title: "Zero-Day Threat Hunter",
    category: "Cybersecurity",
    description: "Autonomous agents that patrol network logs to identify unknown attack vectors.",
    stack: ["Anomaly Detection"],
    impact: "Proactive",
    icon: Icons.Radar
  },
  {
    id: 15,
    title: "Phishing Neural Filter",
    category: "Cybersecurity",
    description: "Advanced email analysis analyzing syntax and sender intent to block sophisticated spear-phishing.",
    stack: ["BERT", "Email API"],
    impact: "99% Block Rate",
    icon: Icons.Lock
  },

  // Creative
  {
    id: 16,
    title: "Generative Asset Pipeline",
    category: "Creative",
    description: "Automated creation of marketing variations (images, copy) for A/B testing.",
    stack: ["Stable Diffusion", "GPT-4"],
    impact: "Infinite Scale",
    icon: Icons.Palette
  },
  {
    id: 17,
    title: "Video Localization Dubbing",
    category: "Creative",
    description: "Translate video content into 20+ languages with lip-syncing and original voice cloning.",
    stack: ["LipSync", "TTS"],
    impact: "Global Reach",
    icon: Icons.Mic
  },
  {
    id: 25,
    title: "3D Product Generator",
    category: "Creative",
    description: "Generate photorealistic 3D models from 2D reference images for AR/VR experiences.",
    stack: ["NeRF", "Three.js"],
    impact: "Assets/Sec",
    icon: Icons.Cube
  }
];

const ServicesPage: React.FC<{ onConsult: () => void }> = ({ onConsult }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredServices, setFilteredServices] = useState(fullCatalog);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredServices(fullCatalog);
    } else {
      setFilteredServices(fullCatalog.filter(s => s.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <div className="relative w-full pt-32 md:pt-44 pb-24 flex flex-col items-center justify-start z-10 min-h-screen">
      
      {/* Header */}
      <div className="text-center px-4 mb-12 relative z-10 animate-fadeIn">
        <h1 className="font-sans font-extrabold text-5xl md:text-7xl leading-[1.1] text-black dark:text-white mb-6 transition-colors duration-500 tracking-tighter">
          The <span className="text-brand-purple">Grimoire</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-xl max-w-2xl mx-auto transition-colors duration-500">
          A comprehensive catalog of our generative capabilities across industries.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="relative z-20 w-full max-w-7xl px-4 mb-16 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 md:justify-center min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); playClick(); }}
              onMouseEnter={playHover}
              className={`px-6 py-2 rounded-full text-sm font-bold border transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-[0_0_20px_rgba(160,216,239,0.3)]' 
                  : 'bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="relative z-20 w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slideUp">
        {filteredServices.map((service) => (
          <div 
            key={service.id}
            className="group relative bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-8 hover:border-brand-blue/50 dark:hover:border-brand-blue/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
          >
            {/* Background Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-gray-50 dark:bg-white/10 rounded-xl flex items-center justify-center text-black dark:text-white group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border border-gray-200 dark:border-white/10 px-2 py-1 rounded-md">
                  {service.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-brand-blue transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 h-16 line-clamp-3">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {service.stack.map(tech => (
                  <span key={tech} className="text-[10px] font-mono bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex justify-between items-center">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Est. Impact</div>
                  <div className="text-brand-orange font-bold font-sans tracking-tight">{service.impact}</div>
                </div>
                <button 
                  onClick={onConsult}
                  className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400">No services found in this frequency.</p>
        </div>
      )}

      {/* CTA */}
      <div className="mt-24 px-6 relative z-20">
        <div className="bg-brand-blue/10 border border-brand-blue/20 rounded-3xl p-12 text-center max-w-3xl mx-auto">
           <h3 className="font-sans font-bold text-2xl md:text-3xl text-black dark:text-white mb-4 tracking-tight">Don't see your specific use case?</h3>
           <p className="text-gray-500 dark:text-gray-400 mb-8">
             We specialize in custom architecture. If you can imagine it, we can build the neural pathways for it.
           </p>
           <button 
             onClick={onConsult}
             className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
           >
             Speak to an Architect
           </button>
        </div>
      </div>

    </div>
  );
};

export default ServicesPage;
