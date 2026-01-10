export interface TokenInfo {
  name: string;
  symbol: string;
  address: string;
  network: string;
  chainId: number;
  description: string;
  features: string[];
  uniswapUrl: string;
  basescanUrl: string;
  logo?: string;
}

export const LUXBIN_TOKENS: Record<string, TokenInfo> = {
  quantum: {
    name: "LUXBIN Quantum Token",
    symbol: "LUX",
    address: "0xbB5bf2139CbACDeE52991cf32f9c4d558B9464d0",
    network: "Base",
    chainId: 8453,
    description: "First cryptocurrency backed by 445 qubits from IBM quantum computers",
    features: [
      "⚛️ Quantum-secured randomness (445 qubits)",
      "🔥 Deflationary burns (3% per transaction)",
      "💰 Auto-rewards (2% to all holders)",
      "🎰 Quantum lottery (1% prize pool)",
      "📈 Treasury buyback (2%)",
      "💎 Staking 20-140% APY"
    ],
    uniswapUrl: "https://app.uniswap.org/#/swap?outputCurrency=0xbB5bf2139CbACDeE52991cf32f9c4d558B9464d0&chain=base",
    basescanUrl: "https://basescan.org/token/0xbB5bf2139CbACDeE52991cf32f9c4d558B9464d0"
  },
  legacy: {
    name: "LUXBIN Token",
    symbol: "LUXBIN",
    address: "0x66b4627B4Dd73228D24f24E844B6094091875169",
    network: "Base",
    chainId: 8453,
    description: "Original LUXBIN ecosystem token for governance and app utility",
    features: [
      "App governance rights",
      "Ecosystem utility token",
      "AI assistant access",
      "Developer platform credits",
      "Cross-chain bridging"
    ],
    uniswapUrl: "https://app.uniswap.org/#/swap?outputCurrency=0x66b4627B4Dd73228D24f24E844B6094091875169&chain=base",
    basescanUrl: "https://basescan.org/token/0x66b4627B4Dd73228D24f24E844B6094091875169"
  }
};