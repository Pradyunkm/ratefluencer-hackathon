"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, TrendingUp, BarChart3, ArrowRight, Cpu, Sparkles } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

const agents = [
  { name: "TrendDiscovery", color: "from-violet-500 to-indigo-500", desc: "Scrapes Google Trends • Extracts hot keywords in real-time" },
  { name: "ViralityEngine", color: "from-cyan-500 to-blue-500", desc: "Runs multi-dimensional custom ML scoring & XAI feedback" },
  { name: "ScriptGenerator", color: "from-emerald-500 to-teal-500", desc: "Formulates hook & script using Groq Llama 3.3 70B" },
  { name: "ContentOptimizer", color: "from-orange-500 to-amber-500", desc: "Generates captions, platform hashtags, and posts timings" },
];

const stats = [
  { label: "Avg Virality Score", value: "78.4", unit: "/100", icon: Zap, color: "text-indigo-400", bgGlow: "bg-indigo-500/10" },
  { label: "Trends Tracked", value: "24", unit: " live", icon: TrendingUp, color: "text-cyan-400", bgGlow: "bg-cyan-500/10" },
  { label: "AI Agents", value: "4", unit: " active", icon: Cpu, color: "text-emerald-400", bgGlow: "bg-emerald-500/10" },
  { label: "Content Generated", value: "1,248", unit: " posts", icon: Sparkles, color: "text-amber-400", bgGlow: "bg-amber-500/10" },
];

export default function Dashboard() {
  const [health, setHealth] = useState<string>("checking...");
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    api.health().then(() => setHealth("All systems operational")).catch(() => setHealth("Backend offline"));
    api.getAnalytics().then(r => setAnalytics(r.data)).catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1e294b]/50 pb-6"
      >
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/10">
              <Cpu size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight gradient-text">CreatorOS AI</h1>
              <p className="text-[#7b8aad] text-xs font-medium tracking-wide uppercase mt-0.5">AI Operating System for Creators</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-inner">
            <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
            <span className="text-xs text-emerald-400 font-semibold tracking-wide uppercase">{health}</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass p-6 relative overflow-hidden group hover:translate-y-[-2px] hover:border-indigo-500/25 transition-all duration-300"
          >
            {/* Ambient Background Glow Circle */}
            <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-all duration-300 ${s.bgGlow}`} />

            <div className="flex justify-between items-start mb-4 relative z-10">
              <span className="text-xs font-bold text-[#7b8aad] uppercase tracking-wider">{s.label}</span>
              <div className={`w-8 h-8 rounded-lg ${s.bgGlow} flex items-center justify-center border border-white/5`}>
                <s.icon size={16} className={`${s.color}`} />
              </div>
            </div>

            <div className="text-3xl font-black text-white tracking-tight relative z-10 flex items-baseline gap-1">
              {s.value}
              <span className="text-xs text-[#52648c] font-bold">{s.unit}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Agent Pipeline Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2 }} 
        className="glass p-6 relative overflow-hidden"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-md font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Cpu size={16} className="text-indigo-400" /> Multi-Agent pipeline
          </h2>
          <span className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/25 px-2.5 py-1 rounded-full">Active Loop</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-3">
          {agents.map((a, i) => (
            <div key={a.name} className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-3 flex-1 w-full">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                className="w-full rounded-2xl p-5 border border-[#1e294b]/50 bg-[#060b18]/40 shadow-md relative overflow-hidden group hover:border-indigo-500/20 transition-all duration-300"
              >
                {/* Embedded gradient glow */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${a.color} opacity-[0.02] blur-xl rounded-full group-hover:opacity-[0.06] transition-all`} />
                
                <div className={`text-[10px] uppercase tracking-widest font-extrabold bg-gradient-to-r ${a.color} bg-clip-text text-transparent mb-2`}>{a.name}</div>
                <div className="text-xs text-[#7b8aad] leading-relaxed min-h-[40px]">{a.desc}</div>
                
                <div className="mt-4 w-full h-1 rounded-full bg-slate-800/60 overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
                    className={`h-full rounded-full bg-gradient-to-r ${a.color}`}
                  />
                </div>
              </motion.div>
              
              {i < agents.length - 1 && (
                <div className="flex justify-center lg:block flex-shrink-0 relative">
                  <ArrowRight size={14} className="text-[#1a2540] rotate-90 lg:rotate-0 transition-transform duration-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { href: "/generate", icon: Zap, title: "Generate Content", desc: "Ideate, script, optimize, and score with a unified 4-agent run.", color: "from-indigo-500 to-violet-600", shadow: "shadow-indigo-500/5", glow: "group-hover:bg-indigo-500/10" },
          { href: "/trends", icon: TrendingUp, title: "Explore Trends", desc: "Ingest and analyze rising topics from live Google search volume.", color: "from-cyan-500 to-blue-600", shadow: "shadow-cyan-500/5", glow: "group-hover:bg-cyan-500/10" },
          { href: "/analytics", icon: BarChart3, title: "View Analytics", desc: "Deep-dive into multi-platform virality scores & engagement data.", color: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/5", glow: "group-hover:bg-emerald-500/10" },
        ].map((item, i) => (
          <motion.div 
            key={item.href} 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4 + i * 0.08 }}
          >
            <Link href={item.href}>
              <div className={`glass p-6 hover:border-indigo-500/35 transition-all cursor-pointer group shadow-xl ${item.shadow} hover:translate-y-[-2px] duration-300`}>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105 shadow-md`}>
                  <item.icon size={18} className="text-white" />
                </div>
                <h3 className="font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">{item.title}</h3>
                <p className="text-xs text-[#7b8aad] leading-relaxed">{item.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
