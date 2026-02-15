"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Keybind, WindowRule, MonitorConfig, EnvVar } from "@/components/hyprconf/config-context"

export type { Keybind, WindowRule, MonitorConfig, EnvVar }

export type Distro = "arch" | "fedora" | "ubuntu" | "void" | "opensuse"

export const AVAILABLE_PACKAGES = [
  "hyprland",
  "waybar",
  "kitty",
  "rofi-wayland",
  "dunst",
  "thunar",
  "hyprpaper",
  "grim",
  "slurp",
  "wl-clipboard",
  "polkit-gnome",
  "brightnessctl",
  "playerctl",
  "pavucontrol",
  "nm-connection-editor",
  "xdg-desktop-portal-hyprland",
] as const

export interface HyprInstallConfig {
  // Packages
  distro: Distro
  packages: string[]

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
  activeColor: string
  inactiveColor: string
  borderGradient: boolean
  borderGradientColor2: string
  borderGradientAngle: number
  windowBg: string
  activeOpacity: number
  inactiveOpacity: number
  shadow: boolean
  shadowColor: string
  shadowRange: number
  shadowRenderPower: number
  blurEnabled: boolean
  blurSize: number
  blurPasses: number
  blurVibrancy: number
  dimInactive: boolean
  dimStrength: number

  // Animations
  animationEnabled: boolean
  animationSpeed: number
  animationStyle: "default" | "slide" | "popin" | "fade"

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
  keybinds: Keybind[]

  // Window Rules
  windowRules: WindowRule[]

  // Monitors
  monitors: MonitorConfig[]

  // Autostart
  execOnce: string[]

  // Environment Variables
  envVars: EnvVar[]
}

export const defaultInstallConfig: HyprInstallConfig = {
  distro: "arch",
  packages: [
    "hyprland",
    "waybar",
    "kitty",
    "rofi-wayland",
    "dunst",
    "thunar",
    "hyprpaper",
    "grim",
    "slurp",
    "wl-clipboard",
    "polkit-gnome",
    "xdg-desktop-portal-hyprland",
  ],

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
  activeColor: "#89b4fa",
  inactiveColor: "#45475a",
  borderGradient: false,
  borderGradientColor2: "#cba6f7",
  borderGradientAngle: 45,
  windowBg: "#1e1e2e",
  activeOpacity: 1,
  inactiveOpacity: 0.9,
  shadow: true,
  shadowColor: "#00000066",
  shadowRange: 8,
  shadowRenderPower: 2,
  blurEnabled: true,
  blurSize: 8,
  blurPasses: 2,
  blurVibrancy: 0.2,
  dimInactive: false,
  dimStrength: 0.2,

  animationEnabled: true,
  animationSpeed: 1,
  animationStyle: "default",

  accentColor: "#89b4fa",
  barBg: "#1e1e2e",
  barText: "#cdd6f4",
  barOpacity: 0.95,
  barHeight: 30,
  barPosition: "top",
  barModuleBg: "#313244",
  barBorderRadius: 0,
  barMargin: 0,
  barModuleRadius: 8,
  barModuleSpacing: 2,
  barFontSize: 10,

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
  ],

  monitors: [
    { name: "", resolution: "preferred", position: "auto", scale: "1" },
  ],

  execOnce: [
    "waybar",
    "hyprpaper",
    "dunst",
    "/usr/lib/polkit-gnome/polkit-gnome-authentication-agent-1",
  ],

  envVars: [
    { key: "XCURSOR_SIZE", value: "24" },
    { key: "QT_QPA_PLATFORMTHEME", value: "qt5ct" },
    { key: "XDG_CURRENT_DESKTOP", value: "Hyprland" },
    { key: "XDG_SESSION_TYPE", value: "wayland" },
    { key: "XDG_SESSION_DESKTOP", value: "Hyprland" },
  ],
}

export interface HyprInstallPreset {
  name: string
  config: Partial<HyprInstallConfig>
}

export const presets: HyprInstallPreset[] = [
  { name: "Default", config: {} },
  {
    name: "Minimal",
    config: {
      packages: ["hyprland", "kitty", "rofi-wayland", "grim", "wl-clipboard"],
      borderSize: 1,
      gapsIn: 0,
      gapsOut: 0,
      borderRadius: 0,
      shadow: false,
      blurEnabled: false,
      animationEnabled: false,
      barBorderRadius: 0,
      barMargin: 0,
      barModuleRadius: 0,
      barHeight: 24,
      execOnce: ["waybar"],
    },
  },
  {
    name: "Rice Ready",
    config: {
      borderSize: 3,
      gapsIn: 8,
      gapsOut: 16,
      borderRadius: 14,
      borderGradient: true,
      borderGradientColor2: "#cba6f7",
      borderGradientAngle: 45,
      activeColor: "#89b4fa",
      shadow: true,
      shadowRange: 20,
      shadowRenderPower: 3,
      blurEnabled: true,
      blurSize: 12,
      blurPasses: 4,
      blurVibrancy: 0.3,
      activeOpacity: 0.92,
      inactiveOpacity: 0.8,
      dimInactive: true,
      dimStrength: 0.2,
      animationSpeed: 0.8,
      animationStyle: "popin",
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
      gapsIn: 3,
      gapsOut: 6,
      borderSize: 2,
      blurEnabled: false,
      shadow: false,
      animationSpeed: 1.5,
      packages: [
        "hyprland", "waybar", "kitty", "rofi-wayland", "dunst",
        "thunar", "hyprpaper", "grim", "slurp", "wl-clipboard",
        "polkit-gnome", "brightnessctl", "playerctl",
        "xdg-desktop-portal-hyprland",
      ],
    },
  },
]

interface HyprInstallContextValue {
  config: HyprInstallConfig
  updateConfig: (updates: Partial<HyprInstallConfig>) => void
  setConfig: (config: HyprInstallConfig) => void
  presets: HyprInstallPreset[]
  applyPreset: (name: string) => void
}

const HyprInstallContext = createContext<HyprInstallContextValue | null>(null)

export function HyprInstallProvider({
  children,
  initialConfig,
  onConfigChange,
}: {
  children: ReactNode
  initialConfig?: HyprInstallConfig
  onConfigChange?: (config: HyprInstallConfig) => void
}) {
  const [config, setConfigState] = useState<HyprInstallConfig>(initialConfig ?? defaultInstallConfig)

  const setConfig = (c: HyprInstallConfig) => {
    setConfigState(c)
    onConfigChange?.(c)
  }

  const updateConfig = (updates: Partial<HyprInstallConfig>) => {
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
    <HyprInstallContext.Provider value={{ config, updateConfig, setConfig, presets, applyPreset }}>
      {children}
    </HyprInstallContext.Provider>
  )
}

export function useHyprInstall() {
  const ctx = useContext(HyprInstallContext)
  if (!ctx) throw new Error("useHyprInstall must be used within HyprInstallProvider")
  return ctx
}
