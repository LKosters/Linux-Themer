"use client"

import { useState, useEffect } from "react"
import { useGnomeTheme } from "./theme-context"
import {
  Wifi,
  Battery,
  Volume2,
  Search,
  Grid3X3,
  FileText,
  Globe,
  Terminal,
  Settings,
  Folder,
  Image,
  Music,
  X,
  ChevronLeft,
  ChevronRight,
  Power,
  Download,
  Trash2,
  Home,
  Bell,
  Palette,
  Lock,
  Share2,
  User,
} from "lucide-react"

// ── Top Panel ────────────────────────────────────────────────────────────────

function TopPanel() {
  const { theme } = useGnomeTheme()
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    function updateClock() {
      const now = new Date()
      setCurrentDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      )
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      )
    }
    updateClock()
    const interval = setInterval(updateClock, 30000)
    return () => clearInterval(interval)
  }, [])

  const fontSize = theme.panelFontSize ?? 12
  const height = theme.panelHeight ?? 24
  const iconSize = Math.max(fontSize - 2, 8)
  const islands = theme.panelIslands ?? false

  if (islands) {
    const islandRadius = Math.max(height / 2, 8)
    return (
      <div
        className="absolute top-0 left-0 right-0 flex items-start justify-between px-1.5 pt-1"
        style={{
          color: theme.panelText,
          height: `${height + 4}px`,
          fontSize: `${fontSize}px`,
          zIndex: 20,
        }}
      >
        {/* Left island — Activities */}
        <div
          className="flex items-center rounded-full px-3 cursor-default hover:brightness-125 transition-all"
          style={{
            backgroundColor: theme.panelBg,
            opacity: theme.panelOpacity ?? 1,
            height: `${height - 2}px`,
            borderRadius: islandRadius,
          }}
        >
          <span className="font-sans font-medium" style={{ fontSize: `${fontSize}px` }}>
            Activities
          </span>
        </div>

        {/* Center island — Clock */}
        <div
          className="flex items-center gap-1.5 rounded-full px-3 cursor-default hover:brightness-125 transition-all"
          style={{
            backgroundColor: theme.panelBg,
            opacity: theme.panelOpacity ?? 1,
            height: `${height - 2}px`,
            borderRadius: islandRadius,
          }}
        >
          <span className="font-sans font-medium" style={{ fontSize: `${fontSize}px` }}>
            {currentDate}
          </span>
          <span className="font-sans font-medium" style={{ fontSize: `${fontSize}px` }}>
            {currentTime}
          </span>
        </div>

        {/* Right island — System indicators */}
        <div
          className="flex items-center gap-0.5 rounded-full px-2.5 cursor-default hover:brightness-125 transition-all"
          style={{
            backgroundColor: theme.panelBg,
            opacity: theme.panelOpacity ?? 1,
            height: `${height - 2}px`,
            borderRadius: islandRadius,
          }}
        >
          <Wifi size={iconSize} />
          <Volume2 size={iconSize} />
          <Battery size={iconSize} />
          <Power size={Math.max(iconSize - 1, 7)} />
        </div>
      </div>
    )
  }

  // Standard full-width panel
  return (
    <div
      className="absolute top-0 left-0 right-0 flex items-center justify-between px-2"
      style={{
        backgroundColor: theme.panelBg,
        color: theme.panelText,
        opacity: theme.panelOpacity ?? 1,
        height: `${height}px`,
        fontSize: `${fontSize}px`,
        zIndex: 20,
      }}
    >
      {/* Activities button */}
      <span
        className="font-sans font-medium rounded px-2 py-0.5 cursor-default hover:bg-white/10 transition-colors"
        style={{ fontSize: `${fontSize}px` }}
      >
        Activities
      </span>

      {/* Centered clock — GNOME centers the clock */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 font-sans font-medium cursor-default"
        style={{ fontSize: `${fontSize}px` }}
      >
        <span>{currentDate}</span>
        <span>{currentTime}</span>
      </div>

      {/* System indicators — pill-shaped aggregate menu */}
      <div className="flex items-center gap-0.5 rounded-full px-2 py-0.5 cursor-default hover:bg-white/10 transition-colors">
        <Wifi size={iconSize} />
        <Volume2 size={iconSize} />
        <Battery size={iconSize} />
        <Power size={Math.max(iconSize - 1, 7)} />
      </div>
    </div>
  )
}

// ── Window Close Button (libadwaita style) ───────────────────────────────────

function CloseButton({ color }: { color: string }) {
  return (
    <button
      className="flex items-center justify-center rounded-full transition-colors hover:bg-red-500/80 group"
      style={{
        width: 14,
        height: 14,
        backgroundColor: `${color}15`,
      }}
    >
      <X size={8} className="opacity-70 group-hover:text-white group-hover:opacity-100" style={{ color }} />
    </button>
  )
}

// ── File Manager (Nautilus) ──────────────────────────────────────────────────

function FileManagerWindow() {
  const { theme } = useGnomeTheme()

  const panelH = theme.panelHeight ?? 24
  const radius = theme.borderRadius ?? 12
  const leftOffset = theme.dockPosition === "left" ? "11%" : "3%"

  const sidebarItems = [
    { name: "Home", icon: Home, active: true },
    { name: "Documents", icon: FileText },
    { name: "Downloads", icon: Download },
    { name: "Music", icon: Music },
    { name: "Pictures", icon: Image },
    { name: "Trash", icon: Trash2 },
  ]

  const contentFolders = [
    { name: "Documents", icon: FileText },
    { name: "Downloads", icon: Download },
    { name: "Music", icon: Music },
    { name: "Pictures", icon: Image },
    { name: "Videos", icon: Globe },
    { name: "Projects", icon: Folder },
  ]

  return (
    <div
      className="absolute overflow-hidden flex flex-col"
      style={{
        top: `calc(${panelH}px + 5%)`,
        left: leftOffset,
        width: "52%",
        height: "52%",
        borderRadius: `${radius}px`,
        boxShadow: theme.windowShadow
          ? "0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)"
          : "none",
        opacity: theme.windowOpacity,
        zIndex: 5,
      }}
    >
      {/* Headerbar */}
      <div
        className="flex items-center px-2 py-1 shrink-0"
        style={{
          backgroundColor: theme.windowHeaderBg,
          color: theme.windowHeaderText,
          borderRadius: `${radius}px ${radius}px 0 0`,
          minHeight: 28,
        }}
      >
        {/* Left: nav buttons */}
        <div className="flex items-center gap-0.5">
          <div
            className="flex items-center justify-center rounded"
            style={{ width: 18, height: 18, backgroundColor: `${theme.windowHeaderText}10` }}
          >
            <ChevronLeft size={10} style={{ color: `${theme.windowHeaderText}60` }} />
          </div>
          <div
            className="flex items-center justify-center rounded"
            style={{ width: 18, height: 18, backgroundColor: `${theme.windowHeaderText}10` }}
          >
            <ChevronRight size={10} style={{ color: `${theme.windowHeaderText}60` }} />
          </div>
        </div>

        {/* Center: breadcrumb path bar */}
        <div className="flex-1 flex justify-center">
          <div
            className="flex items-center gap-0.5 rounded px-2 py-0.5"
            style={{ backgroundColor: `${theme.windowHeaderText}08` }}
          >
            <Home size={8} style={{ color: `${theme.windowHeaderText}80` }} />
            <ChevronRight size={6} style={{ color: `${theme.windowHeaderText}40` }} />
            <span className="text-[8px] font-sans font-medium" style={{ color: `${theme.windowHeaderText}cc` }}>
              Home
            </span>
          </div>
        </div>

        {/* Right: search + close */}
        <div className="flex items-center gap-1.5">
          <Search size={10} style={{ color: `${theme.windowHeaderText}60` }} />
          <CloseButton color={theme.windowHeaderText} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 min-h-0" style={{ backgroundColor: theme.windowBg }}>
        {/* Sidebar */}
        <div
          className="flex flex-col gap-0.5 px-1.5 py-2 shrink-0 overflow-hidden"
          style={{
            width: "28%",
            borderRight: `1px solid ${theme.windowHeaderText}12`,
          }}
        >
          {sidebarItems.map(({ name, icon: Icon, active }) => (
            <div
              key={name}
              className="flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-[7px] font-sans transition-colors"
              style={{
                color: active ? theme.windowHeaderText : `${theme.windowHeaderText}b0`,
                backgroundColor: active ? `${theme.accentColor}25` : "transparent",
              }}
            >
              <Icon size={8} style={{ color: active ? theme.accentColor : `${theme.windowHeaderText}50` }} />
              {name}
            </div>
          ))}
        </div>

        {/* Main content grid */}
        <div className="flex-1 p-2 overflow-hidden">
          <div className="grid grid-cols-3 gap-1.5">
            {contentFolders.map(({ name, icon: Icon }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-0.5 rounded-lg p-1.5 cursor-default hover:bg-white/5 transition-colors"
              >
                <div
                  className="flex items-center justify-center rounded-lg"
                  style={{
                    width: 30,
                    height: 26,
                    backgroundColor: `${theme.accentColor}20`,
                  }}
                >
                  <Icon size={14} style={{ color: theme.accentColor }} />
                </div>
                <span
                  className="text-[6px] font-sans text-center leading-tight"
                  style={{ color: theme.windowHeaderText }}
                >
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom border radius mask */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0"
        style={{
          borderRadius: `0 0 ${radius}px ${radius}px`,
        }}
      />
    </div>
  )
}

// ── Settings Window (libadwaita style) ───────────────────────────────────────

function SettingsWindow() {
  const { theme } = useGnomeTheme()

  const panelH = theme.panelHeight ?? 24
  const radius = theme.borderRadius ?? 12
  const rightOffset = theme.dockPosition === "right" ? "11%" : "3%"

  const sidebarItems = [
    { name: "Appearance", icon: Palette, active: true },
    { name: "Notifications", icon: Bell },
    { name: "Search", icon: Search },
    { name: "Privacy", icon: Lock },
    { name: "Sharing", icon: Share2 },
    { name: "Users", icon: User },
  ]

  return (
    <div
      className="absolute overflow-hidden flex flex-col"
      style={{
        top: `calc(${panelH}px + 12%)`,
        right: rightOffset,
        width: "42%",
        height: "50%",
        borderRadius: `${radius}px`,
        boxShadow: theme.windowShadow
          ? "0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.25)"
          : "none",
        opacity: theme.windowOpacity,
        zIndex: 4,
      }}
    >
      {/* Headerbar */}
      <div
        className="flex items-center px-2 py-1 shrink-0"
        style={{
          backgroundColor: theme.windowHeaderBg,
          color: theme.windowHeaderText,
          borderRadius: `${radius}px ${radius}px 0 0`,
          minHeight: 28,
        }}
      >
        <div style={{ width: 14 }} />
        <span className="flex-1 text-center text-[10px] font-medium font-sans">Settings</span>
        <CloseButton color={theme.windowHeaderText} />
      </div>

      {/* Content */}
      <div className="flex flex-1 min-h-0" style={{ backgroundColor: theme.windowBg }}>
        {/* Sidebar */}
        <div
          className="flex flex-col gap-0.5 px-1.5 py-2 shrink-0 overflow-hidden"
          style={{
            width: "32%",
            borderRight: `1px solid ${theme.windowHeaderText}12`,
          }}
        >
          {sidebarItems.map(({ name, icon: Icon, active }) => (
            <div
              key={name}
              className="flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-[7px] font-sans transition-colors"
              style={{
                color: active ? theme.windowHeaderText : `${theme.windowHeaderText}b0`,
                backgroundColor: active ? `${theme.accentColor}25` : "transparent",
              }}
            >
              <Icon size={8} style={{ color: active ? theme.accentColor : `${theme.windowHeaderText}50` }} />
              {name}
            </div>
          ))}
        </div>

        {/* Main content — libadwaita preference groups */}
        <div className="flex-1 p-2.5 overflow-hidden">
          <span
            className="text-[8px] font-medium font-sans block mb-2"
            style={{ color: `${theme.windowHeaderText}90` }}
          >
            Style
          </span>

          {/* Light/Dark style selector — libadwaita cards */}
          <div className="flex gap-1.5 mb-3">
            {["Light", "Dark"].map((mode) => (
              <div key={mode} className="flex flex-col items-center gap-0.5">
                <div
                  className="rounded-lg border-2 overflow-hidden"
                  style={{
                    width: 32,
                    height: 22,
                    borderColor: mode === "Dark" ? theme.accentColor : `${theme.windowHeaderText}15`,
                  }}
                >
                  {/* Mini desktop preview inside the card */}
                  <div
                    style={{
                      width: "100%",
                      height: "30%",
                      backgroundColor: mode === "Dark" ? "#1a1a1a" : "#e0e0e0",
                    }}
                  />
                  <div
                    style={{
                      width: "100%",
                      height: "70%",
                      backgroundColor: mode === "Dark" ? "#2d2d2d" : "#f5f5f5",
                    }}
                  />
                </div>
                <span
                  className="text-[6px] font-sans"
                  style={{
                    color: mode === "Dark" ? theme.accentColor : `${theme.windowHeaderText}50`,
                  }}
                >
                  {mode}
                </span>
              </div>
            ))}
          </div>

          {/* Accent Color preference group */}
          <div
            className="rounded-lg p-2"
            style={{ backgroundColor: `${theme.windowHeaderText}08` }}
          >
            <span
              className="text-[7px] font-sans block mb-1.5"
              style={{ color: `${theme.windowHeaderText}70` }}
            >
              Accent Color
            </span>
            <div className="flex gap-1">
              {[
                "#3584e4",
                "#2ec27e",
                "#e5a50a",
                "#ff7800",
                "#e01b24",
                "#9141ac",
                "#986a44",
                theme.accentColor,
              ].map((color, i) => (
                <div
                  key={`${color}-${i}`}
                  className="rounded-full"
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: color,
                    outline:
                      color === theme.accentColor
                        ? `1.5px solid ${theme.windowHeaderText}`
                        : "none",
                    outlineOffset: 1,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Dock (Dash-to-Dock / Ubuntu Dock style) ─────────────────────────────────

function Dock() {
  const { theme } = useGnomeTheme()

  const favoriteApps = [
    { icon: Folder, label: "Files", running: true },
    { icon: Globe, label: "Browser", running: true },
    { icon: Terminal, label: "Terminal", running: false },
    { icon: Settings, label: "Settings", running: true },
  ]

  const isVertical = theme.dockPosition === "left" || theme.dockPosition === "right"
  const radius = theme.borderRadius ?? 12
  const iconSize = theme.dockIconSize ?? 30
  const iconInnerSize = Math.max(Math.round(iconSize * 0.5), 10)

  const positionStyles: React.CSSProperties = isVertical
    ? {
        [theme.dockPosition]: 6,
        top: "50%",
        transform: "translateY(-50%)",
      }
    : {
        bottom: 8,
        left: "50%",
        transform: "translateX(-50%)",
      }

  return (
    <div className="absolute" style={{ ...positionStyles, zIndex: 15 }}>
      <div
        className={`flex ${isVertical ? "flex-col" : "flex-row"} items-center gap-1 px-1.5 py-1.5`}
        style={{
          backgroundColor: theme.dockBg,
          borderRadius: radius,
          backdropFilter: "blur(16px)",
          opacity: theme.dockOpacity,
        }}
      >
        {/* Favorite apps */}
        {favoriteApps.map(({ icon: Icon, label, running }) => (
          <div key={label} className="relative flex flex-col items-center">
            <div
              className="flex items-center justify-center transition-transform hover:scale-110"
              style={{
                width: iconSize,
                height: iconSize,
                backgroundColor: theme.dockIconBg,
                borderRadius: Math.max(radius - 4, 6),
              }}
              title={label}
            >
              <Icon size={iconInnerSize} style={{ color: theme.accentColor }} />
            </div>
            {/* Running indicator dot */}
            {running && (
              <div
                className={`absolute ${isVertical ? (theme.dockPosition === "left" ? "-right-1" : "-left-1") : "-bottom-0.5"}`}
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: "50%",
                  backgroundColor: theme.panelText ?? "#ffffff",
                  opacity: 0.8,
                }}
              />
            )}
          </div>
        ))}

        {/* Separator */}
        <div
          style={{
            backgroundColor: `${theme.panelText ?? "#ffffff"}20`,
            borderRadius: 1,
            ...(isVertical
              ? { width: "60%", height: 1, margin: "2px 0" }
              : { height: "60%", width: 1, margin: "0 2px", alignSelf: "stretch" }),
          }}
        />

        {/* Show Applications button */}
        <div
          className="flex items-center justify-center transition-transform hover:scale-110"
          style={{
            width: iconSize,
            height: iconSize,
            backgroundColor: `${theme.dockIconBg}80`,
            borderRadius: Math.max(radius - 4, 6),
          }}
          title="Show Applications"
        >
          <Grid3X3 size={iconInnerSize} style={{ color: `${theme.panelText ?? "#ffffff"}90` }} />
        </div>
      </div>
    </div>
  )
}

// ── Main Preview ─────────────────────────────────────────────────────────────

export function GnomePreview() {
  const { theme } = useGnomeTheme()

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: theme.aspectRatio }}
    >
      {/* Wallpaper gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${theme.wallpaperGradientFrom}, ${theme.wallpaperGradientTo})`,
        }}
      />

      {/* Wallpaper image overlay */}
      {theme.wallpaperImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${theme.wallpaperImageUrl})`,
            opacity: theme.wallpaperImageOpacity,
          }}
        />
      )}

      {/* Subtle ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, ${theme.accentColor}08 0%, transparent 70%)`,
        }}
      />

      {/* Top Panel */}
      <TopPanel />

      {/* Windows */}
      <FileManagerWindow />
      <SettingsWindow />

      {/* Dock */}
      <Dock />

      {/* Screen edge highlight */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)" }}
      />
    </div>
  )
}
