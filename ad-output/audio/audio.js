/* audio.js — synthesizes the full soundtrack for the Gray UI ad v2.
   48.0s, 44100 Hz stereo WAV. 90 BPM (beat = 2/3 s) so every 4s scene
   cut lands exactly on beat 6k. Includes SFX aligned to on-screen events:
   toggle click (0.92, 10.75, 11.85), keypresses (30.0-31.1), CLI ding (31.5),
   riser (39-41), sub-drop (41.15), glint shimmer (42.5). */
const fs = require('fs');
const path = require('path');

const SR = 44100, DUR = 48.0, N = Math.floor(SR * DUR);
const BPM = 90, BEAT = 60 / BPM; // 0.6667
const L = new Float32Array(N), R = new Float32Array(N);

function addSample(i, l, r) { if (i >= 0 && i < N) { L[i] += l; R[i] += r; } }

/* ---------- building blocks ---------- */
function env(t, a, d, s, r, tOn, tOff) { // simple ADSR
  if (t < 0) return 0;
  if (t < tOn) {
    const x = t;
    if (x < a) return x / a;
    return Math.exp(-(x - a) / d * 3);
  }
  const x = t - tOn;
  if (x < 0) return 1;
  if (x < r) return (1 - x / r) * s;
  return 0;
}
function kick(t0, gain, f0 = 130, f1 = 42, dur = 0.22) {
  const i0 = Math.floor(t0 * SR);
  const len = Math.floor(dur * SR);
  for (let i = 0; i < len; i++) {
    const t = i / SR, k = i / len;
    const f = f0 * Math.pow(f1 / f0, k);
    const ph = 2 * Math.PI * (f1 * t + (f0 - f1) / (Math.log(f0 / f1) === 0 ? 1 : 0) * 0); // integrate approx below
    // simpler: phase integrate numerically
    break;
  }
  // numeric integration version
  let ph = 0, lastT = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR, k = i / len;
    const f = f0 + (f1 - f0) * k;
    ph += f / SR;
    const amp = Math.exp(-t * 18) * gain;
    const s = Math.sin(2 * Math.PI * ph) * amp;
    addSample(i0 + i, s, s);
  }
}
function click(t0, gain, bright = 2600) {
  const i0 = Math.floor(t0 * SR), len = Math.floor(0.045 * SR);
  let seed = Math.floor(t0 * 1e6) | 0;
  const rnd = () => { seed = (seed * 1103515245 + 12345) | 0; return ((seed >>> 8) / 16777216) - 0.5; };
  let lp = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    lp += (rnd() - lp) * 0.55;
    const hp = rnd() - lp;
    const s = (lp * 0.7 + hp * 0.5) * Math.exp(-t * 130) * gain;
    addSample(i0 + i, s, s);
  }
}
function keypress(t0, gain) { click(t0, gain * 0.5, 2000); }
function pluck(t0, freq, gain, pan = 0) {
  const i0 = Math.floor(t0 * SR), len = Math.floor(0.9 * SR);
  let ph = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    ph += freq / SR;
    const saw = 2 * (ph - Math.floor(ph + 0.5));
    const sq = Math.sin(2 * Math.PI * ph) + 0.35 * Math.sin(4 * Math.PI * ph);
    const body = sq * 0.8 + saw * 0.2;
    const a = Math.exp(-t * 6) * gain;
    // gentle lowpass via one-pole on amplitude not needed; keep short
    const s = body * a;
    addSample(i0 + i, s * (1 - pan), s * (1 + pan));
  }
}
function padChord(t0, t1, freqs, gain) {
  const i0 = Math.floor(t0 * SR), i1 = Math.min(N, Math.floor(t1 * SR));
  const ph = freqs.map(() => Math.random() * 0);
  for (let i = i0; i < i1; i++) {
    const t = (i - i0) / SR;
    const T = t1 - t0;
    const edge = Math.min(1, t / 1.6) * Math.min(1, (T - t) / 1.6);
    let l = 0, r = 0;
    freqs.forEach((f, fi) => {
      const det = 1 + (fi % 2 ? 0.0016 : -0.0016);
      const p = ph[fi] + f * det / SR;
      ph[fi] = p;
      const w = Math.sin(2 * Math.PI * p) + 0.4 * Math.sin(4 * Math.PI * p) + 0.15 * Math.sin(6 * Math.PI * p);
      l += w * (fi % 2 ? 0.5 : 1);
      r += w * (fi % 2 ? 1 : 0.5);
    });
    const s = l * gain * edge * 0.12, s2 = r * gain * edge * 0.12;
    addSample(i, s, s2);
  }
}
function riser(t0, t1, gain) {
  const i0 = Math.floor(t0 * SR), len = Math.floor((t1 - t0) * SR);
  let seed = 77; const rnd = () => { seed = (seed * 1103515245 + 12345) | 0; return ((seed >>> 8) / 16777216) - 0.5; };
  let lp = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR, k = t / (t1 - t0);
    const noise = rnd();
    lp += (noise - lp) * (0.02 + 0.5 * k * k);
    const tone = Math.sin(2 * Math.PI * (90 + 700 * k * k) * t) * 0.3;
    const amp = Math.pow(k, 2.2) * gain;
    const s = (lp * 0.8 + tone) * amp;
    addSample(i0 + i, s * 0.8, s);
  }
}
function subDrop(t0, gain) {
  const i0 = Math.floor(t0 * SR), len = Math.floor(1.6 * SR);
  let ph = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR, k = i / len;
    const f = 62 * Math.pow(0.5, k * 1.4);
    ph += f / SR;
    const amp = Math.sin(Math.PI * Math.min(1, k * 3)) * Math.exp(-t * 1.8) * gain;
    const s = Math.sin(2 * Math.PI * ph) * amp;
    addSample(i0 + i, s * 0.9, s);
  }
}
function shimmer(t0, gain) {
  [1174.7, 1760, 2349.3].forEach((f, i) => {
    const i0 = Math.floor((t0 + i * 0.045) * SR), len = Math.floor(2.4 * SR);
    let ph = 0;
    for (let j = 0; j < len; j++) {
      const t = j / SR;
      ph += f / SR;
      const s = Math.sin(2 * Math.PI * ph) * Math.exp(-t * 2.2) * gain * (1 - i * 0.22);
      addSample(i0 + j, s * 0.8, s);
    }
  });
}
function whoosh(t0, gain) {
  const i0 = Math.floor(t0 * SR), len = Math.floor(0.5 * SR);
  let seed = 991; const rnd = () => { seed = (seed * 1103515245 + 12345) | 0; return ((seed >>> 8) / 16777216) - 0.5; };
  let lp = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR, k = t / 0.5;
    const n = rnd();
    lp += (n - lp) * (0.05 + 0.4 * Math.sin(k * Math.PI));
    const s = lp * Math.sin(k * Math.PI) * gain;
    addSample(i0 + i, s, s * 0.8);
  }
}
function hiss(gain) { // constant tape floor
  let seed = 5; const rnd = () => { seed = (seed * 1103515245 + 12345) | 0; return ((seed >>> 8) / 16777216) - 0.5; };
  let lp = 0;
  for (let i = 0; i < N; i++) {
    lp += (rnd() - lp) * 0.08;
    addSample(i, lp * gain, lp * gain);
  }
}

/* ---------- score arrangement ---------- */
// Harmony: D minor-ish ambient — Dm(9) → Bb maj7 → F maj9 → C add9, one chord per 8s block
const CHORDS = [
  [73.42, 110.0, 146.83, 220.0, 293.66],        // D2 A2 D3 A3 D4
  [58.27, 116.54, 174.61, 233.08, 349.23],      // Bb1 Bb2 F3 Bb3 F4
  [87.31, 130.81, 174.61, 261.63, 349.23],      // F2 C3 F3 C4 F4
  [65.41, 130.81, 196.0, 261.63, 329.63],       // C2 C3 G3 C4 E4
  [73.42, 110.0, 146.83, 220.0, 293.66],
  [58.27, 116.54, 174.61, 233.08, 349.23]
];
for (let b = 0; b < 6; b++) padChord(b * 8, b * 8 + 8.2, CHORDS[b], 0.9);

// soft kick pulse on beats: enters lightly at 4s, full from 9s, big from 41.15 side-chain feel
for (let bt = 0; bt * BEAT < DUR; bt++) {
  const t0 = bt * BEAT;
  if (t0 < 4) continue;
  const g = t0 < 9 ? 0.20 : t0 < 41 ? 0.30 : 0.24;
  kick(t0, g);
}

// pluck arpeggio: eighth notes from 4s, pattern D F A C (D minor) rising through sections
const ARP = [293.66, 349.23, 440.0, 523.25, 587.33, 523.25, 440.0, 349.23];
for (let e = 0; ; e++) {
  const t0 = 4 + e * (BEAT / 2);
  if (t0 >= 47.2) break;
  const active = t0 >= 4 && !(t0 > 40.6 && t0 < 41.8) && t0 < 46.8;
  if (!active) continue;
  const section = t0 < 9 ? 0.16 : t0 < 33 ? 0.30 : t0 < 41 ? 0.34 : 0.22;
  const f = ARP[e % ARP.length] * (t0 >= 33 ? 1 : 0.5);
  pluck(t0, f, section, (e % 2 ? 0.25 : -0.25));
}

// SFX — scene entries: whoosh + soft kick accent at every 4s cut from 9s
for (let s = 9; s <= 41; s += 4) whoosh(s - 0.12, 0.30);

// S1: toggle flip click + bloom swell handled by click at 0.92
click(0.92, 0.9);
kick(0.92, 0.5, 90, 38, 0.3);
// S3a toggle clicks
click(10.75, 0.7); click(11.85, 0.55);
// S3b calendar pick
click(15.35, 0.5); click(15.95, 0.4);
// S3c slider ticks during 18.3-19.4
for (let i = 0; i < 9; i++) click(18.3 + i * 0.11, 0.18);
// S3f typing keypresses 30.0-31.1 (22 chars → every 0.05s)
for (let i = 0; i < 22; i++) keypress(30.0 + i * 0.05, 0.5);
click(31.5, 0.6); // CLI success
shimmer(31.5, 0.10);
// S4 words soft accents
kick(33.5, 0.4, 100, 45, 0.18); kick(34.1, 0.35, 100, 45, 0.18); kick(34.7, 0.45, 100, 45, 0.18);
// S5: riser → sub-drop → glint shimmer → final soft chord
riser(39.2, 41.05, 0.5);
subDrop(41.12, 0.9);
shimmer(42.5, 0.16);
padChord(41.2, 47.9, [73.42, 146.83, 220.0, 293.66, 440.0], 1.15); // final Dm add9 bloom

// tape hiss floor
hiss(0.012);

/* ---------- master: gentle bus comp + soft clip + fades ---------- */
const out = new Int16Array(N * 2);
let ca = 0, cb = 0;
for (let i = 0; i < N; i++) {
  // simple stereo bus compressor (envelope follower)
  const lvl = Math.max(Math.abs(L[i]), Math.abs(R[i]));
  ca = Math.max(lvl, ca * 0.9995 + lvl * 0.0005);
  cb = ca;
  const g = lvl > 0.45 ? 0.45 / lvl * 0.6 + 0.4 : 1;
  let l = L[i] * g, r = R[i] * g;
  l = Math.tanh(l * 1.15) * 0.92;
  r = Math.tanh(r * 1.15) * 0.92;
  // master fades
  const fi = i < 0.35 * SR ? i / (0.35 * SR) : 1;
  const foT = (N - i) / SR;
  const fo = foT < 0.8 ? foT / 0.8 : 1;
  const m = fi * fo;
  out[i * 2] = Math.max(-32768, Math.min(32767, Math.round(l * m * 32767)));
  out[i * 2 + 1] = Math.max(-32768, Math.min(32767, Math.round(r * m * 32767)));
}
/* write WAV */
const dataSize = out.length * 2;
const buf = Buffer.alloc(44 + dataSize);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + dataSize, 4); buf.write('WAVE', 8);
buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
buf.write('data', 36); buf.writeUInt32LE(dataSize, 40);
for (let i = 0; i < out.length; i++) buf.writeInt16LE(out[i], 44 + i * 2);
const outPath = path.join(__dirname, 'score.wav');
fs.writeFileSync(outPath, buf);
console.log('wrote', outPath, (dataSize / 1024 / 1024).toFixed(1) + 'MB', DUR + 's');
