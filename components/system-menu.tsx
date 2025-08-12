"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SystemMenuProps {
  theme: "light" | "dark" | "neon"
  setTheme: (theme: "light" | "dark" | "neon") => void
}

export function SystemMenu({ theme, setTheme }: SystemMenuProps) {
  const themeStyles = {
    light: "bg-white/20 text-gray-800 hover:bg-white/30",
    dark: "bg-black/20 text-white hover:bg-black/30",
    neon: "bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 shadow-cyan-500/50",
  }

  return (
    <div className="absolute top-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`
              backdrop-blur-sm border-0 rounded-full
              ${themeStyles[theme]}
              ${theme === "neon" ? "shadow-lg" : ""}
            `}
          >
            ⚙️
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className={`
            backdrop-blur-md border-0
            ${theme === "light" ? "bg-white/80" : ""}
            ${theme === "dark" ? "bg-black/80" : ""}
            ${theme === "neon" ? "bg-purple-900/80 border border-cyan-500/30" : ""}
          `}
        >
          <DropdownMenuItem onClick={() => setTheme("light")}>☀️ Light Theme</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>🌙 Dark Theme</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("neon")}>⚡ Neon Theme</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
