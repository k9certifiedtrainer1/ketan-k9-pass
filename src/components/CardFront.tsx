import React from 'react';
import { TRAINER_DATA } from '../data/trainerData';
import { NfcChip } from './NfcChip';

export const CardFront: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between select-none text-white">

      {/* TOP: Status & NFC Chip — Flat 2D */}
      <div className="flex items-start justify-between w-full">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-white/80 tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#d4af37] animate-pulse flex-shrink-0" />
            <span className="text-white/85 font-medium">{TRAINER_DATA.telemetry.systemStatus}</span>
          </div>
          <div className="font-mono text-[8px] sm:text-[9px] text-[#d4af37]/90 tracking-widest uppercase mt-0.5 font-semibold">
            {TRAINER_DATA.telemetry.clearanceLevel}
          </div>
        </div>
        <NfcChip className="w-8 h-6 sm:w-9 sm:h-7 flex-shrink-0" />
      </div>

      {/* CENTER: Avatar + Prestigious Identity — Flat 2D */}
      <div className="flex flex-col items-center justify-center flex-1 py-3">

        {/* Profile Avatar with Tactical Gold Chamfered Ring */}
        <div className="relative mb-3.5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-[1.5px] border-[#d4af37] shadow-[0_0_24px_rgba(212,175,55,0.25)] bg-[#0f1014]">
            <img
              src="./trainer_avatar.jpg"
              alt={TRAINER_DATA.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Name — Commanding Playfair Display Italic */}
        <h1
          className="font-normal tracking-tight text-white leading-none drop-shadow-[0_4px_24px_rgba(255,255,255,0.25)] mb-2.5 text-center"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(1.85rem, 7.5vw, 2.5rem)',
            fontStyle: 'italic',
          }}
        >
          {TRAINER_DATA.name}
        </h1>

        {/* US Certified Dog Trainer Badge Pill — Pure Tactical Gold */}
        <div 
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/40 text-[#d4af37] font-mono tracking-widest uppercase font-semibold mb-3 shadow-[0_0_15px_rgba(212,175,55,0.12)]"
          style={{ fontSize: 'clamp(0.6rem, 2vw, 0.7rem)', letterSpacing: '0.14em' }}
        >
          <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
          {TRAINER_DATA.credentials}
        </div>

        {/* Specialties & Authority */}
        <div className="flex flex-col items-center gap-1.5 w-full px-1">
          <div 
            className="font-mono tracking-wider text-white uppercase leading-snug text-center font-medium"
            style={{ fontSize: 'clamp(0.64rem, 2.2vw, 0.74rem)', letterSpacing: '0.08em' }}
          >
            Canine Behavior &amp; Aggression Specialist
          </div>
          <div 
            className="font-mono tracking-wider text-white/75 uppercase leading-snug text-center"
            style={{ fontSize: 'clamp(0.58rem, 2vw, 0.68rem)', letterSpacing: '0.08em' }}
          >
            Executive &amp; Advanced K9 Command
          </div>

          {/* Thin Hairline Divider */}
          <div className="w-16 h-px bg-[#d4af37]/25 my-1.5" />

          {/* Partnership & Philosophy */}
          <div 
            className="font-mono tracking-widest text-[#d4af37]/90 uppercase font-semibold"
            style={{ fontSize: 'clamp(0.58rem, 1.8vw, 0.65rem)', letterSpacing: '0.12em' }}
          >
            Partner @ The Bark University
          </div>
          <div
            className="text-slate-300 tracking-wide mt-0.5 italic text-center"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(0.68rem, 2vw, 0.78rem)' }}
          >
            "{TRAINER_DATA.motto}"
          </div>
        </div>
      </div>

      {/* BOTTOM: Pure Luxury Flip Indicator (No Barcodes) — Flat 2D */}
      <div className="flex flex-col items-center pb-0.5">
        <div 
          className="font-mono tracking-widest text-white/40 uppercase transition-colors"
          style={{ fontSize: 'clamp(0.52rem, 1.6vw, 0.62rem)', letterSpacing: '0.2em' }}
        >
          TAP CARD TO FLIP // DIRECT ACCESS
        </div>
      </div>

    </div>
  );
};
