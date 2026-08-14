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

export const CardBack: React.FC<CardBackProps> = ({
  onFlip,
  onOpenBooking,
  onOpenWallet,
}) => {
  const [vcardSaved, setVcardSaved] = useState(false);

  const handleSaveContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTimeout(() => playSuccessChime(), 0);
    downloadVCard(TRAINER_DATA);
    setVcardSaved(true);

    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#10b981', '#38bdf8', '#ffffff'],
        ticks: 150,
        disableForReducedMotion: true,
      });
    } catch {
      // Fallback
    }

    setTimeout(() => {
      setVcardSaved(false);
    }, 3000);
  };

  const handleWalletClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTimeout(() => playButtonTapSound(), 0);
    onOpenWallet();
  };

  const handleBookingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTimeout(() => playButtonTapSound(), 0);
    onOpenBooking();
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center select-none relative z-20 text-white py-0.5">
      
      {/* 1. Header Bar with Flip Back Button & Telemetry Code */}
      <div style={{ transform: 'translateZ(30px)' }} className="flex items-center justify-between w-full border-b border-white/10 pb-1.5 shrink-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            playCardFlipSound();
            onFlip();
          }}
          className="flex items-center gap-1 font-mono text-[9px] sm:text-[10px] tracking-wider text-slate-300 hover:text-emerald-400 bg-white/5 hover:bg-white/10 border border-white/10 px-2 py-0.5 rounded-lg transition-all active:scale-95 cursor-pointer"
        >
          <span>[ ← FLIP TO FRONT ]</span>
        </button>

        <div className="font-mono text-[8.5px] sm:text-[9.5px] tracking-widest text-sky-400 uppercase font-semibold">
          SECURITY: KP-70965 // K9
        </div>
      </div>

      {/* 2. Christopher Nolan High-Density Boxy Action Deck (Zero Empty Dead Space) */}
      <div className="w-full flex flex-col gap-2 my-auto py-1">
        
        {/* Tier 1 Primary: Save Contact .VCF Box */}
        <button
          type="button"
          onClick={handleSaveContact}
          className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 rounded-xl p-2.5 sm:p-3 text-left transition-all active:scale-[0.98] cursor-pointer shadow-[0_4px_20px_rgba(16,185,129,0.15)] group"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wider text-emerald-400 uppercase group-hover:text-emerald-300">
              {vcardSaved ? '[ CONTACT SAVED TO PHONE ]' : '[ 01 ] SAVE CONTACT PASS (.VCF)'}
            </span>
            <span className="font-mono text-[9px] text-emerald-400/70 border border-emerald-500/30 px-1.5 py-0.5 rounded bg-emerald-950/40">
              1-TAP
            </span>
          </div>
          <p className="font-mono text-[8px] sm:text-[9px] text-slate-400 mt-0.5 tracking-wide">
            Import full CPDT-KA credentials directly into phonebook
          </p>
        </button>

        {/* Tier 1 Secondary: Digital Wallet Box */}
        <button
          type="button"
          onClick={handleWalletClick}
          className="w-full bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/40 rounded-xl p-2.5 sm:p-3 text-left transition-all active:scale-[0.98] cursor-pointer shadow-[0_4px_20px_rgba(56,189,248,0.12)] group"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wider text-sky-400 uppercase group-hover:text-sky-300">
              [ 02 ] ADD TO APPLE & GOOGLE WALLET
            </span>
            <span className="font-mono text-[9px] text-sky-400/70 border border-sky-500/30 px-1.5 py-0.5 rounded bg-sky-950/40">
              PASS
            </span>
          </div>
          <p className="font-mono text-[8px] sm:text-[9px] text-slate-400 mt-0.5 tracking-wide">
            Access digital pass & verified trainer credentials
          </p>
        </button>

        {/* Tier 2: 2x2 Tactical Communication Matrix */}
        <div className="grid grid-cols-2 gap-2">
          {/* WhatsApp Direct */}
          <a
            href={TRAINER_DATA.contact.whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setTimeout(() => playButtonTapSound(), 0)}
            className="bg-white/[0.04] hover:bg-white/10 border border-white/15 hover:border-emerald-400/50 rounded-xl p-2 sm:p-2.5 transition-all text-left group active:scale-[0.98] cursor-pointer"
          >
            <div className="font-mono text-[9.5px] sm:text-[10.5px] font-bold text-white group-hover:text-emerald-400 tracking-wider">
              [ WHATSAPP ]
            </div>
            <div className="font-mono text-[8px] sm:text-[8.5px] text-emerald-400/80 mt-0.5">
              +91 70965 07017
            </div>
          </a>

          {/* Direct Phone Call */}
          <a
            href={TRAINER_DATA.contact.telUrl}
            onClick={() => setTimeout(() => playButtonTapSound(), 0)}
            className="bg-white/[0.04] hover:bg-white/10 border border-white/15 hover:border-sky-400/50 rounded-xl p-2 sm:p-2.5 transition-all text-left group active:scale-[0.98] cursor-pointer"
          >
            <div className="font-mono text-[9.5px] sm:text-[10.5px] font-bold text-white group-hover:text-sky-400 tracking-wider">
              [ CALL DIRECT ]
            </div>
            <div className="font-mono text-[8px] sm:text-[8.5px] text-slate-400 mt-0.5">
              Priority Phone Line
            </div>
          </a>

          {/* Instagram Profile */}
          <a
            href={TRAINER_DATA.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setTimeout(() => playButtonTapSound(), 0)}
            className="bg-white/[0.04] hover:bg-white/10 border border-white/15 hover:border-pink-400/50 rounded-xl p-2 sm:p-2.5 transition-all text-left group active:scale-[0.98] cursor-pointer"
          >
            <div className="font-mono text-[9.5px] sm:text-[10.5px] font-bold text-white group-hover:text-pink-400 tracking-wider">
              [ INSTAGRAM ]
            </div>
            <div className="font-mono text-[8px] sm:text-[8.5px] text-slate-400 mt-0.5">
              {TRAINER_DATA.contact.instagramHandle}
            </div>
          </a>

          {/* Partner: The Bark University */}
          <a
            href={TRAINER_DATA.partnership.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setTimeout(() => playButtonTapSound(), 0)}
            className="bg-white/[0.04] hover:bg-white/10 border border-white/15 hover:border-amber-400/50 rounded-xl p-2 sm:p-2.5 transition-all text-left group active:scale-[0.98] cursor-pointer"
          >
            <div className="font-mono text-[9.5px] sm:text-[10.5px] font-bold text-white group-hover:text-amber-400 tracking-wider">
              [ THE BARK UNIV ]
            </div>
            <div className="font-mono text-[8px] sm:text-[8.5px] text-slate-400 mt-0.5">
              Official Partner Link
            </div>
          </a>
        </div>

        {/* Tier 3: Inquire Consultation Box */}
        <button
          type="button"
          onClick={handleBookingClick}
          className="w-full bg-gradient-to-r from-emerald-950/40 to-teal-950/30 hover:from-emerald-900/50 hover:to-teal-900/40 border border-emerald-500/40 rounded-xl p-2 sm:p-2.5 text-left transition-all active:scale-[0.98] cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9.5px] sm:text-[10.5px] font-bold tracking-wider text-emerald-300 uppercase group-hover:text-emerald-200">
              [ BOOK TRAINING CONSULTATION // VIP INQUIRY ]
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="font-mono text-[8px] sm:text-[8.5px] text-slate-400 mt-0.5 tracking-wide">
            Behavior Fix · Aggression Rehab · Guard Command
          </p>
        </button>
      </div>

      {/* 3. Bottom Security Subtitle Stamp */}
      <div style={{ transform: 'translateZ(25px)' }} className="text-center w-full pt-1 shrink-0">
        <div className="font-mono text-[7.5px] sm:text-[8.5px] tracking-widest text-slate-400 uppercase">
          NFC UID: KP-8849-CPDTKA // THEBARKUNIVERSITY.COM
        </div>
      </div>
    </div>
  );
};
