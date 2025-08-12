"use client"

import { motion } from "framer-motion"
import type { AppConfig } from "@/data/desktopConfig"

interface DockProps {
  openApps: string[]
  apps: AppConfig[]
  theme: "light" | "dark" | "neon"
  onAppClick: (appId: string) => void
}

export function Dock({ openApps, apps, theme, onAppClick }: DockProps) {
  const themeStyles = {
    light: "bg-white/20 border-white/30",
    dark: "bg-black/20 border-white/10",
    neon: "bg-cyan-500/10 border-cyan-500/30 shadow-cyan-500/20",
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`
        fixed bottom-4 left-1/2 transform -translate-x-1/2
        flex items-center gap-2 p-3 rounded-2xl backdrop-blur-md border
        ${themeStyles[theme]}
        ${theme === "neon" ? "shadow-xl" : "shadow-lg"}
        z-50
      `}
    >
      {apps
        .filter((app) => openApps.includes(app.id))
        .map((app) => (
          <motion.button
            key={app.id}
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onAppClick(app.id)}
            className={`
              w-12 h-12 rounded-xl flex items-center justify-center text-xl
              ${app.color} shadow-md transition-all duration-200
              relative
            `}
          >
            {app.icon}
            <motion.div
              className={`
                absolute -bottom-1 w-1 h-1 rounded-full
                ${theme === "light" ? "bg-gray-800" : ""}
                ${theme === "dark" ? "bg-white" : ""}
                ${theme === "neon" ? "bg-cyan-300" : ""}
              `}
              layoutId={`dock-indicator-${app.id}`}
            />
          </motion.button>
        ))}
    </motion.div>
  )
}
