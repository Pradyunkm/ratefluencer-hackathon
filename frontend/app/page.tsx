"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, TrendingUp, Brain, BarChart3, ArrowRight, Cpu, Sparkles } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

const agents = [
  { name: "TrendDiscovery", color: "from-violet-500 to-indigo-500", desc: "Google Trends • Live data" },
  { name: "ViralityEngine", color: "from-cyan-500 to-blue-500", desc: "XAI scoring • 5 dimensions" },
  { name: "ScriptGenerator", color: "from-emerald-500 to-teal-500", desc: "Groq Llama 3.3 70B" },
  { name: "ContentOptimizer", color: "from-orange-500 to-amber-500", desc: "Caption • Hashtags • Timing" },
];

const stats = [
  { label: "Avg Virality Score", value: "78.4", unit: "/100", icon: Zap, color: "text-indigo-400" },
  { label: "Trends Tracked", value: "24", unit: " live", icon: TrendingUp, color: "text-cyan-400" },
  { label: "AI Agents", value: "4", unit: " active", icon: Cpu, color: "text-emerald-400" },
  { label: "Content Generated", value: "∞", unit: "", icon: Sparkles, color: "text-orange-400" },
];

export default function Dashboard() {
  const [health, setHealth] = useState<string>("checking...");
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    api.health().then(() => setHealth("All systems operational")).catch(() => setHealth("Backend offline"));
    api.getAnalytics().then(r => setAnalytics(r.data)).catch(() => {});
  }, []);

  return (
    <div className="p-8 min-h-screen">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
            <Cpu size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">CreatorOS AI</h1>
            <p className="text-[#7b8aad] text-sm">AI Operating System for Creators</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
          <span className="text-sm text-emerald-400">{health}</span>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-5"
          >
            <s.icon size={20} className={`${s.color} mb-3`} />
            <div className="text-2xl font-bold text-white">{s.value}<span className="text-sm text-[#7b8aad]">{s.unit}</span></div>
            <div className="text-xs text-[#7b8aad] mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Agent Pipeline */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass p-6 mb-8">
        <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
          <Cpu size={18} className="text-indigo-400" /> Multi-Agent Pipeline
        </h2>
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-3">
          {agents.map((a, i) => (
            <div key={a.name} className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-3 flex-1">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + i * 0.15, type: "spring" }}
                className="w-full rounded-xl p-4 border border-[#1a2540] bg-[#050814]"
              >
                <div className={`text-xs font-bold bg-gradient-to-r ${a.color} bg-clip-text text-transparent mb-1`}>{a.name}</div>
                <div className="text-xs text-[#7b8aad]">{a.desc}</div>
                <div className="mt-2 w-full h-1 rounded-full bg-[#1a2540]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.6 + i * 0.2, duration: 0.8 }}
                    className={`h-full rounded-full bg-gradient-to-r ${a.color}`}
                  />
                </div>
              </motion.div>
              {i < agents.length - 1 && (
                <div className="flex justify-center lg:block flex-shrink-0">
                  <ArrowRight size={16} className="text-[#1a2540] rotate-90 lg:rotate-0" />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { href: "/generate", icon: Zap, title: "Generate Content", desc: "Run the full AI pipeline on any topic", color: "from-indigo-500 to-violet-600" },
          { href: "/trends", icon: TrendingUp, title: "Explore Trends", desc: "Live Google Trends intelligence", color: "from-cyan-500 to-blue-600" },
          { href: "/analytics", icon: BarChart3, title: "View Analytics", desc: "Virality scores & engagement data", color: "from-emerald-500 to-teal-600" },
        ].map((item, i) => (
          <motion.div key={item.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
            <Link href={item.href}>
              <div className="glass p-6 hover:border-indigo-500/30 transition-all cursor-pointer group">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon size={20} className="text-white" />
                </div>
                <h3 className="font-semibold text-white mb-1 group-hover:text-indigo-300 transition-colors">{item.title}</h3>
                <p className="text-sm text-[#7b8aad]">{item.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
