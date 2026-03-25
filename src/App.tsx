/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, ReactNode } from "react";
import { motion } from "motion/react";
import { Copy, Twitter, Send, Instagram, ExternalLink, AlertTriangle } from "lucide-react";

const CONTRACT_ADDRESS = "PENDING_DEPLOYMENT";

export default function App() {
  const [stats, setStats] = useState({
    price: "0.000000",
    marketCap: 0,
    holders: 0,
    liquidity: "0.014",
    progress: 0,
    lastUpdate: "--:--:--",
  });

  useEffect(() => {
    const updateStats = () => {
      const mockData = {
        price: (Math.random() * 0.000001).toFixed(7),
        marketCap: Math.floor(Math.random() * 10000),
        holders: Math.floor(100 + Math.random() * 500),
        liquidity: (0.014 + Math.random() * 0.01).toFixed(3),
        progress: Math.min(100, Math.floor(15 + Math.random() * 30)),
        lastUpdate: new Date().toLocaleTimeString(),
      };
      setStats(mockData);
    };

    updateStats();
    const interval = setInterval(updateStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const copyContract = () => {
    if (CONTRACT_ADDRESS !== "PENDING_DEPLOYMENT") {
      navigator.clipboard.writeText(CONTRACT_ADDRESS);
      alert("Contract address copied: " + CONTRACT_ADDRESS);
    } else {
      alert("Contract address will be available after deployment");
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#1a1a2e_0%,#16213e_50%,#0f3460_100%)] text-white font-sans selection:bg-red-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-8xl mb-6 inline-block"
          >
            <motion.span
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              🦞
            </motion.span>
          </motion.div>
          
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-red-400 via-yellow-300 to-red-400 bg-clip-text text-transparent"
          >
            $VIRAL
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 mb-8 font-medium"
          >
            The Lobster That Never Dies
          </motion.p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyContract}
            className="bg-white/10 backdrop-blur-md border-2 border-red-500/50 hover:border-red-500 px-8 py-3 rounded-full font-mono text-lg flex items-center gap-2 mx-auto transition-all group"
          >
            <Copy className="w-5 h-5 text-red-400 group-hover:text-red-500" />
            <span>Contract: {CONTRACT_ADDRESS}</span>
          </motion.button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Current Price", value: `$${stats.price}`, color: "text-yellow-400" },
            { label: "Market Cap", value: `$${stats.marketCap.toLocaleString()}`, color: "text-yellow-400" },
            { label: "Holders", value: stats.holders.toLocaleString(), color: "text-yellow-400" },
            { label: "Liquidity Pool", value: `${stats.liquidity} BNB`, color: "text-yellow-400" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl text-center transition-transform"
            >
              <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wider font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <div className="relative flex items-center">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-center">
              Four.meme Bonding Curve Progress
            </h2>
          </div>
          
          <div className="bg-white/10 rounded-full h-10 overflow-hidden mb-6 border border-white/5 p-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stats.progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-red-500 to-yellow-400 rounded-full flex items-center justify-end px-4 font-bold text-sm shadow-[0_0_20px_rgba(239,68,68,0.3)]"
            >
              {stats.progress}%
            </motion.div>
          </div>
          
          <p className="text-center text-gray-400 font-medium mb-4">
            Progress to DEX Migration • Target: 100%
          </p>
          <div className="text-center text-gray-600 text-sm">
            Last updated: <span className="font-mono">{stats.lastUpdate}</span>
          </div>
        </motion.div>

        {/* Tokenomics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <TokenomicsCard title="📊 Token Distribution" border="border-l-red-500">
            <TaxItem label="Four.meme Pool" value="100%" />
            <TaxItem label="Total Supply" value="1,000,000,000" />
            <TaxItem label="Chain" value="BSC (BEP-20)" />
          </TokenomicsCard>
          
          <TokenomicsCard title="💰 Buy Tax (3%)" border="border-l-red-500">
            <TaxItem label="Liquidity Pool" value="2%" highlight />
            <TaxItem label="Marketing Wallet" value="1%" highlight />
          </TokenomicsCard>
          
          <TokenomicsCard title="💸 Sell Tax (5%)" border="border-l-red-500">
            <TaxItem label="Liquidity Pool" value="3%" highlight />
            <TaxItem label="Marketing Wallet" value="2%" highlight />
          </TokenomicsCard>
        </div>

        {/* Roadmap */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 mb-12"
        >
          <h2 className="text-3xl font-bold text-center text-yellow-400 mb-10">🗺️ Roadmap</h2>
          <div className="space-y-6">
            <RoadmapItem number={1} title="Launch on Four.meme" description="Initial bonding curve phase • 0.014 BNB seed liquidity" />
            <RoadmapItem number={2} title="Community Building" description="Social media campaigns • KOL partnerships • Meme contests" />
            <RoadmapItem number={3} title="DEX Migration" description="Automatic migration at 100% bonding curve • Liquidity locked" />
            <RoadmapItem number={4} title="Exchange Listings" description="CEX applications • CoinGecko & CMC listings" />
          </div>
        </motion.div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <SocialButton icon={<Twitter />} label="Twitter" />
          <SocialButton icon={<Send />} label="Telegram" />
          <SocialButton icon={<Instagram />} label="Instagram" />
        </div>

        {/* Footer */}
        <footer className="text-center pt-12 border-t border-white/10 text-gray-400">
          <p className="font-bold text-white mb-4">$VIRAL is a community-driven meme token on BSC.</p>
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 max-w-2xl mx-auto mb-8 flex items-start gap-4 text-left">
            <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
            <p className="text-sm">
              <span className="font-bold text-red-400">RISK WARNING:</span> Cryptocurrency trading involves high risk. Meme tokens are highly volatile. Only invest what you can afford to lose.
            </p>
          </div>
          <p className="text-sm text-gray-600">
            © 2026 Viral Lobster. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

function TokenomicsCard({ title, children, border }: { title: string; children: ReactNode; border: string }) {
  return (
    <div className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 border-l-4 ${border}`}>
      <h3 className="text-xl font-bold text-yellow-400 mb-6">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function TaxItem({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
      <span className="text-gray-300">{label}</span>
      <span className={`font-bold ${highlight ? "text-red-400" : "text-white"}`}>{value}</span>
    </div>
  );
}

function RoadmapItem({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex items-start gap-6 p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
      <div className="bg-red-500 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 shadow-lg shadow-red-500/20">
        {number}
      </div>
      <div>
        <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function SocialButton({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <motion.a
      href="#"
      whileHover={{ scale: 1.05, backgroundColor: "rgba(239, 68, 68, 0.2)", borderColor: "rgba(239, 68, 68, 0.5)" }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-transparent rounded-full font-bold transition-all"
    >
      {icon}
      <span>{label}</span>
    </motion.a>
  );
}
