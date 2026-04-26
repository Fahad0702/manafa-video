// Sonic branding for the Manafa explainer.
// All sounds are synthesised at runtime via the Web Audio API so no
// extra audio assets need to ship with the bundle. The palette is
// deliberately sparse so it sits *under* the voiceover, not over it.

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let mutedTarget = 0;

const MASTER_LEVEL = 0.55;

interface AudioRefs {
  ctx: AudioContext;
  master: GainNode;
}

function ensureContext(): AudioRefs | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
    masterGain = ctx.createGain();
    masterGain.gain.value = mutedTarget;
    masterGain.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  return { ctx, master: masterGain! };
}

export function setMuted(muted: boolean) {
  mutedTarget = muted ? 0 : MASTER_LEVEL;
  const refs = ensureContext();
  if (!refs) return;
  const now = refs.ctx.currentTime;
  refs.master.gain.cancelScheduledValues(now);
  refs.master.gain.setValueAtTime(refs.master.gain.value, now);
  refs.master.gain.linearRampToValueAtTime(mutedTarget, now + 0.08);
}

// FM bell tone — characteristic of premium fintech branding.
function bell(freq: number, duration: number, gain: number, delay = 0) {
  const refs = ensureContext();
  if (!refs) return;
  const { ctx: c, master } = refs;
  const t = c.currentTime + delay;

  const carrier = c.createOscillator();
  const modulator = c.createOscillator();
  const modGain = c.createGain();
  const out = c.createGain();

  carrier.type = 'sine';
  modulator.type = 'sine';
  carrier.frequency.value = freq;
  modulator.frequency.value = freq * 2.76; // inharmonic ratio → bell-like
  modGain.gain.value = freq * 1.4;

  modulator.connect(modGain);
  modGain.connect(carrier.frequency);
  carrier.connect(out);
  out.connect(master);

  out.gain.setValueAtTime(0, t);
  out.gain.linearRampToValueAtTime(gain, t + 0.005);
  out.gain.exponentialRampToValueAtTime(0.0001, t + duration);

  carrier.start(t);
  modulator.start(t);
  carrier.stop(t + duration + 0.05);
  modulator.stop(t + duration + 0.05);
}

function subThump(delay = 0) {
  const refs = ensureContext();
  if (!refs) return;
  const { ctx: c, master } = refs;
  const t = c.currentTime + delay;

  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(120, t);
  osc.frequency.exponentialRampToValueAtTime(40, t + 0.45);

  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.5, t + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);

  osc.connect(gain);
  gain.connect(master);
  osc.start(t);
  osc.stop(t + 0.6);
}

// Two-note ascending sting — Manafa brand motif (perfect 5th: G3 → D4).
export function playSting(scale: 'reveal' | 'end' = 'reveal') {
  const refs = ensureContext();
  if (!refs) return;
  const lift = scale === 'end' ? 1.0 : 0.85;
  subThump(0);
  bell(196.0, 1.4, 0.32 * lift, 0.0);     // G3
  bell(293.66, 1.7, 0.36 * lift, 0.18);    // D4
  bell(587.33, 1.4, 0.16 * lift, 0.22);    // D5 sparkle
}

// Tonal whoosh for act boundaries — bandpass-swept noise.
export function playWhoosh(intensity = 1) {
  const refs = ensureContext();
  if (!refs) return;
  const { ctx: c, master } = refs;
  const t = c.currentTime;
  const dur = 0.7;

  const buffer = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  const noise = c.createBufferSource();
  noise.buffer = buffer;

  const filter = c.createBiquadFilter();
  filter.type = 'bandpass';
  filter.Q.value = 1.6;
  filter.frequency.setValueAtTime(180, t);
  filter.frequency.exponentialRampToValueAtTime(3200, t + dur);

  const gain = c.createGain();
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.22 * intensity, t + 0.18);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  noise.start(t);
  noise.stop(t + dur + 0.05);
}

// Short UI tick — for counters and incremental reveals.
export function playTick() {
  const refs = ensureContext();
  if (!refs) return;
  const { ctx: c, master } = refs;
  const t = c.currentTime;

  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(2200, t);
  osc.frequency.exponentialRampToValueAtTime(1100, t + 0.07);

  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.09, t + 0.003);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);

  osc.connect(gain);
  gain.connect(master);
  osc.start(t);
  osc.stop(t + 0.1);
}

// Ascending three-note success chime — for the "Funded" moment.
export function playSuccess() {
  bell(523.25, 0.9, 0.28, 0.0);   // C5
  bell(659.25, 0.9, 0.28, 0.13);  // E5
  bell(783.99, 1.2, 0.32, 0.26);  // G5
  subThump(0.0);
}

// Soft connection blip — partner network / processing handshake.
export function playBlip(pitch: 'low' | 'high' = 'high') {
  const refs = ensureContext();
  if (!refs) return;
  const { ctx: c, master } = refs;
  const t = c.currentTime;
  const f = pitch === 'high' ? 880 : 587.33;

  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(f, t);

  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.07, t + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);

  osc.connect(gain);
  gain.connect(master);
  osc.start(t);
  osc.stop(t + 0.22);
}

// Low ambient drone that ties scenes together — kept very quiet so
// it sits below the voiceover.
let ambient: { oscs: OscillatorNode[]; gain: GainNode } | null = null;

export function startAmbient() {
  if (ambient) return;
  const refs = ensureContext();
  if (!refs) return;
  const { ctx: c, master } = refs;
  const t = c.currentTime;

  const gain = c.createGain();
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.035, t + 2.0);

  const filter = c.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 700;
  filter.Q.value = 0.4;

  // Cm9-ish pad voicing (C2, G2, Eb3, Bb3) — Manafa brand colours.
  const freqs = [65.41, 98.0, 155.56, 233.08];
  const oscs: OscillatorNode[] = [];
  freqs.forEach((f) => {
    const a = c.createOscillator();
    const b = c.createOscillator();
    a.type = 'sawtooth';
    b.type = 'sawtooth';
    a.frequency.value = f;
    b.frequency.value = f * 1.006;
    a.connect(filter);
    b.connect(filter);
    a.start(t);
    b.start(t);
    oscs.push(a, b);
  });

  filter.connect(gain);
  gain.connect(master);

  ambient = { oscs, gain };
}

export function stopAmbient() {
  if (!ambient) return;
  const refs = ensureContext();
  if (!refs) return;
  const { ctx: c } = refs;
  const t = c.currentTime;
  const { oscs, gain } = ambient;
  ambient = null;

  gain.gain.cancelScheduledValues(t);
  gain.gain.setValueAtTime(gain.gain.value, t);
  gain.gain.linearRampToValueAtTime(0, t + 1.0);

  setTimeout(() => {
    oscs.forEach((o) => {
      try { o.stop(); o.disconnect(); } catch { /* noop */ }
    });
    try { gain.disconnect(); } catch { /* noop */ }
  }, 1100);
}
