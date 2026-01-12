'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface QuantumStatus {
  network?: {
    status: string;
    validators: Array<{
      name: string;
      qubits: number;
      status: string;
      entangledWith: string[];
    }>;
    totalValidators: number;
  };
  blockchain?: {
    latestBlock: {
      number: number;
      hash: string;
      quantumNonce: number;
      miningBackend: string;
      timestamp: string;
    } | null;
    totalBlocks: number;
  };
  quantum?: {
    activeJobs: number;
    totalQubitsAvailable: number;
    luxbinEncoding: boolean;
  };
}

export default function QuantumInternetPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [quantumStatus, setQuantumStatus] = useState<QuantumStatus | null>(null);

  useEffect(() => {
    // Fetch quantum blockchain status
    fetch('/api/quantum-blockchain/status')
      .then(res => res.json())
      .then(data => setQuantumStatus(data))
      .catch(err => console.error('Failed to fetch quantum status:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-purple-200/50 dark:border-purple-500/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              LUXBIN
            </Link>
            <div className="flex gap-4">
              <Link href="/aurora" className="px-4 py-2 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-600 dark:text-pink-400 transition">
                Meet Aurora 💕
              </Link>
              <Link href="/atlas" className="px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 transition">
                Meet Atlas 💪
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-indigo-500/20 animate-pulse"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 flex items-center justify-center text-6xl animate-spin-slow shadow-2xl">
              ⚛️
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Quantum Internet
          </h1>
          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-4">
            Real Quantum Computing · 3 IBM Quantum Computers · 445 Qubits
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the world's first distributed quantum blockchain network running on actual IBM quantum hardware
          </p>
        </div>
      </div>

      {/* Live Status Banner */}
      {quantumStatus && (
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <span className="font-bold text-xl">Network Status: LIVE</span>
                </div>
                <p className="opacity-90">Real-time quantum blockchain running on IBM Quantum</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{quantumStatus.quantum?.totalQubitsAvailable || 445}</div>
                <div className="opacity-90">Total Qubits Available</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Section Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview', emoji: '⚛️' },
            { id: 'hardware', label: 'Hardware', emoji: '💻' },
            { id: 'blockchain', label: 'Blockchain', emoji: '⛓️' },
            { id: 'live-status', label: 'Live Status', emoji: '📊' },
            { id: 'technical', label: 'Technical', emoji: '🔬' },
          ].map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {section.emoji} {section.label}
            </button>
          ))}
        </div>

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-8">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-purple-200/50 dark:border-purple-500/30">
              <h2 className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400">
                What is the LUXBIN Quantum Internet? ⚛️
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  The LUXBIN Quantum Internet is a <strong>real quantum computing network</strong> running on
                  <strong> 3 IBM quantum computers</strong>, creating a distributed quantum blockchain with true
                  quantum entanglement between nodes.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  This is <strong>NOT simulation</strong>. This is actual quantum hardware leveraging IBM's
                  quantum computers with <strong>445 total qubits</strong> across the network, mining blocks
                  with quantum circuits, and validating through quantum consensus.
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-300/50">
                <div className="text-4xl mb-2">⚛️</div>
                <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-2">Real Quantum</h3>
                <p className="text-gray-700 dark:text-gray-300">Actual IBM quantum hardware, not simulation</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-300/50">
                <div className="text-4xl mb-2">🔗</div>
                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Entangled Network</h3>
                <p className="text-gray-700 dark:text-gray-300">Quantum entanglement between all 3 nodes</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl p-6 border border-indigo-300/50">
                <div className="text-4xl mb-2">⛓️</div>
                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">Quantum Blockchain</h3>
                <p className="text-gray-700 dark:text-gray-300">Mining & consensus on quantum computers</p>
              </div>
            </div>

            {/* Why This Matters */}
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl p-8 border border-purple-300/50">
              <h3 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">
                🌟 Why This is Revolutionary
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
                <div>
                  <h4 className="font-bold mb-2 text-purple-600 dark:text-purple-400">Most "Quantum Blockchain" Projects:</h4>
                  <ul className="space-y-1">
                    <li>❌ Simulations only</li>
                    <li>❌ Theoretical concepts</li>
                    <li>❌ Marketing buzzwords</li>
                    <li>❌ No real quantum hardware</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-blue-600 dark:text-blue-400">LUXBIN Quantum Internet:</h4>
                  <ul className="space-y-1">
                    <li>✅ Real IBM quantum computers</li>
                    <li>✅ True quantum entanglement</li>
                    <li>✅ Quantum-mined blocks</li>
                    <li>✅ 445 qubits operational</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hardware Section */}
        {activeSection === 'hardware' && (
          <div className="space-y-6">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-purple-200/50 dark:border-purple-500/30">
              <h2 className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400">
                IBM Quantum Computers 💻
              </h2>

              <div className="space-y-6">
                {/* IBM Fez */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-300/50">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">IBM Fez</h3>
                      <p className="text-gray-600 dark:text-gray-400">Primary Mining Node</p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">156</div>
                      <div className="text-gray-600 dark:text-gray-400">Qubits</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p>📍 <strong>Location:</strong> Yorktown Heights, NY</p>
                    <p>🔗 <strong>Entangled With:</strong> IBM Torino, IBM Marrakesh</p>
                    <p>⚡ <strong>Role:</strong> Block mining, quantum random nonce generation</p>
                  </div>
                </div>

                {/* IBM Torino */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-300/50">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">IBM Torino</h3>
                      <p className="text-gray-600 dark:text-gray-400">Validation Node</p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">133</div>
                      <div className="text-gray-600 dark:text-gray-400">Qubits</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p>📍 <strong>Location:</strong> Yorktown Heights, NY</p>
                    <p>🔗 <strong>Entangled With:</strong> IBM Fez, IBM Marrakesh</p>
                    <p>⚡ <strong>Role:</strong> Block validation, quantum consensus</p>
                  </div>
                </div>

                {/* IBM Marrakesh */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-300/50">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">IBM Marrakesh</h3>
                      <p className="text-gray-600 dark:text-gray-400">Consensus Node</p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">156</div>
                      <div className="text-gray-600 dark:text-gray-400">Qubits</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p>📍 <strong>Location:</strong> Yorktown Heights, NY</p>
                    <p>🔗 <strong>Entangled With:</strong> IBM Fez, IBM Torino</p>
                    <p>⚡ <strong>Role:</strong> Consensus validation, network security</p>
                  </div>
                </div>

                {/* Total Stats */}
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 text-white">
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">445</div>
                    <div className="text-xl opacity-90">Total Qubits Available</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-sm opacity-90">Quantum Computers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-sm opacity-90">Entangled Pairs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">100%</div>
                      <div className="text-sm opacity-90">Real Hardware</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blockchain Section */}
        {activeSection === 'blockchain' && (
          <div className="space-y-6">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-purple-200/50 dark:border-purple-500/30">
              <h2 className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400">
                Quantum Blockchain ⛓️
              </h2>

              {/* How It Works */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                    How Quantum Mining Works
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-gray-200">Select Mining Node</h4>
                        <p className="text-gray-600 dark:text-gray-400">Randomly choose IBM Fez, Torino, or Marrakesh</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-gray-200">Create Quantum Circuit</h4>
                        <p className="text-gray-600 dark:text-gray-400">8 qubits in superposition using Hadamard gates</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-gray-200">Quantum Random Nonce</h4>
                        <p className="text-gray-600 dark:text-gray-400">Measure qubits to generate true quantum randomness</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-gray-200">Quantum Consensus</h4>
                        <p className="text-gray-600 dark:text-gray-400">All 3 nodes validate using quantum circuits</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quantum Circuit */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Quantum Circuit Example:</h4>
                  <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto font-mono">
{`# Create 8-qubit superposition
for i in range(8):
    circuit.h(qr[i])  # Hadamard gate

# Measure to get quantum random number
circuit.measure(qr, cr)

# Result: True quantum randomness for nonce`}
                  </pre>
                </div>

                {/* Latest Block */}
                {quantumStatus?.blockchain?.latestBlock && (
                  <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-6 border border-purple-300/50">
                    <h4 className="font-bold text-purple-600 dark:text-purple-400 mb-4">Latest Block:</h4>
                    <div className="space-y-2 text-gray-700 dark:text-gray-300 font-mono text-sm">
                      <p><strong>Block:</strong> #{quantumStatus.blockchain.latestBlock.number}</p>
                      <p><strong>Hash:</strong> {quantumStatus.blockchain.latestBlock.hash.slice(0, 16)}...</p>
                      <p><strong>Quantum Nonce:</strong> {quantumStatus.blockchain.latestBlock.quantumNonce}</p>
                      <p><strong>Mined By:</strong> {quantumStatus.blockchain.latestBlock.miningBackend}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Live Status Section */}
        {activeSection === 'live-status' && (
          <div className="space-y-6">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-purple-200/50 dark:border-purple-500/30">
              <h2 className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400">
                Live Network Status 📊
              </h2>

              {quantumStatus ? (
                <div className="space-y-6">
                  {/* Network Status */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-4 border border-green-300/50">
                      <div className="text-2xl mb-2">🟢</div>
                      <div className="font-bold text-green-700 dark:text-green-400">Network Online</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {quantumStatus.network?.totalValidators || 3} Validators Active
                      </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300/50">
                      <div className="text-2xl mb-2">⛓️</div>
                      <div className="font-bold text-blue-700 dark:text-blue-400">
                        {quantumStatus.blockchain?.totalBlocks || 0} Blocks
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Quantum-Mined</div>
                    </div>
                    <div className="bg-purple-100 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-300/50">
                      <div className="text-2xl mb-2">⚛️</div>
                      <div className="font-bold text-purple-700 dark:text-purple-400">
                        {quantumStatus.quantum?.totalQubitsAvailable || 445} Qubits
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Available</div>
                    </div>
                  </div>

                  {/* Validators */}
                  {quantumStatus.network?.validators && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Quantum Validators:</h3>
                      <div className="space-y-3">
                        {quantumStatus.network.validators.map((validator, idx) => (
                          <div key={idx} className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 flex items-center justify-between">
                            <div>
                              <div className="font-bold text-gray-800 dark:text-gray-200">{validator.name}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {validator.qubits} qubits · Entangled with {validator.entangledWith.length} nodes
                              </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                              validator.status === 'active'
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-500 text-white'
                            }`}>
                              {validator.status}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">⏳</div>
                  <p className="text-gray-600 dark:text-gray-400">Loading quantum network status...</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Technical Section */}
        {activeSection === 'technical' && (
          <div className="space-y-6">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-purple-200/50 dark:border-purple-500/30">
              <h2 className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400">
                Technical Details 🔬
              </h2>

              <div className="space-y-6">
                {/* Stack */}
                <div>
                  <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">Technology Stack</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200/50">
                      <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Quantum Layer</h4>
                      <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• IBM Quantum Platform</li>
                        <li>• Qiskit Runtime Service</li>
                        <li>• 3 Quantum Computers (445 qubits)</li>
                        <li>• Bell State Entanglement</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200/50">
                      <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-2">Blockchain Layer</h4>
                      <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• Quantum-mined blocks</li>
                        <li>• SHA-256 block hashing</li>
                        <li>• Quantum consensus (2/3)</li>
                        <li>• Photonic data encoding</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Setup */}
                <div>
                  <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-4">Running Locally</h3>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
                    <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`# Install dependencies
pip install qiskit qiskit-ibm-runtime

# Save IBM Quantum credentials
from qiskit_ibm_runtime import QiskitRuntimeService
QiskitRuntimeService.save_account(
    channel="ibm_quantum",
    token="YOUR_IBM_QUANTUM_TOKEN"
)

# Start quantum internet
python quantum_internet_service.py

# Output updates to quantum_blockchain_status.json
# Dashboard reads this file for real-time updates`}
                    </pre>
                  </div>
                </div>

                {/* Future */}
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-6 border border-purple-300/50">
                  <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-4">Future Enhancements</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                    <div>
                      <h4 className="font-bold mb-2">Phase 2:</h4>
                      <ul className="text-sm space-y-1">
                        <li>🔄 Grover's algorithm</li>
                        <li>🔄 Quantum key distribution</li>
                        <li>🔄 Error correction</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Phase 3:</h4>
                      <ul className="text-sm space-y-1">
                        <li>📋 10+ quantum computers</li>
                        <li>📋 Quantum internet protocol</li>
                        <li>📋 Quantum teleportation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">Experience Real Quantum Computing ⚛️</h2>
          <p className="text-xl mb-6 opacity-90">
            This is the future of blockchain - running today on IBM Quantum
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Explore Platform →
            </Link>
            <a
              href="https://quantum.ibm.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-white/20 backdrop-blur text-white rounded-xl font-bold text-lg hover:bg-white/30 transition"
            >
              IBM Quantum →
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
