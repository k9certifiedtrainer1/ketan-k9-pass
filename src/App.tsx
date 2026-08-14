import { useState } from 'react';
import { DigitalCard } from './components/DigitalCard';
import { 
  ConsultationModal, 
  WalletModal, 
  QrModal, 
  ShareModal 
} from './components/Modals';
import { TRAINER_DATA } from './data/trainerData';
import { playButtonTapSound } from './utils/soundEffects';

export function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Modals state
  const [bookingOpen, setBookingOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const handleToggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="card-page-container">
      {/* Ambient Refraction Glows */}
      <div className="ambient-orb orb-primary" />
      <div className="ambient-orb orb-secondary" />
      <div className="ambient-orb orb-tertiary" />

      {/* Top Left Subtle Escape / Status Pill */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-8 z-30 font-mono text-[9px] sm:text-[11px] tracking-widest text-emerald-400/90 uppercase px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>[ K9 EXECUTIVE PASS ]</span>
        </div>
      </div>

      {/* Top Right Quick Actions */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-8 z-30 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            playButtonTapSound();
            setQrOpen(true);
          }}
          className="font-mono text-[9px] sm:text-[11px] tracking-wider text-white/80 hover:text-white uppercase px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all active:scale-95"
        >
          [ QR CODE ]
        </button>

        <button
          type="button"
          onClick={() => {
            playButtonTapSound();
            setShareOpen(true);
          }}
          className="font-mono text-[9px] sm:text-[11px] tracking-wider text-white/80 hover:text-white uppercase px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all active:scale-95"
        >
          [ SHARE ]
        </button>
      </div>

      {/* 3D HOLOGRAPHIC CARD (100% Locked Viewport Center) */}
      <DigitalCard
        isFlipped={isFlipped}
        onToggleFlip={handleToggleFlip}
        onOpenBooking={() => setBookingOpen(true)}
        onOpenWallet={() => setWalletOpen(true)}
      />

      {/* FLOATING FROSTED GLASS BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-3 sm:bottom-6 left-0 w-full flex justify-center pointer-events-none z-40 px-3">
        <nav className="mobile-floating-nav">
          <ul className="mobile-nav-ul">
            <li>
              <a
                href={TRAINER_DATA.contact.telUrl}
                onClick={() => playButtonTapSound()}
                className="mobile-nav-link hover:text-white"
              >
                CALL DIRECT
              </a>
            </li>
            <li>
              <a
                href={TRAINER_DATA.contact.whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playButtonTapSound()}
                className="mobile-nav-link text-emerald-400 hover:text-emerald-300"
              >
                WHATSAPP
              </a>
            </li>
            <li>
              <a
                href={TRAINER_DATA.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playButtonTapSound()}
                className="mobile-nav-link hover:text-white"
              >
                INSTAGRAM
              </a>
            </li>
            <li>
              <a
                href={TRAINER_DATA.partnership.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playButtonTapSound()}
                className="mobile-nav-link hover:text-white"
              >
                THE BARK UNIV
              </a>
            </li>
            <li className="hidden sm:inline-block">
              <button
                type="button"
                onClick={handleToggleFlip}
                className="mobile-nav-link text-slate-300 hover:text-white flex items-center gap-1.5"
              >
                <span>FLIP CARD</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#22c55e]" />
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* MODALS */}
      <ConsultationModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        profile={TRAINER_DATA}
      />

      <WalletModal
        isOpen={walletOpen}
        onClose={() => setWalletOpen(false)}
        profile={TRAINER_DATA}
      />

      <QrModal
        isOpen={qrOpen}
        onClose={() => setQrOpen(false)}
        profile={TRAINER_DATA}
      />

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        profile={TRAINER_DATA}
      />
    </div>
  );
}

export default App;
