"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Search, Flame, ArrowUpRight, RefreshCw, Zap } from "lucide-react";
import { api } from "@/lib/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function TrendsPage() {
  const [trends, setTrends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTopic, setSearchTopic] = useState("");
  const [searching, setSearching] = useState(false);

  const fetchTrends = async (topic?: string) => {
    topic ? setSearching(true) : setLoading(true);
    try {
      const res = await api.getTrends(topic);
      setTrends(res.data || []);
    } catch { setTrends([]); }
    finally { setLoading(false); setSearching(false); }
  };

  useEffect(() => { fetchTrends(); }, []);

  const momentumColor = (m: string) =>
    m === "Rising" ? "text-emerald-400 bg-emerald-400/10" :
    m === "Stable" ? "text-cyan-400 bg-cyan-400/10" :
    "text-red-400 bg-red-400/10";

  return (
    <div className="p-8 min-h-screen">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Trend Explorer</h1>
        <p className="text-[#7b8aad]">Live trend intelligence powered by Google Trends</p>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-3 bg-[#050814] rounded-xl px-4 py-3 border border-[#1a2540]">
          <Search size={16} className="text-[#7b8aad]" />
          <input
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-[#7b8aad]"
            placeholder="Search any topic (e.g. AI, fitness, Web3)..."
            value={searchTopic}
            onChange={e => setSearchTopic(e.target.value)}
            onKeyDown={e => e.key === "Enter" && fetchTrends(searchTopic)}
          />
        </div>
        <button
          onClick={() => fetchTrends(searchTopic || undefined)}
          disabled={searching}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all disabled:opacity-50"
        >
          {searching ? <RefreshCw size={15} className="animate-spin" /> : <Zap size={15} />}
          {searching ? "Searching..." : "Analyze"}
        </button>
      </motion.div>

      {/* Chart */}
      {!loading && trends.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-6 mb-6">
          <h2 className="text-sm font-semibold text-[#7b8aad] mb-4 uppercase tracking-wider">Trend Score Comparison</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={trends}>
              <XAxis dataKey="trend" tick={{ fill: "#7b8aad", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#7b8aad", fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ background: "#0d1528", border: "1px solid #1a2540", borderRadius: 8, color: "#f0f4ff" }}
                labelStyle={{ color: "#7b8aad" }}
              />
              <Bar dataKey="trend_score" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Trends List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="glass p-5 animate-pulse">
              <div className="h-4 bg-[#1a2540] rounded w-1/3 mb-3" />
              <div className="h-3 bg-[#1a2540] rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <AnimatePresence>
          <div className="space-y-3">
            {trends.map((t, i) => (
              <motion.div
                key={t.trend}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-500/30 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0 border border-indigo-500/20">
                    <span className="text-indigo-400 font-bold text-sm">#{i + 1}</span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-semibold text-white capitalize">{t.trend}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${momentumColor(t.momentum)}`}>{t.momentum}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {(t.related_topics || []).slice(0, 4).map((rt: string) => (
                        <span key={rt} className="text-xs text-[#7b8aad] bg-[#1a2540] px-2 py-0.5 rounded-full">{rt}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-left sm:text-right flex-shrink-0 border-t border-[#1a2540] sm:border-0 pt-3 sm:pt-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:gap-0">
                  <div>
                    <span className="text-xs text-[#7b8aad] sm:hidden mr-2">Trend Score:</span>
                    <span className="text-2xl font-bold text-white inline-block align-middle">{t.trend_score}</span>
                    <span className="text-[10px] text-[#7b8aad] block sm:inline-block sm:ml-2">trend score</span>
                  </div>
                  <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                    <ArrowUpRight size={12} /> {t.growth_rate}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
