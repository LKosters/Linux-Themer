"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Keybind {
  mods: string[]
  key: string
  action: string
  args: string
}

export interface WindowRule {
  match: string
  rules: string[]
}

export interface MonitorConfig {
  name: string
  resolution: string
  position: string
  scale: string
}

export interface EnvVar {
  key: string
  value: string
}

export interface HyprconfConfig {
  // General
  layout: "dwindle" | "master"
  borderSize: number
  gapsIn: number
  gapsOut: number
  resizeOnBorder: boolean
  allowTearing: boolean
  sensitivity: number

  // Input
  kbLayout: string
  kbVariant: string
  kbOptions: string
  repeatRate: number
  repeatDelay: number
  followMouse: boolean
  naturalScroll: boolean
  touchpadNaturalScroll: boolean
  touchpadTapToClick: boolean
  touchpadDisableWhileTyping: boolean
  mouseAccelProfile: "flat" | "adaptive"

  // Decoration
  borderRadius: number
  activeOpacity: number
  inactiveOpacity: number
  shadow: boolean
  shadowRange: number
  shadowRenderPower: number
  blurEnabled: boolean
  blurSize: number
  blurPasses: number

  // Animations
  animationEnabled: boolean
  animationSpeed: number

  // Keybinds
  keybinds: Keybind[]

  // Window Rules
  windowRules: WindowRule[]

  // Monitors
  monitors: MonitorConfig[]

  // Exec / Autostart
  execOnce: string[]

  // Environment Variables
  envVars: EnvVar[]
}

export const defaultConfig: HyprconfConfig = {
  layout: "dwindle",
  borderSize: 2,
  gapsIn: 5,
  gapsOut: 10,
  resizeOnBorder: true,
  allowTearing: false,
  sensitivity: 0,

  kbLayout: "us",
  kbVariant: "",
  kbOptions: "",
  repeatRate: 25,
  repeatDelay: 600,
  followMouse: true,
  naturalScroll: false,
  touchpadNaturalScroll: true,
  touchpadTapToClick: true,
  touchpadDisableWhileTyping: true,
  mouseAccelProfile: "flat",

  borderRadius: 10,
  activeOpacity: 1,
  inactiveOpacity: 0.9,
  shadow: true,
  shadowRange: 8,
  shadowRenderPower: 2,
  blurEnabled: true,
  blurSize: 8,
  blurPasses: 2,

  animationEnabled: true,
  animationSpeed: 1,

  keybinds: [
    { mods: ["SUPER"], key: "Return", action: "exec", args: "kitty" },
    { mods: ["SUPER"], key: "Q", action: "killactive", args: "" },
    { mods: ["SUPER"], key: "M", action: "exit", args: "" },
    { mods: ["SUPER"], key: "E", action: "exec", args: "thunar" },
    { mods: ["SUPER"], key: "V", action: "togglefloating", args: "" },
    { mods: ["SUPER"], key: "R", action: "exec", args: "rofi -show drun" },
    { mods: ["SUPER"], key: "F", action: "fullscreen", args: "0" },
    { mods: ["SUPER"], key: "P", action: "pseudo", args: "" },
    { mods: ["SUPER"], key: "J", action: "togglesplit", args: "" },
    { mods: ["SUPER"], key: "left", action: "movefocus", args: "l" },
    { mods: ["SUPER"], key: "right", action: "movefocus", args: "r" },
    { mods: ["SUPER"], key: "up", action: "movefocus", args: "u" },
    { mods: ["SUPER"], key: "down", action: "movefocus", args: "d" },
    { mods: ["SUPER"], key: "1", action: "workspace", args: "1" },
    { mods: ["SUPER"], key: "2", action: "workspace", args: "2" },
    { mods: ["SUPER"], key: "3", action: "workspace", args: "3" },
    { mods: ["SUPER"], key: "4", action: "workspace", args: "4" },
    { mods: ["SUPER"], key: "5", action: "workspace", args: "5" },
    { mods: ["SUPER"], key: "6", action: "workspace", args: "6" },
    { mods: ["SUPER"], key: "7", action: "workspace", args: "7" },
    { mods: ["SUPER"], key: "8", action: "workspace", args: "8" },
    { mods: ["SUPER"], key: "9", action: "workspace", args: "9" },
    { mods: ["SUPER", "SHIFT"], key: "1", action: "movetoworkspace", args: "1" },
    { mods: ["SUPER", "SHIFT"], key: "2", action: "movetoworkspace", args: "2" },
    { mods: ["SUPER", "SHIFT"], key: "3", action: "movetoworkspace", args: "3" },
    { mods: ["SUPER", "SHIFT"], key: "4", action: "movetoworkspace", args: "4" },
    { mods: ["SUPER", "SHIFT"], key: "5", action: "movetoworkspace", args: "5" },
    { mods: ["SUPER", "SHIFT"], key: "6", action: "movetoworkspace", args: "6" },
    { mods: ["SUPER", "SHIFT"], key: "7", action: "movetoworkspace", args: "7" },
    { mods: ["SUPER", "SHIFT"], key: "8", action: "movetoworkspace", args: "8" },
    { mods: ["SUPER", "SHIFT"], key: "9", action: "movetoworkspace", args: "9" },
    { mods: ["SUPER"], key: "mouse_down", action: "workspace", args: "e+1" },
    { mods: ["SUPER"], key: "mouse_up", action: "workspace", args: "e-1" },
  ],

  windowRules: [
    { match: "class:^(pavucontrol)$", rules: ["float"] },
    { match: "class:^(nm-connection-editor)$", rules: ["float"] },
    { match: "title:^(Picture-in-Picture)$", rules: ["float", "pin"] },
    { match: "class:^(firefox)$,title:^(Library)$", rules: ["float", "size 800 600"] },
  ],

  monitors: [
    { name: "", resolution: "preferred", position: "auto", scale: "1" },
  ],

  execOnce: [
    "waybar",
    "hyprpaper",
    "dunst",
  ],

  envVars: [
    { key: "XCURSOR_SIZE", value: "24" },
    { key: "QT_QPA_PLATFORMTHEME", value: "qt5ct" },
  ],
}

export interface HyprconfPreset {
  name: string
  config: Partial<HyprconfConfig>
}

export const presets: HyprconfPreset[] = [
  {
    name: "Default",
    config: {},
  },
  {
    name: "Minimal",
    config: {
      borderSize: 1,
      gapsIn: 0,
      gapsOut: 0,
      borderRadius: 0,
      shadow: false,
      blurEnabled: false,
      animationEnabled: false,
      execOnce: ["waybar"],
      envVars: [{ key: "XCURSOR_SIZE", value: "24" }],
    },
  },
  {
    name: "Eye Candy",
    config: {
      borderSize: 3,
      gapsIn: 8,
      gapsOut: 16,
      borderRadius: 14,
      shadow: true,
      shadowRange: 16,
      shadowRenderPower: 3,
      blurEnabled: true,
      blurSize: 12,
      blurPasses: 4,
      activeOpacity: 0.95,
      inactiveOpacity: 0.8,
      animationEnabled: true,
      animationSpeed: 0.7,
    },
  },
  {
    name: "Laptop",
    config: {
      touchpadNaturalScroll: true,
      touchpadTapToClick: true,
      touchpadDisableWhileTyping: true,
      mouseAccelProfile: "adaptive",
      gapsIn: 3,
      gapsOut: 6,
      borderSize: 2,
      blurEnabled: false,
      shadow: false,
      animationSpeed: 1.5,
    },
  },
]

interface HyprconfContextValue {
  config: HyprconfConfig
  updateConfig: (updates: Partial<HyprconfConfig>) => void
  setConfig: (config: HyprconfConfig) => void
  presets: HyprconfPreset[]
  applyPreset: (name: string) => void
}

const HyprconfContext = createContext<HyprconfContextValue | null>(null)

export function HyprconfProvider({
  children,
  initialConfig,
  onConfigChange,
}: {
  children: ReactNode
  initialConfig?: HyprconfConfig
  onConfigChange?: (config: HyprconfConfig) => void
}) {
  const [config, setConfigState] = useState<HyprconfConfig>(initialConfig ?? defaultConfig)

  const setConfig = (c: HyprconfConfig) => {
    setConfigState(c)
    onConfigChange?.(c)
  }

  const updateConfig = (updates: Partial<HyprconfConfig>) => {
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
    <HyprconfContext.Provider value={{ config, updateConfig, setConfig, presets, applyPreset }}>
      {children}
    </HyprconfContext.Provider>
  )
}

export function useHyprconf() {
  const ctx = useContext(HyprconfContext)
  if (!ctx) throw new Error("useHyprconf must be used within HyprconfProvider")
  return ctx
}
