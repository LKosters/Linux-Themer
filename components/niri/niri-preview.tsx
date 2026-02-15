"use client"

import { useState, useEffect } from "react"
import { useNiriTheme } from "./theme-context"
import {
  Wifi,
  Battery,
  Volume2,
  Folder,
  FileText,
  Power,
  Terminal as TerminalIcon,
} from "lucide-react"

// ── Workspace Indicators ─────────────────────────────────────────────────────

const ROMAN = ["I", "II", "III", "IV", "V"]

function WorkspaceIndicators({
  style,
  accent,
  barBg,
  barText,
  modRadius,
  modSpacing,
  fontSize,
}: {
  style: "numbers" | "dots" | "pills" | "roman" | "lines"
  accent: string
  barBg: string
  barText: string
  modRadius: number
  modSpacing: number
  fontSize: number
}) {
  const active = 0
  const workspaces = [0, 1, 2, 3, 4]

  if (style === "dots") {
    return (
      <div className="flex items-center" style={{ gap: `${modSpacing + 2}px` }}>
        {workspaces.map((ws) => (
          <div
            key={ws}
            style={{
              width: ws === active ? 10 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: ws === active ? accent : `${barText}40`,
              transition: "all 0.15s",
            }}
          />
        ))}
      </div>
    )
  }

  if (style === "lines") {
    return (
      <div className="flex items-center" style={{ gap: `${modSpacing + 1}px` }}>
        {workspaces.map((ws) => (
          <div
            key={ws}
            style={{
              width: ws === active ? 16 : 10,
              height: 3,
              borderRadius: 1.5,
              backgroundColor: ws === active ? accent : `${barText}35`,
              transition: "all 0.15s",
            }}
          />
        ))}
      </div>
    )
  }

  if (style === "pills") {
    return (
      <div className="flex items-center" style={{ gap: `${modSpacing}px` }}>
        {workspaces.map((ws) => (
          <div
            key={ws}
            className="flex items-center justify-center font-mono font-medium"
            style={{
              minWidth: 18,
              height: 16,
              paddingInline: 6,
              fontSize: `${Math.max(fontSize - 2, 7)}px`,
              borderRadius: 8,
              backgroundColor: ws === active ? accent : `${barText}15`,
              color: ws === active ? barBg : `${barText}70`,
            }}
          >
            {ws + 1}
          </div>
        ))}
      </div>
    )
  }

  if (style === "roman") {
    return (
      <div className="flex items-center" style={{ gap: `${modSpacing + 1}px` }}>
        {workspaces.map((ws) => (
          <div
            key={ws}
            className="flex items-center justify-center font-serif"
            style={{
              minWidth: 16,
              height: 18,
              fontSize: `${Math.max(fontSize - 1, 7)}px`,
              borderRadius: Math.min(modRadius, 8),
              backgroundColor: ws === active ? accent : "transparent",
              color: ws === active ? barBg : `${barText}80`,
              borderBottom: ws === active ? "none" : `1.5px solid ${barText}25`,
            }}
          >
            {ROMAN[ws]}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center" style={{ gap: `${modSpacing}px` }}>
      {workspaces.map((ws) => (
        <div
          key={ws}
          className="flex items-center justify-center font-mono font-medium"
          style={{
            width: 18,
            height: 18,
            fontSize: `${Math.max(fontSize - 1, 7)}px`,
            borderRadius: Math.min(modRadius, 8),
            backgroundColor: ws === active ? accent : "transparent",
            color: ws === active ? barBg : `${barText}80`,
          }}
        >
          {ws + 1}
        </div>
      ))}
    </div>
  )
}

// ── Waybar ───────────────────────────────────────────────────────────────────

function Waybar() {
  const { theme } = useNiriTheme()
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    function updateClock() {
      const now = new Date()
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

  const height = theme.barHeight ?? 28
  const modRadius = theme.barModuleRadius ?? 8
  const barRadius = theme.barBorderRadius ?? 0
  const barMargin = theme.barMargin ?? 0
  const modSpacing = theme.barModuleSpacing ?? 2
  const fontSize = theme.barFontSize ?? 10
  const isTop = theme.barPosition === "top"

  return (
    <div
      className="absolute px-2"
      style={{
        [isTop ? "top" : "bottom"]: barMargin > 0 ? `${barMargin}px` : 0,
        left: barMargin > 0 ? `${barMargin}px` : 0,
        right: barMargin > 0 ? `${barMargin}px` : 0,
        backgroundColor: theme.barBg,
        color: theme.barText,
        opacity: theme.barOpacity ?? 0.95,
        height: `${height}px`,
        fontSize: `${fontSize}px`,
        zIndex: 20,
        borderRadius: `${barRadius}px`,
        boxShadow: barMargin > 0 ? "0 2px 12px rgba(0,0,0,0.3)" : "none",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
      }}
    >
      <div className="justify-self-start">
        <WorkspaceIndicators
          style={theme.workspaceStyle ?? "numbers"}
          accent={theme.accentColor}
          barBg={theme.barBg}
          barText={theme.barText}
          modRadius={modRadius}
          modSpacing={modSpacing}
          fontSize={fontSize}
        />
      </div>

      <div
        className="flex items-center px-2.5 py-0.5 font-mono font-medium"
        style={{
          backgroundColor: theme.barModuleBg,
          borderRadius: modRadius,
          color: theme.accentColor,
          fontSize: `${fontSize}px`,
        }}
      >
        {currentTime}
      </div>

      <div className="flex items-center justify-self-end" style={{ gap: `${modSpacing}px` }}>
        {[
          { icon: Wifi, label: "net" },
          { icon: Volume2, label: "vol" },
          { icon: Battery, label: "bat" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-0.5 px-2 py-0.5"
            style={{
              backgroundColor: theme.barModuleBg,
              borderRadius: modRadius,
            }}
          >
            <Icon size={Math.max(fontSize - 1, 7)} />
          </div>
        ))}
        <div
          className="flex items-center px-1.5 py-0.5"
          style={{
            backgroundColor: theme.barModuleBg,
            borderRadius: modRadius,
          }}
        >
          <Power size={Math.max(fontSize - 1, 7)} style={{ color: `${theme.barText}80` }} />
        </div>
      </div>
    </div>
  )
}

// ── Window Style Helpers (Niri uses focus ring, not border) ──────────────────

function useWindowStyles(active: boolean) {
  const { theme } = useNiriTheme()
  const radius = theme.borderRadius ?? 8
  const ringWidth = theme.focusRingWidth ?? 2
  const shadowSize = theme.shadowSize ?? 16

  const ringColor = active ? theme.focusRingColor : theme.inactiveColor
  const opacity = active ? (theme.windowOpacity ?? 0.95) : Math.max((theme.windowOpacity ?? 0.95) - 0.08, 0.5)

  const containerStyle: React.CSSProperties = {
    borderRadius: `${radius}px`,
    outline: `${ringWidth}px solid ${ringColor}`,
    outlineOffset: `${ringWidth}px`,
    boxShadow: theme.windowShadow
      ? `0 ${Math.round(shadowSize * 0.5)}px ${shadowSize}px ${theme.shadowColor}`
      : "none",
    opacity,
  }

  const blurBg = theme.blurEnabled
    ? `${theme.windowBg}${Math.round((theme.windowOpacity ?? 0.95) * 255).toString(16).padStart(2, "0")}`
    : theme.windowBg

  return { containerStyle, blurBg, theme, radius }
}

// ── Column Window: Terminal ──────────────────────────────────────────────────

function TerminalColumn({ active }: { active: boolean }) {
  const { containerStyle, blurBg, theme } = useWindowStyles(active)

  const lines = [
    { prompt: true, text: "neofetch" },
    { prompt: false, text: "  ╭─────────────────────╮" },
    { prompt: false, text: "  │  OS: Arch Linux      │" },
    { prompt: false, text: "  │  WM: niri             │" },
    { prompt: false, text: "  │  Shell: fish          │" },
    { prompt: false, text: "  │  Terminal: alacritty   │" },
    { prompt: false, text: "  ╰─────────────────────╯" },
    { prompt: true, text: "" },
  ]

  return (
    <div className="flex flex-col overflow-hidden h-full" style={containerStyle}>
      <div className="flex items-center px-2 py-0.5 shrink-0" style={{ backgroundColor: blurBg }}>
        <TerminalIcon size={8} style={{ color: theme.accentColor }} />
        <span className="text-[8px] font-mono ml-1.5" style={{ color: `${theme.barText}cc` }}>
          alacritty
        </span>
      </div>
      <div className="flex-1 overflow-hidden p-2" style={{ backgroundColor: blurBg }}>
        {lines.map((line, i) => (
          <div key={i} className="text-[7px] font-mono leading-[11px]">
            {line.prompt ? (
              <>
                <span style={{ color: theme.accentColor }}>  ~</span>
                <span style={{ color: `${theme.barText}60` }}> $ </span>
                <span style={{ color: theme.barText }}>{line.text}</span>
                {line.text === "" && (
                  <span
                    className="inline-block animate-pulse"
                    style={{
                      width: 4,
                      height: 8,
                      backgroundColor: theme.accentColor,
                      marginLeft: 1,
                      verticalAlign: "middle",
                    }}
                  />
                )}
              </>
            ) : (
              <span style={{ color: `${theme.barText}90` }}>{line.text}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Column Window: Code Editor ───────────────────────────────────────────────

function EditorColumn({ active }: { active: boolean }) {
  const { containerStyle, blurBg, theme } = useWindowStyles(active)

  const lines = [
    { num: 1, content: [{ text: "fn ", c: "kw" }, { text: "main", c: "fn" }, { text: "() {", c: "p" }] },
    { num: 2, content: [{ text: '    println!("', c: "p" }, { text: "Hello, Niri!", c: "str" }, { text: '");', c: "p" }] },
    { num: 3, content: [{ text: "    ", c: "p" }, { text: "let", c: "kw" }, { text: " cols = ", c: "p" }, { text: "Layout", c: "fn" }, { text: "::columns();", c: "p" }] },
    { num: 4, content: [{ text: "    cols.", c: "p" }, { text: "scroll_left", c: "fn" }, { text: "();", c: "p" }] },
    { num: 5, content: [{ text: "}", c: "p" }] },
    { num: 6, content: [] },
    { num: 7, content: [{ text: "// scrollable tiling", c: "cm" }] },
  ]

  const colorMap: Record<string, string> = {
    kw: theme.accentColor,
    fn: "#f9e2af",
    str: "#a6e3a1",
    cm: `${theme.barText}50`,
    p: theme.barText,
  }

  return (
    <div className="flex flex-col overflow-hidden h-full" style={containerStyle}>
      <div className="flex items-center px-2 py-0.5 shrink-0" style={{ backgroundColor: blurBg }}>
        <FileText size={8} style={{ color: theme.accentColor }} />
        <span className="text-[8px] font-mono ml-1.5" style={{ color: `${theme.barText}cc` }}>
          main.rs
        </span>
      </div>
      <div className="flex-1 overflow-hidden" style={{ backgroundColor: blurBg }}>
        <div className="flex h-full">
          <div
            className="flex flex-col py-1 px-1 text-right shrink-0"
            style={{ borderRight: `1px solid ${theme.barText}12` }}
          >
            {lines.map(({ num }) => (
              <span key={num} className="text-[7px] font-mono leading-[11px]" style={{ color: `${theme.barText}30` }}>
                {num}
              </span>
            ))}
          </div>
          <div className="flex-1 py-1 px-2">
            {lines.map(({ num, content }) => (
              <div key={num} className="text-[7px] font-mono leading-[11px]">
                {content.map((seg, i) => (
                  <span key={i} style={{ color: colorMap[seg.c] || theme.barText }}>{seg.text}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Column Window: File Manager ──────────────────────────────────────────────

function FileManagerColumn({ active }: { active: boolean }) {
  const { containerStyle, blurBg, theme } = useWindowStyles(active)

  const items = [
    { name: ".config", icon: Folder },
    { name: "Documents", icon: Folder },
    { name: "Downloads", icon: Folder },
    { name: "notes.md", icon: FileText },
  ]

  return (
    <div className="flex flex-col overflow-hidden h-full" style={containerStyle}>
      <div className="flex items-center px-2 py-0.5 shrink-0" style={{ backgroundColor: blurBg }}>
        <Folder size={8} style={{ color: theme.accentColor }} />
        <span className="text-[8px] font-mono ml-1.5" style={{ color: `${theme.barText}cc` }}>
          ~/
        </span>
      </div>
      <div className="flex-1 overflow-hidden p-1.5" style={{ backgroundColor: blurBg }}>
        {items.map(({ name, icon: Icon }) => (
          <div
            key={name}
            className="flex items-center gap-1.5 rounded px-1.5 py-0.5 hover:bg-white/5 transition-colors"
          >
            <Icon size={8} style={{ color: name.includes(".") ? `${theme.barText}70` : theme.accentColor }} />
            <span className="text-[7px] font-mono" style={{ color: theme.barText }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main Preview — Scrollable Columns Layout ────────────────────────────────

export function NiriPreview() {
  const { theme } = useNiriTheme()

  const barH = theme.barHeight ?? 28
  const barMargin = theme.barMargin ?? 0
  const gapsOut = theme.gapsOut ?? 8
  const gapsIn = theme.gapsIn ?? 8
  const isTop = theme.barPosition === "top"

  const barTotal = barH + (barMargin > 0 ? barMargin * 2 : 0)

  const gapO = `${gapsOut * 0.6}px`
  const gapI = `${gapsIn * 0.6}px`

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

      {/* Waybar */}
      <Waybar />

      {/* Scrollable columns tiling area */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: isTop ? `${barTotal}px` : 0,
          bottom: isTop ? 0 : `${barTotal}px`,
          padding: gapO,
        }}
      >
        {/* Three columns side by side — Niri's scrollable column layout */}
        <div className="flex h-full" style={{ gap: gapI }}>
          {/* Column 1: Terminal (active, takes ~40%) */}
          <div style={{ width: "40%", minWidth: 0 }}>
            <TerminalColumn active={true} />
          </div>
          {/* Column 2: Editor (~35%) */}
          <div style={{ width: "35%", minWidth: 0 }}>
            <EditorColumn active={false} />
          </div>
          {/* Column 3: File Manager (~25%) */}
          <div style={{ width: "25%", minWidth: 0 }}>
            <FileManagerColumn active={false} />
          </div>
        </div>
      </div>

      {/* Scroll indicator — subtle arrow hints at the edges */}
      <div
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-0"
        style={{
          width: `${Math.max(gapsOut * 0.4, 3)}px`,
          height: "30%",
          background: `linear-gradient(to right, transparent, ${theme.accentColor}20)`,
          borderRadius: "2px 0 0 2px",
        }}
      />

      {/* Screen edge */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)" }}
      />
    </div>
  )
}
