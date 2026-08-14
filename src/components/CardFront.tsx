import React from 'react';
import { TRAINER_DATA } from '../data/trainerData';
import { NfcChip } from './NfcChip';

export const CardFront: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between select-none relative z-10 text-white">
      
      {/* 1. Top Status & Telemetry Bar */}
      <div className="flex items-start justify-between w-full pt-0.5">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-white/80 tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#22c55e] animate-pulse" />
            <span>{TRAINER_DATA.telemetry.systemStatus}</span>
          </div>
          <div className="font-mono text-[8px] sm:text-[9px] text-sky-400/90 tracking-widest uppercase mt-0.5">
            {TRAINER_DATA.telemetry.clearanceLevel}
          </div>
        </div>

        <NfcChip className="w-8 h-6 sm:w-9 sm:h-6.5 shrink-0" />
      </div>

      {/* 2. Center Identity & Pure Typographic Hierarchy (Option A) */}
      <div className="text-center flex flex-col items-center justify-center my-auto py-2">
        
        {/* Commanding Large Editorial Serif Name */}
        <h1 
          className="font-serif italic text-[2.2rem] sm:text-[2.75rem] font-normal tracking-tight text-white leading-none drop-shadow-[0_4px_24px_rgba(255,255,255,0.25)] mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {TRAINER_DATA.name}
        </h1>

        {/* CPDT-KA Frosted Glass Badge Pill */}
        <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold mb-3 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          [ CPDT-KA CERTIFIED TRAINER ]
        </div>

        {/* The 2 Balanced Specialty Rows */}
        <div className="flex flex-col items-center gap-1.5 w-full px-2">
          <div className="font-mono text-[10px] sm:text-[11px] tracking-wider text-white/90 uppercase leading-snug">
            Canine Behavior & Aggression Specialist
          </div>

          <div className="font-mono text-[9.5px] sm:text-[10.5px] tracking-wider text-white/80 uppercase leading-snug">
            Executive Protection & Advanced K9 Command
          </div>

          {/* Official Partnership */}
          <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-sky-400/90 uppercase mt-1">
            Partner @ The Bark University
          </div>

          {/* Core Philosophy Motto */}
          <div className="font-serif italic text-[11px] sm:text-xs text-slate-400 tracking-wide mt-1">
            "{TRAINER_DATA.motto}"
          </div>
        </div>
      </div>

      {/* 3. Bottom Vector Barcode & Tap Cue */}
      <div className="flex flex-col justify-center items-center gap-1.5 pb-0.5">
        <svg className="w-3/4 h-6 text-white/35" viewBox="0 0 200 35" preserveAspectRatio="none">
          <rect x="0" y="0" width="4" height="35" fill="currentColor" />
          <rect x="8" y="0" width="2" height="35" fill="currentColor" />
          <rect x="14" y="0" width="6" height="35" fill="currentColor" />
          <rect x="24" y="0" width="2" height="35" fill="currentColor" />
          <rect x="30" y="0" width="8" height="35" fill="currentColor" />
          <rect x="42" y="0" width="2" height="35" fill="currentColor" />
          <rect x="48" y="0" width="4" height="35" fill="currentColor" />
          <rect x="56" y="0" width="10" height="35" fill="currentColor" />
          <rect x="70" y="0" width="2" height="35" fill="currentColor" />
          <rect x="76" y="0" width="4" height="35" fill="currentColor" />
          <rect x="84" y="0" width="6" height="35" fill="currentColor" />
          <rect x="94" y="0" width="2" height="35" fill="currentColor" />
          <rect x="100" y="0" width="8" height="35" fill="currentColor" />
          <rect x="112" y="0" width="2" height="35" fill="currentColor" />
          <rect x="118" y="0" width="4" height="35" fill="currentColor" />
          <rect x="126" y="0" width="12" height="35" fill="currentColor" />
          <rect x="142" y="0" width="2" height="35" fill="currentColor" />
          <rect x="148" y="0" width="4" height="35" fill="currentColor" />
          <rect x="156" y="0" width="2" height="35" fill="currentColor" />
          <rect x="162" y="0" width="8" height="35" fill="currentColor" />
          <rect x="174" y="0" width="2" height="35" fill="currentColor" />
          <rect x="180" y="0" width="6" height="35" fill="currentColor" />
          <rect x="190" y="0" width="2" height="35" fill="currentColor" />
          <rect x="196" y="0" width="4" height="35" fill="currentColor" />
        </svg>

        <div className="font-mono text-[8.5px] sm:text-[9.5px] tracking-widest text-white/45 uppercase">
          [ TAP CARD TO FLIP // ACTIONS ]
        </div>
      </div>
    </div>
  );
};
