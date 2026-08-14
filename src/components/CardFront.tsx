import React from 'react';
import { TRAINER_DATA } from '../data/trainerData';
import { NfcChip } from './NfcChip';

export const CardFront: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between select-none text-white">
      
      {/* Top Status Bar - NO translateZ */}
      <div className="flex items-start justify-between w-full">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-white/80 tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#22c55e] animate-pulse flex-shrink-0" />
            <span>{TRAINER_DATA.telemetry.systemStatus}</span>
          </div>
          <div className="font-mono text-[8px] sm:text-[9px] text-sky-400/90 tracking-widest uppercase mt-0.5">
            {TRAINER_DATA.telemetry.clearanceLevel}
          </div>
        </div>
        <NfcChip className="w-8 h-6 sm:w-9 sm:h-7 flex-shrink-0" />
      </div>

      {/* Center Identity - NO translateZ */}
      <div className="text-center flex flex-col items-center justify-center flex-1 py-4">
        <h1
          className="font-serif italic font-normal tracking-tight text-white leading-none drop-shadow-[0_4px_24px_rgba(255,255,255,0.25)] mb-3"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2rem, 8vw, 2.8rem)',
          }}
        >
          {TRAINER_DATA.name}
        </h1>

        <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold mb-4 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          [ CPDT-KA CERTIFIED TRAINER ]
        </div>

        <div className="flex flex-col items-center gap-1.5 w-full px-2">
          <div className="font-mono text-[10px] sm:text-[11px] tracking-wider text-white/90 uppercase leading-snug text-center">
            Canine Behavior &amp; Aggression Specialist
          </div>
          <div className="font-mono text-[9.5px] sm:text-[10.5px] tracking-wider text-white/80 uppercase leading-snug text-center">
            Executive Protection &amp; Advanced K9 Command
          </div>
          <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-sky-400/90 uppercase mt-1">
            Partner @ The Bark University
          </div>
          <div
            className="text-[11px] sm:text-xs text-slate-400 tracking-wide mt-1 italic"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            "{TRAINER_DATA.motto}"
          </div>
        </div>
      </div>

      {/* Bottom Barcode - NO translateZ */}
      <div className="flex flex-col items-center gap-1.5">
        <svg className="w-3/4 h-5 text-white/30" viewBox="0 0 200 30" preserveAspectRatio="none">
          <rect x="0"   y="0" width="4"  height="30" fill="currentColor" />
          <rect x="8"   y="0" width="2"  height="30" fill="currentColor" />
          <rect x="14"  y="0" width="6"  height="30" fill="currentColor" />
          <rect x="24"  y="0" width="2"  height="30" fill="currentColor" />
          <rect x="30"  y="0" width="8"  height="30" fill="currentColor" />
          <rect x="42"  y="0" width="2"  height="30" fill="currentColor" />
          <rect x="48"  y="0" width="4"  height="30" fill="currentColor" />
          <rect x="56"  y="0" width="10" height="30" fill="currentColor" />
          <rect x="70"  y="0" width="2"  height="30" fill="currentColor" />
          <rect x="76"  y="0" width="4"  height="30" fill="currentColor" />
          <rect x="84"  y="0" width="6"  height="30" fill="currentColor" />
          <rect x="94"  y="0" width="2"  height="30" fill="currentColor" />
          <rect x="100" y="0" width="8"  height="30" fill="currentColor" />
          <rect x="112" y="0" width="2"  height="30" fill="currentColor" />
          <rect x="118" y="0" width="4"  height="30" fill="currentColor" />
          <rect x="126" y="0" width="12" height="30" fill="currentColor" />
          <rect x="142" y="0" width="2"  height="30" fill="currentColor" />
          <rect x="148" y="0" width="4"  height="30" fill="currentColor" />
          <rect x="156" y="0" width="2"  height="30" fill="currentColor" />
          <rect x="162" y="0" width="8"  height="30" fill="currentColor" />
          <rect x="174" y="0" width="2"  height="30" fill="currentColor" />
          <rect x="180" y="0" width="6"  height="30" fill="currentColor" />
          <rect x="190" y="0" width="2"  height="30" fill="currentColor" />
          <rect x="196" y="0" width="4"  height="30" fill="currentColor" />
        </svg>
        <div className="font-mono text-[8px] sm:text-[9px] tracking-widest text-white/40 uppercase">
          [ TAP CARD TO FLIP // ACTIONS ]
        </div>
      </div>
    </div>
  );
};
