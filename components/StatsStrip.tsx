import React from 'react';

const stats = [
  { label: "REVENUE GENERATED", value: "$45,201,090", color: "text-green-500" },
  { label: "HOURS SAVED", value: "142,000+", color: "text-brand-blue" },
  { label: "PROCESSES AUTOMATED", value: "842", color: "text-brand-orange" },
  { label: "AVG ROI", value: "480%", color: "text-brand-purple" },
  { label: "CLIENT RETENTION", value: "98%", color: "text-white" },
  { label: "UPTIME", value: "99.99%", color: "text-green-500" },
  { label: "SECURITY", value: "AES-256", color: "text-brand-yellow" },
];

const StatsStrip: React.FC = () => {
  return (
    <div className="w-full max-w-[95%] mx-auto bg-black/80 backdrop-blur-md rounded-full border border-white/10 shadow-lg shadow-brand-blue/5 overflow-hidden py-3 relative z-30 transform hover:scale-[1.01] transition-transform duration-500">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...stats, ...stats, ...stats].map((stat, idx) => (
          <div key={idx} className="flex items-center mx-8 gap-3">
             <div className={`w-1.5 h-1.5 rounded-full ${stat.color === 'text-green-500' ? 'bg-green-500 animate-pulse' : 'bg-gray-700'}`}></div>
             <span className="text-[10px] font-bold text-gray-500 tracking-widest font-mono">{stat.label}</span>
             <span className={`text-sm font-pixel font-bold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>
      
      {/* High-end gradients for fade effect */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none rounded-l-full"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none rounded-r-full"></div>
    </div>
  );
};

export default StatsStrip;