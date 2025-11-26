// Simple synth for UI sounds using Web Audio API
const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

const playTone = (freq: number, type: OscillatorType, duration: number, vol: number = 0.1) => {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  
  gain.gain.setValueAtTime(vol, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
};

export const playClick = () => {
    // High pitched "blip"
    playTone(800, 'sine', 0.1, 0.05);
};

export const playHover = () => {
    // Very subtle low "tick"
    playTone(300, 'triangle', 0.05, 0.02);
};

export const playToggle = (isOn: boolean) => {
    if (isOn) {
        // Power up
        playTone(400, 'sine', 0.1, 0.1);
        setTimeout(() => playTone(800, 'square', 0.2, 0.05), 100);
    } else {
        // Power down
        playTone(800, 'sine', 0.1, 0.1);
        setTimeout(() => playTone(400, 'triangle', 0.2, 0.05), 100);
    }
};

export const playSuccess = () => {
  // Major chord arpeggio
  const now = audioCtx.currentTime;
  [440, 554, 659, 880].forEach((freq, i) => {
      setTimeout(() => playTone(freq, 'sine', 0.3, 0.05), i * 80);
  });
};

export const playError = () => {
    playTone(150, 'sawtooth', 0.4, 0.1);
};

export const playTyping = () => {
    // Mechanical key sound simulation
    const freq = 200 + Math.random() * 500;
    playTone(freq, 'square', 0.03, 0.01);
};