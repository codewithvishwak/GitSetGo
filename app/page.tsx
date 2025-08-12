"use client"

import { useState } from "react"
import { desktopConfig } from "@/data/desktopConfig"
import { DesktopIcon } from "@/components/desktop-icon"
import { SystemMenu } from "@/components/system-menu"
import { WindowManager } from "@/components/window-manager"
import { Dock } from "@/components/dock"

export default function Desktop() {
  const [openApps, setOpenApps] = useState<string[]>([])
  const [theme, setTheme] = useState<"light" | "dark" | "neon">("light")
  const [focusedApp, setFocusedApp] = useState<string | null>(null)

  const openApp = (appId: string) => {
    if (!openApps.includes(appId)) {
      setOpenApps([...openApps, appId])
    }
    setFocusedApp(appId)
  }

  const closeApp = (appId: string) => {
    setOpenApps(openApps.filter((id) => id !== appId))
    if (focusedApp === appId) {
      setFocusedApp(null)
    }
  }

  const themeClasses = {
    light: "bg-gradient-to-br from-blue-100 to-purple-100",
    dark: "bg-gradient-to-br from-gray-900 to-black",
    neon: "bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900",
  }

  return (
    <div className={`min-h-screen ${themeClasses[theme]} relative overflow-hidden`}>
      {/* System Menu */}
      <SystemMenu theme={theme} setTheme={setTheme} />

      {/* Desktop Icons Grid */}
      <div className="absolute inset-0 p-8">
        <div className="grid grid-cols-6 gap-8 max-w-4xl">
          {desktopConfig.apps.map((app) => (
            <DesktopIcon key={app.id} app={app} theme={theme} onClick={() => openApp(app.id)} />
          ))}
        </div>
      </div>

      {/* Window Manager */}
      <WindowManager
        openApps={openApps}
        closeApp={closeApp}
        theme={theme}
        focusedApp={focusedApp}
        onFocusApp={setFocusedApp}
      />

      {/* Dock */}
      <Dock openApps={openApps} apps={desktopConfig.apps} theme={theme} onAppClick={openApp} />
    </div>
  )
}
