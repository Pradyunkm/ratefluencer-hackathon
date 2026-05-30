import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardLayout from "@/components/DashboardLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "CreatorOS AI — AI Operating System for Creators",
  description: "Multi-agent AI platform for viral content creation, trend intelligence, and creator analytics.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-[#050814] text-white min-h-screen`}>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
