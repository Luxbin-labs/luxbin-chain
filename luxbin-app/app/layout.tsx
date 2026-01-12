import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { AuroraChatWidget } from "@/components/FloatingChatWidget";
import { AtlasChatWidget } from "@/components/AtlasChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NicheAI - Where Quantum AI Meets Blockchain Innovation",
  description: "NicheAI combines quantum-powered AI companions (Aurora & Atlas) with the Luxbin gasless blockchain. Quantum cryptography meets emotional intelligence.",
  manifest: '/manifest.json',
  other: {
    'base:app_id': '695963dcc63ad876c9081f62',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress wallet extension errors in development
              if (typeof window !== 'undefined') {
                const originalError = console.error;
                console.error = (...args) => {
                  if (args[0]?.includes?.('chrome.runtime.sendMessage') ||
                      args[0]?.includes?.('Extension ID')) {
                    return; // Suppress wallet extension errors
                  }
                  originalError(...args);
                };
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased font-sans`}>
        <Providers>
          {children}
          <AuroraChatWidget />
          <AtlasChatWidget />
        </Providers>
      </body>
    </html>
  );
}
