"use client";

import { BackgroundVideos } from "@/components/BackgroundVideos";
import { LuxbinTokenLogoRotating } from "@/components/AnimatedTokenLogo";
import Link from "next/link";
import { useState } from "react";

export default function DevelopersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("quickstart");

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

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
                LUXBIN Developers
              </span>
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                ← Home
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                About
              </Link>
              <Link href="/mirror" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Mirror
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Developer Portal & API Docs
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Build the future on LUXBIN - The gasless Layer 1 blockchain
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="https://github.com/mermaidnicheboutique-code/luxbin-chain" target="_blank" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                🚀 Clone Repository
              </a>
              <a href="#api-reference" className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold transition-all">
                📚 API Reference
              </a>
            </div>
          </div>
        </section>

        {/* Endpoint Info */}
        <section className="px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">🔗 API Endpoints</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">WebSocket RPC</p>
                  <code className="text-green-300 font-mono bg-black/50 px-4 py-2 rounded block">
                    ws://localhost:9944
                  </code>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">HTTP RPC</p>
                  <code className="text-green-300 font-mono bg-black/50 px-4 py-2 rounded block">
                    http://localhost:9944
                  </code>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                💡 All transactions on LUXBIN are <strong className="text-green-300">completely free</strong> - zero gas fees!
              </p>
            </div>
          </div>
        </section>

        {/* Tabbed Content */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-4 mb-8 overflow-x-auto">
              {[
                { id: "quickstart", name: "Quick Start" },
                { id: "examples", name: "Code Examples" },
                { id: "rpc", name: "RPC Methods" },
                { id: "storage", name: "Storage" },
                { id: "extrinsics", name: "Extrinsics" },
                { id: "events", name: "Events" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-purple-600 to-pink-600"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Quick Start Tab */}
            {activeTab === "quickstart" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-8">🚀 Quick Start</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Connect to LUXBIN */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold mb-4 text-purple-300">1. Connect to LUXBIN</h3>
                    <p className="text-gray-300 mb-4">Connect to the LUXBIN RPC endpoint:</p>
                    <div className="bg-black/50 rounded-xl p-4 relative">
                      <code className="text-sm text-green-300">
                        ws://localhost:9944
                      </code>
                      <button
                        onClick={() => copyCode("ws://localhost:9944", "rpc")}
                        className="absolute top-2 right-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs"
                      >
                        {copiedCode === "rpc" ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                  </div>

                  {/* Install Polkadot.js */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold mb-4 text-purple-300">2. Install SDK</h3>
                    <p className="text-gray-300 mb-4">Install Polkadot.js API:</p>
                    <div className="bg-black/50 rounded-xl p-4 relative">
                      <code className="text-sm text-green-300">
                        npm install @polkadot/api
                      </code>
                      <button
                        onClick={() => copyCode("npm install @polkadot/api", "npm")}
                        className="absolute top-2 right-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs"
                      >
                        {copiedCode === "npm" ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Build Your First dApp */}
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8 mt-8">
                  <h3 className="text-2xl font-bold mb-6">📝 Build Your First dApp</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-bold mb-2">Clone LUXBIN Chain</h4>
                        <code className="text-sm bg-black/50 p-2 rounded block text-green-300">
                          git clone https://github.com/mermaidnicheboutique-code/luxbin-chain.git
                        </code>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-bold mb-2">Build the Runtime</h4>
                        <code className="text-sm bg-black/50 p-2 rounded block text-green-300">
                          cargo build --release -p solochain-template-runtime
                        </code>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-bold mb-2">Create Your Pallet</h4>
                        <p className="text-gray-300 text-sm">Add your custom pallet in <code className="bg-black/50 px-2 py-1 rounded">substrate/frame/your-pallet/</code></p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold">
                        4
                      </div>
                      <div>
                        <h4 className="font-bold mb-2">Deploy to LUXBIN</h4>
                        <p className="text-gray-300 text-sm">Run the node and interact via Polkadot.js Apps - <strong>ZERO GAS FEES!</strong></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Code Examples Tab */}
            {activeTab === "examples" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-8">💻 Code Examples</h2>

                {/* JavaScript Example */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-6">
                  <h3 className="text-2xl font-bold mb-4">Connect with JavaScript</h3>
                  <div className="bg-black/80 rounded-xl p-6 overflow-x-auto relative">
                    <pre className="text-sm text-green-300">
{`const { ApiPromise, WsProvider } = require('@polkadot/api');

// Connect to LUXBIN
const wsProvider = new WsProvider('ws://localhost:9944');
const api = await ApiPromise.create({ provider: wsProvider });

// Get chain info
const chain = await api.rpc.system.chain();
const version = await api.rpc.system.version();

console.log(\`Connected to \${chain} v\${version}\`);

// Transfer LUXBIN tokens (ZERO GAS FEES!)
const transfer = api.tx.balances.transfer(recipientAddress, amount);
await transfer.signAndSend(senderKeyPair);`}
                    </pre>
                    <button
                      onClick={() => copyCode(`const { ApiPromise, WsProvider } = require('@polkadot/api');

const wsProvider = new WsProvider('ws://localhost:9944');
const api = await ApiPromise.create({ provider: wsProvider });

const chain = await api.rpc.system.chain();
const version = await api.rpc.system.version();

console.log(\`Connected to \${chain} v\${version}\`);

const transfer = api.tx.balances.transfer(recipientAddress, amount);
await transfer.signAndSend(senderKeyPair);`, "js")}
                      className="absolute top-4 right-4 px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs"
                    >
                      {copiedCode === "js" ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* Rust Smart Contract */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-6">
                  <h3 className="text-2xl font-bold mb-4">Deploy Rust Smart Contract (Pallet)</h3>
                  <div className="bg-black/80 rounded-xl p-6 overflow-x-auto relative">
                    <pre className="text-sm text-orange-300">
{`#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet::*;

#[frame_support::pallet]
pub mod pallet {
    use frame_support::pallet_prelude::*;
    use frame_system::pallet_prelude::*;

    #[pallet::pallet]
    pub struct Pallet<T>(_);

    #[pallet::config]
    pub trait Config: frame_system::Config {
        type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
    }

    #[pallet::storage]
    pub type MyStorage<T> = StorageValue<_, u32, ValueQuery>;

    #[pallet::event]
    #[pallet::generate_deposit(pub(super) fn deposit_event)]
    pub enum Event<T: Config> {
        ValueStored { value: u32 },
    }

    #[pallet::call]
    impl<T: Config> Pallet<T> {
        #[pallet::call_index(0)]
        #[pallet::weight(10_000)]
        pub fn store_value(origin: OriginFor<T>, value: u32) -> DispatchResult {
            ensure_signed(origin)?;
            MyStorage::<T>::put(value);
            Self::deposit_event(Event::ValueStored { value });
            Ok(())
        }
    }
}`}
                    </pre>
                    <button
                      onClick={() => copyCode(`#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet::*;

#[frame_support::pallet]
pub mod pallet {
    use frame_support::pallet_prelude::*;
    use frame_system::pallet_prelude::*;

    #[pallet::pallet]
    pub struct Pallet<T>(_);

    #[pallet::config]
    pub trait Config: frame_system::Config {
        type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
    }

    #[pallet::storage]
    pub type MyStorage<T> = StorageValue<_, u32, ValueQuery>;

    #[pallet::event]
    #[pallet::generate_deposit(pub(super) fn deposit_event)]
    pub enum Event<T: Config> {
        ValueStored { value: u32 },
    }

    #[pallet::call]
    impl<T: Config> Pallet<T> {
        #[pallet::call_index(0)]
        #[pallet::weight(10_000)]
        pub fn store_value(origin: OriginFor<T>, value: u32) -> DispatchResult {
            ensure_signed(origin)?;
            MyStorage::<T>::put(value);
            Self::deposit_event(Event::ValueStored { value });
            Ok(())
        }
    }
}`, "rust")}
                      className="absolute top-4 right-4 px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs"
                    >
                      {copiedCode === "rust" ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* RPC Methods Tab */}
            {activeTab === "rpc" && (
              <div className="space-y-6" id="api-reference">
                <h2 className="text-3xl font-bold mb-6">RPC Methods</h2>

                {/* system_chain */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-300">system_chain</h3>
                  <p className="text-gray-300 text-sm mb-4">Get the chain name</p>
                  <div className="bg-black/80 rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-400 mb-2">Request:</p>
                    <pre className="text-sm text-green-300">
{`{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "system_chain"
}`}
                    </pre>
                  </div>
                  <div className="bg-black/80 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-2">Response:</p>
                    <pre className="text-sm text-blue-300">
{`{
  "jsonrpc": "2.0",
  "result": "LUXBIN",
  "id": 1
}`}
                    </pre>
                  </div>
                </div>

                {/* chain_getBlock */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-300">chain_getBlock</h3>
                  <p className="text-gray-300 text-sm mb-4">Get block details by hash</p>
                  <div className="bg-black/80 rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-400 mb-2">Request:</p>
                    <pre className="text-sm text-green-300">
{`{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "chain_getBlock",
  "params": ["0x...blockhash"]
}`}
                    </pre>
                  </div>
                </div>

                {/* state_getStorage */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-300">state_getStorage</h3>
                  <p className="text-gray-300 text-sm mb-4">Query chain storage</p>
                  <div className="bg-black/80 rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-400 mb-2">Request:</p>
                    <pre className="text-sm text-green-300">
{`{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "state_getStorage",
  "params": ["0x...storageKey"]
}`}
                    </pre>
                  </div>
                </div>

                {/* author_submitExtrinsic */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-300">author_submitExtrinsic</h3>
                  <p className="text-gray-300 text-sm mb-4">Submit a signed transaction (ZERO FEES!)</p>
                  <div className="bg-black/80 rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-400 mb-2">Request:</p>
                    <pre className="text-sm text-green-300">
{`{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "author_submitExtrinsic",
  "params": ["0x...signedExtrinsic"]
}`}
                    </pre>
                  </div>
                  <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 mt-4">
                    <p className="text-green-300 text-sm">
                      💰 <strong>Zero Gas Fees:</strong> Unlike other chains, LUXBIN transactions are completely free!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Storage Tab */}
            {activeTab === "storage" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-6">Storage Queries</h2>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-300">Query Account Balance</h3>
                  <div className="bg-black/80 rounded-xl p-4">
                    <pre className="text-sm text-green-300">
{`const account = await api.query.system.account(address);
console.log('Balance:', account.data.free.toString());`}
                    </pre>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-300">Query Total Issuance</h3>
                  <div className="bg-black/80 rounded-xl p-4">
                    <pre className="text-sm text-green-300">
{`const totalIssuance = await api.query.balances.totalIssuance();
console.log('Total LUXBIN:', totalIssuance.toString());`}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Extrinsics Tab */}
            {activeTab === "extrinsics" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-6">Extrinsics (Transactions)</h2>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-300">Transfer LUXBIN Tokens</h3>
                  <div className="bg-black/80 rounded-xl p-4">
                    <pre className="text-sm text-green-300">
{`const transfer = api.tx.balances.transfer(
  recipientAddress,
  amount
);

// Sign and send (ZERO GAS FEES!)
await transfer.signAndSend(senderKeyPair, ({ status }) => {
  if (status.isInBlock) {
    console.log('Transaction included in block');
  }
});`}
                    </pre>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-300">Batch Transactions</h3>
                  <div className="bg-black/80 rounded-xl p-4">
                    <pre className="text-sm text-green-300">
{`const batch = api.tx.utility.batch([
  api.tx.balances.transfer(address1, amount1),
  api.tx.balances.transfer(address2, amount2),
]);

await batch.signAndSend(senderKeyPair);`}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Events Tab */}
            {activeTab === "events" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-6">Subscribe to Events</h2>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-300">New Blocks</h3>
                  <div className="bg-black/80 rounded-xl p-4">
                    <pre className="text-sm text-green-300">
{`const unsubscribe = await api.rpc.chain.subscribeNewHeads((header) => {
  console.log('New block:', header.number.toNumber());
});`}
                    </pre>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-300">System Events</h3>
                  <div className="bg-black/80 rounded-xl p-4">
                    <pre className="text-sm text-green-300">
{`api.query.system.events((events) => {
  events.forEach((record) => {
    const { event } = record;
    console.log(event.section, event.method, event.data.toString());
  });
});`}
                    </pre>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-300">Balance Transfers</h3>
                  <div className="bg-black/80 rounded-xl p-4">
                    <pre className="text-sm text-green-300">
{`api.query.system.events((events) => {
  events.forEach((record) => {
    const { event } = record;
    if (event.section === 'balances' && event.method === 'Transfer') {
      const [from, to, amount] = event.data;
      console.log(\`Transfer: \${amount} from \${from} to \${to}\`);
    }
  });
});`}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SDK Libraries */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">📦 SDK Libraries</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-yellow-300">JavaScript/TypeScript</h3>
                <code className="text-sm bg-black/50 px-3 py-2 rounded block mb-4 text-green-300">
                  npm install @polkadot/api
                </code>
                <a href="https://polkadot.js.org/docs/" target="_blank" className="text-purple-400 hover:text-purple-300 text-sm">
                  View Docs →
                </a>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-orange-300">Rust</h3>
                <code className="text-sm bg-black/50 px-3 py-2 rounded block mb-4 text-green-300">
                  subxt = "0.35"
                </code>
                <a href="https://docs.rs/subxt/latest/subxt/" target="_blank" className="text-purple-400 hover:text-purple-300 text-sm">
                  View Docs →
                </a>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-300">Python</h3>
                <code className="text-sm bg-black/50 px-3 py-2 rounded block mb-4 text-green-300">
                  pip install substrate-interface
                </code>
                <a href="https://github.com/polkascan/py-substrate-interface" target="_blank" className="text-purple-400 hover:text-purple-300 text-sm">
                  View Docs →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Development Tools */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">🛠️ Development Tools</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-300">Polkadot.js Apps</h3>
                <p className="text-gray-300 text-sm mb-4">Web-based block explorer and wallet interface</p>
                <a href="https://polkadot.js.org/apps/?rpc=ws://127.0.0.1:9944" target="_blank" className="text-purple-400 hover:text-purple-300 text-sm">
                  Launch Explorer →
                </a>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-300">Substrate Docs</h3>
                <p className="text-gray-300 text-sm mb-4">Official Substrate framework documentation</p>
                <a href="https://docs.substrate.io/" target="_blank" className="text-purple-400 hover:text-purple-300 text-sm">
                  View Docs →
                </a>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-300">Rust Toolchain</h3>
                <p className="text-gray-300 text-sm mb-4">Install Rust and Substrate dependencies</p>
                <a href="https://docs.substrate.io/install/" target="_blank" className="text-purple-400 hover:text-purple-300 text-sm">
                  Installation Guide →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50 rounded-3xl p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Our developer community is here to support you
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="text-4xl mb-4">💬</div>
                  <h3 className="font-bold mb-2">Discord</h3>
                  <p className="text-gray-400 text-sm mb-4">Join our developer community</p>
                  <button className="text-purple-400 hover:text-purple-300 text-sm">
                    Coming Soon
                  </button>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="text-4xl mb-4">📧</div>
                  <h3 className="font-bold mb-2">Email Support</h3>
                  <p className="text-gray-400 text-sm mb-4">Get technical assistance</p>
                  <a href="mailto:Nicholechristie555@gmail.com" className="text-purple-400 hover:text-purple-300 text-sm">
                    Contact Us →
                  </a>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="text-4xl mb-4">🐙</div>
                  <h3 className="font-bold mb-2">GitHub</h3>
                  <p className="text-gray-400 text-sm mb-4">Report issues and contribute</p>
                  <a href="https://github.com/mermaidnicheboutique-code/luxbin-chain/issues" target="_blank" className="text-purple-400 hover:text-purple-300 text-sm">
                    Open Issue →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
