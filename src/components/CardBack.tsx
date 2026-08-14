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
    <div className="w-full h-full flex flex-col justify-between items-center select-none relative z-10 text-white">
      
      {/* 1. Header with Flip Back Button */}
      <div style={{ transform: 'translateZ(30px)' }} className="flex items-center justify-between w-full pt-0.5 border-b border-white/10 pb-1.5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            playCardFlipSound();
            onFlip();
          }}
          className="flex items-center gap-1 font-mono text-[9px] sm:text-[10px] tracking-wider text-slate-300 hover:text-emerald-400 bg-white/5 hover:bg-white/10 border border-white/10 px-2 py-0.5 rounded-lg transition-all active:scale-95 cursor-pointer"
        >
          <span>[ ← FRONT ]</span>
        </button>

        <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-sky-400 uppercase font-semibold">
          CONTACT INTERFACE
        </div>
      </div>

      {/* 2. Cohesive Titanium Action Deck (No Stretched Gaps) */}
      <div className="w-full flex flex-col gap-2 my-auto">
        
        {/* Tier 1: Full-Width Primary Buttons */}
        <div className="actions-primary">
          <button
            type="button"
            onClick={handleSaveContact}
            className="brutalist-button save-vcard-btn shadow-[0_4px_20px_rgba(16,185,129,0.25)] cursor-pointer"
          >
            {vcardSaved ? '[ CONTACT SAVED TO PHONE ]' : '[ SAVE CONTACT PASS (.VCF) ]'}
          </button>

          <button
            type="button"
            onClick={handleWalletClick}
            className="brutalist-button wallet-pass-btn shadow-[0_4px_20px_rgba(56,189,248,0.2)] cursor-pointer"
          >
            [ ADD TO APPLE / GOOGLE WALLET ]
          </button>
        </div>

        {/* Tier 2: 2x2 Clean Native Link Grid */}
        <div className="actions-secondary">
          {/* WhatsApp Direct Native Link */}
          <a
            href={TRAINER_DATA.contact.whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setTimeout(() => playButtonTapSound(), 0)}
            className="brutalist-button cursor-pointer"
          >
            WHATSAPP
          </a>

          {/* Direct Phone Call Native Link */}
          <a
            href={TRAINER_DATA.contact.telUrl}
            onClick={() => setTimeout(() => playButtonTapSound(), 0)}
            className="brutalist-button cursor-pointer"
          >
            CALL DIRECT
          </a>

          {/* Instagram Profile Native Link */}
          <a
            href={TRAINER_DATA.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setTimeout(() => playButtonTapSound(), 0)}
            className="brutalist-button cursor-pointer"
          >
            INSTAGRAM
          </a>

          {/* Partner: The Bark University Native Link */}
          <a
            href={TRAINER_DATA.partnership.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setTimeout(() => playButtonTapSound(), 0)}
            className="brutalist-button cursor-pointer"
          >
            THE BARK UNIV
          </a>
        </div>

        {/* Tier 3: Inquire Training Button */}
        <div style={{ transform: 'translateZ(35px)', width: '100%' }}>
          <button
            type="button"
            onClick={handleBookingClick}
            className="brutalist-button border-emerald-500/30 hover:border-emerald-400 text-emerald-300 hover:text-black shadow-[0_4px_15px_rgba(16,185,129,0.1)] cursor-pointer"
          >
            [ INQUIRE TRAINING // BOOK CONSULTATION ]
          </button>
        </div>
      </div>

      {/* 3. Bottom Security Subtitle */}
      <div style={{ textAlign: 'center', transform: 'translateZ(25px)', width: '100%' }}>
        <div style={{ fontFamily: 'monospace', fontSize: 'clamp(0.5rem, 1.8vw, 0.58rem)', letterSpacing: '0.12em', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase' }}>
          SECURE END-TO-END // THEBARKUNIVERSITY.COM
        </div>
      </div>
    </div>
  );
};
