"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, CheckCircle, Loader2, Copy, Instagram, Linkedin, Youtube, Hash } from "lucide-react";
import { api } from "@/lib/api";

const platforms = [
  { id: "instagram", label: "Instagram", icon: Instagram, color: "from-pink-500 to-orange-500" },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin, color: "from-blue-600 to-blue-800" },
  { id: "youtube", label: "YouTube", icon: Youtube, color: "from-red-500 to-red-700" },
];
const tones = ["casual", "professional", "funny", "emotional", "educational"];

const pipelineSteps = [
  { key: "trend_discovery", label: "Trend Discovery", desc: "Analyzing Google Trends..." },
  { key: "script_generation", label: "Script Generation", desc: "Groq generating hook & script..." },
  { key: "content_optimization", label: "Content Optimization", desc: "Optimizing caption & hashtags..." },
  { key: "virality_prediction", label: "Virality Prediction", desc: "Computing XAI score..." },
];

export default function GeneratePage() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [tone, setTone] = useState("casual");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [pipelineActive, setPipelineActive] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const simulate = async (result: any) => {
    for (const step of pipelineSteps) {
      await new Promise(r => setTimeout(r, 600));
      setPipelineActive(prev => [...prev, step.key]);
    }
  };

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true); setError(""); setResult(null); setPipelineActive([]);
    try {
      const res = await api.generateContent({ topic, platform, tone });
      await simulate(res);
      setResult(res.data);
    } catch (e: any) {
      setError("Failed to connect to backend. Make sure it's running on port 8000.");
    } finally { setLoading(false); }
  };

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const viralityColor = (score: number) =>
    score >= 80 ? "text-emerald-400" : score >= 60 ? "text-cyan-400" : score >= 40 ? "text-amber-400" : "text-red-400";

  return (
    <div className="p-8 min-h-screen">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Content Generator</h1>
        <p className="text-[#7b8aad]">4-agent AI pipeline — from topic to viral-ready content</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left: Input */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <div className="glass p-6 mb-4">
            <h2 className="text-sm font-semibold text-[#7b8aad] uppercase tracking-wider mb-4">Content Settings</h2>

            <div className="mb-4">
              <label className="text-xs text-[#7b8aad] uppercase tracking-wider mb-2 block">Topic / Niche</label>
              <input
                className="w-full bg-[#050814] border border-[#1a2540] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-indigo-500/50 transition-all placeholder:text-[#7b8aad]"
                placeholder="e.g. AI productivity, fitness mindset, crypto..."
                value={topic}
                onChange={e => setTopic(e.target.value)}
                onKeyDown={e => e.key === "Enter" && generate()}
              />
            </div>

            <div className="mb-4">
              <label className="text-xs text-[#7b8aad] uppercase tracking-wider mb-2 block">Platform</label>
              <div className="grid grid-cols-3 gap-2">
                {platforms.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border transition-all text-xs font-medium ${
                      platform === p.id
                        ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-300"
                        : "border-[#1a2540] text-[#7b8aad] hover:border-[#2a3550]"
                    }`}
                  >
                    <p.icon size={16} />
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-xs text-[#7b8aad] uppercase tracking-wider mb-2 block">Tone</label>
              <div className="flex flex-wrap gap-2">
                {tones.map(t => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all border ${
                      tone === t
                        ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-300"
                        : "border-[#1a2540] text-[#7b8aad] hover:border-[#2a3550]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generate}
              disabled={loading || !topic.trim()}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Zap size={18} />}
              {loading ? "Running AI Pipeline..." : "Generate Content"}
            </motion.button>
            {error && <p className="text-red-400 text-xs mt-3 text-center">{error}</p>}
          </div>

          {/* Pipeline Status */}
          <div className="glass p-5">
            <h2 className="text-xs font-semibold text-[#7b8aad] uppercase tracking-wider mb-4">Agent Pipeline</h2>
            <div className="space-y-3">
              {pipelineSteps.map((step, i) => {
                const done = pipelineActive.includes(step.key);
                const active = loading && !done && pipelineActive.length === i;
                return (
                  <motion.div key={step.key} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${done ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-[#050814] border border-[#1a2540]"}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${done ? "bg-emerald-500" : "bg-[#1a2540]"}`}>
                      {done ? <CheckCircle size={14} className="text-white" /> : active ? <Loader2 size={12} className="text-indigo-400 animate-spin" /> : <span className="text-xs text-[#7b8aad]">{i + 1}</span>}
                    </div>
                    <div>
                      <div className={`text-xs font-semibold ${done ? "text-emerald-400" : "text-[#7b8aad]"}`}>{step.label}</div>
                      <div className="text-xs text-[#7b8aad]">{step.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Right: Results */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <AnimatePresence>
            {result ? (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {/* Virality Score */}
                <div className="glass p-5 gradient-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-[#7b8aad] uppercase tracking-wider">Virality Score</span>
                    <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">{result.virality?.engagement_probability}</span>
                  </div>
                  <div className={`text-5xl font-black ${viralityColor(result.virality?.virality_score)}`}>
                    {result.virality?.virality_score}<span className="text-xl text-[#7b8aad]">/100</span>
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                    {[
                      { label: "Hook", val: result.virality?.hook_strength },
                      { label: "Emotion", val: result.virality?.emotional_trigger_score },
                      { label: "CTA", val: result.virality?.cta_effectiveness },
                      { label: "Trend", val: result.virality?.trend_alignment },
                    ].map(d => (
                      <div key={d.label} className="bg-[#050814] rounded-lg p-2 border border-[#1a2540]">
                        <div className={`text-lg font-bold ${viralityColor(d.val)}`}>{Math.round(d.val)}</div>
                        <div className="text-xs text-[#7b8aad]">{d.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hook */}
                <div className="glass p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">Hook</span>
                    <button onClick={() => copy(result.hook, "hook")} className="text-xs text-[#7b8aad] hover:text-white flex items-center gap-1"><Copy size={12} />{copied === "hook" ? "Copied!" : "Copy"}</button>
                  </div>
                  <p className="text-white text-sm leading-relaxed">{result.hook}</p>
                </div>

                {/* Script */}
                <div className="glass p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">Script</span>
                    <button onClick={() => copy(result.script, "script")} className="text-xs text-[#7b8aad] hover:text-white flex items-center gap-1"><Copy size={12} />{copied === "script" ? "Copied!" : "Copy"}</button>
                  </div>
                  <p className="text-[#7b8aad] text-sm leading-relaxed">{result.script}</p>
                </div>

                {/* Caption */}
                <div className="glass p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Optimized Caption</span>
                    <button onClick={() => copy(result.caption, "caption")} className="text-xs text-[#7b8aad] hover:text-white flex items-center gap-1"><Copy size={12} />{copied === "caption" ? "Copied!" : "Copy"}</button>
                  </div>
                  <p className="text-white text-sm leading-relaxed">{result.caption}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {(result.hashtags || []).map((h: string) => (
                      <span key={h} className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20 flex items-center gap-1">
                        <Hash size={10} />{h.replace("#", "")}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-[#7b8aad]">Best time: <span className="text-amber-400">{result.posting_time}</span></div>
                </div>

                {/* CTA */}
                <div className="glass p-4 border-l-2 border-violet-500">
                  <span className="text-xs text-violet-400 font-semibold uppercase tracking-wider block mb-1">Call to Action</span>
                  <p className="text-white text-sm">{result.cta}</p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="empty" className="glass p-12 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
                  <Zap size={28} className="text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Ready to Generate</h3>
                <p className="text-[#7b8aad] text-sm">Enter a topic and run the AI pipeline to generate viral-optimized content</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
