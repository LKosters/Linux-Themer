"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { NiriKeybind, NiriWindowRule, NiriEnvVar } from "@/components/niriconf/config-context"

export type { NiriKeybind, NiriWindowRule, NiriEnvVar }

export type Distro = "arch" | "fedora" | "ubuntu" | "void" | "opensuse"

export const AVAILABLE_PACKAGES = [
  "niri",
  "waybar",
  "alacritty",
  "fuzzel",
  "dunst",
  "thunar",
  "swaybg",
  "grim",
  "slurp",
  "wl-clipboard",
  "polkit-gnome",
  "brightnessctl",
  "playerctl",
  "pavucontrol",
  "nm-connection-editor",
  "xdg-desktop-portal-gnome",
  "xwayland-satellite",
] as const

export interface NiriInstallConfig {
  // Packages
  distro: Distro
  packages: string[]

  // Input
  kbLayout: string
  kbVariant: string
  kbOptions: string
  repeatRate: number
  repeatDelay: number
  naturalScroll: boolean
  touchpadNaturalScroll: boolean
  touchpadTapToClick: boolean
  touchpadDisableWhileTyping: boolean
  mouseAccelProfile: "flat" | "adaptive"

  // Layout
  defaultColumnWidth: "proportion 0.33333" | "proportion 0.5" | "proportion 0.66667" | "fixed 960"
  centerFocusedColumn: "never" | "always" | "on-overflow"
  gapsIn: number
  gapsOut: number

  // Focus ring
  focusRingWidth: number
  focusRingColor: string
  inactiveColor: string

  // Decoration
  borderRadius: number
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

  // Waybar
  accentColor: string
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

  // Keybinds
  keybinds: NiriKeybind[]

  // Window Rules
  windowRules: NiriWindowRule[]

  // Autostart
  spawnAtStartup: string[]

  // Environment Variables
  envVars: NiriEnvVar[]
}

export const defaultInstallConfig: NiriInstallConfig = {
  distro: "arch",
  packages: [
    "niri",
    "waybar",
    "alacritty",
    "fuzzel",
    "dunst",
    "thunar",
    "swaybg",
    "grim",
    "slurp",
    "wl-clipboard",
    "polkit-gnome",
    "xdg-desktop-portal-gnome",
  ],

  kbLayout: "us",
  kbVariant: "",
  kbOptions: "",
  repeatRate: 25,
  repeatDelay: 600,
  naturalScroll: false,
  touchpadNaturalScroll: true,
  touchpadTapToClick: true,
  touchpadDisableWhileTyping: true,
  mouseAccelProfile: "flat",

  defaultColumnWidth: "proportion 0.5",
  centerFocusedColumn: "never",
  gapsIn: 8,
  gapsOut: 8,

  focusRingWidth: 2,
  focusRingColor: "#89b4fa",
  inactiveColor: "#45475a",

  borderRadius: 8,
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
    { mods: ["Mod", "Shift"], key: "E", action: "quit", args: "" },
  ],

  windowRules: [
    { match: 'app-id="pavucontrol"', rules: ["open-floating"] },
    { match: 'app-id="nm-connection-editor"', rules: ["open-floating"] },
  ],

  spawnAtStartup: [
    "waybar",
    "dunst",
    "swaybg -i ~/wallpaper.png",
    "/usr/lib/polkit-gnome/polkit-gnome-authentication-agent-1",
  ],

  envVars: [
    { key: "XCURSOR_SIZE", value: "24" },
    { key: "XDG_CURRENT_DESKTOP", value: "niri" },
    { key: "XDG_SESSION_TYPE", value: "wayland" },
  ],
}

export interface NiriInstallPreset {
  name: string
  config: Partial<NiriInstallConfig>
}

export const presets: NiriInstallPreset[] = [
  { name: "Default", config: {} },
  {
    name: "Minimal",
    config: {
      packages: ["niri", "alacritty", "fuzzel", "grim", "wl-clipboard"],
      gapsIn: 0,
      gapsOut: 0,
      borderRadius: 0,
      focusRingWidth: 1,
      blurEnabled: false,
      animationEnabled: false,
      barBorderRadius: 0,
      barMargin: 0,
      barModuleRadius: 0,
      barHeight: 24,
      spawnAtStartup: ["waybar"],
    },
  },
  {
    name: "Rice Ready",
    config: {
      gapsIn: 12,
      gapsOut: 16,
      borderRadius: 14,
      focusRingWidth: 3,
      focusRingColor: "#89b4fa",
      windowShadow: true,
      shadowSize: 24,
      blurEnabled: true,
      blurRadius: 10,
      blurPasses: 3,
      animationStyle: "spring",
      animationSpeed: 0.8,
      barBorderRadius: 14,
      barMargin: 8,
      barModuleRadius: 10,
      barOpacity: 0.85,
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
      blurEnabled: false,
      windowShadow: false,
      animationSpeed: 1.5,
      packages: [
        "niri", "waybar", "alacritty", "fuzzel", "dunst",
        "thunar", "swaybg", "grim", "slurp", "wl-clipboard",
        "polkit-gnome", "brightnessctl", "playerctl",
        "xdg-desktop-portal-gnome",
      ],
    },
  },
]

interface NiriInstallContextValue {
  config: NiriInstallConfig
  updateConfig: (updates: Partial<NiriInstallConfig>) => void
  setConfig: (config: NiriInstallConfig) => void
  presets: NiriInstallPreset[]
  applyPreset: (name: string) => void
}

const NiriInstallContext = createContext<NiriInstallContextValue | null>(null)

export function NiriInstallProvider({
  children,
  initialConfig,
  onConfigChange,
}: {
  children: ReactNode
  initialConfig?: NiriInstallConfig
  onConfigChange?: (config: NiriInstallConfig) => void
}) {
  const [config, setConfigState] = useState<NiriInstallConfig>(initialConfig ?? defaultInstallConfig)

  const setConfig = (c: NiriInstallConfig) => {
    setConfigState(c)
    onConfigChange?.(c)
  }

  const updateConfig = (updates: Partial<NiriInstallConfig>) => {
    setConfigState((prev) => {
      const next = { ...prev, ...updates }
      onConfigChange?.(next)
      return next
    })
  }

  const applyPreset = (name: string) => {
    const preset = presets.find((p) => p.name === name)
    if (!preset) return
    const next = { ...defaultInstallConfig, ...preset.config }
    setConfigState(next)
    onConfigChange?.(next)
  }

  return (
    <NiriInstallContext.Provider value={{ config, updateConfig, setConfig, presets, applyPreset }}>
      {children}
    </NiriInstallContext.Provider>
  )
}

export function useNiriInstall() {
  const ctx = useContext(NiriInstallContext)
  if (!ctx) throw new Error("useNiriInstall must be used within NiriInstallProvider")
  return ctx
}
