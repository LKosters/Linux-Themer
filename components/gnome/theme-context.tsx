"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface GnomeTheme {
  windowBg: string
  windowHeaderBg: string
  windowHeaderText: string
  windowOpacity: number
  panelBg: string
  panelText: string
  panelOpacity: number
  panelHeight: number
  panelFontSize: number
  panelIslands: boolean
  accentColor: string
  dockBg: string
  dockIconBg: string
  dockPosition: "bottom" | "left" | "right"
  dockOpacity: number
  dockIconSize: number
  borderRadius: number
  windowShadow: boolean
  darkMode: boolean
  wallpaperGradientFrom: string
  wallpaperGradientTo: string
  wallpaperImageUrl: string
  wallpaperImageOpacity: number
  aspectRatio: string
}

export const defaultTheme: GnomeTheme = {
  windowBg: "#1e1e1e",
  windowHeaderBg: "#2d2d2d",
  windowHeaderText: "#ffffff",
  windowOpacity: 1,
  panelBg: "#000000",
  panelText: "#ffffff",
  panelOpacity: 1,
  panelHeight: 24,
  panelFontSize: 12,
  panelIslands: false,
  accentColor: "#2C74E5",
  dockBg: "rgba(0,0,0,0.7)",
  dockIconBg: "#3a3a3a",
  dockPosition: "bottom",
  dockOpacity: 0.85,
  dockIconSize: 30,
  borderRadius: 12,
  windowShadow: true,
  darkMode: true,
  wallpaperGradientFrom: "#0a1628",
  wallpaperGradientTo: "#1a0a2e",
  wallpaperImageUrl: "",
  wallpaperImageOpacity: 1,
  aspectRatio: "16/10",
}

interface ThemeContextType {
  theme: GnomeTheme
  setTheme: (theme: GnomeTheme) => void
  updateTheme: (updates: Partial<GnomeTheme>) => void
  presets: { name: string; theme: Partial<GnomeTheme> }[]
  applyPreset: (name: string) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

const presets: { name: string; theme: Partial<GnomeTheme> }[] = [
  {
    name: "Adwaita Dark",
    theme: {
      windowBg: "#1e1e1e",
      windowHeaderBg: "#2d2d2d",
      windowHeaderText: "#ffffff",
      windowOpacity: 1,
      panelBg: "#000000",
      panelText: "#ffffff",
      panelOpacity: 1,
      panelHeight: 24,
      panelFontSize: 12,
      panelIslands: false,
      accentColor: "#3584e4",
      dockBg: "rgba(0,0,0,0.7)",
      dockIconBg: "#3a3a3a",
      dockPosition: "bottom",
      dockOpacity: 0.85,
      dockIconSize: 30,
      borderRadius: 12,
      windowShadow: true,
      darkMode: true,
      wallpaperGradientFrom: "#0a1628",
      wallpaperGradientTo: "#1a0a2e",
    },
  },
  {
    name: "Nordic Frost",
    theme: {
      windowBg: "#2e3440",
      windowHeaderBg: "#3b4252",
      windowHeaderText: "#eceff4",
      windowOpacity: 0.92,
      panelBg: "#2e3440",
      panelText: "#d8dee9",
      panelOpacity: 0.85,
      panelHeight: 28,
      panelFontSize: 13,
      panelIslands: true,
      accentColor: "#88c0d0",
      dockBg: "rgba(46,52,64,0.75)",
      dockIconBg: "#434c5e",
      dockPosition: "left",
      dockOpacity: 0.8,
      dockIconSize: 28,
      borderRadius: 16,
      windowShadow: true,
      darkMode: true,
      wallpaperGradientFrom: "#242933",
      wallpaperGradientTo: "#3b4252",
    },
  },
  {
    name: "Pop! Cosmic",
    theme: {
      windowBg: "#1a1a2e",
      windowHeaderBg: "#2d1b4e",
      windowHeaderText: "#f0e6ff",
      windowOpacity: 0.97,
      panelBg: "#0d0d1a",
      panelText: "#f0e6ff",
      panelOpacity: 0.95,
      panelHeight: 26,
      panelFontSize: 11,
      panelIslands: false,
      accentColor: "#faa41a",
      dockBg: "rgba(13,13,26,0.9)",
      dockIconBg: "#2d1b4e",
      dockPosition: "bottom",
      dockOpacity: 0.95,
      dockIconSize: 36,
      borderRadius: 8,
      windowShadow: true,
      darkMode: true,
      wallpaperGradientFrom: "#0d0d1a",
      wallpaperGradientTo: "#2d1b4e",
    },
  },
  {
    name: "macOS-like",
    theme: {
      windowBg: "#1c1c1e",
      windowHeaderBg: "#2c2c2e",
      windowHeaderText: "#f5f5f7",
      windowOpacity: 1,
      panelBg: "#1c1c1e",
      panelText: "#f5f5f7",
      panelOpacity: 0.7,
      panelHeight: 22,
      panelFontSize: 11,
      panelIslands: false,
      accentColor: "#0a84ff",
      dockBg: "rgba(28,28,30,0.5)",
      dockIconBg: "#3a3a3c",
      dockPosition: "bottom",
      dockOpacity: 0.65,
      dockIconSize: 34,
      borderRadius: 10,
      windowShadow: true,
      darkMode: true,
      wallpaperGradientFrom: "#1a1a3e",
      wallpaperGradientTo: "#3a1a4e",
    },
  },
  {
    name: "Rosé Pine",
    theme: {
      windowBg: "#1f1d2e",
      windowHeaderBg: "#26233a",
      windowHeaderText: "#e0def4",
      windowOpacity: 0.93,
      panelBg: "#191724",
      panelText: "#e0def4",
      panelOpacity: 0.88,
      panelHeight: 30,
      panelFontSize: 13,
      panelIslands: true,
      accentColor: "#c4a7e7",
      dockBg: "rgba(25,23,36,0.8)",
      dockIconBg: "#26233a",
      dockPosition: "left",
      dockOpacity: 0.85,
      dockIconSize: 26,
      borderRadius: 14,
      windowShadow: true,
      darkMode: true,
      wallpaperGradientFrom: "#191724",
      wallpaperGradientTo: "#26233a",
    },
  },
  {
    name: "Flat Minimal",
    theme: {
      windowBg: "#121212",
      windowHeaderBg: "#1a1a1a",
      windowHeaderText: "#e0e0e0",
      windowOpacity: 1,
      panelBg: "#121212",
      panelText: "#e0e0e0",
      panelOpacity: 1,
      panelHeight: 20,
      panelFontSize: 10,
      panelIslands: false,
      accentColor: "#bb86fc",
      dockBg: "rgba(18,18,18,0.95)",
      dockIconBg: "#2a2a2a",
      dockPosition: "right",
      dockOpacity: 0.95,
      dockIconSize: 24,
      borderRadius: 4,
      windowShadow: false,
      darkMode: true,
      wallpaperGradientFrom: "#0a0a0a",
      wallpaperGradientTo: "#121212",
    },
  },
  {
    name: "Catppuccin Mocha",
    theme: {
      windowBg: "#1e1e2e",
      windowHeaderBg: "#313244",
      windowHeaderText: "#cdd6f4",
      windowOpacity: 0.96,
      panelBg: "#11111b",
      panelText: "#cdd6f4",
      panelOpacity: 0.9,
      panelHeight: 26,
      panelFontSize: 12,
      panelIslands: true,
      accentColor: "#89b4fa",
      dockBg: "rgba(17,17,27,0.8)",
      dockIconBg: "#313244",
      dockPosition: "bottom",
      dockOpacity: 0.85,
      dockIconSize: 32,
      borderRadius: 12,
      windowShadow: true,
      darkMode: true,
      wallpaperGradientFrom: "#11111b",
      wallpaperGradientTo: "#1e1e2e",
    },
  },
]

export function ThemeProvider({
  children,
  initialTheme,
  onThemeChange,
}: {
  children: ReactNode
  initialTheme?: GnomeTheme
  onThemeChange?: (theme: GnomeTheme) => void
}) {
  const [theme, setThemeState] = useState<GnomeTheme>(initialTheme ?? defaultTheme)

  const setTheme = (newTheme: GnomeTheme) => {
    setThemeState(newTheme)
    onThemeChange?.(newTheme)
  }

  const updateTheme = (updates: Partial<GnomeTheme>) => {
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

export function useGnomeTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useGnomeTheme must be used within ThemeProvider")
  return context
}
