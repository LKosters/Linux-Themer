"use client"

import { useState } from "react"
import { useNiriInstall } from "./install-context"
import type { NiriInstallConfig } from "./install-context"
import { NiriThemeProvider } from "@/components/niri/theme-context"
import type { NiriTheme } from "@/components/niri/theme-context"
import { NiriPreview } from "@/components/niri/niri-preview"
import { NiriScriptPreview } from "./script-preview"
import { Monitor, FileCode } from "lucide-react"

function mapConfigToTheme(c: NiriInstallConfig): NiriTheme {
  return {
    focusRingWidth: c.focusRingWidth,
    focusRingColor: c.focusRingColor,
    inactiveColor: c.inactiveColor,
    gapsIn: c.gapsIn,
    gapsOut: c.gapsOut,
    borderRadius: c.borderRadius,
    workspaceStyle: "numbers",
    barBg: c.barBg,
    barText: c.barText,
    barOpacity: c.barOpacity,
    barHeight: c.barHeight,
    barPosition: c.barPosition,
    barModuleBg: c.barModuleBg,
    barBorderRadius: c.barBorderRadius,
    barMargin: c.barMargin,
    barModuleRadius: c.barModuleRadius,
    barModuleSpacing: c.barModuleSpacing,
    barFontSize: c.barFontSize,
    windowBg: c.windowBg,
    windowOpacity: c.windowOpacity,
    windowShadow: c.windowShadow,
    shadowColor: c.shadowColor,
    shadowSize: c.shadowSize,
    blurEnabled: c.blurEnabled,
    blurRadius: c.blurRadius,
    blurPasses: c.blurPasses,
    animationEnabled: c.animationEnabled,
    animationSpeed: c.animationSpeed,
    animationStyle: c.animationStyle,
    accentColor: c.accentColor,
    wallpaperGradientFrom: "#0a0a1a",
    wallpaperGradientTo: "#1a0a2e",
    wallpaperImageUrl: "",
    wallpaperImageOpacity: 1,
    aspectRatio: "16/9",
  }
}

export function NiriInstallPreview() {
  const { config } = useNiriInstall()
  const [mode, setMode] = useState<"desktop" | "script">("desktop")

  const theme = mapConfigToTheme(config)

  return (
    <div className="flex h-full flex-col">
      {/* Toggle bar */}
      <div className="flex items-center justify-center gap-1 border-b border-border bg-card px-4 py-1.5 shrink-0">
        <button
          onClick={() => setMode("desktop")}
          className="flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-sans transition-all"
          style={{
            backgroundColor: mode === "desktop" ? "hsl(var(--accent) / 0.15)" : "transparent",
            color: mode === "desktop" ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))",
          }}
        >
          <Monitor size={12} />
          Desktop
        </button>
        <button
          onClick={() => setMode("script")}
          className="flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-sans transition-all"
          style={{
            backgroundColor: mode === "script" ? "hsl(var(--accent) / 0.15)" : "transparent",
            color: mode === "script" ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))",
          }}
        >
          <FileCode size={12} />
          Script
        </button>
      </div>

      {/* Content */}
      {mode === "script" ? (
        <div className="flex-1 overflow-hidden">
          <NiriScriptPreview />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center overflow-auto p-6 lg:p-10">
          <div className="w-full max-w-4xl">
            <div className="overflow-hidden rounded-xl border border-border/50 bg-card shadow-2xl shadow-black/30">
              <div className="flex items-center justify-center bg-card py-1.5">
                <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
              </div>
              <div className="mx-1 mb-1">
                <NiriThemeProvider initialTheme={theme}>
                  <NiriPreview />
                </NiriThemeProvider>
              </div>
            </div>
            <div className="mx-auto flex flex-col items-center">
              <div className="h-5 w-16 rounded-b bg-card border-x border-b border-border/50" />
              <div className="h-1 w-24 rounded-b-lg bg-card border-x border-b border-border/50" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
