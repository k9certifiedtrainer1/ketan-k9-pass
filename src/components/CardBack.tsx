import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { TRAINER_DATA } from '../data/trainerData';
import { downloadVCard } from '../utils/vcardGenerator';
import { playButtonTapSound, playCardFlipSound, playSuccessChime } from '../utils/soundEffects';

interface CardBackProps {
  onFlip: () => void;
  onOpenBooking: () => void;
  onOpenWallet: () => void;
}

export const CardBack: React.FC<CardBackProps> = ({ onFlip, onOpenBooking, onOpenWallet }) => {
  const [vcardSaved, setVcardSaved] = useState(false);

  const handleSaveContact = () => {
    setTimeout(() => playSuccessChime(), 0);
    downloadVCard(TRAINER_DATA);
    setVcardSaved(true);
    try {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 }, colors: ['#10b981', '#38bdf8', '#ffffff'], ticks: 150, disableForReducedMotion: true });
    } catch { /* noop */ }
    setTimeout(() => setVcardSaved(false), 3000);
  };

  return (
    // NO onClick on this container — zero flip risk on back face
    <div className="w-full h-full flex flex-col select-none text-white" style={{ gap: '10px' }}>

      {/* Header — clean centered like miteshshah.xyz */}
      <div className="text-center pt-1">
        <div className="font-mono text-[9px] sm:text-[11px] tracking-[0.18em] text-sky-400 uppercase font-semibold">
          EXECUTIVE CONTACT INTERFACE
        </div>
        <div className="w-full h-px bg-white/10 mt-2" />
      </div>

      {/* Save Contact — plain button, no translateZ */}
      <button
        type="button"
        onClick={handleSaveContact}
        className="w-full flex items-center justify-center font-mono font-bold tracking-wider uppercase rounded-lg border transition-all active:scale-[0.97] cursor-pointer"
        style={{
          padding: '10px 12px',
          fontSize: 'clamp(0.6rem, 2.2vw, 0.72rem)',
          background: 'rgba(34,197,94,0.12)',
          border: '1px solid #22c55e',
          color: '#22c55e',
        }}
      >
        {vcardSaved ? '[ CONTACT SAVED TO PHONE ]' : '[ SAVE CONTACT PASS (.VCF) ]'}
      </button>

      {/* Add to Wallet — plain button, no translateZ */}
      <button
        type="button"
        onClick={() => { setTimeout(() => playButtonTapSound(), 0); onOpenWallet(); }}
        className="w-full flex items-center justify-center font-mono font-bold tracking-wider uppercase rounded-lg border transition-all active:scale-[0.97] cursor-pointer"
        style={{
          padding: '10px 12px',
          fontSize: 'clamp(0.6rem, 2.2vw, 0.72rem)',
          background: 'rgba(56,189,248,0.12)',
          border: '1px solid #38bdf8',
          color: '#38bdf8',
        }}
      >
        [ ADD TO APPLE / GOOGLE WALLET ]
      </button>

      {/* 2x2 Link Grid — pure native <a> tags, no translateZ */}
      <div className="grid grid-cols-2" style={{ gap: '8px' }}>
        <a
          href={TRAINER_DATA.contact.whatsappDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setTimeout(() => playButtonTapSound(), 0)}
          className="flex flex-col items-start justify-center rounded-lg border border-white/15 transition-all active:scale-[0.97] cursor-pointer no-underline"
          style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.04)', textDecoration: 'none' }}
        >
          <span className="font-mono font-bold text-white uppercase" style={{ fontSize: 'clamp(0.6rem, 2vw, 0.7rem)', letterSpacing: '0.06em' }}>WHATSAPP</span>
          <span className="font-mono text-emerald-400/80 mt-0.5" style={{ fontSize: 'clamp(0.55rem, 1.6vw, 0.62rem)' }}>+91 70965 07017</span>
        </a>

        <a
          href={TRAINER_DATA.contact.telUrl}
          onClick={() => setTimeout(() => playButtonTapSound(), 0)}
          className="flex flex-col items-start justify-center rounded-lg border border-white/15 transition-all active:scale-[0.97] cursor-pointer no-underline"
          style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.04)', textDecoration: 'none' }}
        >
          <span className="font-mono font-bold text-white uppercase" style={{ fontSize: 'clamp(0.6rem, 2vw, 0.7rem)', letterSpacing: '0.06em' }}>CALL DIRECT</span>
          <span className="font-mono text-slate-400 mt-0.5" style={{ fontSize: 'clamp(0.55rem, 1.6vw, 0.62rem)' }}>Priority Line</span>
        </a>

        <a
          href={TRAINER_DATA.contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setTimeout(() => playButtonTapSound(), 0)}
          className="flex flex-col items-start justify-center rounded-lg border border-white/15 transition-all active:scale-[0.97] cursor-pointer no-underline"
          style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.04)', textDecoration: 'none' }}
        >
          <span className="font-mono font-bold text-white uppercase" style={{ fontSize: 'clamp(0.6rem, 2vw, 0.7rem)', letterSpacing: '0.06em' }}>INSTAGRAM</span>
          <span className="font-mono text-pink-400/80 mt-0.5" style={{ fontSize: 'clamp(0.55rem, 1.6vw, 0.62rem)' }}>@k9certifiedtrainer</span>
        </a>

        <a
          href={TRAINER_DATA.partnership.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setTimeout(() => playButtonTapSound(), 0)}
          className="flex flex-col items-start justify-center rounded-lg border border-white/15 transition-all active:scale-[0.97] cursor-pointer no-underline"
          style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.04)', textDecoration: 'none' }}
        >
          <span className="font-mono font-bold text-white uppercase" style={{ fontSize: 'clamp(0.6rem, 2vw, 0.7rem)', letterSpacing: '0.06em' }}>THE BARK UNIV</span>
          <span className="font-mono text-amber-400/80 mt-0.5" style={{ fontSize: 'clamp(0.55rem, 1.6vw, 0.62rem)' }}>Official Partner</span>
        </a>
      </div>

      {/* Inquire Training — plain button, no translateZ */}
      <button
        type="button"
        onClick={() => { setTimeout(() => playButtonTapSound(), 0); onOpenBooking(); }}
        className="w-full flex items-center justify-between rounded-lg border border-emerald-500/35 transition-all active:scale-[0.97] cursor-pointer"
        style={{
          padding: '10px 14px',
          background: 'rgba(16,185,129,0.08)',
        }}
      >
        <span className="font-mono font-bold text-emerald-300 uppercase text-left" style={{ fontSize: 'clamp(0.58rem, 2vw, 0.68rem)', letterSpacing: '0.06em' }}>
          [ INQUIRE TRAINING // BOOK CONSULTATION ]
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0 ml-2" />
      </button>

      {/* Flip Back — explicit flip button */}
      <div className="flex items-center justify-between pt-1 border-t border-white/10">
        <button
          type="button"
          onClick={() => { playCardFlipSound(); onFlip(); }}
          className="font-mono text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 active:scale-95"
          style={{ fontSize: 'clamp(0.55rem, 1.8vw, 0.63rem)', letterSpacing: '0.1em', background: 'none', border: 'none', padding: 0 }}
        >
          ← FLIP TO FRONT
        </button>
        <div className="font-mono text-slate-500 uppercase text-right" style={{ fontSize: 'clamp(0.48rem, 1.5vw, 0.56rem)', letterSpacing: '0.1em' }}>
          SECURE // THEBARKUNIV.COM
        </div>
      </div>

    </div>
  );
};
