"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, TrendingUp, Zap, BarChart3, Brain, Cpu } from "lucide-react";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/trends", icon: TrendingUp, label: "Trend Explorer" },
  { href: "/generate", icon: Zap, label: "Content Generator" },
  { href: "/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/reasoning", icon: Brain, label: "AI Reasoning" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#0a0f1e] border-r border-[#1a2540] flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-[#1a2540]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
            <Cpu size={18} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-white text-sm">CreatorOS AI</div>
            <div className="text-xs text-indigo-400">AI for Creators</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  active
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                    : "text-[#7b8aad] hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={18} className={active ? "text-indigo-400" : ""} />
                {label}
                {active && (
                  <motion.div
                    layoutId="active-pill"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#1a2540]">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
          <span className="text-xs text-emerald-400 font-medium">4 Agents Active</span>
        </div>
        <p className="text-xs text-[#7b8aad] mt-3 px-1">Powered by Groq Llama 3.3 70B</p>
      </div>
    </aside>
  );
}
