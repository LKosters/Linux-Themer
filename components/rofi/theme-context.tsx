"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface RofiTheme {
  mode: "drun" | "run" | "window"
  width: number
  lines: number
  columns: number
  windowBg: string
  windowBorderRadius: number
  windowBorderSize: number
  windowBorderColor: string
  windowPadding: number
  windowOpacity: number
  inputbarBg: string
  inputbarText: string
  inputbarFontSize: number
  inputbarBorderRadius: number
  inputbarPadding: number
  inputbarPlaceholder: string
  listviewBg: string
  listviewSpacing: number
  elementBg: string
  elementText: string
  elementBorderRadius: number
  elementPadding: number
  selectedBg: string
  selectedText: string
  promptColor: string
  promptText: string
  accentColor: string
  wallpaperGradientFrom: string
  wallpaperGradientTo: string
  wallpaperImageUrl: string
  wallpaperImageOpacity: number
  aspectRatio: string
}

export const defaultTheme: RofiTheme = {
  mode: "drun",
  width: 600,
  lines: 8,
  columns: 1,
  windowBg: "#1e1e2e",
  windowBorderRadius: 12,
  windowBorderSize: 2,
  windowBorderColor: "#89b4fa",
  windowPadding: 20,
  windowOpacity: 0.95,
  inputbarBg: "#313244",
  inputbarText: "#cdd6f4",
  inputbarFontSize: 14,
  inputbarBorderRadius: 8,
  inputbarPadding: 10,
  inputbarPlaceholder: "Search...",
  listviewBg: "transparent",
  listviewSpacing: 4,
  elementBg: "transparent",
  elementText: "#cdd6f4",
  elementBorderRadius: 8,
  elementPadding: 8,
  selectedBg: "#89b4fa",
  selectedText: "#1e1e2e",
  promptColor: "#89b4fa",
  promptText: "",
  accentColor: "#89b4fa",
  wallpaperGradientFrom: "#0a0a1a",
  wallpaperGradientTo: "#1a0a2e",
  wallpaperImageUrl: "",
  wallpaperImageOpacity: 1,
  aspectRatio: "16/9",
}

interface ThemeContextType {
  theme: RofiTheme
  setTheme: (theme: RofiTheme) => void
  updateTheme: (updates: Partial<RofiTheme>) => void
  presets: { name: string; theme: Partial<RofiTheme> }[]
  applyPreset: (name: string) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

const presets: { name: string; theme: Partial<RofiTheme> }[] = [
  {
    name: "Catppuccin Mocha",
    theme: {
      mode: "drun",
      width: 600,
      lines: 8,
      columns: 1,
      windowBg: "#1e1e2e",
      windowBorderColor: "#89b4fa",
      windowBorderRadius: 12,
      windowBorderSize: 2,
      windowPadding: 20,
      windowOpacity: 0.95,
      inputbarBg: "#313244",
      inputbarText: "#cdd6f4",
      inputbarFontSize: 14,
      inputbarBorderRadius: 8,
      inputbarPadding: 10,
      listviewSpacing: 4,
      elementBg: "transparent",
      elementText: "#cdd6f4",
      elementBorderRadius: 8,
      elementPadding: 8,
      selectedBg: "#89b4fa",
      selectedText: "#1e1e2e",
      promptColor: "#89b4fa",
      accentColor: "#89b4fa",
      wallpaperGradientFrom: "#0a0a1a",
      wallpaperGradientTo: "#1a0a2e",
    },
  },
  {
    name: "Spotlight",
    theme: {
      mode: "drun",
      width: 500,
      lines: 5,
      columns: 1,
      windowBg: "#1a1a1e",
      windowBorderColor: "#444444",
      windowBorderRadius: 16,
      windowBorderSize: 0,
      windowPadding: 8,
      windowOpacity: 0.92,
      inputbarBg: "#2a2a2e",
      inputbarText: "#f0f0f0",
      inputbarFontSize: 18,
      inputbarBorderRadius: 12,
      inputbarPadding: 14,
      listviewSpacing: 2,
      elementBg: "transparent",
      elementText: "#c0c0c0",
      elementBorderRadius: 10,
      elementPadding: 10,
      selectedBg: "#3a3a4e",
      selectedText: "#ffffff",
      promptColor: "#888888",
      accentColor: "#0a84ff",
      wallpaperGradientFrom: "#1a1a3e",
      wallpaperGradientTo: "#3a1a4e",
    },
  },
  {
    name: "Grid Neon",
    theme: {
      mode: "drun",
      width: 800,
      lines: 4,
      columns: 3,
      windowBg: "#0a0a14",
      windowBorderColor: "#ff007c",
      windowBorderRadius: 0,
      windowBorderSize: 2,
      windowPadding: 16,
      windowOpacity: 0.9,
      inputbarBg: "#16161e",
      inputbarText: "#a9b1d6",
      inputbarFontSize: 13,
      inputbarBorderRadius: 0,
      inputbarPadding: 10,
      listviewSpacing: 6,
      elementBg: "#16161e",
      elementText: "#a9b1d6",
      elementBorderRadius: 0,
      elementPadding: 12,
      selectedBg: "#ff007c",
      selectedText: "#0a0a14",
      promptColor: "#ff007c",
      accentColor: "#ff007c",
      wallpaperGradientFrom: "#000000",
      wallpaperGradientTo: "#0a0a14",
    },
  },
  {
    name: "Compact Nord",
    theme: {
      mode: "run",
      width: 400,
      lines: 12,
      columns: 1,
      windowBg: "#2e3440",
      windowBorderColor: "#88c0d0",
      windowBorderRadius: 6,
      windowBorderSize: 1,
      windowPadding: 10,
      windowOpacity: 0.98,
      inputbarBg: "#3b4252",
      inputbarText: "#d8dee9",
      inputbarFontSize: 12,
      inputbarBorderRadius: 4,
      inputbarPadding: 6,
      listviewSpacing: 2,
      elementBg: "transparent",
      elementText: "#d8dee9",
      elementBorderRadius: 4,
      elementPadding: 4,
      selectedBg: "#434c5e",
      selectedText: "#88c0d0",
      promptColor: "#88c0d0",
      accentColor: "#88c0d0",
      wallpaperGradientFrom: "#242933",
      wallpaperGradientTo: "#2e3440",
    },
  },
  {
    name: "Gruvbox Wide",
    theme: {
      mode: "drun",
      width: 900,
      lines: 3,
      columns: 2,
      windowBg: "#282828",
      windowBorderColor: "#d79921",
      windowBorderRadius: 4,
      windowBorderSize: 3,
      windowPadding: 24,
      windowOpacity: 1,
      inputbarBg: "#3c3836",
      inputbarText: "#ebdbb2",
      inputbarFontSize: 16,
      inputbarBorderRadius: 2,
      inputbarPadding: 12,
      listviewSpacing: 8,
      elementBg: "#3c3836",
      elementText: "#ebdbb2",
      elementBorderRadius: 2,
      elementPadding: 14,
      selectedBg: "#d79921",
      selectedText: "#282828",
      promptColor: "#d79921",
      accentColor: "#d79921",
      wallpaperGradientFrom: "#1d2021",
      wallpaperGradientTo: "#282828",
    },
  },
  {
    name: "Glass Pill",
    theme: {
      mode: "drun",
      width: 550,
      lines: 6,
      columns: 1,
      windowBg: "#1a1b26",
      windowBorderColor: "#7aa2f7",
      windowBorderRadius: 24,
      windowBorderSize: 1,
      windowPadding: 28,
      windowOpacity: 0.8,
      inputbarBg: "#24283b",
      inputbarText: "#c0caf5",
      inputbarFontSize: 15,
      inputbarBorderRadius: 16,
      inputbarPadding: 12,
      listviewSpacing: 6,
      elementBg: "transparent",
      elementText: "#c0caf5",
      elementBorderRadius: 14,
      elementPadding: 10,
      selectedBg: "#7aa2f733",
      selectedText: "#7aa2f7",
      promptColor: "#7aa2f7",
      accentColor: "#7aa2f7",
      wallpaperGradientFrom: "#0f0f1a",
      wallpaperGradientTo: "#1a1b26",
    },
  },
]

export function RofiThemeProvider({
  children,
  initialTheme,
  onThemeChange,
}: {
  children: ReactNode
  initialTheme?: RofiTheme
  onThemeChange?: (theme: RofiTheme) => void
}) {
  const [theme, setThemeState] = useState<RofiTheme>(initialTheme ?? defaultTheme)

  const setTheme = (newTheme: RofiTheme) => {
    setThemeState(newTheme)
    onThemeChange?.(newTheme)
  }

  const updateTheme = (updates: Partial<RofiTheme>) => {
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

export function useRofiTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useRofiTheme must be used within RofiThemeProvider")
  return context
}
