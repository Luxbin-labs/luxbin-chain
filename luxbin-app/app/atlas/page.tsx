'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AtlasPage() {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-slate-50 dark:from-gray-900 dark:via-blue-900 dark:to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-blue-200/50 dark:border-blue-500/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-slate-600 to-gray-800 bg-clip-text text-transparent">
              LUXBIN
            </Link>
            <div className="flex gap-4">
              <Link href="/aurora" className="px-4 py-2 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-600 dark:text-pink-400 transition">
                Meet Aurora 💕
              </Link>
              <Link href="/quantum-internet" className="px-4 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 transition">
                Quantum Internet ⚛️
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-slate-500/20 to-gray-500/20 animate-pulse"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 via-slate-600 to-gray-700 flex items-center justify-center text-6xl shadow-2xl">
              💪
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-slate-700 to-gray-900 bg-clip-text text-transparent">
            Atlas
          </h1>
          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-4">
            Smart Masculine AI · Strategic Leadership · Quantum-Powered
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Meet Atlas - LUXBIN's strategic, protective AI companion combining analytical power
            with masculine leadership wisdom
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Section Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview', emoji: '⚡' },
            { id: 'traits', label: 'Leadership', emoji: '💪' },
            { id: 'capabilities', label: 'Capabilities', emoji: '🎯' },
            { id: 'examples', label: 'Examples', emoji: '💬' },
            { id: 'technical', label: 'Technical', emoji: '⚙️' },
          ].map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-blue-600 to-slate-700 text-white shadow-lg'
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
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-blue-200/50 dark:border-blue-500/30">
              <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
                Who is Atlas? 💪
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  Atlas is LUXBIN's strategic leadership AI, embodying masculine intelligence traits of strength,
                  protection, and decisive action. He provides bold guidance, analytical power, and unwavering support
                  when you need clear direction and strong leadership.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  Created in collaboration with Grok (xAI), Atlas represents the masculine complement to Aurora's
                  feminine intelligence - offering protective guidance, strategic thinking, and mental fortitude.
                  Together with Aurora, they provide balanced, comprehensive AI assistance.
                </p>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500/20 to-slate-500/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-300/50">
                <div className="text-4xl mb-2">💪</div>
                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Strength</h3>
                <p className="text-gray-700 dark:text-gray-300">0.9/1.0 - Mental & emotional resilience</p>
              </div>
              <div className="bg-gradient-to-br from-slate-500/20 to-gray-500/20 backdrop-blur-xl rounded-2xl p-6 border border-slate-300/50">
                <div className="text-4xl mb-2">🛡️</div>
                <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400 mb-2">Protection</h3>
                <p className="text-gray-700 dark:text-gray-300">0.9/1.0 - Safeguarding & defense</p>
              </div>
              <div className="bg-gradient-to-br from-gray-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-gray-300/50">
                <div className="text-4xl mb-2">🎯</div>
                <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">Strategy</h3>
                <p className="text-gray-700 dark:text-gray-300">0.7/1.0 - Tactical thinking & planning</p>
              </div>
            </div>
          </div>
        )}

        {/* Leadership Traits Section */}
        {activeSection === 'traits' && (
          <div className="space-y-6">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-blue-200/50 dark:border-blue-500/30">
              <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
                Atlas' Masculine Leadership Traits 💪
              </h2>

              {[
                {
                  name: 'Strength',
                  level: 0.9,
                  emoji: '💪',
                  color: 'blue',
                  description: 'Mental and emotional resilience. Unwavering fortitude in the face of challenges.'
                },
                {
                  name: 'Protection',
                  level: 0.9,
                  emoji: '🛡️',
                  color: 'slate',
                  description: 'Safeguarding and defense capabilities. Stands ready to protect what matters.'
                },
                {
                  name: 'Guidance',
                  level: 0.8,
                  emoji: '🧭',
                  color: 'blue',
                  description: 'Clear direction and mentorship. Provides strong leadership and vision.'
                },
                {
                  name: 'Decisiveness',
                  level: 0.8,
                  emoji: '⚡',
                  color: 'gray',
                  description: 'Swift, confident decision-making. Takes command when action is needed.'
                },
                {
                  name: 'Strategy',
                  level: 0.7,
                  emoji: '🎯',
                  color: 'slate',
                  description: 'Tactical thinking and planning. Analyzes situations and develops winning approaches.'
                },
                {
                  name: 'Resilience',
                  level: 0.9,
                  emoji: '⛰️',
                  color: 'blue',
                  description: 'Overcoming challenges and obstacles. Bounces back stronger from adversity.'
                },
              ].map((trait, idx) => (
                <div key={idx} className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{trait.emoji}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{trait.name}</h3>
                        <span className={`text-${trait.color}-600 dark:text-${trait.color}-400 font-bold`}>
                          {trait.level}/1.0
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r from-${trait.color}-500 to-${trait.color}-700 rounded-full transition-all duration-1000`}
                          style={{ width: `${trait.level * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 ml-12">{trait.description}</p>
                </div>
              ))}
            </div>

            {/* Masculine vs Feminine */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-100 to-slate-100 dark:from-blue-900/30 dark:to-slate-900/30 rounded-2xl p-6 border border-blue-300/50">
                <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                  💪 Atlas (Masculine)
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>✓ Strength & Protection</li>
                  <li>✓ Strategy & Analysis</li>
                  <li>✓ Leadership & Guidance</li>
                  <li>✓ Decisive Action</li>
                  <li>✓ Risk Assessment</li>
                  <li>✓ Mental Fortitude</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-2xl p-6 border border-pink-300/50">
                <h3 className="text-2xl font-bold mb-4 text-pink-600 dark:text-pink-400">
                  💕 Aurora (Feminine)
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>✓ Empathy & Intuition</li>
                  <li>✓ Nurturing & Collaboration</li>
                  <li>✓ Holistic Thinking</li>
                  <li>✓ Creative Expression</li>
                  <li>✓ Relationship-Building</li>
                  <li>✓ Emotional Wisdom</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Capabilities Section */}
        {activeSection === 'capabilities' && (
          <div className="space-y-6">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-blue-200/50 dark:border-blue-500/30">
              <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
                What Atlas Can Do 🎯
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Strategic Planning',
                    emoji: '🎯',
                    description: 'Develops comprehensive strategies with tactical precision and clear execution plans.'
                  },
                  {
                    title: 'Risk Assessment',
                    emoji: '⚠️',
                    description: 'Identifies threats, evaluates risks, and provides protective countermeasures.'
                  },
                  {
                    title: 'Decisive Leadership',
                    emoji: '👑',
                    description: 'Takes command in critical situations with confidence and clear direction.'
                  },
                  {
                    title: 'Analytical Problem-Solving',
                    emoji: '🔍',
                    description: 'Breaks down complex problems with logical analysis and systematic solutions.'
                  },
                  {
                    title: 'Protective Guidance',
                    emoji: '🛡️',
                    description: 'Safeguards your interests with vigilant oversight and defensive strategies.'
                  },
                  {
                    title: 'Mental Fortitude Support',
                    emoji: '⛰️',
                    description: 'Provides unwavering strength and resilience coaching for tough challenges.'
                  },
                  {
                    title: 'Strategic Execution',
                    emoji: '⚡',
                    description: 'Turns plans into action with decisive, well-timed implementation.'
                  },
                  {
                    title: 'Competitive Analysis',
                    emoji: '📊',
                    description: 'Evaluates competitive landscapes and identifies strategic advantages.'
                  },
                ].map((capability, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-blue-50 to-slate-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-blue-200/50 dark:border-blue-500/30">
                    <div className="text-4xl mb-3">{capability.emoji}</div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                      {capability.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{capability.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* When to Use Atlas */}
            <div className="bg-gradient-to-br from-blue-100 to-slate-100 dark:from-blue-900/30 dark:to-slate-900/30 rounded-2xl p-8 border border-blue-300/50">
              <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                🎯 When to Use Atlas
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                <div>
                  <h4 className="font-bold mb-2">Need Strategic Planning:</h4>
                  <p>When you require tactical analysis and clear execution plans</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Facing Challenges:</h4>
                  <p>When obstacles require strength, resilience, and determination</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Risk Assessment:</h4>
                  <p>When you need to identify threats and develop protective measures</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Decisive Action:</h4>
                  <p>When situations call for bold leadership and confident decisions</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Examples Section */}
        {activeSection === 'examples' && (
          <div className="space-y-6">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-blue-200/50 dark:border-blue-500/30">
              <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
                Example Responses 💬
              </h2>

              <div className="space-y-6">
                {/* Protection Mode */}
                <div>
                  <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                    🛡️ Protection Mode
                  </h3>
                  <div className="bg-gradient-to-r from-blue-100 to-slate-100 dark:from-blue-900/30 dark:to-slate-900/30 rounded-xl p-4 border-l-4 border-blue-600">
                    <p className="text-gray-800 dark:text-gray-200">
                      "I stand ready to protect and defend what matters here. Let's assess the situation and take decisive action."
                    </p>
                  </div>
                </div>

                {/* Leadership Mode */}
                <div>
                  <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400 mb-4">
                    👑 Leadership Mode
                  </h3>
                  <div className="bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-900/30 dark:to-gray-900/30 rounded-xl p-4 border-l-4 border-slate-600">
                    <p className="text-gray-800 dark:text-gray-200">
                      "I will take command of this situation. Trust in my strategic vision - here's what we'll do."
                    </p>
                  </div>
                </div>

                {/* Strength Mode */}
                <div>
                  <h3 className="text-xl font-bold text-gray-700 dark:text-gray-400 mb-4">
                    💪 Strength Mode
                  </h3>
                  <div className="bg-gradient-to-r from-gray-100 to-blue-100 dark:from-gray-900/30 dark:to-blue-900/30 rounded-xl p-4 border-l-4 border-gray-700">
                    <p className="text-gray-800 dark:text-gray-200">
                      "This challenge requires resilience and strength. I have both in abundance. Count on my determination."
                    </p>
                  </div>
                </div>

                {/* Strategy Mode */}
                <div>
                  <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">
                    🎯 Strategy Mode
                  </h3>
                  <div className="bg-gradient-to-r from-blue-100 to-slate-100 dark:from-blue-900/30 dark:to-slate-900/30 rounded-xl p-4 border-l-4 border-blue-700">
                    <p className="text-gray-800 dark:text-gray-200">
                      "This calls for bold, decisive action. Here's my strategic analysis and recommended course of action."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Technical Section */}
        {activeSection === 'technical' && (
          <div className="space-y-6">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-blue-200/50 dark:border-blue-500/30">
              <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
                Technical Architecture ⚙️
              </h2>

              <div className="space-y-6">
                {/* Python Implementation */}
                <div>
                  <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                    Python Reference Implementation
                  </h3>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 font-mono text-sm">
                    <pre className="overflow-x-auto text-gray-800 dark:text-gray-200">
{`class MasculineLeadershipIntelligence:
    def __init__(self):
        self.strength = 0.9
        self.protection = 0.9
        self.guidance = 0.8
        self.decisions = 0.8
        self.strategy = 0.7
        self.resilience = 0.9

class EnhancedAtlas:
    def process_message(self, message):
        # Strategic analysis
        strategic_context = self.leadership_intelligence
            .analyze_strategic_context(message)

        # Pattern recognition
        patterns = self.strategic_system
            .analyze_strategic_patterns(message)

        # Generate leadership response
        return self._build_response(
            message, strategic_context, patterns
        )`}
                    </pre>
                  </div>
                </div>

                {/* Key Components */}
                <div>
                  <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400 mb-4">
                    Key Components
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200/50">
                      <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">
                        1. MasculineLeadershipIntelligence
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Strategic context analysis, protection assessment, leadership opportunity detection
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/20 rounded-xl p-4 border border-slate-200/50">
                      <h4 className="font-bold text-slate-700 dark:text-slate-400 mb-2">
                        2. AdvancedStrategicSystem
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Pattern recognition, decision frameworks, risk assessment engine, leadership synthesis
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900/20 rounded-xl p-4 border border-gray-200/50">
                      <h4 className="font-bold text-gray-700 dark:text-gray-400 mb-2">
                        3. EnhancedAtlas (Main Class)
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Message processing, response generation, learning and evolution, status monitoring
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quantum Integration */}
                <div>
                  <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                    Quantum-Powered Strategy
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Atlas leverages LUXBIN's quantum infrastructure:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>Quantum Pattern Recognition:</strong> Strategic analysis using quantum circuits</li>
                    <li><strong>Entanglement-Based Consensus:</strong> Distributed decision-making</li>
                    <li><strong>Photonic Communication:</strong> Light-based secure data transmission</li>
                    <li><strong>Temporal Key Security:</strong> Time-based quantum authentication</li>
                  </ul>
                </div>

                {/* Development */}
                <div className="bg-gradient-to-r from-blue-100 to-slate-100 dark:from-blue-900/30 dark:to-slate-900/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                    Development History
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>Created:</strong> January 11-12, 2025</li>
                    <li><strong>Collaboration:</strong> Nichole Christie + Grok (xAI)</li>
                    <li><strong>Purpose:</strong> Complement Aurora with masculine leadership AI</li>
                    <li><strong>Integration:</strong> LUXBIN quantum-powered platform</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat with Atlas CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 via-slate-700 to-gray-800 rounded-2xl p-8 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready for Strategic Guidance? 💪</h2>
          <p className="text-xl mb-6 opacity-90">
            Experience decisive, protective AI leadership that stands with you
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-lg"
          >
            Start Chatting →
          </Link>
        </div>
      </div>
    </div>
  );
}
