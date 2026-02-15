"use client"

import { Suspense } from "react"
import { HyprlandThemeProvider, defaultTheme } from "@/components/hyprland/theme-context"
import { HyprlandPreview } from "@/components/hyprland/hyprland-preview"
import { HyprlandThemeControls } from "@/components/hyprland/theme-controls"
import { CustomizerShell } from "@/components/shared/customizer-shell"
import { useThemeUrlSync } from "@/hooks/use-theme-url-sync"

function HyprlandCustomizerInner() {
  const { initialTheme, syncToUrl } = useThemeUrlSync(defaultTheme)

  return (
    <HyprlandThemeProvider initialTheme={initialTheme} onThemeChange={syncToUrl}>
      <CustomizerShell
        activeDe="hyprland"
        preview={<HyprlandPreview />}
        controls={<HyprlandThemeControls />}
      />
    </HyprlandThemeProvider>
  )
}

export function HyprlandCustomizer() {
  return (
    <Suspense>
      <HyprlandCustomizerInner />
    </Suspense>
  )
}
