/**
 * Web Audio API synthesizer for tactile mechanical feedback
 * and physical mobile haptic vibration.
 */

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function toggleSound(enabled?: boolean): boolean {
  soundEnabled = enabled !== undefined ? enabled : !soundEnabled;
  return soundEnabled;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

/**
 * High-precision micro-click for card flip
 */
export function playCardFlipSound(): void {
  // Mobile Haptics
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate([15, 30, 20]);
    } catch {
      // Ignore vibration errors
    }
  }

  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    
    // Low mechanical thud
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(140, now);
    osc1.frequency.exponentialRampToValueAtTime(40, now + 0.12);
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.12);

    // High titanium click
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(880, now);
    osc2.frequency.exponentialRampToValueAtTime(180, now + 0.04);
    gain2.gain.setValueAtTime(0.12, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now);
    osc2.stop(now + 0.04);
  } catch {
    // Graceful fallback
  }
}

/**
 * Crisp tactical button tap sound
 */
export function playButtonTapSound(): void {
  // Light haptic tap
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(10);
    } catch {
      // Ignore vibration errors
    }
  }

  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.06);
    
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  } catch {
    // Graceful fallback
  }
}

/**
 * Success action sound (e.g. Save contact or consultation request)
 */
export function playSuccessChime(): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate([20, 50, 40]);
    } catch {
      // Ignore vibration errors
    }
  }

  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + index * 0.05;
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      
      gain.gain.setValueAtTime(0.1, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  } catch {
    // Graceful fallback
  }
}
