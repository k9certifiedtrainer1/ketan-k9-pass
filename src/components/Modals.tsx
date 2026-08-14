import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Copy, Smartphone, Send } from 'lucide-react';
import QRCode from 'qrcode';
import type { TrainerProfile } from '../data/trainerData';
import { playButtonTapSound, playSuccessChime } from '../utils/soundEffects';
import { downloadVCard } from '../utils/vcardGenerator';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: TrainerProfile;
}

// -------------------------------------------------------------
// 1. CONSULTATION BOOKING MODAL
// -------------------------------------------------------------
export const ConsultationModal: React.FC<ModalProps> = ({ isOpen, onClose, profile }) => {
  const [ownerName, setOwnerName] = useState('');
  const [dogDetails, setDogDetails] = useState('');
  const [serviceType, setServiceType] = useState('Dog Behavior & Aggression Fix (Biting, Barking, Fear)');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccessChime();

    const formattedMessage = 
`*DOG TRAINING INQUIRY - KETAN PANCHAL*
---------------------------------------
*Your Name:* ${ownerName || 'Dog Parent'}
*Dog Breed & Age:* ${dogDetails || 'Not specified'}
*Training Goal:* ${serviceType}
*City / Area:* ${location || 'India'}
*What help do you need:* ${notes || 'Training consultation requested'}
---------------------------------------
_Sent via Ketan Panchal Digital Pass_`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${profile.contact.whatsappRaw}&text=${encodeURIComponent(formattedMessage)}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Surface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#0a0c10] border border-white/20 rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] z-10 my-auto text-slate-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-emerald-400 block uppercase">
                  [ DIRECT WHATSAPP INQUIRY ]
                </span>
                <h3 className="text-xl sm:text-2xl font-serif tracking-tight text-white mt-0.5">
                  Book Training Consultation
                </h3>
              </div>
              <button
                onClick={() => {
                  playButtonTapSound();
                  onClose();
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-medium text-white font-serif">
                  Opening WhatsApp Chat
                </h4>
                <p className="text-xs font-mono text-slate-400">
                  [ CONNECTING TO KETAN PANCHAL ]
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-1.5">
                    [ YOUR NAME ]
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full bg-[#12161f] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-1.5">
                      [ DOG BREED & AGE ]
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Golden Retriever, 1 Year"
                      value={dogDetails}
                      onChange={(e) => setDogDetails(e.target.value)}
                      className="w-full bg-[#12161f] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-1.5">
                      [ YOUR CITY / AREA ]
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ahmedabad, Mumbai, Delhi"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-[#12161f] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-1.5">
                    [ WHAT TRAINING DO YOU NEED? ]
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-[#12161f] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors font-sans"
                  >
                    <option value="Dog Behavior & Aggression Fix (Biting, Barking, Fear)">Dog Behavior & Aggression Fix (Biting, Barking, Fear)</option>
                    <option value="Advanced Off-Leash Obedience & Leash Walking">Advanced Off-Leash Obedience & Leash Walking</option>
                    <option value="Puppy Training & Good Home Manners">Puppy Training & Good Home Manners</option>
                    <option value="Protection & Guard Dog Training">Protection & Guard Dog Training</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-1.5">
                    [ TELL US WHAT YOUR DOG NEEDS HELP WITH ]
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe what your dog does (pulling leash, barking, biting, chewing, anxiety)..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#12161f] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors font-sans resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-black font-semibold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(16,185,129,0.25)] transition-all font-mono active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4" />
                    [ SEND REQUEST VIA WHATSAPP ]
                  </button>
                  <p className="text-[10px] font-mono text-center text-slate-500 mt-2">
                    [ DIRECT 1-ON-1 CHAT // +91 70965 07017 ]
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// -------------------------------------------------------------
// 2. WALLET PASS MODAL
// -------------------------------------------------------------
export const WalletModal: React.FC<ModalProps> = ({ isOpen, onClose, profile }) => {
  const [downloadTriggered, setDownloadTriggered] = useState(false);

  const handleWalletSave = () => {
    playSuccessChime();
    downloadVCard(profile);
    setDownloadTriggered(true);
    setTimeout(() => setDownloadTriggered(false), 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#0a0c10] border border-white/20 rounded-2xl p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] z-10 my-auto text-slate-200"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-slate-400 block uppercase">
                  [ DIGITAL WALLET PASS ]
                </span>
                <h3 className="text-xl font-serif text-white mt-0.5">
                  Save Digital Card
                </h3>
              </div>
              <button
                onClick={() => {
                  playButtonTapSound();
                  onClose();
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Wallet Style Card Preview */}
            <div className="bg-gradient-to-b from-[#181c24] to-[#0d0f14] border border-white/15 rounded-2xl p-5 shadow-2xl relative overflow-hidden mb-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
              
              {/* Pass Top Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-800 border border-white/20 flex items-center justify-center text-xs font-mono font-bold text-white">
                    KP
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-slate-400 block">
                      DOG TRAINER
                    </span>
                    <span className="text-xs font-semibold text-white">
                      The Bark University
                    </span>
                  </div>
                </div>
                <div className="text-right font-mono text-[9px] text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-950/40">
                  CPDT-KA
                </div>
              </div>

              {/* Pass Main Details */}
              <div className="space-y-3">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 block">
                    PROFESSIONAL TRAINER
                  </span>
                  <div className="text-xl font-serif text-white font-medium">
                    {profile.name}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                  <div>
                    <span className="text-[9px] text-slate-500 block">[ CARD ID ]</span>
                    <span className="text-slate-300 font-semibold">{profile.telemetry.serialNumber}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 block">[ WHATSAPP & CALL ]</span>
                    <span className="text-slate-300 font-semibold">{profile.contact.phoneFormatted}</span>
                  </div>
                </div>
              </div>

              {/* Pass Barcode */}
              <div className="mt-5 pt-3 border-t border-white/10 text-center">
                <div className="font-mono text-[8px] tracking-widest text-slate-500 mb-1.5">
                  [ SCAN OR TAP FOR INSTANT CONTACT ]
                </div>
                <div className="flex justify-center h-8 gap-0.5 opacity-80">
                  {[2,1,3,1,2,4,1,2,1,3,2,1,4,1,3,1,2,1,3,2,4,1,2,1,3,1,2,4].map((w, i) => (
                    <div key={i} className="bg-white" style={{ width: `${w * 1.5}px` }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5">
              <button
                onClick={handleWalletSave}
                className="w-full bg-slate-100 hover:bg-white text-black font-mono font-semibold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98]"
              >
                <Smartphone className="w-4 h-4" />
                {downloadTriggered ? '[ CONTACT SAVED TO PHONE ]' : '[ SAVE CONTACT TO PHONE (.VCF) ]'}
              </button>

              <button
                onClick={() => {
                  playButtonTapSound();
                  window.open(profile.contact.whatsappDirectUrl, '_blank', 'noopener,noreferrer');
                }}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-mono text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                [ CHAT WITH KETAN ON WHATSAPP ]
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// -------------------------------------------------------------
// 3. HIGH-VISIBILITY QR CODE MODAL
// -------------------------------------------------------------
export const QrModal: React.FC<ModalProps> = ({ isOpen, onClose, profile: _profile }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      QRCode.toDataURL(currentUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      }).then(setQrDataUrl).catch(console.error);
    }
  }, [isOpen]);

  const handleCopyLink = () => {
    playSuccessChime();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-sm bg-[#0a0c10] border border-white/20 rounded-2xl p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] z-10 my-auto text-slate-200 text-center"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <span className="font-mono text-[10px] tracking-widest text-emerald-400 uppercase">
                [ SCAN DIGITAL CARD ]
              </span>
              <button
                onClick={() => {
                  playButtonTapSound();
                  onClose();
                }}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xl font-serif text-white mb-1">
              Scan to Open Card
            </h3>
            <p className="text-xs text-slate-400 font-sans mb-4">
              Scan with any phone camera to view Ketan Panchal's card and save contacts.
            </p>

            {/* QR Container */}
            <div className="bg-white p-4 rounded-xl inline-block shadow-2xl mx-auto border-4 border-slate-700">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="Digital Card QR Code" className="w-56 h-56 mx-auto block" />
              ) : (
                <div className="w-56 h-56 flex items-center justify-center text-black font-mono text-xs">
                  [ GENERATING QR... ]
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
              <button
                onClick={handleCopyLink}
                className="w-full bg-white/10 hover:bg-white/15 border border-white/15 text-slate-200 font-mono text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? '[ LINK COPIED ]' : '[ COPY CARD LINK ]'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// -------------------------------------------------------------
// 4. DIRECT SHARE MODAL
// -------------------------------------------------------------
export const ShareModal: React.FC<ModalProps> = ({ isOpen, onClose, profile: _profile }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    playSuccessChime();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-sm bg-[#0a0c10] border border-white/20 rounded-2xl p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] z-10 my-auto text-slate-200"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">
                [ SHARE DIGITAL CARD ]
              </span>
              <button
                onClick={() => {
                  playButtonTapSound();
                  onClose();
                }}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xl font-serif text-white mb-1">
              Share With a Pet Parent
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Send Ketan Panchal's digital card to anyone looking for professional dog training.
            </p>

            <div className="space-y-2.5">
              <button
                onClick={handleCopy}
                className="w-full bg-white/10 hover:bg-white/15 border border-white/15 text-slate-200 font-mono text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? '[ LINK COPIED ]' : '[ COPY CARD LINK ]'}
              </button>

              <button
                onClick={() => {
                  playButtonTapSound();
                  const shareMsg = `Check out Ketan Panchal's Digital Pass (Certified Dog Trainer & Behavior Specialist - The Bark University): ${window.location.href}`;
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMsg)}`, '_blank');
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-black font-mono font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                [ SHARE ON WHATSAPP ]
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
