"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface CinnamonTheme {
  panelBg: string
  panelText: string
  panelOpacity: number
  panelHeight: number
  panelPosition: "bottom" | "top"
  panelBorderRadius: number
  panelMargin: number
  panelWidth: number
  panelIconSize: number
  menuBg: string
  menuText: string
  menuHighlight: string
  menuBorderRadius: number
  menuOpacity: number
  menuWidth: number
  menuIconSize: number
  menuSeparatorColor: string
  windowHeaderBg: string
  windowHeaderText: string
  windowBg: string
  windowOpacity: number
  borderRadius: number
  windowShadow: boolean
  windowButtonLayout: "right" | "left"
  accentColor: string
  wallpaperGradientFrom: string
  wallpaperGradientTo: string
  wallpaperImageUrl: string
  wallpaperImageOpacity: number
  aspectRatio: string
}

export const defaultTheme: CinnamonTheme = {
  panelBg: "#2b2b2b",
  panelText: "#d4d4d4",
  panelOpacity: 1,
  panelHeight: 28,
  panelPosition: "bottom",
  panelBorderRadius: 0,
  panelMargin: 0,
  panelWidth: 100,
  panelIconSize: 14,
  menuBg: "#333333",
  menuText: "#d4d4d4",
  menuHighlight: "#5294e2",
  menuBorderRadius: 6,
  menuOpacity: 1,
  menuWidth: 40,
  menuIconSize: 24,
  menuSeparatorColor: "#555555",
  windowHeaderBg: "#383838",
  windowHeaderText: "#d3dae3",
  windowBg: "#2f2f2f",
  windowOpacity: 1,
  borderRadius: 6,
  windowShadow: true,
  windowButtonLayout: "right",
  accentColor: "#5294e2",
  wallpaperGradientFrom: "#1a3a1a",
  wallpaperGradientTo: "#0d1f0d",
  wallpaperImageUrl: "",
  wallpaperImageOpacity: 1,
  aspectRatio: "16/9",
}

interface ThemeContextType {
  theme: CinnamonTheme
  setTheme: (theme: CinnamonTheme) => void
  updateTheme: (updates: Partial<CinnamonTheme>) => void
  presets: { name: string; theme: Partial<CinnamonTheme> }[]
  applyPreset: (name: string) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

const presets: { name: string; theme: Partial<CinnamonTheme> }[] = [
  {
    name: "Mint-Y Dark",
    theme: {
      panelBg: "#2b2b2b",
      panelText: "#d4d4d4",
      panelOpacity: 1,
      panelHeight: 28,
      panelPosition: "bottom",
      panelBorderRadius: 0,
      panelMargin: 0,
      panelWidth: 100,
      panelIconSize: 14,
      menuBg: "#333333",
      menuText: "#d4d4d4",
      menuHighlight: "#8ab4f8",
      menuBorderRadius: 6,
      menuOpacity: 1,
      menuWidth: 40,
      menuIconSize: 24,
      menuSeparatorColor: "#555555",
      windowHeaderBg: "#383838",
      windowHeaderText: "#d3dae3",
      windowBg: "#2f2f2f",
      borderRadius: 6,
      windowShadow: true,
      windowButtonLayout: "right",
      accentColor: "#8ab4f8",
      wallpaperGradientFrom: "#1a3a1a",
      wallpaperGradientTo: "#0d1f0d",
    },
  },
  {
    name: "Floating Aqua",
    theme: {
      panelBg: "#1a2a30",
      panelText: "#b8d4dc",
      panelOpacity: 0.88,
      panelHeight: 36,
      panelPosition: "bottom",
      panelBorderRadius: 18,
      panelMargin: 8,
      panelWidth: 70,
      panelIconSize: 16,
      menuBg: "#1a2a30",
      menuText: "#b8d4dc",
      menuHighlight: "#6cabcd",
      menuBorderRadius: 14,
      menuOpacity: 0.92,
      menuWidth: 38,
      menuIconSize: 26,
      menuSeparatorColor: "#2a4a56",
      windowHeaderBg: "#1e3038",
      windowHeaderText: "#b8d4dc",
      windowBg: "#162228",
      borderRadius: 14,
      windowShadow: true,
      windowButtonLayout: "right",
      accentColor: "#6cabcd",
      wallpaperGradientFrom: "#0a2028",
      wallpaperGradientTo: "#061418",
    },
  },
  {
    name: "Arc Compact",
    theme: {
      panelBg: "#2f343f",
      panelText: "#c3c7d1",
      panelOpacity: 1,
      panelHeight: 24,
      panelPosition: "top",
      panelBorderRadius: 0,
      panelMargin: 0,
      panelWidth: 100,
      panelIconSize: 12,
      menuBg: "#383c4a",
      menuText: "#c3c7d1",
      menuHighlight: "#5294e2",
      menuBorderRadius: 4,
      menuOpacity: 1,
      menuWidth: 36,
      menuIconSize: 20,
      menuSeparatorColor: "#4b5064",
      windowHeaderBg: "#2f343f",
      windowHeaderText: "#c3c7d1",
      windowBg: "#383c4a",
      borderRadius: 4,
      windowShadow: true,
      windowButtonLayout: "left",
      accentColor: "#5294e2",
      wallpaperGradientFrom: "#1a1e2a",
      wallpaperGradientTo: "#131620",
    },
  },
  {
    name: "Plank Dock",
    theme: {
      panelBg: "#1a1a2e",
      panelText: "#e0d0f0",
      panelOpacity: 0.82,
      panelHeight: 44,
      panelPosition: "bottom",
      panelBorderRadius: 22,
      panelMargin: 10,
      panelWidth: 50,
      panelIconSize: 18,
      menuBg: "#242438",
      menuText: "#e0d0f0",
      menuHighlight: "#9b59b6",
      menuBorderRadius: 16,
      menuOpacity: 0.9,
      menuWidth: 42,
      menuIconSize: 28,
      menuSeparatorColor: "#3d3058",
      windowHeaderBg: "#1e1e32",
      windowHeaderText: "#e0d0f0",
      windowBg: "#16162a",
      borderRadius: 12,
      windowShadow: true,
      windowButtonLayout: "right",
      accentColor: "#9b59b6",
      wallpaperGradientFrom: "#0e0e1e",
      wallpaperGradientTo: "#1a0a2e",
    },
  },
  {
    name: "Material Teal",
    theme: {
      panelBg: "#1a2c2c",
      panelText: "#cfd8dc",
      panelOpacity: 0.95,
      panelHeight: 32,
      panelPosition: "top",
      panelBorderRadius: 0,
      panelMargin: 0,
      panelWidth: 100,
      panelIconSize: 14,
      menuBg: "#1e3232",
      menuText: "#cfd8dc",
      menuHighlight: "#00bcd4",
      menuBorderRadius: 2,
      menuOpacity: 0.95,
      menuWidth: 44,
      menuIconSize: 22,
      menuSeparatorColor: "#37474f",
      windowHeaderBg: "#1a2c2c",
      windowHeaderText: "#cfd8dc",
      windowBg: "#162424",
      borderRadius: 2,
      windowShadow: true,
      windowButtonLayout: "right",
      accentColor: "#00bcd4",
      wallpaperGradientFrom: "#0a1818",
      wallpaperGradientTo: "#0d1e1e",
    },
  },
  {
    name: "Orchis Glass",
    theme: {
      panelBg: "#1e1e2e",
      panelText: "#cdd6f4",
      panelOpacity: 0.7,
      panelHeight: 30,
      panelPosition: "bottom",
      panelBorderRadius: 14,
      panelMargin: 6,
      panelWidth: 85,
      panelIconSize: 14,
      menuBg: "#242438",
      menuText: "#cdd6f4",
      menuHighlight: "#7c3aed",
      menuBorderRadius: 14,
      menuOpacity: 0.85,
      menuWidth: 40,
      menuIconSize: 24,
      menuSeparatorColor: "#3d3d56",
      windowHeaderBg: "#1e1e2e",
      windowHeaderText: "#cdd6f4",
      windowBg: "#242438",
      borderRadius: 14,
      windowShadow: true,
      windowButtonLayout: "right",
      accentColor: "#7c3aed",
      wallpaperGradientFrom: "#1a1028",
      wallpaperGradientTo: "#0e0818",
    },
  },
]

export function CinnamonThemeProvider({
  children,
  initialTheme,
  onThemeChange,
}: {
  children: ReactNode
  initialTheme?: CinnamonTheme
  onThemeChange?: (theme: CinnamonTheme) => void
}) {
  const [theme, setThemeState] = useState<CinnamonTheme>(initialTheme ?? defaultTheme)

  const setTheme = (newTheme: CinnamonTheme) => {
    setThemeState(newTheme)
    onThemeChange?.(newTheme)
  }

  const updateTheme = (updates: Partial<CinnamonTheme>) => {
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

export function useCinnamonTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useCinnamonTheme must be used within CinnamonThemeProvider")
  return context
}
