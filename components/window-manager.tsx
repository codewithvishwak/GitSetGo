"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { TodoApp } from "@/components/todo-app"
import { NotesApp } from "@/components/notes-app"
import { GalleryApp } from "@/components/gallery-app"
import WorkshopGuide from "@/components/workshop-guide"
import CalculatorApp from "@/components/calculator-app"

interface WindowManagerProps {
  openApps: string[]
  closeApp: (appId: string) => void
  theme: "light" | "dark" | "neon"
  focusedApp?: string // Added prop to handle focused app from dock clicks
  onFocusApp?: (appId: string) => void // Added callback for focusing apps
}

export function WindowManager({ openApps, closeApp, theme, focusedApp, onFocusApp }: WindowManagerProps) {
  const [minimizedApps, setMinimizedApps] = useState<Set<string>>(new Set())
  const [maximizedApps, setMaximizedApps] = useState<Set<string>>(new Set())
  const [windowOrder, setWindowOrder] = useState<string[]>([])

  const themeStyles = {
    light: "bg-white/95 border-gray-200",
    dark: "bg-gray-900/95 border-gray-700",
    neon: "bg-purple-900/95 border-cyan-500/30 shadow-cyan-500/20",
  }

  const activeWindowStyles = {
    light: "border-blue-400 shadow-blue-200/50",
    dark: "border-blue-500 shadow-blue-500/30",
    neon: "border-cyan-400 shadow-cyan-400/50",
  }

  const bringToFront = (appId: string) => {
    setWindowOrder((prev) => {
      const filtered = prev.filter((id) => id !== appId)
      return [...filtered, appId]
    })
    onFocusApp?.(appId)
  }

  const getZIndex = (appId: string) => {
    const baseZIndex = 40
    const orderIndex = windowOrder.indexOf(appId)
    return baseZIndex + (orderIndex >= 0 ? orderIndex : 0)
  }

  const isActiveWindow = (appId: string) => {
    return focusedApp === appId || windowOrder[windowOrder.length - 1] === appId
  }

  const toggleMinimize = (appId: string) => {
    const newMinimized = new Set(minimizedApps)
    if (newMinimized.has(appId)) {
      newMinimized.delete(appId)
      bringToFront(appId)
    } else {
      newMinimized.add(appId)
    }
    setMinimizedApps(newMinimized)
  }

  const toggleMaximize = (appId: string) => {
    const newMaximized = new Set(maximizedApps)
    if (newMaximized.has(appId)) {
      newMaximized.delete(appId)
    } else {
      newMaximized.add(appId)
    }
    setMaximizedApps(newMaximized)
    bringToFront(appId)
  }

  const renderAppContent = (appId: string) => {
    switch (appId) {
      case "guide":
        return <WorkshopGuide />
      case "todo":
        return <TodoApp theme={theme} />
      case "notes":
        return <NotesApp theme={theme} />
      case "gallery":
        return <GalleryApp theme={theme} />
      case "calculator":
        return <CalculatorApp />
      default:
        return (
          <div
            className={`
              flex items-center justify-center h-full rounded-lg
              ${theme === "light" ? "bg-gray-100/50 text-gray-600" : ""}
              ${theme === "dark" ? "bg-gray-800/50 text-gray-400" : ""}
              ${theme === "neon" ? "bg-purple-800/30 text-cyan-400" : ""}
            `}
          >
            {appId} App Coming Soon...
          </div>
        )
    }
  }

  const getWindowStyles = (appId: string) => {
    const isMinimized = minimizedApps.has(appId)
    const isMaximized = maximizedApps.has(appId)

    if (isMinimized) {
      return "w-80 h-8"
    }

    if (isMaximized) {
      return "w-full h-full top-0 left-0"
    }

    // Default fullscreen-like size
    switch (appId) {
      case "guide":
        return "w-[90vw] h-[85vh]"
      case "notes":
        return "w-[85vw] h-[80vh]"
      case "gallery":
        return "w-[80vw] h-[75vh]"
      case "calculator":
        return "w-[400px] h-[600px]"
      default:
        return "w-[70vw] h-[70vh]"
    }
  }

  return (
    <AnimatePresence>
      {openApps.map((appId, index) => {
        const isMinimized = minimizedApps.has(appId)
        const isMaximized = maximizedApps.has(appId)
        const isActive = isActiveWindow(appId)

        return (
          <motion.div
            key={appId}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: isMaximized ? 0 : 50 + index * 30,
              y: isMaximized ? 0 : 50 + index * 30,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            drag={!isMaximized}
            dragMomentum={false}
            onClick={() => bringToFront(appId)}
            className={`
              absolute rounded-xl border backdrop-blur-md
              ${getWindowStyles(appId)}
              ${isActive ? activeWindowStyles[theme] : themeStyles[theme]}
              ${theme === "neon" ? "shadow-xl" : "shadow-lg"}
              flex flex-col cursor-pointer
              ${isMaximized ? "rounded-none" : ""}
            `}
            style={{ zIndex: getZIndex(appId) }}
          >
            <div
              className={`
              flex items-center justify-between p-3 border-b flex-shrink-0
              ${isMaximized ? "rounded-none" : "rounded-t-xl"}
              ${theme === "light" ? "border-gray-200 bg-gray-50/80" : ""}
              ${theme === "dark" ? "border-gray-700 bg-gray-800/80" : ""}
              ${theme === "neon" ? "border-cyan-500/30 bg-purple-800/80" : ""}
            `}
            >
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation() // Prevent window focus when closing
                    closeApp(appId)
                  }}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors group relative"
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[8px] text-red-800 opacity-0 group-hover:opacity-100 font-bold">
                    ×
                  </span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation() // Prevent window focus when minimizing
                    toggleMinimize(appId)
                  }}
                  className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors group relative"
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[8px] text-yellow-800 opacity-0 group-hover:opacity-100 font-bold">
                    −
                  </span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation() // Prevent window focus when maximizing
                    toggleMaximize(appId)
                  }}
                  className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors group relative"
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[6px] text-green-800 opacity-0 group-hover:opacity-100 font-bold">
                    ⌃
                  </span>
                </button>
              </div>

              <span
                className={`
                font-medium capitalize flex-1 text-center
                ${theme === "light" ? "text-gray-800" : ""}
                ${theme === "dark" ? "text-white" : ""}
                ${theme === "neon" ? "text-cyan-300" : ""}
              `}
              >
                {appId === "guide" ? "Workshop Guide" : appId}
              </span>

              {/* Spacer to center the title */}
              <div className="w-[60px]"></div>
            </div>

            {!isMinimized && <div className="flex-1 overflow-hidden">{renderAppContent(appId)}</div>}
          </motion.div>
        )
      })}
    </AnimatePresence>
  )
}
