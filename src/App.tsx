import { useState } from 'react';
import { DigitalCard } from './components/DigitalCard';
import { CustomCursor } from './components/CustomCursor';
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
      {/* Interactive Magnetic Glowing Touch / Mouse Cursor */}
      <CustomCursor />

      {/* Ambient Refraction Glows (Space Black x Emerald Jade x Deep Cyan) */}
      <div className="ambient-orb orb-primary" />
      <div className="ambient-orb orb-secondary" />
      <div className="ambient-orb orb-tertiary" />

      {/* ROW 1: TOP SYSTEM BAR (Clean Non-Overlapping Header) */}
      <header className="w-full flex items-center justify-between z-30 shrink-0 max-w-md mx-auto">
        {/* Left Status Pill */}
        <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-emerald-400/90 uppercase px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>[ K9 EXECUTIVE PASS ]</span>
          </div>
        </div>

        {/* Right Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setTimeout(() => playButtonTapSound(), 0);
              setQrOpen(true);
            }}
            className="font-mono text-[9px] sm:text-[10px] tracking-wider text-white/80 hover:text-white uppercase px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
          >
            [ QR CODE ]
          </button>

          <button
            type="button"
            onClick={() => {
              setTimeout(() => playButtonTapSound(), 0);
              setShareOpen(true);
            }}
            className="font-mono text-[9px] sm:text-[10px] tracking-wider text-white/80 hover:text-white uppercase px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
          >
            [ SHARE ]
          </button>
        </div>
      </header>

      {/* ROW 2: CENTERED 3D HOLOGRAPHIC CARD */}
      <main className="w-full flex items-center justify-center my-auto relative z-10">
        <DigitalCard
          isFlipped={isFlipped}
          onToggleFlip={handleToggleFlip}
          onOpenBooking={() => setBookingOpen(true)}
          onOpenWallet={() => setWalletOpen(true)}
        />
      </main>

      {/* ROW 3: FLOATING FROSTED GLASS BOTTOM DOCK */}
      <footer className="w-full flex justify-center z-30 shrink-0 pb-1">
        <nav className="mobile-floating-nav">
          <ul className="mobile-nav-ul">
            <li>
              <a
                href={TRAINER_DATA.contact.telUrl}
                onClick={() => setTimeout(() => playButtonTapSound(), 0)}
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
                onClick={() => setTimeout(() => playButtonTapSound(), 0)}
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
                onClick={() => setTimeout(() => playButtonTapSound(), 0)}
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
                onClick={() => setTimeout(() => playButtonTapSound(), 0)}
                className="mobile-nav-link hover:text-white"
              >
                THE BARK UNIV
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={handleToggleFlip}
                className="mobile-nav-link text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <span>FLIP CARD</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#22c55e]" />
              </button>
            </li>
          </ul>
        </nav>
      </footer>

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
