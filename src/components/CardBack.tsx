import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { TRAINER_DATA } from '../data/trainerData';
import { downloadVCard } from '../utils/vcardGenerator';
import { playButtonTapSound, playSuccessChime } from '../utils/soundEffects';

interface CardBackProps {
  onOpenBooking: () => void;
  onOpenWallet: () => void;
}

export const CardBack: React.FC<CardBackProps> = ({
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
        particleCount: 30,
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
    playButtonTapSound();
    onOpenWallet();
  };

  const handleBookingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playButtonTapSound();
    onOpenBooking();
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center select-none relative z-10 text-white">
      
      {/* 1. Header Title */}
      <div className="text-center w-full pt-0.5">
        <div className="font-mono text-[9.5px] sm:text-[10.5px] tracking-widest text-sky-400 uppercase font-semibold">
          EXECUTIVE CONTACT INTERFACE
        </div>
      </div>

      {/* 2. Primary Actions (Tier 1: Full-Width Glowing Buttons) */}
      <div className="w-full flex flex-col gap-2 my-auto">
        
        {/* Primary 1: Save Contact .VCF */}
        <button
          type="button"
          onClick={handleSaveContact}
          className="brutalist-button save-vcard-btn shadow-[0_4px_20px_rgba(16,185,129,0.25)]"
        >
          {vcardSaved ? '[ CONTACT SAVED TO PHONE ]' : '[ SAVE CONTACT PASS (.VCF) ]'}
        </button>

        {/* Primary 2: Add to Digital Wallet */}
        <button
          type="button"
          onClick={handleWalletClick}
          className="brutalist-button wallet-pass-btn shadow-[0_4px_20px_rgba(56,189,248,0.2)]"
        >
          [ ADD TO APPLE / GOOGLE WALLET ]
        </button>

        {/* Secondary Actions (Tier 2: 2x2 Clean Grid) */}
        <div className="grid grid-cols-2 gap-2 mt-0.5">
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
          className="brutalist-button border-emerald-500/30 hover:border-emerald-400 text-emerald-300 hover:text-black mt-0.5"
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
