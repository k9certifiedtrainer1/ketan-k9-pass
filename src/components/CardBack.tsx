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
      confetti({ 
        particleCount: 40, 
        spread: 65, 
        origin: { y: 0.6 }, 
        colors: ['#d4af37', '#f59e0b', '#ffffff', '#e2e8f0'], 
        ticks: 160, 
        disableForReducedMotion: true 
      });
    } catch { /* noop */ }
    setTimeout(() => setVcardSaved(false), 3000);
  };

  return (
    // NO onClick on this container — zero flip collision on back face
    <div className="w-full h-full flex flex-col justify-between select-none text-white">

      {/* Header — Clean DIRECT ACCESS in Faded Silver */}
      <div className="text-center pt-0.5">
        <div 
          className="font-mono text-white/60 uppercase font-semibold"
          style={{ fontSize: 'clamp(0.6rem, 2vw, 0.72rem)', letterSpacing: '0.22em' }}
        >
          DIRECT ACCESS INTERFACE
        </div>
        <div className="w-full h-px bg-[#d4af37]/20 mt-2" />
      </div>

      {/* Primary Action: SAVE CONTACT PASS — Solid Matte Titanium with Tactical Gold Border */}
      <button
        type="button"
        onClick={handleSaveContact}
        className="w-full flex items-center justify-center font-mono font-bold tracking-wider uppercase rounded-xl transition-all active:scale-[0.97] cursor-pointer"
        style={{
          padding: '10.5px 12px',
          fontSize: 'clamp(0.62rem, 2.2vw, 0.72rem)',
          background: 'linear-gradient(135deg, rgba(212,175,55,0.14) 0%, rgba(10,10,12,0.9) 100%)',
          border: '1px solid #d4af37',
          color: '#ffffff',
          boxShadow: '0 0 16px rgba(212,175,55,0.15)',
          letterSpacing: '0.08em',
        }}
      >
        <span className="text-[#d4af37] mr-1.5 font-bold">★</span>
        {vcardSaved ? 'CONTACT SAVED TO PHONE' : 'SAVE CONTACT PASS (.VCF)'}
      </button>

      {/* Secondary Action: ADD TO WALLET — Frosted Titanium Glass */}
      <button
        type="button"
        onClick={() => { setTimeout(() => playButtonTapSound(), 0); onOpenWallet(); }}
        className="w-full flex items-center justify-center font-mono font-bold tracking-wider uppercase rounded-xl transition-all active:scale-[0.97] cursor-pointer"
        style={{
          padding: '10.5px 12px',
          fontSize: 'clamp(0.62rem, 2.2vw, 0.72rem)',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.16)',
          color: '#ffffff',
          letterSpacing: '0.08em',
        }}
      >
        ADD TO APPLE / GOOGLE WALLET
      </button>

      {/* 2x2 Grid — Pure Monochromatic Luxury (Crisp White + Faded Silver) */}
      <div className="grid grid-cols-2" style={{ gap: '8px' }}>
        <a
          href={TRAINER_DATA.contact.whatsappDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setTimeout(() => playButtonTapSound(), 0)}
          className="flex flex-col items-start justify-center rounded-xl border border-white/12 transition-all active:scale-[0.97] hover:border-[#d4af37]/40 hover:bg-white/[0.06] cursor-pointer no-underline"
          style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.035)', textDecoration: 'none' }}
        >
          <span className="font-mono font-medium text-white/50 uppercase" style={{ fontSize: 'clamp(0.55rem, 1.8vw, 0.62rem)', letterSpacing: '0.1em' }}>WHATSAPP</span>
          <span className="font-mono font-semibold text-white mt-0.5" style={{ fontSize: 'clamp(0.6rem, 2vw, 0.7rem)' }}>+91 70965 07017</span>
        </a>

        <a
          href={TRAINER_DATA.contact.telUrl}
          onClick={() => setTimeout(() => playButtonTapSound(), 0)}
          className="flex flex-col items-start justify-center rounded-xl border border-white/12 transition-all active:scale-[0.97] hover:border-[#d4af37]/40 hover:bg-white/[0.06] cursor-pointer no-underline"
          style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.035)', textDecoration: 'none' }}
        >
          <span className="font-mono font-medium text-white/50 uppercase" style={{ fontSize: 'clamp(0.55rem, 1.8vw, 0.62rem)', letterSpacing: '0.1em' }}>CALL DIRECT</span>
          <span className="font-mono font-semibold text-white mt-0.5" style={{ fontSize: 'clamp(0.6rem, 2vw, 0.7rem)' }}>Priority Line</span>
        </a>

        <a
          href={TRAINER_DATA.contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setTimeout(() => playButtonTapSound(), 0)}
          className="flex flex-col items-start justify-center rounded-xl border border-white/12 transition-all active:scale-[0.97] hover:border-[#d4af37]/40 hover:bg-white/[0.06] cursor-pointer no-underline"
          style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.035)', textDecoration: 'none' }}
        >
          <span className="font-mono font-medium text-white/50 uppercase" style={{ fontSize: 'clamp(0.55rem, 1.8vw, 0.62rem)', letterSpacing: '0.1em' }}>INSTAGRAM</span>
          <span className="font-mono font-semibold text-white mt-0.5" style={{ fontSize: 'clamp(0.6rem, 2vw, 0.7rem)' }}>@k9certifiedtrainer</span>
        </a>

        <a
          href={TRAINER_DATA.partnership.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setTimeout(() => playButtonTapSound(), 0)}
          className="flex flex-col items-start justify-center rounded-xl border border-white/12 transition-all active:scale-[0.97] hover:border-[#d4af37]/40 hover:bg-white/[0.06] cursor-pointer no-underline"
          style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.035)', textDecoration: 'none' }}
        >
          <span className="font-mono font-medium text-white/50 uppercase" style={{ fontSize: 'clamp(0.55rem, 1.8vw, 0.62rem)', letterSpacing: '0.1em' }}>THE BARK UNIV</span>
          <span className="font-mono font-semibold text-white mt-0.5" style={{ fontSize: 'clamp(0.6rem, 2vw, 0.7rem)' }}>Official Partner</span>
        </a>
      </div>

      {/* Bottom CTA: BOOK PRIVATE CONSULTATION — Tactical Gold Gradient Sheen */}
      <button
        type="button"
        onClick={() => { setTimeout(() => playButtonTapSound(), 0); onOpenBooking(); }}
        className="w-full flex items-center justify-between rounded-xl transition-all active:scale-[0.97] cursor-pointer"
        style={{
          padding: '10px 14px',
          background: 'linear-gradient(135deg, rgba(212,175,55,0.16) 0%, rgba(212,175,55,0.05) 100%)',
          border: '1px solid rgba(212,175,55,0.45)',
          boxShadow: '0 0 16px rgba(212,175,55,0.1)',
        }}
      >
        <span 
          className="font-mono font-bold text-[#d4af37] uppercase text-left tracking-wider" 
          style={{ fontSize: 'clamp(0.6rem, 2vw, 0.7rem)', letterSpacing: '0.08em' }}
        >
          BOOK PRIVATE CONSULTATION
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse flex-shrink-0 ml-2 shadow-[0_0_8px_#d4af37]" />
      </button>

      {/* Flip Back — Full-Width Tap Zone */}
      <button
        type="button"
        onClick={() => { playCardFlipSound(); onFlip(); }}
        className="w-full flex items-center justify-between rounded-xl border border-white/10 hover:border-[#d4af37]/35 hover:bg-white/[0.04] transition-all active:scale-[0.98] cursor-pointer group"
        style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.02)', marginTop: '2px' }}
      >
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-white/50 group-hover:text-white transition-colors"
            style={{ fontSize: '0.85rem' }}
          >
            ←
          </span>
          <span
            className="font-mono text-white/60 group-hover:text-white transition-colors uppercase tracking-widest"
            style={{ fontSize: 'clamp(0.55rem, 1.8vw, 0.63rem)', letterSpacing: '0.14em' }}
          >
            FLIP TO FRONT
          </span>
        </div>

        <span
          className="font-mono text-white/40 uppercase"
          style={{ fontSize: 'clamp(0.46rem, 1.4vw, 0.54rem)', letterSpacing: '0.12em' }}
        >
          SECURE // THEBARKUNIV.COM
        </span>
      </button>

    </div>
  );
};
