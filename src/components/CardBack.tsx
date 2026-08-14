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

  const handleActionClick = (e: React.MouseEvent, actionUrl?: string, customAction?: () => void) => {
    e.stopPropagation();
    playButtonTapSound();
    
    if (customAction) {
      customAction();
      return;
    }

    if (actionUrl) {
      if (actionUrl.startsWith('tel:')) {
        window.location.href = actionUrl;
      } else {
        window.open(actionUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center select-none relative z-20 text-white">
      
      {/* 1. Header with Flip Back Button */}
      <div className="flex items-center justify-between w-full pt-0.5 border-b border-white/10 pb-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            playCardFlipSound();
            onFlip();
          }}
          className="flex items-center gap-1 font-mono text-[9px] sm:text-[10px] tracking-wider text-slate-300 hover:text-emerald-400 bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1 rounded-lg transition-all active:scale-95 cursor-pointer"
        >
          <span>[ ← FRONT ]</span>
        </button>

        <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-sky-400 uppercase font-semibold">
          CONTACT INTERFACE
        </div>
      </div>

      {/* 2. Primary & Secondary Actions */}
      <div className="w-full flex flex-col gap-2 my-auto">
        {/* Primary 1: Save Contact .VCF */}
        <button
          type="button"
          onClick={handleSaveContact}
          className="brutalist-button save-vcard-btn shadow-[0_4px_20px_rgba(16,185,129,0.25)] cursor-pointer"
        >
          {vcardSaved ? '[ CONTACT SAVED TO PHONE ]' : '[ SAVE CONTACT PASS (.VCF) ]'}
        </button>

        {/* Primary 2: Add to Digital Wallet */}
        <button
          type="button"
          onClick={(e) => handleActionClick(e, undefined, onOpenWallet)}
          className="brutalist-button wallet-pass-btn shadow-[0_4px_20px_rgba(56,189,248,0.2)] cursor-pointer"
        >
          [ ADD TO APPLE / GOOGLE WALLET ]
        </button>

        {/* Secondary Actions (2x2 Clean Grid) */}
        <div className="grid grid-cols-2 gap-2 mt-0.5">
          {/* WhatsApp Direct */}
          <button
            type="button"
            onClick={(e) => handleActionClick(e, TRAINER_DATA.contact.whatsappDirectUrl)}
            className="brutalist-button cursor-pointer"
          >
            WHATSAPP
          </button>

          {/* Direct Phone Call */}
          <button
            type="button"
            onClick={(e) => handleActionClick(e, TRAINER_DATA.contact.telUrl)}
            className="brutalist-button cursor-pointer"
          >
            CALL DIRECT
          </button>

          {/* Instagram Profile */}
          <button
            type="button"
            onClick={(e) => handleActionClick(e, TRAINER_DATA.contact.instagramUrl)}
            className="brutalist-button cursor-pointer"
          >
            INSTAGRAM
          </button>

          {/* Partner: The Bark University */}
          <button
            type="button"
            onClick={(e) => handleActionClick(e, TRAINER_DATA.partnership.url)}
            className="brutalist-button cursor-pointer"
          >
            THE BARK UNIV
          </button>
        </div>

        {/* Tier 3: Inquire Training / Consultation */}
        <button
          type="button"
          onClick={(e) => handleActionClick(e, undefined, onOpenBooking)}
          className="brutalist-button border-emerald-500/30 hover:border-emerald-400 text-emerald-300 hover:text-black mt-0.5 cursor-pointer"
        >
          [ INQUIRE TRAINING // BOOK CONSULTATION ]
        </button>
      </div>

      {/* 3. Bottom Security Subtitle */}
      <div className="text-center w-full pb-0.5">
        <div className="font-mono text-[8px] sm:text-[9px] tracking-widest text-white/40 uppercase">
          SECURE END-TO-END // THEBARKUNIVERSITY.COM
        </div>
      </div>
    </div>
  );
};
