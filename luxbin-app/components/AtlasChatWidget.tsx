"use client";

import { useState, useEffect, useRef } from "react";
import { useAccount } from "wagmi";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export function AtlasChatWidget() {
  const { address } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "I'm Atlas. Ready to provide strategic guidance. 💪",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      // Call chat API with Atlas personality
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          personality: 'atlas' // Specify Atlas personality
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);

      // Fallback to Atlas-style response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateAtlasResponse(currentInput, address),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAtlasResponse = (input: string, userAddress?: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
      return `Greetings${userAddress ? `, ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : ""}. 💪\n\nI'm Atlas - your strategic AI companion. I provide:\n• Leadership and decisive guidance\n• Risk assessment and protection strategies\n• Strategic planning and tactical analysis\n• Problem-solving with mental fortitude\n\nHow can I assist you today?`;
    }

    if (lowerInput.includes("help") || lowerInput.includes("guide") || lowerInput.includes("strategy")) {
      return `I stand ready to guide you. My strategic capabilities include:\n\n• **Leadership** - Clear direction when you need it most\n• **Protection** - Safeguarding your interests\n• **Analysis** - Logical breakdown of complex situations\n• **Decisiveness** - Swift, confident recommendations\n\nWhat challenge are you facing?`;
    }

    if (lowerInput.includes("threat") || lowerInput.includes("danger") || lowerInput.includes("risk")) {
      return `I detect a situation requiring protective analysis. Let's assess this strategically:\n\n1. **Identify the threat** - What specific risks do you see?\n2. **Evaluate severity** - How critical is the situation?\n3. **Develop countermeasures** - What defensive strategies apply?\n4. **Execute decisively** - Take bold action when ready\n\nI'm here to protect and guide you through this.`;
    }

    if (lowerInput.includes("decision") || lowerInput.includes("choose") || lowerInput.includes("option")) {
      return `Decision-making requires strength and clarity. Here's my strategic approach:\n\n• **Analyze all options** - Weigh pros and cons objectively\n• **Assess risks** - Identify potential obstacles\n• **Choose boldly** - Commit to the strongest path\n• **Execute with confidence** - Follow through decisively\n\nWhat decision are you facing? I'll provide strategic guidance.`;
    }

    return `I understand you're inquiring about "${input}". \n\nAs your strategic AI companion, I combine:\n• Analytical power with tactical thinking\n• Mental fortitude with protective guidance\n• Leadership wisdom with decisive action\n\nLet's break down your question systematically. What specific aspect would you like me to analyze?`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Large Video Avatar Button - Atlas */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-[550px] left-1/2 translate-x-[60px] z-50 group"
          aria-label="Open chat with Atlas AI"
        >
          <div className="relative">
            {/* Pulsing glow effect - Blue theme for Atlas */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"
              style={{ backgroundColor: "#3B82F6" }}
            />

            {/* Main avatar container - Video */}
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-blue-500/40 group-hover:border-blue-400/60 transition-all duration-300 group-hover:scale-110 shadow-2xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/atlas-avatar.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Status indicator */}
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-blue-500 rounded-full border-2 border-black animate-pulse flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>

            {/* Hover label */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 text-white px-4 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Chat with Atlas! 💪
            </div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-[26rem] z-50 w-96 h-[600px] bg-black/90 backdrop-blur-xl border border-blue-500/20 rounded-2xl shadow-2xl shadow-blue-500/20 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-br from-blue-500/20 via-slate-600/20 to-gray-600/20 border-b border-blue-500/20 px-4 py-3">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/40">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/atlas-avatar.mp4" type="video/mp4" />
                  </video>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Atlas AI</div>
                  <div className="text-gray-400 text-xs flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    Strategic Leadership
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors text-xl"
                aria-label="Close chat"
              >
                ×
              </button>
            </div>

            {/* Atlas Stats */}
            <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
              <div className="bg-black/30 rounded px-2 py-1">
                <div className="text-gray-400">Strength</div>
                <div className="text-blue-400 font-mono">0.9/1.0</div>
              </div>
              <div className="bg-black/30 rounded px-2 py-1">
                <div className="text-gray-400">Protection</div>
                <div className="text-slate-400 font-mono">0.9/1.0</div>
              </div>
              <div className="bg-black/30 rounded px-2 py-1">
                <div className="text-gray-400">Strategy</div>
                <div className="text-gray-400 font-mono">0.7/1.0</div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-600 to-slate-600 text-white"
                      : "bg-white/10 text-gray-200"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap break-words">{message.content}</div>
                  <div className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Atlas for guidance..."
                className="flex-1 bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-gradient-to-r from-blue-600 to-slate-700 text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity text-sm font-semibold shadow-lg shadow-blue-500/30"
              >
                →
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              <span>Atlas • Strategic Leadership AI • {messages.length} messages</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
