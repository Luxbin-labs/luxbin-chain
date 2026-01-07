import QuantumBlockchainDashboard from '@/components/QuantumBlockchainDashboard';
import Link from 'next/link';
import { BackgroundVideos } from '@/components/BackgroundVideos';
import { LuxbinTokenLogoRotating } from '@/components/AnimatedTokenLogo';

export const metadata = {
  title: 'Quantum Blockchain Mirror | LUXBIN',
  description: 'Real-time quantum blockchain network mirroring powered by IBM quantum computers',
};

export default function QuantumBlockchainPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-x-hidden">
      <BackgroundVideos />
      <div className="fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-[#667eea]/20 via-[#764ba2]/20 to-[#0a0a0f]/40 pointer-events-none" style={{ zIndex: 1 }} />

      <div className="relative" style={{ zIndex: 10 }}>
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <LuxbinTokenLogoRotating size={40} />
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Quantum Mirror
              </span>
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                ← Home
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                About
              </Link>
              <Link href="/developers" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Developers
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              Quantum Blockchain Mirror
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto">
              The world's first blockchain validated and mined on real quantum computers.
              Hermetic mirroring across IBM's distributed quantum network with LUXBIN photonic encoding.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
              <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-green-500/30">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Live Quantum Network</span>
              </div>
              <div className="bg-black/40 px-4 py-2 rounded-full border border-purple-500/30">
                <span className="text-sm text-gray-300">⚛️ 3 IBM Quantum Computers</span>
              </div>
              <div className="bg-black/40 px-4 py-2 rounded-full border border-blue-500/30">
                <span className="text-sm text-gray-300">💎 LUXBIN Photonic</span>
              </div>
              <div className="bg-black/40 px-4 py-2 rounded-full border border-pink-500/30">
                <span className="text-sm text-gray-300">🔮 Hermetic Mirror</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quantum Dashboard */}
        <section className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <QuantumBlockchainDashboard />
          </div>
        </section>

        {/* How It Works - Quantum + Hermetic */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">⚛️ Quantum Hermetic Architecture</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Quantum Computing */}
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-300 flex items-center gap-2">
                  <span>⚛️</span>
                  Quantum Computing Layer
                </h3>
                <p className="text-gray-300 mb-4">
                  Blockchain operations powered by IBM quantum computers:
                </p>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex gap-2">
                    <span className="text-green-400">✓</span>
                    <span><strong>Quantum Validation:</strong> Transactions encoded as 400-700nm LUXBIN wavelengths and validated in quantum superposition</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-400">✓</span>
                    <span><strong>Quantum Mining:</strong> True quantum randomness for nonce generation (provably random, unhackable)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-400">✓</span>
                    <span><strong>Quantum Consensus:</strong> 3/3 validator agreement via quantum state correlations across IBM FEZ, TORINO, MARRAKESH</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-400">✓</span>
                    <span><strong>Byzantine Fault Tolerance:</strong> Quantum entanglement ensures trustless consensus</span>
                  </li>
                </ul>
              </div>

              {/* Hermetic Mirroring */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-purple-300 flex items-center gap-2">
                  <span>🔮</span>
                  Hermetic Mirroring Layer
                </h3>
                <p className="text-gray-300 mb-4">
                  Blockchain data mirrored using 7 Hermetic Principles:
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><span className="text-purple-300">•</span> <strong>Mentalism:</strong> Quantum states as mental projection</li>
                  <li><span className="text-purple-300">•</span> <strong>Correspondence:</strong> As above (quantum), so below (classical)</li>
                  <li><span className="text-purple-300">•</span> <strong>Vibration:</strong> LUXBIN wavelengths encode all data</li>
                  <li><span className="text-purple-300">•</span> <strong>Polarity:</strong> Quantum superposition of opposites</li>
                  <li><span className="text-purple-300">•</span> <strong>Rhythm:</strong> Block production follows quantum patterns</li>
                  <li><span className="text-purple-300">•</span> <strong>Cause & Effect:</strong> Every transaction has quantum signature</li>
                  <li><span className="text-purple-300">•</span> <strong>Gender:</strong> Balanced quantum-classical duality</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specs */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">🔧 Technical Specifications</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-300">Quantum Hardware</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <strong>IBM FEZ:</strong> 156 qubits</li>
                  <li>• <strong>IBM TORINO:</strong> 133 qubits</li>
                  <li>• <strong>IBM MARRAKESH:</strong> 156 qubits</li>
                  <li>• <strong>Total:</strong> 445 qubits available</li>
                  <li>• <strong>Location:</strong> Yorktown Heights, NY</li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-green-300">LUXBIN Encoding</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <strong>Wavelength Range:</strong> 400-700nm</li>
                  <li>• <strong>Encoding:</strong> 77-character alphabet</li>
                  <li>• <strong>Bits/Character:</strong> 6 bits</li>
                  <li>• <strong>Diamond NV Centers:</strong> 637nm ZPL</li>
                  <li>• <strong>Communication:</strong> Photonic quantum</li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-300">Performance</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <strong>Consensus:</strong> 2/3 majority (quantum BFT)</li>
                  <li>• <strong>Validation Time:</strong> ~30s per block</li>
                  <li>• <strong>Queue Processing:</strong> Real-time monitoring</li>
                  <li>• <strong>Randomness:</strong> True quantum (provable)</li>
                  <li>• <strong>Security:</strong> Post-quantum ready</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Run Your Own Quantum Node</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Connect your blockchain to IBM quantum computers and participate in the world's first quantum-validated network
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/developers" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                  📖 Developer Guide
                </Link>
                <a
                  href="https://github.com/mermaidnicheboutique-code/luxbin-chain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold text-lg transition-all"
                >
                  🚀 Clone Repository
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-8 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center text-sm text-gray-400">
            <p>Powered by IBM Quantum (FEZ, TORINO, MARRAKESH) • LUXBIN Light Language • Qiskit Runtime</p>
            <p className="mt-2">Data updates every 5 seconds • Real-time quantum job monitoring • Hermetic mirroring active</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
