import React from 'react';

export const BackgroundOrbs: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#020204]">
      {/* Radial Mesh Lighting */}
      <div 
        className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[550px] rounded-full blur-[140px] opacity-25 animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, rgba(148, 163, 184, 0.4) 0%, rgba(56, 189, 248, 0.15) 45%, rgba(2, 2, 4, 0) 70%)'
        }}
      />
      
      <div 
        className="absolute top-[45%] -left-[10%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(2, 2, 4, 0) 70%)'
        }}
      />

      <div 
        className="absolute -bottom-[15%] -right-[10%] w-[550px] h-[550px] rounded-full blur-[160px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(2, 2, 4, 0) 70%)'
        }}
      />

      {/* Subtle Obsidian Carbon Micro-Grid Overlay */}
      <div className="absolute inset-0 bg-carbon-texture opacity-35" />
      
      {/* Top Subtle Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
    </div>
  );
};
