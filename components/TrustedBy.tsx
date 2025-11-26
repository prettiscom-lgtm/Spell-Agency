import React from 'react';

const logos = [
  "Stark Corp", "Wayne Ent", "Cyberdyne", "Massive Dynamic", "Hooli", "Acme Inc", "Globex", "Soylent", "Umbrella", "InGen"
];

const TrustedBy: React.FC = () => {
  return (
    <div className="w-full overflow-hidden border-b border-dashed border-gray-200 py-8 bg-white/50 backdrop-blur-sm">
      <div className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Trusted by next-gen companies</div>
      <div className="relative flex w-full overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {/* Double the list for seamless loop */}
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <span 
              key={index} 
              className="mx-8 text-xl md:text-2xl font-pixel text-gray-300 hover:text-gray-500 transition-colors cursor-default select-none"
            >
              {logo}
            </span>
          ))}
        </div>
        
        {/* Fade edges */}
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
      </div>
    </div>
  );
};

export default TrustedBy;