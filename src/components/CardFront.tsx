import React from 'react';
import { TRAINER_DATA } from '../data/trainerData';
import { NfcChip } from './NfcChip';

export const CardFront: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between select-none text-white">

      {/* TOP: Status & NFC Chip — flat 2D */}
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

      {/* CENTER: Avatar + Identity — flat 2D, no translateZ */}
      <div className="flex flex-col items-center justify-center flex-1 py-3 gap-0">

        {/* Profile Avatar */}
        <div className="relative mb-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <img
              src="./trainer_avatar.jpg"
              alt={TRAINER_DATA.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          {/* Certified badge dot */}
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0d1117] flex items-center justify-center">
            <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 text-white fill-current">
              <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Name */}
        <h1
          className="font-normal tracking-tight text-white leading-none drop-shadow-[0_4px_24px_rgba(255,255,255,0.25)] mb-2 text-center"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(1.75rem, 7vw, 2.4rem)',
            fontStyle: 'italic',
          }}
        >
          {TRAINER_DATA.name}
        </h1>

        {/* CPDT-KA Badge Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono tracking-widest uppercase font-semibold mb-3 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
          style={{ fontSize: 'clamp(0.6rem, 2vw, 0.7rem)' }}>
          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
          [ CPDT-KA CERTIFIED TRAINER ]
        </div>

        {/* Specialties */}
        <div className="flex flex-col items-center gap-1 w-full px-1">
          <div className="font-mono tracking-wider text-white/90 uppercase leading-snug text-center"
            style={{ fontSize: 'clamp(0.62rem, 2.2vw, 0.72rem)' }}>
            Canine Behavior &amp; Aggression Specialist
          </div>
          <div className="font-mono tracking-wider text-white/70 uppercase leading-snug text-center"
            style={{ fontSize: 'clamp(0.58rem, 2vw, 0.67rem)' }}>
            Executive Protection &amp; Advanced K9 Command
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-white/15 my-1.5" />

          <div className="font-mono tracking-widest text-sky-400/90 uppercase"
            style={{ fontSize: 'clamp(0.58rem, 1.8vw, 0.65rem)' }}>
            Partner @ The Bark University
          </div>
          <div
            className="text-slate-400 tracking-wide mt-0.5 italic text-center"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(0.65rem, 2vw, 0.75rem)' }}
          >
            "{TRAINER_DATA.motto}"
          </div>
        </div>
      </div>

      {/* BOTTOM: Barcode + Tap hint — flat 2D */}
      <div className="flex flex-col items-center gap-1">
        <svg className="w-3/4 h-5 text-white/25" viewBox="0 0 200 30" preserveAspectRatio="none">
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
        <div className="font-mono tracking-widest text-white/35 uppercase"
          style={{ fontSize: 'clamp(0.5rem, 1.6vw, 0.6rem)' }}>
          [ TAP CARD TO FLIP // ACTIONS ]
        </div>
      </div>

    </div>
  );
};
