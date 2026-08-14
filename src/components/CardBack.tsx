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
      <div style={{ textAlign: 'center', transform: 'translateZ(30px)', width: '100%' }}>
        <div style={{ fontFamily: 'monospace', fontSize: 'clamp(0.6rem, 2vw, 0.68rem)', letterSpacing: '0.14em', color: '#38bdf8', textTransform: 'uppercase', fontWeight: 600 }}>
          EXECUTIVE CONTACT INTERFACE
        </div>
      </div>

      {/* 2. Primary Action Buttons (Tier 1: Full-Width) */}
      <div className="actions-primary">
        <button
          type="button"
          onClick={handleSaveContact}
          className="brutalist-button save-vcard-btn shadow-[0_4px_20px_rgba(16,185,129,0.25)]"
        >
          {vcardSaved ? '[ CONTACT SAVED TO PHONE ]' : '[ SAVE CONTACT PASS (.VCF) ]'}
        </button>

        <button
          type="button"
          onClick={handleWalletClick}
          className="brutalist-button wallet-pass-btn shadow-[0_4px_20px_rgba(56,189,248,0.2)]"
        >
          [ ADD TO APPLE / GOOGLE WALLET ]
        </button>
      </div>

      {/* 3. Secondary Actions (Tier 2: 2x2 Clean Native Link Grid) */}
      <div className="actions-secondary">
        {/* WhatsApp Direct */}
        <a
          href={TRAINER_DATA.contact.whatsappDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playButtonTapSound()}
          className="brutalist-button"
        >
          WHATSAPP
        </a>

        {/* Direct Phone Call */}
        <a
          href={TRAINER_DATA.contact.telUrl}
          onClick={() => playButtonTapSound()}
          className="brutalist-button"
        >
          CALL DIRECT
        </a>

        {/* Instagram Profile */}
        <a
          href={TRAINER_DATA.contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playButtonTapSound()}
          className="brutalist-button"
        >
          INSTAGRAM
        </a>

        {/* Partner: The Bark University */}
        <a
          href={TRAINER_DATA.partnership.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playButtonTapSound()}
          className="brutalist-button"
        >
          THE BARK UNIV
        </a>
      </div>

      {/* 4. Tier 3: Inquire Training / Consultation Button */}
      <div style={{ transform: 'translateZ(35px)', width: '100%' }}>
        <button
          type="button"
          onClick={handleBookingClick}
          className="brutalist-button border-emerald-500/30 hover:border-emerald-400 text-emerald-300 hover:text-black shadow-[0_4px_15px_rgba(16,185,129,0.1)]"
        >
          [ INQUIRE TRAINING // BOOK CONSULTATION ]
        </button>
      </div>

      {/* 5. Bottom Security Subtitle */}
      <div style={{ textAlign: 'center', transform: 'translateZ(25px)', width: '100%' }}>
        <div style={{ fontFamily: 'monospace', fontSize: 'clamp(0.5rem, 1.8vw, 0.58rem)', letterSpacing: '0.12em', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase' }}>
          SECURE END-TO-END // THEBARKUNIVERSITY.COM
        </div>
      </div>
    </div>
  );
};
