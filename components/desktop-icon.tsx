"use client"

import { motion } from "framer-motion"
import type { AppConfig } from "@/data/desktopConfig"

interface DesktopIconProps {
  app: AppConfig
  theme: "light" | "dark" | "neon"
  onClick: () => void
}

export function DesktopIcon({ app, theme, onClick }: DesktopIconProps) {
  const themeStyles = {
    light: "text-gray-800 hover:bg-white/20",
    dark: "text-white hover:bg-white/10",
    neon: "text-cyan-300 hover:bg-cyan-500/20 hover:shadow-cyan-500/50",
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer
        backdrop-blur-sm transition-all duration-200
        ${themeStyles[theme]}
        ${theme === "neon" ? "hover:shadow-lg" : ""}
      `}
      onClick={onClick}
    >
      <div
        className={`
        w-16 h-16 rounded-xl flex items-center justify-center text-2xl mb-2
        ${app.color} shadow-lg
      `}
      >
        {app.icon}
      </div>
      <span className="text-sm font-medium">{app.name}</span>
    </motion.div>
  )
}
