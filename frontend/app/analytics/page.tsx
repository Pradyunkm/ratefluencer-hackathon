"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Zap, TrendingUp, RefreshCw } from "lucide-react";
import { api } from "@/lib/api";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Cell
} from "recharts";

const PLATFORM_COLORS = ["#6366f1", "#06b6d4", "#f59e0b", "#10b981"];

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try { const r = await api.getAnalytics(); setData(r.data); }
    catch { } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const radarData = data ? [
    { metric: "Hook", value: 78 },
    { metric: "Emotion", value: 82 },
    { metric: "CTA", value: 71 },
    { metric: "Hashtags", value: 85 },
    { metric: "Trend Align", value: 74 },
    { metric: "Timing", value: 68 },
  ] : [];

  return (
    <div className="p-8 min-h-screen">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Analytics Dashboard</h1>
          <p className="text-[#7b8aad]">Virality metrics and engagement intelligence</p>
        </div>
        <button onClick={load} disabled={loading} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#1a2540] text-sm text-[#7b8aad] hover:text-white transition-all">
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => <div key={i} className="glass p-6 h-64 animate-pulse" />)}
        </div>
      ) : data ? (
        <div className="space-y-6">
          {/* Top Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Content Generated", value: data.total_content_generated, icon: Zap, color: "text-indigo-400" },
              { label: "Avg Virality Score", value: `${data.avg_virality_score}/100`, icon: TrendingUp, color: "text-cyan-400" },
              { label: "Top Platform", value: data.top_platform, icon: BarChart3, color: "text-emerald-400" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass p-5">
                <s.icon size={20} className={`${s.color} mb-3`} />
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-[#7b8aad] mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass p-6">
              <h2 className="text-sm font-semibold text-[#7b8aad] uppercase tracking-wider mb-4">Virality Dimensions</h2>
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#1a2540" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: "#7b8aad", fontSize: 11 }} />
                  <Radar name="Score" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Weekly Trend */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass p-6">
              <h2 className="text-sm font-semibold text-[#7b8aad] uppercase tracking-wider mb-4">Weekly Virality Trend</h2>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={data.weekly_trend}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fill: "#7b8aad", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#7b8aad", fontSize: 12 }} axisLine={false} tickLine={false} domain={[50, 100]} />
                  <Tooltip contentStyle={{ background: "#0d1528", border: "1px solid #1a2540", borderRadius: 8, color: "#f0f4ff" }} />
                  <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2} fill="url(#areaGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Platform Breakdown */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass p-6">
            <h2 className="text-sm font-semibold text-[#7b8aad] uppercase tracking-wider mb-4">Platform Performance</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {data.platform_breakdown.map((p: any, i: number) => (
                <div key={p.platform} className="bg-[#050814] rounded-xl p-4 border border-[#1a2540]">
                  <div className="text-lg font-bold text-white">{p.avg_score}<span className="text-sm text-[#7b8aad]">/100</span></div>
                  <div className="text-xs text-[#7b8aad] mb-1">{p.platform}</div>
                  <div className="w-full h-1.5 bg-[#1a2540] rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.avg_score}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{ background: PLATFORM_COLORS[i] }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={data.platform_breakdown}>
                <XAxis dataKey="platform" tick={{ fill: "#7b8aad", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#7b8aad", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0d1528", border: "1px solid #1a2540", borderRadius: 8, color: "#f0f4ff" }} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {data.platform_breakdown.map((_: any, i: number) => <Cell key={i} fill={PLATFORM_COLORS[i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
}
