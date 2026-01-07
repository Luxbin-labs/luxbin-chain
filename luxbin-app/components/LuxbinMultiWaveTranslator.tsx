"use client";

import { useState, useEffect, useRef } from 'react';

const LUXBIN_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,!?;:-()[]{}@#$%^&*+=_~`<>\"'|\\";

interface WaveData {
  colors: string[];
  wavelengths: string[];
  frequencies: string[];
  amplitudes: number[][];
}

export function LuxbinMultiWaveTranslator() {
  const [inputText, setInputText] = useState('HELLO QUANTUM');
  const [currentMode, setCurrentMode] = useState<'photonic' | 'acoustic' | 'radio' | 'superposition'>('photonic');
  const [naturalLang, setNaturalLang] = useState('Your input text will appear here');
  const [luxbinDict, setLuxbinDict] = useState('LUXBIN characters will appear here');
  const [binaryCode, setBinaryCode] = useState('Binary representation will appear here');
  const [colors, setColors] = useState<string[]>([]);
  const [wavelengths, setWavelengths] = useState<string[]>([]);
  const [frequencies, setFrequencies] = useState<string[]>([]);
  const [amplitudes, setAmplitudes] = useState<number[][]>([]);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationRef = useRef<number | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  // Initialize with example
  useEffect(() => {
    handleTranslate();
  }, []);

  // HSL to RGB conversion
  const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
    h /= 360;
    s /= 100;
    l /= 100;
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  };

  // Text to binary
  const textToBinary = (text: string): string => {
    return text.split('').map(char => {
      return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
  };

  // Binary to LUXBIN
  const binaryToLuxbin = (binary: string): string => {
    const cleanBinary = binary.replace(/\s/g, '');
    let result = '';
    for (let i = 0; i < cleanBinary.length; i += 6) {
      const chunk = cleanBinary.substr(i, 6).padEnd(6, '0');
      const index = parseInt(chunk, 2) % LUXBIN_ALPHABET.length;
      result += LUXBIN_ALPHABET[index];
    }
    return result;
  };

  // LUXBIN to waves
  const luxbinToWaves = (luxbin: string): WaveData => {
    const colors: string[] = [];
    const wavelengths: string[] = [];
    const frequencies: string[] = [];
    const amplitudes: number[][] = [];

    for (let i = 0; i < luxbin.length; i += 3) {
      const char1 = luxbin[i] || 'A';
      const char2 = luxbin[i + 1] || 'A';
      const char3 = luxbin[i + 2] || 'A';

      const index1 = LUXBIN_ALPHABET.indexOf(char1.toUpperCase());
      const index2 = LUXBIN_ALPHABET.indexOf(char2.toUpperCase());
      const index3 = LUXBIN_ALPHABET.indexOf(char3.toUpperCase());

      // Primary wavelength (visible light)
      const hue = (index1 / LUXBIN_ALPHABET.length) * 360;
      const rgb = hslToRgb(hue, 80, 60);
      colors.push(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
      wavelengths.push(`${Math.round(400 + (hue / 360) * 300)}nm`);

      // Secondary frequencies based on mode
      if (currentMode === 'acoustic') {
        const freq1 = 200 + (index1 / LUXBIN_ALPHABET.length) * 19980;
        frequencies.push(`${Math.round(freq1)}Hz`);
        amplitudes.push([0.3, 0.3, 0.3]);
      } else if (currentMode === 'radio') {
        const freq1 = 1000000 + (index1 / LUXBIN_ALPHABET.length) * 99000000;
        frequencies.push(`${(freq1/1000000).toFixed(1)}MHz`);
        amplitudes.push([0.3, 0.3, 0.3]);
      } else if (currentMode === 'superposition') {
        const baseFreq = 440 + (index1 / LUXBIN_ALPHABET.length) * 880;
        const freq1 = baseFreq;
        const freq2 = baseFreq * 1.25;
        const freq3 = baseFreq * 1.5;
        frequencies.push(`${Math.round(freq1)}Hz | ${Math.round(freq2)}Hz | ${Math.round(freq3)}Hz`);
        amplitudes.push([0.4, 0.4, 0.4]);
      } else {
        frequencies.push('');
        amplitudes.push([0.3]);
      }
    }

    return { colors, wavelengths, frequencies, amplitudes };
  };

  // Draw waves on canvas
  const drawWaves = (colors: string[], amplitudes: number[][]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const time = Date.now() * 0.005;
    const centerY = canvas.height / 2;

    colors.forEach((color, index) => {
      if (index >= 3) return;

      const amp = amplitudes[index] || [0.3, 0.3, 0.3];
      const yOffset = (index - 1) * 40;

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let x = 0; x < canvas.width; x++) {
        let y = 0;

        if (currentMode === 'superposition' && index === 0) {
          y += Math.sin(x * 0.02 + time) * amp[0] * 30;
          y += Math.sin(x * 0.025 + time * 1.25) * amp[1] * 30;
          y += Math.sin(x * 0.03 + time * 1.5) * amp[2] * 30;
        } else {
          y = Math.sin(x * 0.02 + time + index * Math.PI / 3) * amp[0] * 30;
        }

        if (x === 0) {
          ctx.moveTo(x, centerY + y + yOffset);
        } else {
          ctx.lineTo(x, centerY + y + yOffset);
        }
      }

      ctx.stroke();
    });
  };

  // Play audio
  const playAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    stopAudio();

    frequencies.forEach((freqStr, index) => {
      if (currentMode === 'superposition' && index === 0) {
        const baseFreq = parseFloat(freqStr.split(' | ')[0]);
        const freqs = [baseFreq, baseFreq * 1.25, baseFreq * 1.5];

        freqs.forEach((freq, i) => {
          const oscillator = audioContextRef.current!.createOscillator();
          const gainNode = audioContextRef.current!.createGain();

          oscillator.frequency.setValueAtTime(freq, audioContextRef.current!.currentTime);
          oscillator.type = 'sine';

          gainNode.gain.setValueAtTime(amplitudes[index][i] || 0.1, audioContextRef.current!.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current!.currentTime + 2);

          oscillator.connect(gainNode);
          gainNode.connect(audioContextRef.current!.destination);

          oscillator.start();
          oscillator.stop(audioContextRef.current!.currentTime + 2);

          oscillatorsRef.current.push(oscillator);
        });
      } else {
        const freq = parseFloat(freqStr.split('Hz')[0] || freqStr.split('MHz')[0]);
        if (freq && freq > 0) {
          const oscillator = audioContextRef.current!.createOscillator();
          const gainNode = audioContextRef.current!.createGain();

          oscillator.frequency.setValueAtTime(freq, audioContextRef.current!.currentTime);
          oscillator.type = 'sine';

          gainNode.gain.setValueAtTime(0.1, audioContextRef.current!.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current!.currentTime + 1);

          oscillator.connect(gainNode);
          gainNode.connect(audioContextRef.current!.destination);

          oscillator.start();
          oscillator.stop(audioContextRef.current!.currentTime + 1);

          oscillatorsRef.current.push(oscillator);
        }
      }
    });
  };

  // Stop audio
  const stopAudio = () => {
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Already stopped
      }
    });
    oscillatorsRef.current = [];
  };

  // Handle translate
  const handleTranslate = () => {
    if (!inputText.trim()) return;

    setActiveStep(null);

    setTimeout(() => {
      setNaturalLang(inputText);
      setActiveStep(1);

      setTimeout(() => {
        const binary = textToBinary(inputText);
        setBinaryCode(binary);
        setActiveStep(2);

        setTimeout(() => {
          const luxbin = binaryToLuxbin(binary);
          setLuxbinDict(luxbin);
          setActiveStep(3);

          setTimeout(() => {
            const waveData = luxbinToWaves(luxbin);
            setColors(waveData.colors);
            setWavelengths(waveData.wavelengths);
            setFrequencies(waveData.frequencies);
            setAmplitudes(waveData.amplitudes);
            setActiveStep(4);

            // Start wave animation
            setIsAnimating(true);
            const animate = () => {
              drawWaves(waveData.colors, waveData.amplitudes);
              animationRef.current = requestAnimationFrame(animate);
            };
            animate();
          }, 1000);
        }, 1000);
      }, 1000);
    }, 500);
  };

  // Generate light show
  const generateLightShow = () => {
    if (!inputText.trim()) {
      alert('Please enter some text first!');
      return;
    }

    const waveData = luxbinToWaves(luxbinDict);
    setIsAnimating(true);

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    let time = 0;
    const animate = () => {
      time += 0.02;
      drawWaves(waveData.colors, waveData.amplitudes);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Flash the step indicator
    setActiveStep(4);
    setTimeout(() => setActiveStep(null), 200);
    setTimeout(() => setActiveStep(4), 400);

    // Auto-play audio if in audio mode
    if (currentMode !== 'photonic') {
      setTimeout(() => playAudio(), 500);
    }
  };

  // Clear all
  const clearAll = () => {
    setInputText('');
    setNaturalLang('Your input text will appear here');
    setLuxbinDict('LUXBIN characters will appear here');
    setBinaryCode('Binary representation will appear here');
    setColors([]);
    setWavelengths([]);
    setFrequencies([]);
    setAmplitudes([]);
    setActiveStep(null);

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    stopAudio();
    setIsAnimating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-orange-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          🌈🎵 LUXBIN Multi-Wave Translator
        </h1>
        <p className="text-center text-xl opacity-90 mb-8">
          Advanced photonic communication with acoustic superposition and multi-wavelength encoding
        </p>

        <div className="mb-8">
          <label className="block text-lg font-semibold mb-2">Enter Natural Language:</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 resize-none"
            rows={4}
            placeholder="Type your message here... e.g., 'Hello Quantum World'"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setCurrentMode('photonic')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              currentMode === 'photonic' ? 'bg-cyan-500 text-black' : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            🌈 Photonic Only
          </button>
          <button
            onClick={() => setCurrentMode('acoustic')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              currentMode === 'acoustic' ? 'bg-green-500 text-black' : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            🎵 Acoustic Waves
          </button>
          <button
            onClick={() => setCurrentMode('radio')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              currentMode === 'radio' ? 'bg-blue-500 text-black' : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            📻 Radio Waves
          </button>
          <button
            onClick={() => setCurrentMode('superposition')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              currentMode === 'superposition' ? 'bg-yellow-500 text-black' : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            ⚛️ Quantum Superposition
          </button>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={handleTranslate}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full font-bold text-lg hover:scale-105 transition-transform"
          >
            🔄 Translate to LUXBIN
          </button>
          <button
            onClick={generateLightShow}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-bold text-lg hover:scale-105 transition-transform"
          >
            ✨ Generate Light Show
          </button>
          <button
            onClick={clearAll}
            className="px-8 py-4 bg-red-500/80 hover:bg-red-500 rounded-full font-bold text-lg transition-colors"
          >
            🗑️ Clear
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-lg bg-white/10 backdrop-blur-sm border-2 transition-all ${
            activeStep === 1 ? 'border-cyan-400 bg-white/20' : 'border-white/20'
          }`}>
            <h3 className="text-xl font-bold mb-4 text-orange-400">📝 Natural Language</h3>
            <div className="bg-black/50 p-4 rounded font-mono text-sm max-h-32 overflow-y-auto">
              {naturalLang}
            </div>
          </div>

          <div className={`p-6 rounded-lg bg-white/10 backdrop-blur-sm border-2 transition-all ${
            activeStep === 2 ? 'border-cyan-400 bg-white/20' : 'border-white/20'
          }`}>
            <h3 className="text-xl font-bold mb-4 text-purple-400">📚 LUXBIN Dictionary</h3>
            <div className="bg-black/50 p-4 rounded font-mono text-sm max-h-32 overflow-y-auto">
              {luxbinDict}
            </div>
          </div>

          <div className={`p-6 rounded-lg bg-white/10 backdrop-blur-sm border-2 transition-all ${
            activeStep === 3 ? 'border-cyan-400 bg-white/20' : 'border-white/20'
          }`}>
            <h3 className="text-xl font-bold mb-4 text-green-400">🔢 Binary Code</h3>
            <div className="bg-black/50 p-4 rounded font-mono text-xs max-h-32 overflow-y-auto">
              {binaryCode}
            </div>
          </div>

          <div className={`p-6 rounded-lg bg-white/10 backdrop-blur-sm border-2 transition-all ${
            activeStep === 4 ? 'border-cyan-400 bg-white/20' : 'border-white/20'
          }`}>
            <h3 className="text-xl font-bold mb-4 text-cyan-400">🌈 Multi-Wave Encoding</h3>
            <div className="flex flex-wrap gap-2 mb-4 max-h-20 overflow-y-auto">
              {colors.map((color, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded border border-white/30"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="text-xs opacity-80 mb-2">
              Wavelengths: {wavelengths.slice(0, 5).join(', ')}{wavelengths.length > 5 ? '...' : ''}
            </div>
            {frequencies.length > 0 && (
              <div className="text-xs opacity-80">
                Frequencies: {frequencies.slice(0, 2).join(', ')}{frequencies.length > 2 ? '...' : ''}
              </div>
            )}
            {(currentMode === 'acoustic' || currentMode === 'radio' || currentMode === 'superposition') && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={playAudio}
                  className="px-3 py-1 bg-green-500/80 hover:bg-green-500 rounded text-sm transition-colors"
                >
                  ▶️ Play
                </button>
                <button
                  onClick={stopAudio}
                  className="px-3 py-1 bg-red-500/80 hover:bg-red-500 rounded text-sm transition-colors"
                >
                  ⏹️ Stop
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-black/50 p-6 rounded-lg backdrop-blur-sm border border-white/20 mb-8">
          <h3 className="text-2xl font-bold mb-4 text-center">🌊 Wave Visualization</h3>
          <canvas
            ref={canvasRef}
            width={800}
            height={200}
            className="w-full bg-gradient-to-b from-gray-900 to-black rounded border border-white/20"
          />
          {currentMode === 'superposition' && (
            <div className="mt-4 p-4 bg-yellow-500/20 rounded border border-yellow-500/50">
              <h4 className="text-yellow-400 font-bold">⚛️ Quantum Superposition Active</h4>
              <p className="text-sm opacity-90">
                Three wavelengths with matched amplitudes create quantum-like interference patterns for enhanced data density and computer communication.
              </p>
            </div>
          )}
        </div>

        <div className="text-center opacity-70">
          <p>Multi-modal communication: Photonic + Acoustic + Radio waves with quantum superposition | Powered by LUXBIN Light Language</p>
        </div>
      </div>
    </div>
  );
}