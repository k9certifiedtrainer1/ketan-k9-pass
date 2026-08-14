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
    e.preventDefault();
    playSuccessChime();
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
    e.preventDefault();
    playButtonTapSound();
    onOpenWallet();
  };

  const handleBookingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    playButtonTapSound();
    onOpenBooking();
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center select-none relative z-20 text-white pointer-events-auto">
      
      {/* 1. Header with Flip Back Button (Elevated 3D) */}
      <div 
        style={{ transform: 'translateZ(30px)' }}
        className="flex items-center justify-between w-full pt-0.5 border-b border-white/10 pb-2"
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            playCardFlipSound();
            onFlip();
          }}
          className="flex items-center gap-1 font-mono text-[9px] sm:text-[10px] tracking-wider text-slate-300 hover:text-emerald-400 bg-white/5 hover:bg-white/10 border border-white/10 px-2 py-0.5 rounded-lg transition-all active:scale-95"
        >
          <span>[ ← FRONT ]</span>
        </button>

        <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-sky-400 uppercase font-semibold">
          CONTACT INTERFACE
        </div>
      </div>

      {/* 2. Primary & Secondary Actions (Elevated 35px in 3D Z-Space for 100% Hit Precision) */}
      <div 
        style={{ transform: 'translateZ(35px)', transformStyle: 'preserve-3d' }}
        className="w-full flex flex-col gap-2 my-auto pointer-events-auto"
      >
        {/* Primary 1: Save Contact .VCF */}
        <button
          type="button"
          onClick={handleSaveContact}
          className="brutalist-button save-vcard-btn shadow-[0_4px_20px_rgba(16,185,129,0.25)] relative z-30"
        >
          {vcardSaved ? '[ CONTACT SAVED TO PHONE ]' : '[ SAVE CONTACT PASS (.VCF) ]'}
        </button>

        {/* Primary 2: Add to Digital Wallet */}
        <button
          type="button"
          onClick={handleWalletClick}
          className="brutalist-button wallet-pass-btn shadow-[0_4px_20px_rgba(56,189,248,0.2)] relative z-30"
        >
          [ ADD TO APPLE / GOOGLE WALLET ]
        </button>

        {/* Secondary Actions (2x2 Clean Grid Elevated in Z-Space) */}
        <div className="grid grid-cols-2 gap-2 mt-0.5 relative z-30">
          {/* WhatsApp Direct */}
          <a
            href={TRAINER_DATA.contact.whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              playButtonTapSound();
            }}
            className="brutalist-button"
          >
            WHATSAPP
          </a>

          {/* Direct Phone Call */}
          <a
            href={TRAINER_DATA.contact.telUrl}
            onClick={(e) => {
              e.stopPropagation();
              playButtonTapSound();
            }}
            className="brutalist-button"
          >
            CALL DIRECT
          </a>

          {/* Instagram Profile */}
          <a
            href={TRAINER_DATA.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              playButtonTapSound();
            }}
            className="brutalist-button"
          >
            INSTAGRAM
          </a>

          {/* Partner: The Bark University */}
          <a
            href={TRAINER_DATA.partnership.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              playButtonTapSound();
            }}
            className="brutalist-button"
          >
            THE BARK UNIV
          </a>
        </div>

        {/* Tier 3: Inquire Training / Consultation */}
        <button
          type="button"
          onClick={handleBookingClick}
          className="brutalist-button border-emerald-500/30 hover:border-emerald-400 text-emerald-300 hover:text-black mt-0.5 relative z-30"
        >
          [ INQUIRE TRAINING // BOOK CONSULTATION ]
        </button>
      </div>

      {/* 3. Bottom Security Subtitle */}
      <div 
        style={{ transform: 'translateZ(25px)' }}
        className="text-center w-full pb-0.5"
      >
        <div className="font-mono text-[8px] sm:text-[9px] tracking-widest text-white/40 uppercase">
          SECURE END-TO-END // THEBARKUNIVERSITY.COM
        </div>
      </div>
    </div>
  );
};
