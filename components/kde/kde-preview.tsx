"use client"

import { useState, useEffect } from "react"
import { useKDETheme } from "./theme-context"
import {
  Wifi,
  Battery,
  Volume2,
  Folder,
  Globe,
  Terminal as TerminalIcon,
  FileText,
  Image,
  Music,
  Download,
  Home,
  ChevronRight,
  ChevronDown,
  Search,
  X,
  Minus,
  Square,
  Maximize2,
  Settings,
} from "lucide-react"

// ── Window Buttons ──────────────────────────────────────────────────────────

function WindowButtons({
  style,
  headerText,
  accent,
}: {
  style: "breeze" | "oxygen" | "circles"
  headerText: string
  accent: string
}) {
  if (style === "circles") {
    return (
      <div className="flex items-center gap-1">
        <div className="rounded-full" style={{ width: 9, height: 9, backgroundColor: "#ff5f57" }} />
        <div className="rounded-full" style={{ width: 9, height: 9, backgroundColor: "#febc2e" }} />
        <div className="rounded-full" style={{ width: 9, height: 9, backgroundColor: "#28c840" }} />
      </div>
    )
  }

  if (style === "oxygen") {
    return (
      <div className="flex items-center gap-1">
        <div
          className="rounded-full flex items-center justify-center"
          style={{ width: 11, height: 11, background: `linear-gradient(135deg, #666, #444)` }}
        >
          <Minus size={6} style={{ color: "#ccc" }} />
        </div>
        <div
          className="rounded-full flex items-center justify-center"
          style={{ width: 11, height: 11, background: `linear-gradient(135deg, #666, #444)` }}
        >
          <Maximize2 size={5} style={{ color: "#ccc" }} />
        </div>
        <div
          className="rounded-full flex items-center justify-center"
          style={{ width: 11, height: 11, background: `linear-gradient(135deg, #c44, #a22)` }}
        >
          <X size={6} style={{ color: "#eee" }} />
        </div>
      </div>
    )
  }

  // Breeze — flat geometric
  return (
    <div className="flex items-center gap-0.5">
      <div
        className="flex items-center justify-center rounded-sm hover:bg-white/10 transition-colors"
        style={{ width: 14, height: 14 }}
      >
        <Minus size={8} style={{ color: `${headerText}90` }} />
      </div>
      <div
        className="flex items-center justify-center rounded-sm hover:bg-white/10 transition-colors"
        style={{ width: 14, height: 14 }}
      >
        <Square size={7} style={{ color: `${headerText}90` }} />
      </div>
      <div
        className="flex items-center justify-center rounded-sm hover:bg-red-500/80 transition-colors"
        style={{ width: 14, height: 14 }}
      >
        <X size={8} style={{ color: `${headerText}90` }} />
      </div>
    </div>
  )
}

// ── Dolphin File Manager ────────────────────────────────────────────────────

function DolphinWindow() {
  const { theme } = useKDETheme()
  const radius = theme.borderRadius
  const panelH = theme.panelHeight
  const isBottom = theme.panelPosition === "bottom"

  const sidebarItems = [
    { name: "Home", icon: Home, active: true },
    { name: "Documents", icon: FileText },
    { name: "Downloads", icon: Download },
    { name: "Music", icon: Music },
    { name: "Pictures", icon: Image },
  ]

  const files = [
    { name: "Documents", icon: Folder, isDir: true },
    { name: "Downloads", icon: Folder, isDir: true },
    { name: "Music", icon: Folder, isDir: true },
    { name: "Pictures", icon: Folder, isDir: true },
    { name: "readme.md", icon: FileText, isDir: false },
    { name: "notes.txt", icon: FileText, isDir: false },
  ]

  return (
    <div
      className="absolute overflow-hidden flex flex-col"
      style={{
        top: isBottom ? "5%" : `calc(${panelH}px + 5%)`,
        left: "3%",
        width: "52%",
        height: "55%",
        borderRadius: `${radius}px`,
        boxShadow: theme.windowShadow
          ? "0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)"
          : "none",
        opacity: theme.windowOpacity,
        zIndex: 5,
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center px-2 shrink-0"
        style={{
          backgroundColor: theme.windowHeaderBg,
          color: theme.windowHeaderText,
          borderRadius: `${radius}px ${radius}px 0 0`,
          minHeight: 26,
        }}
      >
        <div className="flex items-center gap-1 flex-1">
          <Folder size={10} style={{ color: theme.accentColor }} />
          <span className="text-[9px] font-sans font-medium">Dolphin</span>
        </div>
        <WindowButtons
          style={theme.windowButtonStyle}
          headerText={theme.windowHeaderText}
          accent={theme.accentColor}
        />
      </div>

      {/* Toolbar */}
      <div
        className="flex items-center gap-1 px-2 py-0.5 shrink-0"
        style={{
          backgroundColor: theme.windowHeaderBg,
          borderBottom: `1px solid ${theme.windowHeaderText}10`,
        }}
      >
        <div className="flex items-center gap-0.5">
          <div
            className="rounded px-1.5 py-0.5 text-[7px] font-sans"
            style={{ backgroundColor: `${theme.windowHeaderText}08`, color: `${theme.windowHeaderText}80` }}
          >
            <Home size={8} />
          </div>
          <ChevronRight size={6} style={{ color: `${theme.windowHeaderText}40` }} />
        </div>
        <div
          className="flex-1 rounded px-1.5 py-0.5 text-[7px] font-sans"
          style={{ backgroundColor: `${theme.windowHeaderText}08`, color: `${theme.windowHeaderText}60` }}
        >
          /home/user
        </div>
        <Search size={8} style={{ color: `${theme.windowHeaderText}50` }} />
      </div>

      {/* Content */}
      <div className="flex flex-1 min-h-0" style={{ backgroundColor: theme.windowBg }}>
        {/* Sidebar */}
        <div
          className="flex flex-col gap-0.5 px-1 py-1.5 shrink-0 overflow-hidden"
          style={{
            width: "26%",
            borderRight: `1px solid ${theme.windowHeaderText}10`,
          }}
        >
          <span
            className="text-[6px] font-sans font-medium uppercase px-1 mb-0.5"
            style={{ color: `${theme.windowHeaderText}50` }}
          >
            Places
          </span>
          {sidebarItems.map(({ name, icon: Icon, active }) => (
            <div
              key={name}
              className="flex items-center gap-1 rounded px-1 py-0.5 text-[7px] font-sans"
              style={{
                color: active ? theme.windowHeaderText : `${theme.windowHeaderText}b0`,
                backgroundColor: active ? `${theme.highlightColor}25` : "transparent",
              }}
            >
              <Icon size={7} style={{ color: active ? theme.accentColor : `${theme.windowHeaderText}50` }} />
              {name}
            </div>
          ))}
        </div>

        {/* File list */}
        <div className="flex-1 p-1 overflow-hidden">
          {files.map(({ name, icon: Icon, isDir }) => (
            <div
              key={name}
              className="flex items-center gap-1.5 rounded px-1 py-0.5 text-[7px] font-sans hover:bg-white/5 transition-colors"
              style={{ color: theme.windowHeaderText }}
            >
              <Icon size={8} style={{ color: isDir ? theme.accentColor : `${theme.windowHeaderText}60` }} />
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Konsole Terminal ────────────────────────────────────────────────────────

function KonsoleWindow() {
  const { theme } = useKDETheme()
  const radius = theme.borderRadius
  const panelH = theme.panelHeight
  const isBottom = theme.panelPosition === "bottom"

  return (
    <div
      className="absolute overflow-hidden flex flex-col"
      style={{
        top: isBottom ? "12%" : `calc(${panelH}px + 12%)`,
        right: "3%",
        width: "44%",
        height: "50%",
        borderRadius: `${radius}px`,
        boxShadow: theme.windowShadow
          ? "0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.25)"
          : "none",
        opacity: theme.windowOpacity,
        zIndex: 4,
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center px-2 shrink-0"
        style={{
          backgroundColor: theme.windowHeaderBg,
          color: theme.windowHeaderText,
          borderRadius: `${radius}px ${radius}px 0 0`,
          minHeight: 26,
        }}
      >
        <div className="flex items-center gap-1 flex-1">
          <TerminalIcon size={9} style={{ color: theme.accentColor }} />
          <span className="text-[9px] font-sans font-medium">Konsole</span>
        </div>
        <WindowButtons
          style={theme.windowButtonStyle}
          headerText={theme.windowHeaderText}
          accent={theme.accentColor}
        />
      </div>

      {/* Terminal content */}
      <div
        className="flex-1 p-2 font-mono text-[7px] leading-[1.6] overflow-hidden"
        style={{ backgroundColor: "#0e1019", color: "#a0b0c0" }}
      >
        <div>
          <span style={{ color: theme.accentColor }}>user@kde</span>
          <span style={{ color: "#606878" }}>:</span>
          <span style={{ color: "#7aa2f7" }}>~</span>
          <span style={{ color: "#606878" }}>$ </span>
          <span style={{ color: "#c0cad0" }}>neofetch</span>
        </div>
        <div className="mt-1 flex gap-2">
          <div className="text-[6px] leading-[1.5]" style={{ color: theme.accentColor }}>
            {"     /\\\n    /  \\\n   /    \\\n  /      \\\n /________\\".split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
          <div className="text-[6px] leading-[1.5]">
            <div><span style={{ color: theme.accentColor }}>OS:</span> Arch Linux x86_64</div>
            <div><span style={{ color: theme.accentColor }}>DE:</span> KDE Plasma 6.2</div>
            <div><span style={{ color: theme.accentColor }}>WM:</span> KWin (Wayland)</div>
            <div><span style={{ color: theme.accentColor }}>Theme:</span> Breeze Dark</div>
            <div><span style={{ color: theme.accentColor }}>Shell:</span> fish 3.7</div>
          </div>
        </div>
        <div className="mt-1">
          <span style={{ color: theme.accentColor }}>user@kde</span>
          <span style={{ color: "#606878" }}>:</span>
          <span style={{ color: "#7aa2f7" }}>~</span>
          <span style={{ color: "#606878" }}>$ </span>
          <span className="animate-pulse" style={{ color: "#c0cad0" }}>_</span>
        </div>
      </div>
    </div>
  )
}

// ── Plasma Panel (Taskbar) ──────────────────────────────────────────────────

function PlasmaPanel() {
  const { theme } = useKDETheme()
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    function updateClock() {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      )
      setCurrentDate(
        now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
      )
    }
    updateClock()
    const interval = setInterval(updateClock, 30000)
    return () => clearInterval(interval)
  }, [])

  const fontSize = theme.panelFontSize
  const height = theme.panelHeight
  const iconSize = Math.max(fontSize, 10)
  const floating = theme.panelFloating
  const isBottom = theme.panelPosition === "bottom"

  const pinnedApps = [
    { icon: Folder, label: "Dolphin" },
    { icon: Globe, label: "Firefox" },
    { icon: TerminalIcon, label: "Konsole" },
    { icon: Settings, label: "System Settings" },
    { icon: FileText, label: "Kate" },
  ]

  const panelRadius = floating ? 8 : 0
  const panelMargin = floating ? 6 : 0

  return (
    <div
      className="absolute left-0 right-0 flex items-center"
      style={{
        [isBottom ? "bottom" : "top"]: panelMargin,
        left: panelMargin,
        right: panelMargin,
        height: `${height}px`,
        backgroundColor: theme.panelBg,
        color: theme.panelText,
        opacity: theme.panelOpacity,
        fontSize: `${fontSize}px`,
        borderRadius: panelRadius,
        zIndex: 20,
        boxShadow: floating ? "0 2px 12px rgba(0,0,0,0.4)" : "none",
      }}
    >
      {/* App menu button */}
      <div
        className="flex items-center justify-center shrink-0 hover:brightness-125 transition-all cursor-default"
        style={{
          width: height,
          height: height,
          borderRadius: isBottom
            ? `${panelRadius}px 0 0 ${panelRadius}px`
            : `${panelRadius}px 0 0 ${panelRadius}px`,
        }}
      >
        <div
          className="rounded-sm"
          style={{
            width: iconSize + 4,
            height: iconSize + 4,
            background: `linear-gradient(135deg, ${theme.accentColor}, ${theme.highlightColor})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 3,
          }}
        >
          <svg
            viewBox="0 0 16 16"
            style={{ width: iconSize - 2, height: iconSize - 2, fill: "#fff" }}
          >
            <rect x="1" y="1" width="6" height="6" rx="1" />
            <rect x="9" y="1" width="6" height="6" rx="1" />
            <rect x="1" y="9" width="6" height="6" rx="1" />
            <rect x="9" y="9" width="6" height="6" rx="1" />
          </svg>
        </div>
      </div>

      {/* Separator */}
      <div
        className="shrink-0"
        style={{ width: 1, height: "50%", backgroundColor: `${theme.panelText}15`, margin: "0 2px" }}
      />

      {/* Pinned apps */}
      <div className="flex items-center gap-0.5 px-1">
        {pinnedApps.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center justify-center hover:bg-white/10 transition-colors rounded cursor-default"
            style={{ width: height - 6, height: height - 6 }}
            title={label}
          >
            <Icon size={iconSize} style={{ color: theme.panelText }} />
          </div>
        ))}
      </div>

      {/* Separator */}
      <div
        className="shrink-0"
        style={{ width: 1, height: "50%", backgroundColor: `${theme.panelText}15`, margin: "0 2px" }}
      />

      {/* Task manager — open windows */}
      <div className="flex items-center gap-0.5 px-1 flex-1 min-w-0">
        {[
          { icon: Folder, label: "Dolphin", active: true },
          { icon: TerminalIcon, label: "Konsole", active: false },
        ].map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            className="flex items-center gap-1 rounded px-1.5 min-w-0"
            style={{
              height: height - 8,
              backgroundColor: active ? `${theme.highlightColor}25` : "transparent",
              borderBottom: active ? `2px solid ${theme.accentColor}` : "2px solid transparent",
            }}
          >
            <Icon size={iconSize - 2} style={{ color: theme.panelText }} />
            <span
              className="text-[8px] font-sans truncate"
              style={{ color: active ? theme.panelText : `${theme.panelText}90` }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* System tray */}
      <div
        className="flex items-center gap-0.5 px-1.5 shrink-0"
        style={{ backgroundColor: `${theme.trayBg}40`, height: "100%" }}
      >
        <ChevronDown size={iconSize - 3} style={{ color: `${theme.panelText}60` }} />
        <Wifi size={iconSize - 2} style={{ color: theme.panelText }} />
        <Volume2 size={iconSize - 2} style={{ color: theme.panelText }} />
        <Battery size={iconSize - 2} style={{ color: theme.panelText }} />
      </div>

      {/* Digital clock */}
      <div
        className="flex flex-col items-center justify-center px-2 shrink-0 cursor-default hover:bg-white/10 transition-colors"
        style={{
          height: "100%",
          borderRadius: isBottom
            ? `0 ${panelRadius}px ${panelRadius}px 0`
            : `0 ${panelRadius}px ${panelRadius}px 0`,
        }}
      >
        <span className="font-sans font-medium leading-none" style={{ fontSize: `${fontSize}px` }}>
          {currentTime}
        </span>
        <span className="font-sans leading-none" style={{ fontSize: `${Math.max(fontSize - 3, 7)}px`, color: `${theme.panelText}80` }}>
          {currentDate}
        </span>
      </div>
    </div>
  )
}

// ── Main Preview ────────────────────────────────────────────────────────────

export function KDEPreview() {
  const { theme } = useKDETheme()

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: theme.aspectRatio }}
    >
      {/* Wallpaper */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${theme.wallpaperGradientFrom}, ${theme.wallpaperGradientTo})`,
        }}
      />

      {theme.wallpaperImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${theme.wallpaperImageUrl})`,
            opacity: theme.wallpaperImageOpacity,
          }}
        />
      )}

      {/* Ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 60% 40%, ${theme.accentColor}08 0%, transparent 70%)`,
        }}
      />

      {/* Windows */}
      <DolphinWindow />
      <KonsoleWindow />

      {/* Panel */}
      <PlasmaPanel />

      {/* Screen edge */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)" }}
      />
    </div>
  )
}
