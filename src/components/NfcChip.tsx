import React from 'react';

interface NfcChipProps {
  className?: string;
}

export const NfcChip: React.FC<NfcChipProps> = ({ className = "w-11 h-9" }) => {
  return (
    <div className={`relative ${className} shrink-0 select-none`}>
      <svg 
        viewBox="0 0 48 38" 
        className="w-full h-full drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Brushed Titanium Gold / Platinum Gradient */}
          <linearGradient id="chipBase" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="25%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="75%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>

          <linearGradient id="goldAccents" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>

          <linearGradient id="traceLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        {/* Base Chamfered Metal Chip Body */}
        <rect 
          x="1" 
          y="1" 
          width="46" 
          height="36" 
          rx="5" 
          fill="url(#chipBase)" 
          stroke="#475569" 
          strokeWidth="0.75"
        />

        {/* Microchip Contact Pads & Traces */}
        <rect 
          x="17" 
          y="12" 
          width="14" 
          height="14" 
          rx="2" 
          fill="#0a0c10" 
          stroke="#475569" 
          strokeWidth="0.5"
        />
        <circle cx="24" cy="19" r="3" fill="url(#goldAccents)" />

        {/* Circuit Isolation Lines */}
        <path d="M 1 12 H 17" stroke="url(#traceLine)" strokeWidth="0.8" />
        <path d="M 1 26 H 17" stroke="url(#traceLine)" strokeWidth="0.8" />
        
        <path d="M 31 12 H 47" stroke="url(#traceLine)" strokeWidth="0.8" />
        <path d="M 31 26 H 47" stroke="url(#traceLine)" strokeWidth="0.8" />

        <path d="M 24 1 V 12" stroke="url(#traceLine)" strokeWidth="0.8" />
        <path d="M 24 26 V 37" stroke="url(#traceLine)" strokeWidth="0.8" />

        {/* Outer Corner Ground Pins */}
        <circle cx="6" cy="6" r="1.2" fill="#334155" />
        <circle cx="42" cy="6" r="1.2" fill="#334155" />
        <circle cx="6" cy="32" r="1.2" fill="#334155" />
        <circle cx="42" cy="32" r="1.2" fill="#334155" />

        {/* Micro Antenna Radiating Waves */}
        <path 
          d="M 36 15 C 38 17 38 21 36 23" 
          stroke="#0f172a" 
          strokeWidth="0.9" 
          strokeLinecap="round" 
        />
        <path 
          d="M 39 13 C 42 16 42 22 39 25" 
          stroke="#0f172a" 
          strokeWidth="0.9" 
          strokeLinecap="round" 
        />
      </svg>
    </div>
  );
};
