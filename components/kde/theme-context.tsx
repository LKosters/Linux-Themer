"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface KDETheme {
  // Panel (taskbar)
  panelBg: string
  panelText: string
  panelOpacity: number
  panelHeight: number
  panelPosition: "top" | "bottom"
  panelFontSize: number
  panelFloating: boolean

  // Window decorations
  windowBg: string
  windowHeaderBg: string
  windowHeaderText: string
  windowOpacity: number
  windowShadow: boolean
  windowButtonStyle: "breeze" | "oxygen" | "circles"

  // Colors
  accentColor: string
  highlightColor: string
  borderRadius: number

  // System tray
  trayBg: string

  // Widgets
  widgetBg: string
  widgetText: string
  widgetOpacity: number

  // Wallpaper
  wallpaperGradientFrom: string
  wallpaperGradientTo: string
  wallpaperImageUrl: string
  wallpaperImageOpacity: number
  aspectRatio: string
}

export const defaultTheme: KDETheme = {
  panelBg: "#1b1e28",
  panelText: "#eff0f1",
  panelOpacity: 0.95,
  panelHeight: 36,
  panelPosition: "bottom",
  panelFontSize: 11,
  panelFloating: false,

  windowBg: "#1b1e28",
  windowHeaderBg: "#232629",
  windowHeaderText: "#eff0f1",
  windowOpacity: 1,
  windowShadow: true,
  windowButtonStyle: "breeze",

  accentColor: "#3daee9",
  highlightColor: "#3daee9",
  borderRadius: 4,

  trayBg: "#1b1e28",

  widgetBg: "#1b1e28",
  widgetText: "#eff0f1",
  widgetOpacity: 0.85,

  wallpaperGradientFrom: "#1a1c2e",
  wallpaperGradientTo: "#0d1117",
  wallpaperImageUrl: "",
  wallpaperImageOpacity: 1,
  aspectRatio: "16/9",
}

interface ThemeContextType {
  theme: KDETheme
  setTheme: (theme: KDETheme) => void
  updateTheme: (updates: Partial<KDETheme>) => void
  presets: { name: string; theme: Partial<KDETheme> }[]
  applyPreset: (name: string) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

const presets: { name: string; theme: Partial<KDETheme> }[] = [
  {
    name: "Breeze Dark",
    theme: {
      panelBg: "#1b1e28",
      panelText: "#eff0f1",
      panelOpacity: 0.95,
      panelHeight: 36,
      panelPosition: "bottom",
      panelFloating: false,
      windowBg: "#1b1e28",
      windowHeaderBg: "#232629",
      windowHeaderText: "#eff0f1",
      windowShadow: true,
      windowButtonStyle: "breeze",
      accentColor: "#3daee9",
      highlightColor: "#3daee9",
      borderRadius: 4,
      trayBg: "#1b1e28",
      widgetBg: "#1b1e28",
      widgetText: "#eff0f1",
      wallpaperGradientFrom: "#1a1c2e",
      wallpaperGradientTo: "#0d1117",
    },
  },
  {
    name: "Breeze Light",
    theme: {
      panelBg: "#eff0f1",
      panelText: "#232629",
      panelOpacity: 0.95,
      panelHeight: 36,
      panelPosition: "bottom",
      panelFloating: false,
      windowBg: "#fcfcfc",
      windowHeaderBg: "#eff0f1",
      windowHeaderText: "#232629",
      windowShadow: true,
      windowButtonStyle: "breeze",
      accentColor: "#2980b9",
      highlightColor: "#2980b9",
      borderRadius: 4,
      trayBg: "#eff0f1",
      widgetBg: "#eff0f1",
      widgetText: "#232629",
      wallpaperGradientFrom: "#c4e0f5",
      wallpaperGradientTo: "#e8d5f0",
    },
  },
  {
    name: "Nordic KDE",
    theme: {
      panelBg: "#2e3440",
      panelText: "#d8dee9",
      panelOpacity: 0.9,
      panelHeight: 38,
      panelPosition: "bottom",
      panelFloating: true,
      windowBg: "#2e3440",
      windowHeaderBg: "#3b4252",
      windowHeaderText: "#eceff4",
      windowShadow: true,
      windowButtonStyle: "circles",
      accentColor: "#88c0d0",
      highlightColor: "#5e81ac",
      borderRadius: 8,
      trayBg: "#3b4252",
      widgetBg: "#3b4252",
      widgetText: "#d8dee9",
      wallpaperGradientFrom: "#242933",
      wallpaperGradientTo: "#2e3440",
    },
  },
  {
    name: "Latte Plasma",
    theme: {
      panelBg: "#eff1f5",
      panelText: "#4c4f69",
      panelOpacity: 0.92,
      panelHeight: 36,
      panelPosition: "bottom",
      panelFloating: true,
      windowBg: "#eff1f5",
      windowHeaderBg: "#e6e9ef",
      windowHeaderText: "#4c4f69",
      windowShadow: true,
      windowButtonStyle: "circles",
      accentColor: "#8839ef",
      highlightColor: "#7287fd",
      borderRadius: 10,
      trayBg: "#e6e9ef",
      widgetBg: "#e6e9ef",
      widgetText: "#4c4f69",
      wallpaperGradientFrom: "#dce0e8",
      wallpaperGradientTo: "#e6e9ef",
    },
  },
  {
    name: "Sweet",
    theme: {
      panelBg: "#161925",
      panelText: "#c8c8c8",
      panelOpacity: 0.92,
      panelHeight: 40,
      panelPosition: "bottom",
      panelFloating: false,
      windowBg: "#161925",
      windowHeaderBg: "#1c1e2d",
      windowHeaderText: "#c8c8c8",
      windowShadow: true,
      windowButtonStyle: "circles",
      accentColor: "#c050c0",
      highlightColor: "#ff6090",
      borderRadius: 6,
      trayBg: "#1c1e2d",
      widgetBg: "#1c1e2d",
      widgetText: "#c8c8c8",
      wallpaperGradientFrom: "#0d0f18",
      wallpaperGradientTo: "#1a0a2e",
    },
  },
]

export function KDEThemeProvider({
  children,
  initialTheme,
  onThemeChange,
}: {
  children: ReactNode
  initialTheme?: KDETheme
  onThemeChange?: (theme: KDETheme) => void
}) {
  const [theme, setThemeState] = useState<KDETheme>(initialTheme ?? defaultTheme)

  const setTheme = (newTheme: KDETheme) => {
    setThemeState(newTheme)
    onThemeChange?.(newTheme)
  }

  const updateTheme = (updates: Partial<KDETheme>) => {
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

export function useKDETheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useKDETheme must be used within KDEThemeProvider")
  return context
}
