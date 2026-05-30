"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, TrendingUp, Zap, BarChart3, Brain, Cpu, X } from "lucide-react";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/trends", icon: TrendingUp, label: "Trend Explorer" },
  { href: "/generate", icon: Zap, label: "Content Generator" },
  { href: "/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/reasoning", icon: Brain, label: "AI Reasoning" },
];

interface SidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

export default function Sidebar({ onClose, isMobile }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      style={{ width: "256px", minWidth: "256px" }}
      className={
        isMobile
          ? "fixed top-0 left-0 h-full bg-[#080d19] border-r border-[#1e294b]/60 flex flex-col z-50 shadow-2xl"
          : "fixed top-4 left-4 bottom-4 bg-[#080d1a]/55 backdrop-blur-xl border border-white/5 rounded-2xl flex flex-col z-40 shadow-[0_0_50px_rgba(0,0,0,0.55)] glow-border"
      }
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#1a2540] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
            <Cpu size={17} className="text-white" />
          </div>
          <div className="overflow-hidden">
            <div className="font-bold text-white text-sm leading-tight truncate">CreatorOS AI</div>
            <div className="text-[11px] text-indigo-400 truncate">AI for Creators</div>
          </div>
        </div>
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7b8aad] hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} onClick={onClose}>
              <motion.div
                whileHover={{ x: 3 }}
                transition={{ duration: 0.15 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  active
                    ? "bg-indigo-500/20 text-indigo-200 border border-indigo-500/30"
                    : "text-[#7b8aad] hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon size={17} className={`flex-shrink-0 ${active ? "text-indigo-400" : ""}`} />
                <span className="truncate">{label}</span>
                {active && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-5 space-y-3">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
          <span className="text-xs text-emerald-400 font-medium truncate">4 Agents Active</span>
        </div>
        <p className="text-[11px] text-[#7b8aad] px-1 leading-relaxed">
          Powered by Groq<br />Llama 3.3 70B
        </p>
      </div>
    </aside>
  );
}
