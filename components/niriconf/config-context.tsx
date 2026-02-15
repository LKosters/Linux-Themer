"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface NiriKeybind {
  mods: string[]
  key: string
  action: string
  args: string
}

export interface NiriWindowRule {
  match: string
  rules: string[]
}

export interface NiriEnvVar {
  key: string
  value: string
}

export interface NiriconfConfig {
  // Input
  kbLayout: string
  kbVariant: string
  kbOptions: string
  repeatRate: number
  repeatDelay: number
  naturalScroll: boolean
  touchpadTapToClick: boolean
  touchpadNaturalScroll: boolean
  touchpadDisableWhileTyping: boolean
  mouseAccelProfile: "flat" | "adaptive"

  // Layout
  defaultColumnWidth: "proportion 0.33333" | "proportion 0.5" | "proportion 0.66667" | "fixed 960"
  centerFocusedColumn: "never" | "always" | "on-overflow"
  gapsIn: number
  gapsOut: number

  // Focus ring
  focusRingWidth: number
  focusRingActiveColor: string
  focusRingInactiveColor: string

  // Decoration
  borderRadius: number
  activeOpacity: number
  inactiveOpacity: number

  // Animations
  animationEnabled: boolean
  animationSpeed: number
  animationStyle: "ease-out-cubic" | "ease-out-expo" | "spring"

  // Keybinds
  keybinds: NiriKeybind[]

  // Window Rules
  windowRules: NiriWindowRule[]

  // Spawn at startup
  spawnAtStartup: string[]

  // Environment Variables
  envVars: NiriEnvVar[]
}

export const defaultConfig: NiriconfConfig = {
  kbLayout: "us",
  kbVariant: "",
  kbOptions: "",
  repeatRate: 25,
  repeatDelay: 600,
  naturalScroll: false,
  touchpadTapToClick: true,
  touchpadNaturalScroll: true,
  touchpadDisableWhileTyping: true,
  mouseAccelProfile: "flat",

  defaultColumnWidth: "proportion 0.5",
  centerFocusedColumn: "never",
  gapsIn: 8,
  gapsOut: 8,

  focusRingWidth: 2,
  focusRingActiveColor: "#89b4fa",
  focusRingInactiveColor: "#45475a",

  borderRadius: 8,
  activeOpacity: 1,
  inactiveOpacity: 0.9,

  animationEnabled: true,
  animationSpeed: 1,
  animationStyle: "ease-out-cubic",

  keybinds: [
    { mods: ["Mod"], key: "Return", action: "spawn", args: "alacritty" },
    { mods: ["Mod"], key: "Q", action: "close-window", args: "" },
    { mods: ["Mod"], key: "D", action: "spawn", args: "fuzzel" },
    { mods: ["Mod"], key: "E", action: "spawn", args: "thunar" },
    { mods: ["Mod"], key: "F", action: "maximize-column", args: "" },
    { mods: ["Mod", "Shift"], key: "F", action: "fullscreen-window", args: "" },
    { mods: ["Mod"], key: "Left", action: "focus-column-left", args: "" },
    { mods: ["Mod"], key: "Right", action: "focus-column-right", args: "" },
    { mods: ["Mod"], key: "Up", action: "focus-window-up", args: "" },
    { mods: ["Mod"], key: "Down", action: "focus-window-down", args: "" },
    { mods: ["Mod", "Shift"], key: "Left", action: "move-column-left", args: "" },
    { mods: ["Mod", "Shift"], key: "Right", action: "move-column-right", args: "" },
    { mods: ["Mod"], key: "1", action: "focus-workspace", args: "1" },
    { mods: ["Mod"], key: "2", action: "focus-workspace", args: "2" },
    { mods: ["Mod"], key: "3", action: "focus-workspace", args: "3" },
    { mods: ["Mod"], key: "4", action: "focus-workspace", args: "4" },
    { mods: ["Mod"], key: "5", action: "focus-workspace", args: "5" },
    { mods: ["Mod", "Shift"], key: "1", action: "move-column-to-workspace", args: "1" },
    { mods: ["Mod", "Shift"], key: "2", action: "move-column-to-workspace", args: "2" },
    { mods: ["Mod", "Shift"], key: "3", action: "move-column-to-workspace", args: "3" },
    { mods: ["Mod", "Shift"], key: "4", action: "move-column-to-workspace", args: "4" },
    { mods: ["Mod", "Shift"], key: "5", action: "move-column-to-workspace", args: "5" },
    { mods: ["Mod"], key: "R", action: "switch-preset-column-width", args: "" },
    { mods: ["Mod"], key: "Minus", action: "set-column-width", args: "-10%" },
    { mods: ["Mod"], key: "Equal", action: "set-column-width", args: "+10%" },
    { mods: ["Mod", "Shift"], key: "E", action: "quit", args: "" },
  ],

  windowRules: [
    { match: "app-id=\"pavucontrol\"", rules: ["open-floating"] },
    { match: "app-id=\"nm-connection-editor\"", rules: ["open-floating"] },
    { match: "title=\"Picture-in-Picture\"", rules: ["open-floating"] },
  ],

  spawnAtStartup: [
    "waybar",
    "dunst",
    "swaybg -i ~/wallpaper.png",
  ],

  envVars: [
    { key: "XCURSOR_SIZE", value: "24" },
    { key: "XDG_CURRENT_DESKTOP", value: "niri" },
    { key: "XDG_SESSION_TYPE", value: "wayland" },
  ],
}

export interface NiriconfPreset {
  name: string
  config: Partial<NiriconfConfig>
}

export const presets: NiriconfPreset[] = [
  { name: "Default", config: {} },
  {
    name: "Minimal",
    config: {
      gapsIn: 0,
      gapsOut: 0,
      borderRadius: 0,
      focusRingWidth: 1,
      animationEnabled: false,
      spawnAtStartup: ["waybar"],
      envVars: [{ key: "XCURSOR_SIZE", value: "24" }],
    },
  },
  {
    name: "Eye Candy",
    config: {
      gapsIn: 12,
      gapsOut: 16,
      borderRadius: 14,
      focusRingWidth: 3,
      animationStyle: "spring",
      animationSpeed: 0.8,
      activeOpacity: 0.95,
      inactiveOpacity: 0.8,
    },
  },
  {
    name: "Laptop",
    config: {
      touchpadNaturalScroll: true,
      touchpadTapToClick: true,
      touchpadDisableWhileTyping: true,
      mouseAccelProfile: "adaptive",
      gapsIn: 4,
      gapsOut: 6,
      animationSpeed: 1.5,
    },
  },
]

interface NiriconfContextValue {
  config: NiriconfConfig
  updateConfig: (updates: Partial<NiriconfConfig>) => void
  setConfig: (config: NiriconfConfig) => void
  presets: NiriconfPreset[]
  applyPreset: (name: string) => void
}

const NiriconfContext = createContext<NiriconfContextValue | null>(null)

export function NiriconfProvider({
  children,
  initialConfig,
  onConfigChange,
}: {
  children: ReactNode
  initialConfig?: NiriconfConfig
  onConfigChange?: (config: NiriconfConfig) => void
}) {
  const [config, setConfigState] = useState<NiriconfConfig>(initialConfig ?? defaultConfig)

  const setConfig = (c: NiriconfConfig) => {
    setConfigState(c)
    onConfigChange?.(c)
  }

  const updateConfig = (updates: Partial<NiriconfConfig>) => {
    setConfigState((prev) => {
      const next = { ...prev, ...updates }
      onConfigChange?.(next)
      return next
    })
  }

  const applyPreset = (name: string) => {
    const preset = presets.find((p) => p.name === name)
    if (!preset) return
    const next = { ...defaultConfig, ...preset.config }
    setConfigState(next)
    onConfigChange?.(next)
  }

  return (
    <NiriconfContext.Provider value={{ config, updateConfig, setConfig, presets, applyPreset }}>
      {children}
    </NiriconfContext.Provider>
  )
}

export function useNiriconf() {
  const ctx = useContext(NiriconfContext)
  if (!ctx) throw new Error("useNiriconf must be used within NiriconfProvider")
  return ctx
}
