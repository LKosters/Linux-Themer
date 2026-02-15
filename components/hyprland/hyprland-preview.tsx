"use client"

import { useState, useEffect } from "react"
import { useHyprlandTheme } from "./theme-context"
import {
  Wifi,
  Battery,
  Volume2,
  Folder,
  FileText,
  Power,
  Terminal as TerminalIcon,
} from "lucide-react"

// ── Waybar ───────────────────────────────────────────────────────────────────

function Waybar() {
  const { theme } = useHyprlandTheme()
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
      className="absolute flex items-center justify-between px-2"
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
      }}
    >
      {/* Workspaces */}
      <div className="flex items-center" style={{ gap: `${modSpacing}px` }}>
        {[1, 2, 3, 4, 5].map((ws) => (
          <div
            key={ws}
            className="flex items-center justify-center font-mono font-medium"
            style={{
              width: 18,
              height: 18,
              fontSize: `${Math.max(fontSize - 1, 7)}px`,
              borderRadius: Math.min(modRadius, 8),
              backgroundColor: ws === 1 ? theme.accentColor : "transparent",
              color: ws === 1 ? theme.barBg : `${theme.barText}80`,
            }}
          >
            {ws}
          </div>
        ))}
      </div>

      {/* Center: clock */}
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

      {/* Right: system modules */}
      <div className="flex items-center" style={{ gap: `${modSpacing}px` }}>
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

// ── Window Style Helpers ─────────────────────────────────────────────────────

function useWindowStyles(active: boolean) {
  const { theme } = useHyprlandTheme()
  const radius = theme.borderRadius ?? 10
  const borderSize = theme.borderSize ?? 2
  const shadowRange = theme.shadowRange ?? 16

  const borderColor = active ? theme.activeColor : theme.inactiveColor
  const useGradient = active && theme.borderGradient
  const baseOpacity = active
    ? theme.windowOpacity
    : Math.max(theme.windowOpacity - 0.1, 0.5)
  const dimmed = !active && theme.dimInactive
  const opacity = dimmed ? baseOpacity * (1 - (theme.dimStrength ?? 0.2)) : baseOpacity

  const containerStyle: React.CSSProperties = {
    borderRadius: `${radius}px`,
    border: useGradient ? `${borderSize}px solid transparent` : `${borderSize}px solid ${borderColor}`,
    backgroundClip: useGradient ? "padding-box" : undefined,
    backgroundImage: useGradient
      ? `linear-gradient(${theme.windowBg}, ${theme.windowBg}), linear-gradient(${theme.borderGradientAngle}deg, ${theme.activeColor}, ${theme.borderGradientColor2})`
      : undefined,
    backgroundOrigin: useGradient ? "border-box" : undefined,
    boxShadow: theme.windowShadow
      ? `0 ${Math.round(shadowRange * 0.5)}px ${shadowRange}px ${theme.shadowColor}`
      : "none",
    opacity,
  }

  // For blur simulation: show a subtle backdrop-filter-like effect
  const blurBg = theme.blurEnabled
    ? `${theme.windowBg}${Math.round((theme.windowOpacity ?? 0.95) * 255).toString(16).padStart(2, "0")}`
    : theme.windowBg

  return { containerStyle, blurBg, theme, radius }
}

// ── Tiled Terminal Window ────────────────────────────────────────────────────

function TerminalWindow({ active }: { active: boolean }) {
  const { containerStyle, blurBg, theme } = useWindowStyles(active)

  const lines = [
    { prompt: true, text: "neofetch" },
    { prompt: false, text: "  ╭─────────────────────╮" },
    { prompt: false, text: "  │  OS: Arch Linux      │" },
    { prompt: false, text: "  │  WM: Hyprland        │" },
    { prompt: false, text: "  │  Shell: zsh           │" },
    { prompt: false, text: "  │  Terminal: kitty      │" },
    { prompt: false, text: "  ╰─────────────────────╯" },
    { prompt: true, text: "" },
  ]

  return (
    <div
      className="flex flex-col overflow-hidden h-full"
      style={containerStyle}
    >
      {/* Tab bar */}
      <div
        className="flex items-center px-2 py-0.5 shrink-0"
        style={{ backgroundColor: blurBg }}
      >
        <TerminalIcon size={8} style={{ color: theme.accentColor }} />
        <span className="text-[8px] font-mono ml-1.5" style={{ color: `${theme.barText}cc` }}>
          kitty
        </span>
      </div>
      {/* Content */}
      <div
        className="flex-1 overflow-hidden p-2"
        style={{ backgroundColor: blurBg }}
      >
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

// ── Tiled Code Editor Window ─────────────────────────────────────────────────

function CodeEditorWindow({ active }: { active: boolean }) {
  const { containerStyle, blurBg, theme } = useWindowStyles(active)

  const lines = [
    { num: 1, content: [{ text: "fn ", c: "kw" }, { text: "main", c: "fn" }, { text: "() {", c: "p" }] },
    { num: 2, content: [{ text: '    println!("', c: "p" }, { text: "Hello, Hyprland!", c: "str" }, { text: '");', c: "p" }] },
    { num: 3, content: [{ text: "    ", c: "p" }, { text: "let", c: "kw" }, { text: " config = ", c: "p" }, { text: "Config", c: "fn" }, { text: "::new();", c: "p" }] },
    { num: 4, content: [{ text: "    config.", c: "p" }, { text: "apply", c: "fn" }, { text: "();", c: "p" }] },
    { num: 5, content: [{ text: "}", c: "p" }] },
    { num: 6, content: [] },
    { num: 7, content: [{ text: "// TODO: add more", c: "cm" }] },
  ]

  const colorMap: Record<string, string> = {
    kw: theme.accentColor,
    fn: "#f9e2af",
    str: "#a6e3a1",
    cm: `${theme.barText}50`,
    p: theme.barText,
  }

  return (
    <div
      className="flex flex-col overflow-hidden h-full"
      style={containerStyle}
    >
      <div
        className="flex items-center px-2 py-0.5 shrink-0"
        style={{ backgroundColor: blurBg }}
      >
        <FileText size={8} style={{ color: theme.accentColor }} />
        <span className="text-[8px] font-mono ml-1.5" style={{ color: `${theme.barText}cc` }}>
          main.rs
        </span>
      </div>
      <div
        className="flex-1 overflow-hidden"
        style={{ backgroundColor: blurBg }}
      >
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

// ── Tiled File Manager Window ────────────────────────────────────────────────

function FileManagerTile({ active }: { active: boolean }) {
  const { containerStyle, blurBg, theme } = useWindowStyles(active)

  const items = [
    { name: ".config", icon: Folder },
    { name: "Documents", icon: Folder },
    { name: "Downloads", icon: Folder },
    { name: "notes.md", icon: FileText },
  ]

  return (
    <div
      className="flex flex-col overflow-hidden h-full"
      style={containerStyle}
    >
      <div
        className="flex items-center px-2 py-0.5 shrink-0"
        style={{ backgroundColor: blurBg }}
      >
        <Folder size={8} style={{ color: theme.accentColor }} />
        <span className="text-[8px] font-mono ml-1.5" style={{ color: `${theme.barText}cc` }}>
          ~/
        </span>
      </div>
      <div
        className="flex-1 overflow-hidden p-1.5"
        style={{ backgroundColor: blurBg }}
      >
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

// ── Main Preview ─────────────────────────────────────────────────────────────

export function HyprlandPreview() {
  const { theme } = useHyprlandTheme()

  const barH = theme.barHeight ?? 28
  const barMargin = theme.barMargin ?? 0
  const gapsOut = theme.gapsOut ?? 10
  const gapsIn = theme.gapsIn ?? 5
  const isTop = theme.barPosition === "top"

  // Account for floating bar: bar height + top/bottom margins
  const barTotal = barH + (barMargin > 0 ? barMargin * 2 : 0)

  // Scale gaps for the preview (they represent pixels at real desktop size)
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

      {/* Tiling area */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: isTop ? `${barTotal}px` : 0,
          bottom: isTop ? 0 : `${barTotal}px`,
          padding: gapO,
        }}
      >
        {theme.layout === "master" ? (
          /* Master layout: large master left, slaves stacked right */
          <div className="flex h-full" style={{ gap: gapI }}>
            <div style={{ width: "62%", minWidth: 0 }}>
              <TerminalWindow active={true} />
            </div>
            <div className="flex flex-col flex-1" style={{ gap: gapI, minWidth: 0 }}>
              <div className="flex-1" style={{ minHeight: 0 }}>
                <CodeEditorWindow active={false} />
              </div>
              <div className="flex-1" style={{ minHeight: 0 }}>
                <FileManagerTile active={false} />
              </div>
            </div>
          </div>
        ) : (
          /* Dwindle layout: recursive spiral splits */
          <div className="flex flex-col h-full" style={{ gap: gapI }}>
            <div className="flex" style={{ flex: "1.2 1 0%", gap: gapI, minHeight: 0 }}>
              <div className="flex-1" style={{ minWidth: 0 }}>
                <TerminalWindow active={true} />
              </div>
              <div style={{ width: "38%", minWidth: 0 }}>
                <CodeEditorWindow active={false} />
              </div>
            </div>
            <div style={{ flex: "0.8 1 0%", minHeight: 0 }}>
              <FileManagerTile active={false} />
            </div>
          </div>
        )}
      </div>

      {/* Screen edge */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)" }}
      />
    </div>
  )
}
