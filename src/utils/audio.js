
export const playMechanicalSound = () => {
  // Using Web Audio API to generate a mechanical electric current sound (zap/static)
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  
  const ctx = new AudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  // White noise buffer for static texture
  const bufferSize = ctx.sampleRate * 0.1; // 0.1 seconds
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  // Filter settings for "electric" feel
  filter.type = 'bandpass';
  filter.frequency.value = 1000;
  filter.Q.value = 1;

  // Oscillator settings for "mechanical" hum underlay
  oscillator.type = 'sawtooth';
  oscillator.frequency.value = 100; // Low hum
  
  // Connect nodes
  const noiseGain = ctx.createGain();
  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  // Envelopes
  const now = ctx.currentTime;
  
  noiseGain.gain.setValueAtTime(0.5, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

  gainNode.gain.setValueAtTime(0.1, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

  // Start and stop
  noise.start(now);
  oscillator.start(now);
  
  noise.stop(now + 0.1);
  oscillator.stop(now + 0.15);
};
