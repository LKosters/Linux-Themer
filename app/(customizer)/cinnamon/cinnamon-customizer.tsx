"use client"

import { Suspense } from "react"
import { CinnamonThemeProvider, defaultTheme } from "@/components/cinnamon/theme-context"
import { CinnamonPreview } from "@/components/cinnamon/cinnamon-preview"
import { CinnamonThemeControls } from "@/components/cinnamon/theme-controls"
import { CustomizerShell } from "@/components/shared/customizer-shell"
import { useThemeUrlSync } from "@/hooks/use-theme-url-sync"

function CinnamonCustomizerInner() {
  const { initialTheme, syncToUrl } = useThemeUrlSync(defaultTheme)

  return (
    <CinnamonThemeProvider initialTheme={initialTheme} onThemeChange={syncToUrl}>
      <CustomizerShell
        activeDe="cinnamon"
        preview={<CinnamonPreview />}
        controls={<CinnamonThemeControls />}
      />
    </CinnamonThemeProvider>
  )
}

export function CinnamonCustomizer() {
  return (
    <Suspense>
      <CinnamonCustomizerInner />
    </Suspense>
  )
}
