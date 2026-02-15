"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface NiriTheme {
  // Focus ring
  focusRingWidth: number
  focusRingColor: string
  inactiveColor: string
  // Gaps
  gapsIn: number
  gapsOut: number
  // Corner radius
  borderRadius: number
  // Waybar
  workspaceStyle: "numbers" | "dots" | "pills" | "roman" | "lines"
  barBg: string
  barText: string
  barOpacity: number
  barHeight: number
  barPosition: "top" | "bottom"
  barModuleBg: string
  barBorderRadius: number
  barMargin: number
  barModuleRadius: number
  barModuleSpacing: number
  barFontSize: number
  // Windows
  windowBg: string
  windowOpacity: number
  windowShadow: boolean
  shadowColor: string
  shadowSize: number
  // Blur
  blurEnabled: boolean
  blurRadius: number
  blurPasses: number
  // Animations
  animationEnabled: boolean
  animationSpeed: number
  animationStyle: "ease-out-cubic" | "ease-out-expo" | "spring"
  // Accent
  accentColor: string
  // Wallpaper
  wallpaperGradientFrom: string
  wallpaperGradientTo: string
  wallpaperImageUrl: string
  wallpaperImageOpacity: number
  aspectRatio: string
}

export const defaultTheme: NiriTheme = {
  focusRingWidth: 2,
  focusRingColor: "#89b4fa",
  inactiveColor: "#45475a",
  gapsIn: 8,
  gapsOut: 8,
  borderRadius: 8,
  workspaceStyle: "numbers",
  barBg: "#1e1e2e",
  barText: "#cdd6f4",
  barOpacity: 0.95,
  barHeight: 28,
  barPosition: "top",
  barModuleBg: "#313244",
  barBorderRadius: 0,
  barMargin: 0,
  barModuleRadius: 8,
  barModuleSpacing: 2,
  barFontSize: 10,
  windowBg: "#1e1e2e",
  windowOpacity: 0.95,
  windowShadow: true,
  shadowColor: "#00000066",
  shadowSize: 16,
  blurEnabled: false,
  blurRadius: 6,
  blurPasses: 2,
  animationEnabled: true,
  animationSpeed: 1,
  animationStyle: "ease-out-cubic",
  accentColor: "#89b4fa",
  wallpaperGradientFrom: "#0a0a1a",
  wallpaperGradientTo: "#1a0a2e",
  wallpaperImageUrl: "",
  wallpaperImageOpacity: 1,
  aspectRatio: "16/9",
}

interface ThemeContextType {
  theme: NiriTheme
  setTheme: (theme: NiriTheme) => void
  updateTheme: (updates: Partial<NiriTheme>) => void
  presets: { name: string; theme: Partial<NiriTheme> }[]
  applyPreset: (name: string) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

const presets: { name: string; theme: Partial<NiriTheme> }[] = [
  {
    name: "Catppuccin Mocha",
    theme: {
      focusRingWidth: 2, focusRingColor: "#89b4fa", inactiveColor: "#45475a",
      gapsIn: 8, gapsOut: 8, borderRadius: 8,
      barBg: "#1e1e2e", barText: "#cdd6f4", barOpacity: 0.95, barHeight: 28,
      barModuleBg: "#313244", barBorderRadius: 0, barMargin: 0,
      barModuleRadius: 8, barModuleSpacing: 2,
      windowBg: "#1e1e2e", windowOpacity: 0.95, windowShadow: true,
      accentColor: "#89b4fa", animationStyle: "ease-out-cubic",
      wallpaperGradientFrom: "#0a0a1a", wallpaperGradientTo: "#1a0a2e",
    },
  },
  {
    name: "Nord",
    theme: {
      focusRingWidth: 2, focusRingColor: "#88c0d0", inactiveColor: "#434c5e",
      gapsIn: 6, gapsOut: 10, borderRadius: 10,
      barBg: "#2e3440", barText: "#d8dee9", barOpacity: 0.9, barHeight: 30,
      barModuleBg: "#3b4252", barBorderRadius: 12, barMargin: 6,
      barModuleRadius: 8, barModuleSpacing: 3,
      windowBg: "#2e3440", windowOpacity: 0.92, windowShadow: true,
      accentColor: "#88c0d0", animationStyle: "ease-out-expo",
      wallpaperGradientFrom: "#242933", wallpaperGradientTo: "#3b4252",
    },
  },
  {
    name: "Dracula",
    theme: {
      focusRingWidth: 2, focusRingColor: "#bd93f9", inactiveColor: "#44475a",
      gapsIn: 5, gapsOut: 8, borderRadius: 6,
      barBg: "#282a36", barText: "#f8f8f2", barOpacity: 0.92, barHeight: 28,
      barModuleBg: "#44475a", barBorderRadius: 0, barMargin: 0,
      barModuleRadius: 6, barModuleSpacing: 2,
      windowBg: "#282a36", windowOpacity: 0.95, windowShadow: true,
      shadowColor: "#00000088",
      accentColor: "#bd93f9", animationStyle: "ease-out-cubic",
      wallpaperGradientFrom: "#1e1f29", wallpaperGradientTo: "#282a36",
    },
  },
  {
    name: "Gruvbox",
    theme: {
      focusRingWidth: 3, focusRingColor: "#d79921", inactiveColor: "#504945",
      gapsIn: 4, gapsOut: 6, borderRadius: 0,
      barBg: "#282828", barText: "#ebdbb2", barOpacity: 1, barHeight: 26,
      barModuleBg: "#3c3836", barBorderRadius: 0, barMargin: 0,
      barModuleRadius: 2, barModuleSpacing: 1,
      windowBg: "#282828", windowOpacity: 1, windowShadow: false,
      accentColor: "#d79921", animationStyle: "spring", animationSpeed: 0.7,
      wallpaperGradientFrom: "#1d2021", wallpaperGradientTo: "#282828",
    },
  },
  {
    name: "Minimal",
    theme: {
      focusRingWidth: 1, focusRingColor: "#50fa7b", inactiveColor: "#282a36",
      gapsIn: 0, gapsOut: 0, borderRadius: 0,
      barBg: "#0a0a0a", barText: "#50fa7b", barOpacity: 1, barHeight: 22,
      barModuleBg: "#111111", barBorderRadius: 0, barMargin: 0,
      barModuleRadius: 0, barModuleSpacing: 0,
      windowBg: "#0a0a0a", windowOpacity: 1, windowShadow: false,
      accentColor: "#50fa7b", animationEnabled: false,
      wallpaperGradientFrom: "#000000", wallpaperGradientTo: "#0a0a0a",
    },
  },
]

export function NiriThemeProvider({
  children,
  initialTheme,
  onThemeChange,
}: {
  children: ReactNode
  initialTheme?: NiriTheme
  onThemeChange?: (theme: NiriTheme) => void
}) {
  const [theme, setThemeState] = useState<NiriTheme>(initialTheme ?? defaultTheme)

  const setTheme = (t: NiriTheme) => { setThemeState(t); onThemeChange?.(t) }

  const updateTheme = (updates: Partial<NiriTheme>) => {
    setThemeState((prev) => { const next = { ...prev, ...updates }; onThemeChange?.(next); return next })
  }

  const applyPreset = (name: string) => {
    const p = presets.find((x) => x.name === name)
    if (p) setThemeState((prev) => { const next = { ...prev, ...p.theme }; onThemeChange?.(next); return next })
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, updateTheme, presets, applyPreset }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useNiriTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useNiriTheme must be used within NiriThemeProvider")
  return ctx
}
