"use client"

import { useState, useEffect } from "react"
import { useCinnamonTheme } from "./theme-context"
import {
  Wifi,
  Battery,
  Volume2,
  Folder,
  FileText,
  Globe,
  Terminal,
  X,
  Minus,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Home,
  Download,
  Music,
  Image,
  Search,
  LayoutGrid,
  Type,
  Lock,
  LogOut,
  Power,
  Calculator,
  Settings,
  Star,
  Monitor,
} from "lucide-react"

// ── Panel ────────────────────────────────────────────────────────────────────

function CinnamonPanel({
  menuOpen,
  onMenuToggle,
}: {
  menuOpen: boolean
  onMenuToggle: () => void
}) {
  const { theme } = useCinnamonTheme()
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    function updateClock() {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }) +
          "  " +
          now.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })
      )
    }
    updateClock()
    const interval = setInterval(updateClock, 30000)
    return () => clearInterval(interval)
  }, [])

  const isBottom = theme.panelPosition === "bottom"
  const height = theme.panelHeight ?? 28
  const margin = theme.panelMargin ?? 0
  const radius = theme.panelBorderRadius ?? 0
  const width = theme.panelWidth ?? 100
  const iconSize = theme.panelIconSize ?? 14

  return (
    <div
      className="absolute flex items-center justify-between px-1"
      style={{
        [isBottom ? "bottom" : "top"]: margin > 0 ? `${margin}px` : 0,
        left: width < 100 ? "50%" : 0,
        right: width < 100 ? undefined : 0,
        width: width < 100 ? `${width}%` : undefined,
        transform: width < 100 ? "translateX(-50%)" : undefined,
        backgroundColor: theme.panelBg,
        color: theme.panelText,
        opacity: theme.panelOpacity ?? 1,
        height: `${height}px`,
        fontSize: "10px",
        zIndex: 20,
        borderRadius: `${radius}px`,
        boxShadow: margin > 0 ? "0 2px 12px rgba(0,0,0,0.4)" : "none",
      }}
    >
      {/* Left: Menu button + window list */}
      <div className="flex items-center gap-0.5 h-full">
        {/* Cinnamon menu button */}
        <div
          className="flex items-center gap-1 px-2 h-full cursor-pointer hover:bg-white/10 transition-colors"
          onClick={onMenuToggle}
          style={{
            backgroundColor: menuOpen ? `${theme.menuHighlight}30` : "transparent",
          }}
        >
          <LayoutGrid size={12} style={{ color: theme.accentColor }} />
          <span className="font-sans font-medium text-[10px]">Menu</span>
        </div>

        {/* Window list items */}
        <div
          className="flex items-center gap-0.5 px-2 h-full cursor-default"
          style={{ backgroundColor: `${theme.accentColor}30` }}
        >
          <Folder size={10} style={{ color: theme.accentColor }} />
          <span className="font-sans text-[9px]">Files</span>
        </div>
        <div className="flex items-center gap-0.5 px-2 h-full cursor-default hover:bg-white/10 transition-colors">
          <Type size={10} />
          <span className="font-sans text-[9px]">Editor</span>
        </div>
      </div>

      {/* Right: System tray */}
      <div className="flex items-center gap-1 h-full">
        <div className="flex items-center gap-1 px-1">
          <Wifi size={iconSize - 4} />
          <Volume2 size={iconSize - 4} />
          <Battery size={iconSize - 4} />
        </div>
        <div className="flex items-center px-2 h-full cursor-default hover:bg-white/10 transition-colors">
          <span className="font-sans text-[9px]">{currentTime}</span>
        </div>
      </div>
    </div>
  )
}

// ── Application Menu ─────────────────────────────────────────────────────────

const MENU_CATEGORIES = [
  { name: "All Applications", icon: LayoutGrid },
  { name: "Favorites", icon: Star },
  { name: "Internet", icon: Globe },
  { name: "Office", icon: FileText },
  { name: "Graphics", icon: Image },
  { name: "System", icon: Settings },
]

const MENU_APPS = [
  { name: "Firefox", icon: Globe },
  { name: "Files", icon: Folder },
  { name: "Terminal", icon: Terminal },
  { name: "Text Editor", icon: FileText },
  { name: "Calculator", icon: Calculator },
  { name: "Settings", icon: Settings },
  { name: "Image Viewer", icon: Image },
  { name: "System Monitor", icon: Monitor },
]

function CinnamonMenu() {
  const { theme } = useCinnamonTheme()
  const isBottom = theme.panelPosition === "bottom"
  const panelH = theme.panelHeight ?? 28
  const panelMargin = theme.panelMargin ?? 0
  const panelWidth = theme.panelWidth ?? 100
  const iconSize = Math.max(Math.round((theme.menuIconSize ?? 24) * 0.45), 8)

  // Position menu relative to panel
  const menuOffset = panelH + panelMargin + 2
  const menuLeft = panelWidth < 100
    ? `calc(50% - ${panelWidth / 2}%)`
    : "0"

  return (
    <div
      className="absolute flex flex-col overflow-hidden"
      style={{
        [isBottom ? "bottom" : "top"]: `${menuOffset}px`,
        left: menuLeft,
        width: `${theme.menuWidth ?? 40}%`,
        maxHeight: `calc(100% - ${panelH}px - 8px)`,
        backgroundColor: theme.menuBg,
        color: theme.menuText,
        borderRadius: `${theme.menuBorderRadius ?? 6}px`,
        opacity: theme.menuOpacity ?? 1,
        boxShadow: "0 6px 24px rgba(0,0,0,0.5)",
        zIndex: 25,
      }}
    >
      {/* Search bar */}
      <div
        className="flex items-center gap-1.5 mx-2 mt-2 px-2 py-1 rounded"
        style={{ backgroundColor: `${theme.menuText}10` }}
      >
        <Search size={9} style={{ color: `${theme.menuText}60` }} />
        <span className="text-[10px] font-sans" style={{ color: `${theme.menuText}50` }}>
          Search...
        </span>
      </div>

      {/* Main content: categories + apps */}
      <div className="flex flex-1 min-h-0 mt-1.5">
        {/* Category sidebar */}
        <div
          className="flex flex-col gap-0.5 py-1 px-1 shrink-0 overflow-y-auto"
          style={{
            width: "38%",
            borderRight: `1px solid ${theme.menuSeparatorColor}`,
          }}
        >
          {MENU_CATEGORIES.map((cat, i) => (
            <div
              key={cat.name}
              className="flex items-center gap-1 rounded px-1.5 py-0.5 cursor-default"
              style={{
                backgroundColor: i === 0 ? theme.menuHighlight : "transparent",
                color: i === 0 ? "#ffffff" : theme.menuText,
              }}
            >
              <cat.icon size={8} style={{ opacity: 0.8 }} />
              <span className="text-[8px] font-sans truncate">{cat.name}</span>
            </div>
          ))}
        </div>

        {/* App list */}
        <div className="flex-1 py-1 px-1 overflow-y-auto">
          <div className="flex flex-col gap-0.5">
            {MENU_APPS.map((app) => (
              <div
                key={app.name}
                className="flex items-center gap-1.5 rounded px-1.5 py-0.5 cursor-default hover:brightness-110 transition-colors"
                style={{ backgroundColor: "transparent" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${theme.menuHighlight}25`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
              >
                <div
                  className="flex items-center justify-center rounded shrink-0"
                  style={{
                    width: iconSize + 4,
                    height: iconSize + 4,
                    backgroundColor: `${theme.menuText}10`,
                  }}
                >
                  <app.icon size={iconSize} style={{ color: theme.accentColor }} />
                </div>
                <span className="text-[9px] font-sans">{app.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Session buttons */}
      <div
        className="flex items-center justify-center gap-2 px-2 py-1.5 mt-0.5"
        style={{ borderTop: `1px solid ${theme.menuSeparatorColor}` }}
      >
        {[
          { icon: Lock, label: "Lock" },
          { icon: LogOut, label: "Log Out" },
          { icon: Power, label: "Shut Down" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center justify-center rounded p-1 cursor-default transition-colors"
            title={label}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${theme.menuHighlight}30`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
            }}
          >
            <Icon size={9} style={{ color: `${theme.menuText}90` }} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Window Controls (Traditional) ────────────────────────────────────────────

function WindowControls({
  layout,
  headerText,
}: {
  layout: "right" | "left"
  headerText: string
}) {
  const buttons = (
    <div className="flex items-center gap-1">
      <button
        className="flex items-center justify-center rounded-sm transition-colors hover:bg-white/20"
        style={{ width: 14, height: 14, backgroundColor: `${headerText}15` }}
      >
        <Minus size={9} style={{ color: headerText }} />
      </button>
      <button
        className="flex items-center justify-center rounded-sm transition-colors hover:bg-white/20"
        style={{ width: 14, height: 14, backgroundColor: `${headerText}15` }}
      >
        <Maximize2 size={8} style={{ color: headerText }} />
      </button>
      <button
        className="flex items-center justify-center rounded-sm transition-colors hover:bg-red-500/80"
        style={{ width: 14, height: 14, backgroundColor: `${headerText}15` }}
      >
        <X size={9} style={{ color: headerText }} />
      </button>
    </div>
  )

  if (layout === "left") return <>{buttons}</>
  return <>{buttons}</>
}

// ── File Manager (Nemo) ──────────────────────────────────────────────────────

function NemoWindow() {
  const { theme } = useCinnamonTheme()

  const panelH = theme.panelHeight ?? 28
  const radius = theme.borderRadius ?? 6
  const topOffset = theme.panelPosition === "top" ? `calc(${panelH}px + 4%)` : "4%"

  const sidebarItems = [
    { name: "Home", icon: Home, active: true },
    { name: "Documents", icon: FileText },
    { name: "Downloads", icon: Download },
    { name: "Music", icon: Music },
    { name: "Pictures", icon: Image },
  ]

  const contentFolders = [
    { name: "Documents", icon: FileText },
    { name: "Downloads", icon: Download },
    { name: "Music", icon: Music },
    { name: "Pictures", icon: Image },
    { name: "Videos", icon: Globe },
    { name: "Projects", icon: Folder },
  ]

  const controlsLeft = theme.windowButtonLayout === "left"

  return (
    <div
      className="absolute overflow-hidden flex flex-col"
      style={{
        top: topOffset,
        left: "3%",
        width: "52%",
        height: "55%",
        borderRadius: `${radius}px`,
        boxShadow: theme.windowShadow
          ? "0 6px 24px rgba(0,0,0,0.5)"
          : "none",
        opacity: theme.windowOpacity,
        zIndex: 5,
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center px-2 py-1 shrink-0 gap-2"
        style={{
          backgroundColor: theme.windowHeaderBg,
          color: theme.windowHeaderText,
          borderRadius: `${radius}px ${radius}px 0 0`,
          minHeight: 28,
        }}
      >
        {controlsLeft && (
          <WindowControls layout="left" headerText={theme.windowHeaderText} />
        )}
        <span className="flex-1 text-center text-[10px] font-sans font-medium truncate">
          Home
        </span>
        {!controlsLeft && (
          <WindowControls layout="right" headerText={theme.windowHeaderText} />
        )}
      </div>

      {/* Toolbar */}
      <div
        className="flex items-center gap-1 px-2 py-0.5 shrink-0"
        style={{
          backgroundColor: theme.windowHeaderBg,
          borderBottom: `1px solid ${theme.windowHeaderText}12`,
        }}
      >
        <div className="flex items-center gap-0.5">
          <div
            className="flex items-center justify-center rounded"
            style={{ width: 18, height: 18, backgroundColor: `${theme.windowHeaderText}10` }}
          >
            <ChevronLeft size={11} style={{ color: `${theme.windowHeaderText}60` }} />
          </div>
          <div
            className="flex items-center justify-center rounded"
            style={{ width: 18, height: 18, backgroundColor: `${theme.windowHeaderText}10` }}
          >
            <ChevronRight size={11} style={{ color: `${theme.windowHeaderText}60` }} />
          </div>
          <div
            className="flex items-center justify-center rounded"
            style={{ width: 18, height: 18, backgroundColor: `${theme.windowHeaderText}10` }}
          >
            <ChevronUp size={11} style={{ color: `${theme.windowHeaderText}60` }} />
          </div>
        </div>
        {/* Location bar */}
        <div
          className="flex-1 flex items-center rounded px-2 py-0.5 mx-1"
          style={{ backgroundColor: `${theme.windowHeaderText}08` }}
        >
          <Home size={9} style={{ color: `${theme.windowHeaderText}60` }} />
          <span className="text-[10px] font-sans ml-1" style={{ color: `${theme.windowHeaderText}80` }}>
            /home/user
          </span>
        </div>
        <Search size={11} style={{ color: `${theme.windowHeaderText}60` }} />
      </div>

      {/* Content */}
      <div className="flex flex-1 min-h-0" style={{ backgroundColor: theme.windowBg }}>
        <div
          className="flex flex-col gap-0.5 px-1 py-1.5 shrink-0 overflow-hidden"
          style={{
            width: "26%",
            borderRight: `1px solid ${theme.windowHeaderText}12`,
          }}
        >
          <span className="text-[9px] font-sans font-medium px-1 mb-0.5" style={{ color: `${theme.windowHeaderText}50` }}>
            Places
          </span>
          {sidebarItems.map(({ name, icon: Icon, active }) => (
            <div
              key={name}
              className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-sans"
              style={{
                color: active ? theme.windowHeaderText : `${theme.windowHeaderText}b0`,
                backgroundColor: active ? `${theme.accentColor}25` : "transparent",
              }}
            >
              <Icon size={10} style={{ color: active ? theme.accentColor : `${theme.windowHeaderText}50` }} />
              {name}
            </div>
          ))}
        </div>

        <div className="flex-1 p-2 overflow-hidden">
          <div className="grid grid-cols-3 gap-2">
            {contentFolders.map(({ name, icon: Icon }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-0.5 rounded p-1 cursor-default hover:bg-white/5 transition-colors"
              >
                <div
                  className="flex items-center justify-center rounded"
                  style={{
                    width: 34,
                    height: 30,
                    backgroundColor: `${theme.accentColor}20`,
                  }}
                >
                  <Icon size={16} style={{ color: theme.accentColor }} />
                </div>
                <span className="text-[8px] font-sans text-center" style={{ color: theme.windowHeaderText }}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Text Editor (xed) ────────────────────────────────────────────────────────

function TextEditorWindow() {
  const { theme } = useCinnamonTheme()

  const panelH = theme.panelHeight ?? 28
  const radius = theme.borderRadius ?? 6
  const topOffset = theme.panelPosition === "top" ? `calc(${panelH}px + 12%)` : "12%"
  const controlsLeft = theme.windowButtonLayout === "left"

  const lines = [
    { num: 1, text: "#!/bin/bash" },
    { num: 2, text: "" },
    { num: 3, text: "# Update system" },
    { num: 4, text: 'echo "Updating..."' },
    { num: 5, text: "sudo apt update" },
    { num: 6, text: "sudo apt upgrade -y" },
    { num: 7, text: "" },
    { num: 8, text: 'echo "Done!"' },
  ]

  return (
    <div
      className="absolute overflow-hidden flex flex-col"
      style={{
        top: topOffset,
        right: "3%",
        width: "42%",
        height: "48%",
        borderRadius: `${radius}px`,
        boxShadow: theme.windowShadow
          ? "0 6px 24px rgba(0,0,0,0.4)"
          : "none",
        opacity: theme.windowOpacity,
        zIndex: 6,
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center px-2 py-1 shrink-0 gap-2"
        style={{
          backgroundColor: theme.windowHeaderBg,
          color: theme.windowHeaderText,
          borderRadius: `${radius}px ${radius}px 0 0`,
          minHeight: 28,
        }}
      >
        {controlsLeft && (
          <WindowControls layout="left" headerText={theme.windowHeaderText} />
        )}
        <span className="flex-1 text-center text-[10px] font-sans font-medium truncate">
          setup.sh - Text Editor
        </span>
        {!controlsLeft && (
          <WindowControls layout="right" headerText={theme.windowHeaderText} />
        )}
      </div>

      {/* Editor content */}
      <div className="flex-1 overflow-hidden" style={{ backgroundColor: theme.windowBg }}>
        <div className="flex h-full">
          {/* Line numbers */}
          <div
            className="flex flex-col py-1 px-1 text-right shrink-0"
            style={{ borderRight: `1px solid ${theme.windowHeaderText}12` }}
          >
            {lines.map(({ num }) => (
              <span
                key={num}
                className="text-[9px] font-mono leading-[14px]"
                style={{ color: `${theme.windowHeaderText}30` }}
              >
                {num}
              </span>
            ))}
          </div>
          {/* Code */}
          <div className="flex-1 py-1 px-2 overflow-hidden">
            {lines.map(({ num, text }) => (
              <div key={num} className="text-[9px] font-mono leading-[14px]">
                {text.startsWith("#") ? (
                  <span style={{ color: `${theme.windowHeaderText}50` }}>{text}</span>
                ) : text.includes('"') ? (
                  <span>
                    <span style={{ color: theme.windowHeaderText }}>{text.split('"')[0]}</span>
                    <span style={{ color: theme.accentColor }}>&quot;{text.split('"')[1]}&quot;</span>
                    <span style={{ color: theme.windowHeaderText }}>{text.split('"').slice(2).join('"')}</span>
                  </span>
                ) : (
                  <span style={{ color: theme.windowHeaderText }}>{text}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Preview ─────────────────────────────────────────────────────────────

export function CinnamonPreview() {
  const { theme } = useCinnamonTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: theme.aspectRatio }}
    >
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
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 70% 40%, ${theme.accentColor}08 0%, transparent 70%)`,
        }}
      />

      <CinnamonPanel
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
      />
      {menuOpen && <CinnamonMenu />}
      <NemoWindow />
      <TextEditorWindow />

      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)" }}
      />
    </div>
  )
}
