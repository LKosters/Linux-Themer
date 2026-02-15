"use client"

import { Suspense } from "react"
import { ThemeProvider, defaultTheme } from "@/components/gnome/theme-context"
import { GnomePreview } from "@/components/gnome/gnome-preview"
import { ThemeControls } from "@/components/gnome/theme-controls"
import { CustomizerShell } from "@/components/shared/customizer-shell"
import { useThemeUrlSync } from "@/hooks/use-theme-url-sync"

function GnomeCustomizerInner() {
  const { initialTheme, syncToUrl } = useThemeUrlSync(defaultTheme)

  return (
    <ThemeProvider initialTheme={initialTheme} onThemeChange={syncToUrl}>
      <CustomizerShell
        activeDe="gnome"
        preview={<GnomePreview />}
        controls={<ThemeControls />}
      />
    </ThemeProvider>
  )
}

export function GnomeCustomizer() {
  return (
    <Suspense>
      <GnomeCustomizerInner />
    </Suspense>
  )
}
