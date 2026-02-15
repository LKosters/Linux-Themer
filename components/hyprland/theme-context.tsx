"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface HyprlandTheme {
  // Borders
  borderSize: number
  borderRadius: number
  activeColor: string
  inactiveColor: string
  borderGradient: boolean
  borderGradientColor2: string
  borderGradientAngle: number
  // Gaps
  gapsIn: number
  gapsOut: number
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
  shadowRange: number
  shadowRenderPower: number
  // Blur
  blurEnabled: boolean
  blurSize: number
  blurPasses: number
  blurVibrancy: number
  // Animations
  animationEnabled: boolean
  animationSpeed: number
  animationStyle: "default" | "slide" | "popin" | "fade"
  // Dim
  dimInactive: boolean
  dimStrength: number
  // Accent
  accentColor: string
  // Layout
  layout: "dwindle" | "master"
  // Wallpaper
  wallpaperGradientFrom: string
  wallpaperGradientTo: string
  wallpaperImageUrl: string
  wallpaperImageOpacity: number
  aspectRatio: string
}

export const defaultTheme: HyprlandTheme = {
  borderSize: 2,
  borderRadius: 10,
  activeColor: "#89b4fa",
  inactiveColor: "#45475a",
  borderGradient: false,
  borderGradientColor2: "#cba6f7",
  borderGradientAngle: 45,
  gapsIn: 5,
  gapsOut: 10,
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
  shadowRange: 16,
  shadowRenderPower: 3,
  blurEnabled: true,
  blurSize: 6,
  blurPasses: 3,
  blurVibrancy: 0.2,
  animationEnabled: true,
  animationSpeed: 1,
  animationStyle: "default",
  dimInactive: false,
  dimStrength: 0.2,
  accentColor: "#89b4fa",
  layout: "dwindle",
  wallpaperGradientFrom: "#0a0a1a",
  wallpaperGradientTo: "#1a0a2e",
  wallpaperImageUrl: "",
  wallpaperImageOpacity: 1,
  aspectRatio: "16/9",
}

interface ThemeContextType {
  theme: HyprlandTheme
  setTheme: (theme: HyprlandTheme) => void
  updateTheme: (updates: Partial<HyprlandTheme>) => void
  presets: { name: string; theme: Partial<HyprlandTheme> }[]
  applyPreset: (name: string) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

const presets: { name: string; theme: Partial<HyprlandTheme> }[] = [
  {
    name: "Catppuccin Mocha",
    theme: {
      borderSize: 2,
      borderRadius: 10,
      activeColor: "#89b4fa",
      inactiveColor: "#45475a",
      borderGradient: true,
      borderGradientColor2: "#cba6f7",
      borderGradientAngle: 45,
      gapsIn: 5,
      gapsOut: 10,
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
      shadowRange: 16,
      shadowRenderPower: 3,
      blurEnabled: true,
      blurSize: 6,
      blurPasses: 3,
      blurVibrancy: 0.2,
      animationEnabled: true,
      animationSpeed: 1,
      animationStyle: "default",
      dimInactive: false,
      accentColor: "#89b4fa",
      layout: "dwindle",
      wallpaperGradientFrom: "#0a0a1a",
      wallpaperGradientTo: "#1a0a2e",
    },
  },
  {
    name: "Tokyo Neon",
    theme: {
      borderSize: 3,
      borderRadius: 0,
      activeColor: "#ff007c",
      inactiveColor: "#292e42",
      borderGradient: true,
      borderGradientColor2: "#7aa2f7",
      borderGradientAngle: 90,
      gapsIn: 3,
      gapsOut: 6,
      barBg: "#16161e",
      barText: "#a9b1d6",
      barOpacity: 0.9,
      barHeight: 32,
      barPosition: "top",
      barModuleBg: "#1a1b26",
      barBorderRadius: 0,
      barMargin: 0,
      barModuleRadius: 0,
      barModuleSpacing: 1,
      barFontSize: 10,
      windowBg: "#1a1b26",
      windowOpacity: 0.88,
      windowShadow: true,
      shadowColor: "#ff007c33",
      shadowRange: 20,
      shadowRenderPower: 4,
      blurEnabled: true,
      blurSize: 8,
      blurPasses: 4,
      blurVibrancy: 0.3,
      animationEnabled: true,
      animationSpeed: 0.8,
      animationStyle: "slide",
      dimInactive: true,
      dimStrength: 0.3,
      accentColor: "#ff007c",
      layout: "master",
      wallpaperGradientFrom: "#0a0a14",
      wallpaperGradientTo: "#1a0020",
    },
  },
  {
    name: "Zen Garden",
    theme: {
      borderSize: 1,
      borderRadius: 16,
      activeColor: "#a7c080",
      inactiveColor: "#4f585e",
      borderGradient: false,
      borderGradientColor2: "#a7c080",
      borderGradientAngle: 0,
      gapsIn: 8,
      gapsOut: 16,
      barBg: "#2d353b",
      barText: "#d3c6aa",
      barOpacity: 0.85,
      barHeight: 30,
      barPosition: "top",
      barModuleBg: "#3d484d",
      barBorderRadius: 14,
      barMargin: 8,
      barModuleRadius: 10,
      barModuleSpacing: 4,
      barFontSize: 10,
      windowBg: "#2d353b",
      windowOpacity: 0.9,
      windowShadow: true,
      shadowColor: "#00000044",
      shadowRange: 12,
      shadowRenderPower: 2,
      blurEnabled: true,
      blurSize: 10,
      blurPasses: 4,
      blurVibrancy: 0.15,
      animationEnabled: true,
      animationSpeed: 1.5,
      animationStyle: "popin",
      dimInactive: true,
      dimStrength: 0.15,
      accentColor: "#a7c080",
      layout: "dwindle",
      wallpaperGradientFrom: "#1e2326",
      wallpaperGradientTo: "#272e33",
    },
  },
  {
    name: "Gruvbox Retro",
    theme: {
      borderSize: 4,
      borderRadius: 0,
      activeColor: "#d79921",
      inactiveColor: "#504945",
      borderGradient: true,
      borderGradientColor2: "#cc241d",
      borderGradientAngle: 135,
      gapsIn: 2,
      gapsOut: 4,
      barBg: "#282828",
      barText: "#ebdbb2",
      barOpacity: 1,
      barHeight: 26,
      barPosition: "bottom",
      barModuleBg: "#3c3836",
      barBorderRadius: 0,
      barMargin: 0,
      barModuleRadius: 2,
      barModuleSpacing: 1,
      barFontSize: 10,
      windowBg: "#282828",
      windowOpacity: 1,
      windowShadow: false,
      shadowColor: "#00000066",
      shadowRange: 8,
      shadowRenderPower: 2,
      blurEnabled: false,
      blurSize: 4,
      blurPasses: 2,
      blurVibrancy: 0,
      animationEnabled: true,
      animationSpeed: 0.6,
      animationStyle: "fade",
      dimInactive: false,
      dimStrength: 0,
      accentColor: "#d79921",
      layout: "master",
      wallpaperGradientFrom: "#1d2021",
      wallpaperGradientTo: "#282828",
    },
  },
  {
    name: "Frosted Glass",
    theme: {
      borderSize: 1,
      borderRadius: 14,
      activeColor: "#88c0d0",
      inactiveColor: "#434c5e",
      borderGradient: true,
      borderGradientColor2: "#b48ead",
      borderGradientAngle: 180,
      gapsIn: 6,
      gapsOut: 12,
      barBg: "#2e3440",
      barText: "#d8dee9",
      barOpacity: 0.6,
      barHeight: 34,
      barPosition: "top",
      barModuleBg: "#3b425280",
      barBorderRadius: 16,
      barMargin: 6,
      barModuleRadius: 12,
      barModuleSpacing: 3,
      barFontSize: 10,
      windowBg: "#2e3440",
      windowOpacity: 0.75,
      windowShadow: true,
      shadowColor: "#00000088",
      shadowRange: 24,
      shadowRenderPower: 4,
      blurEnabled: true,
      blurSize: 14,
      blurPasses: 5,
      blurVibrancy: 0.4,
      animationEnabled: true,
      animationSpeed: 1.2,
      animationStyle: "popin",
      dimInactive: true,
      dimStrength: 0.25,
      accentColor: "#88c0d0",
      layout: "dwindle",
      wallpaperGradientFrom: "#1a2030",
      wallpaperGradientTo: "#2a1530",
    },
  },
  {
    name: "Cyber Minimal",
    theme: {
      borderSize: 1,
      borderRadius: 0,
      activeColor: "#50fa7b",
      inactiveColor: "#282a36",
      borderGradient: false,
      borderGradientColor2: "#50fa7b",
      borderGradientAngle: 0,
      gapsIn: 0,
      gapsOut: 0,
      barBg: "#0a0a0a",
      barText: "#50fa7b",
      barOpacity: 1,
      barHeight: 22,
      barPosition: "bottom",
      barModuleBg: "#111111",
      barBorderRadius: 0,
      barMargin: 0,
      barModuleRadius: 0,
      barModuleSpacing: 0,
      barFontSize: 9,
      windowBg: "#0a0a0a",
      windowOpacity: 1,
      windowShadow: false,
      shadowColor: "#00000000",
      shadowRange: 0,
      shadowRenderPower: 1,
      blurEnabled: false,
      blurSize: 2,
      blurPasses: 1,
      blurVibrancy: 0,
      animationEnabled: true,
      animationSpeed: 0.5,
      animationStyle: "slide",
      dimInactive: true,
      dimStrength: 0.4,
      accentColor: "#50fa7b",
      layout: "master",
      wallpaperGradientFrom: "#000000",
      wallpaperGradientTo: "#0a0a0a",
    },
  },
  {
    name: "Rosé Pine",
    theme: {
      borderSize: 2,
      borderRadius: 12,
      activeColor: "#c4a7e7",
      inactiveColor: "#26233a",
      borderGradient: true,
      borderGradientColor2: "#ebbcba",
      borderGradientAngle: 60,
      gapsIn: 5,
      gapsOut: 10,
      barBg: "#191724",
      barText: "#e0def4",
      barOpacity: 0.88,
      barHeight: 30,
      barPosition: "top",
      barModuleBg: "#1f1d2e",
      barBorderRadius: 12,
      barMargin: 5,
      barModuleRadius: 8,
      barModuleSpacing: 3,
      barFontSize: 10,
      windowBg: "#1f1d2e",
      windowOpacity: 0.92,
      windowShadow: true,
      shadowColor: "#00000055",
      shadowRange: 14,
      shadowRenderPower: 3,
      blurEnabled: true,
      blurSize: 8,
      blurPasses: 3,
      blurVibrancy: 0.25,
      animationEnabled: true,
      animationSpeed: 1,
      animationStyle: "popin",
      dimInactive: false,
      dimStrength: 0.15,
      accentColor: "#c4a7e7",
      layout: "dwindle",
      wallpaperGradientFrom: "#191724",
      wallpaperGradientTo: "#26233a",
    },
  },
]

export function HyprlandThemeProvider({
  children,
  initialTheme,
  onThemeChange,
}: {
  children: ReactNode
  initialTheme?: HyprlandTheme
  onThemeChange?: (theme: HyprlandTheme) => void
}) {
  const [theme, setThemeState] = useState<HyprlandTheme>(initialTheme ?? defaultTheme)

  // Sync when initialTheme changes externally (e.g. install preview)
  const initialThemeStr = initialTheme ? JSON.stringify(initialTheme) : ""
  useEffect(() => {
    if (initialTheme) {
      setThemeState(initialTheme)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialThemeStr])

  const setTheme = (newTheme: HyprlandTheme) => {
    setThemeState(newTheme)
    onThemeChange?.(newTheme)
  }

  const updateTheme = (updates: Partial<HyprlandTheme>) => {
    setThemeState((prev) => {
      const next = { ...prev, ...updates }
      onThemeChange?.(next)
      return next
    })
  }

  const applyPreset = (name: string) => {
    const preset = presets.find((p) => p.name === name)
    if (preset) {
      setThemeState((prev) => {
        const next = { ...prev, ...preset.theme }
        onThemeChange?.(next)
        return next
      })
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, updateTheme, presets, applyPreset }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useHyprlandTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useHyprlandTheme must be used within HyprlandThemeProvider")
  return context
}
