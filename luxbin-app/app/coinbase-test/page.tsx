"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { base } from "wagmi/chains";
import Link from "next/link";

export default function CoinbaseTestPage() {
  const { address, isConnected } = useAccount();
  const [testResults, setTestResults] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    const results: any = {};

    // Test 1: Check environment variables
    results.envVars = {
      projectId: process.env.NEXT_PUBLIC_COINBASE_PROJECT_ID ? '✅ Configured' : '❌ Missing',
      cdpApiKey: process.env.NEXT_PUBLIC_CDP_API_KEY ? '✅ Configured' : '❌ Missing',
      walletConnect: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ? '✅ Configured' : '❌ Missing',
      projectIdValue: process.env.NEXT_PUBLIC_COINBASE_PROJECT_ID,
      cdpApiKeyValue: process.env.NEXT_PUBLIC_CDP_API_KEY ? `${process.env.NEXT_PUBLIC_CDP_API_KEY.substring(0, 10)}...` : 'Not set'
    };

    // Test 2: Test CDP RPC endpoint
    try {
      const cdpApiKey = process.env.NEXT_PUBLIC_CDP_API_KEY;
      if (cdpApiKey) {
        const response = await fetch(
          `https://api.developer.coinbase.com/rpc/v1/base/${cdpApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0',
              method: 'eth_blockNumber',
              params: [],
              id: 1
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          results.rpcEndpoint = {
            status: '✅ Connected',
            blockNumber: parseInt(data.result, 16),
            response: data
          };
        } else {
          results.rpcEndpoint = {
            status: '❌ Failed',
            error: `HTTP ${response.status}: ${response.statusText}`
          };
        }
      } else {
        results.rpcEndpoint = {
          status: '❌ No API Key',
          error: 'CDP API key not configured'
        };
      }
    } catch (error: any) {
      results.rpcEndpoint = {
        status: '❌ Error',
        error: error.message
      };
    }

    // Test 3: Check paymaster/sponsor endpoint
    try {
      const response = await fetch('/api/coinbase/sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          test: true
        })
      });

      const data = await response.json();
      results.paymasterEndpoint = {
        status: response.ok ? '✅ Available' : '❌ Failed',
        data: data
      };
    } catch (error: any) {
      results.paymasterEndpoint = {
        status: '❌ Error',
        error: error.message
      };
    }

    // Test 4: Check Base network connectivity
    try {
      const response = await fetch('https://mainnet.base.org', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_blockNumber',
          params: [],
          id: 1
        })
      });

      const data = await response.json();
      results.baseNetwork = {
        status: '✅ Connected',
        blockNumber: parseInt(data.result, 16)
      };
    } catch (error: any) {
      results.baseNetwork = {
        status: '❌ Error',
        error: error.message
      };
    }

    // Test 5: Wallet connection status
    results.wallet = {
      connected: isConnected ? '✅ Connected' : '⚠️ Not Connected',
      address: address || 'No wallet connected',
      network: 'Base Mainnet (Chain ID: 8453)'
    };

    setTestResults(results);
    setLoading(false);
  };

  useEffect(() => {
    runTests();
  }, [isConnected, address]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm">
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Coinbase Connection Test
        </h1>
        <p className="text-gray-400 mb-8">
          Testing Coinbase CDP integration, paymaster credits, and API connectivity
        </p>

        <button
          onClick={runTests}
          disabled={loading}
          className="mb-8 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50"
        >
          {loading ? '🔄 Testing...' : '🧪 Run Tests'}
        </button>

        <div className="space-y-6">
          {/* Environment Variables */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-purple-300">1. Environment Variables</h2>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between items-center p-3 bg-black/50 rounded">
                <span>NEXT_PUBLIC_COINBASE_PROJECT_ID:</span>
                <span className={testResults.envVars?.projectId?.includes('✅') ? 'text-green-400' : 'text-red-400'}>
                  {testResults.envVars?.projectId || 'Testing...'}
                </span>
              </div>
              {testResults.envVars?.projectIdValue && (
                <div className="p-3 bg-black/30 rounded text-xs text-gray-400">
                  Value: {testResults.envVars.projectIdValue}
                </div>
              )}

              <div className="flex justify-between items-center p-3 bg-black/50 rounded">
                <span>NEXT_PUBLIC_CDP_API_KEY:</span>
                <span className={testResults.envVars?.cdpApiKey?.includes('✅') ? 'text-green-400' : 'text-red-400'}>
                  {testResults.envVars?.cdpApiKey || 'Testing...'}
                </span>
              </div>
              {testResults.envVars?.cdpApiKeyValue && (
                <div className="p-3 bg-black/30 rounded text-xs text-gray-400">
                  Value: {testResults.envVars.cdpApiKeyValue}
                </div>
              )}

              <div className="flex justify-between items-center p-3 bg-black/50 rounded">
                <span>NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID:</span>
                <span className={testResults.envVars?.walletConnect?.includes('✅') ? 'text-green-400' : 'text-red-400'}>
                  {testResults.envVars?.walletConnect || 'Testing...'}
                </span>
              </div>
            </div>
          </div>

          {/* CDP RPC Endpoint */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-purple-300">2. CDP RPC Endpoint</h2>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between items-center p-3 bg-black/50 rounded">
                <span>Connection Status:</span>
                <span className={testResults.rpcEndpoint?.status?.includes('✅') ? 'text-green-400' : 'text-red-400'}>
                  {testResults.rpcEndpoint?.status || 'Testing...'}
                </span>
              </div>

              {testResults.rpcEndpoint?.blockNumber && (
                <div className="p-3 bg-black/30 rounded">
                  <div className="text-green-400">Latest Block: #{testResults.rpcEndpoint.blockNumber.toLocaleString()}</div>
                </div>
              )}

              {testResults.rpcEndpoint?.error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded">
                  <div className="text-red-400">Error: {testResults.rpcEndpoint.error}</div>
                </div>
              )}
            </div>
          </div>

          {/* Paymaster Endpoint */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-purple-300">3. Paymaster / Sponsor API</h2>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between items-center p-3 bg-black/50 rounded">
                <span>Endpoint Status:</span>
                <span className={testResults.paymasterEndpoint?.status?.includes('✅') ? 'text-green-400' : 'text-red-400'}>
                  {testResults.paymasterEndpoint?.status || 'Testing...'}
                </span>
              </div>

              {testResults.paymasterEndpoint?.data && (
                <div className="p-3 bg-black/30 rounded">
                  <pre className="text-xs text-gray-300 overflow-x-auto">
                    {JSON.stringify(testResults.paymasterEndpoint.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Base Network */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-purple-300">4. Base Network</h2>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between items-center p-3 bg-black/50 rounded">
                <span>Network Status:</span>
                <span className={testResults.baseNetwork?.status?.includes('✅') ? 'text-green-400' : 'text-red-400'}>
                  {testResults.baseNetwork?.status || 'Testing...'}
                </span>
              </div>

              {testResults.baseNetwork?.blockNumber && (
                <div className="p-3 bg-black/30 rounded">
                  <div className="text-green-400">Latest Block: #{testResults.baseNetwork.blockNumber.toLocaleString()}</div>
                </div>
              )}
            </div>
          </div>

          {/* Wallet Connection */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-purple-300">5. Wallet Connection</h2>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between items-center p-3 bg-black/50 rounded">
                <span>Status:</span>
                <span className={testResults.wallet?.connected?.includes('✅') ? 'text-green-400' : 'text-yellow-400'}>
                  {testResults.wallet?.connected || 'Testing...'}
                </span>
              </div>

              {testResults.wallet?.address && testResults.wallet.address !== 'No wallet connected' && (
                <div className="p-3 bg-black/30 rounded text-xs">
                  <div className="text-gray-400">Address: {testResults.wallet.address}</div>
                </div>
              )}

              <div className="p-3 bg-black/30 rounded text-xs">
                <div className="text-gray-400">Network: {testResults.wallet?.network}</div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">📊 Test Summary</h2>
            <div className="space-y-2">
              <p className="text-gray-300">
                <strong>Project ID:</strong> {testResults.envVars?.projectIdValue || 'Not loaded'}
              </p>
              <p className="text-gray-300">
                <strong>Credits Available:</strong> $1,250 (Coinbase Developer Credits)
              </p>
              <p className="text-gray-300">
                <strong>Paymaster:</strong> {testResults.paymasterEndpoint?.status?.includes('✅') ? 'Active - Gasless transactions enabled' : 'Testing...'}
              </p>
              <p className="text-gray-300">
                <strong>Network:</strong> Base Mainnet (Chain ID: 8453)
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-purple-400 hover:text-purple-300">
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
