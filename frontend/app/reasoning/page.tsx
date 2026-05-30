"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Zap, AlertTriangle, CheckCircle, Lightbulb, Loader2, Target } from "lucide-react";
import { api } from "@/lib/api";

export default function ReasoningPage() {
  const [caption, setCaption] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const analyze = async () => {
    if (!caption.trim()) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await api.predictVirality({ caption, hashtags: "", platform });
      setResult(res.data);
    } catch { setError("Backend connection failed. Make sure the FastAPI server is running."); }
    finally { setLoading(false); }
  };

  const scoreColor = (s: number) =>
    s >= 80 ? "#10b981" : s >= 60 ? "#06b6d4" : s >= 40 ? "#f59e0b" : "#ef4444";

  const scoreLabel = (s: number) =>
    s >= 80 ? "Excellent" : s >= 60 ? "Good" : s >= 40 ? "Average" : "Weak";

  const dimensions = result ? [
    { label: "Hook Strength", value: result.hook_strength, icon: Zap },
    { label: "Emotional Triggers", value: result.emotional_trigger_score, icon: Brain },
    { label: "CTA Effectiveness", value: result.cta_effectiveness, icon: Target },
    { label: "Hashtag Quality", value: result.hashtag_quality, icon: CheckCircle },
    { label: "Trend Alignment", value: result.trend_alignment, icon: TrendingUpIcon },
  ] : [];

  return (
    <div className="p-8 min-h-screen">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">AI Reasoning Panel</h1>
        <p className="text-[#7b8aad]">Explainable AI — understand WHY content will or won't go viral</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-6">
        {/* Input */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass p-6 h-fit">
          <h2 className="text-sm font-semibold text-[#7b8aad] uppercase tracking-wider mb-4">Analyze Content</h2>
          <div className="mb-4">
            <label className="text-xs text-[#7b8aad] mb-2 block uppercase tracking-wider">Your Caption / Hook</label>
            <textarea
              className="w-full bg-[#050814] border border-[#1a2540] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-indigo-500/50 transition-all placeholder:text-[#7b8aad] resize-none"
              placeholder="Paste your caption or hook here..."
              rows={5}
              value={caption}
              onChange={e => setCaption(e.target.value)}
            />
          </div>
          <div className="mb-5 flex gap-2">
            {["instagram", "linkedin", "youtube"].map(p => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-all border ${platform === p ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-300" : "border-[#1a2540] text-[#7b8aad]"}`}
              >
                {p}
              </button>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={analyze}
            disabled={loading || !caption.trim()}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Brain size={16} />}
            {loading ? "Analyzing with XAI..." : "Analyze Virality"}
          </motion.button>
          {error && <p className="text-red-400 text-xs mt-3 text-center">{error}</p>}
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {result ? (
            <motion.div key="result" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              {/* Main Score */}
              <div className="glass p-6 text-center gradient-border">
                <div className="text-xs text-[#7b8aad] uppercase tracking-wider mb-2">Overall Virality Score</div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="text-6xl font-black mb-1"
                  style={{ color: scoreColor(result.virality_score) }}
                >
                  {result.virality_score}
                </motion.div>
                <div className="text-sm font-semibold" style={{ color: scoreColor(result.virality_score) }}>
                  {scoreLabel(result.virality_score)} Viral Potential
                </div>
                <div className="text-xs text-[#7b8aad] mt-1">Engagement Probability: <span className="text-white">{result.engagement_probability}</span></div>
              </div>

              {/* XAI Reasoning */}
              <div className="glass p-5 border-l-2 border-violet-500">
                <div className="flex items-center gap-2 mb-3">
                  <Brain size={16} className="text-violet-400" />
                  <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">AI Reasoning</span>
                </div>
                <p className="text-sm text-[#c4cee8] leading-relaxed">{result.ai_reasoning}</p>
              </div>

              {/* Dimension Scores */}
              <div className="glass p-5">
                <div className="text-xs font-semibold text-[#7b8aad] uppercase tracking-wider mb-4">Dimension Breakdown</div>
                <div className="space-y-3">
                  {dimensions.map((d: any) => (
                    <div key={d.label} className="flex items-center gap-3">
                      <div className="w-28 text-xs text-[#7b8aad]">{d.label}</div>
                      <div className="flex-1 h-2 bg-[#1a2540] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${d.value}%` }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${scoreColor(d.value)}, ${scoreColor(d.value)}88)` }}
                        />
                      </div>
                      <div className="w-8 text-xs font-bold text-right" style={{ color: scoreColor(d.value) }}>{Math.round(d.value)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="empty" className="glass p-12 text-center flex flex-col items-center justify-center">
              <Brain size={40} className="text-indigo-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Paste Your Content</h3>
              <p className="text-[#7b8aad] text-sm">The XAI engine will explain exactly why your content will or won't go viral — with reasoning.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TrendingUpIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
