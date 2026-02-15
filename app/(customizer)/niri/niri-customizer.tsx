"use client"

import { Suspense } from "react"
import { NiriThemeProvider, defaultTheme } from "@/components/niri/theme-context"
import { NiriPreview } from "@/components/niri/niri-preview"
import { NiriThemeControls } from "@/components/niri/theme-controls"
import { CustomizerShell } from "@/components/shared/customizer-shell"
import { useThemeUrlSync } from "@/hooks/use-theme-url-sync"

function NiriCustomizerInner() {
  const { initialTheme, syncToUrl } = useThemeUrlSync(defaultTheme)

  return (
    <NiriThemeProvider initialTheme={initialTheme} onThemeChange={syncToUrl}>
      <CustomizerShell
        activeDe="niri"
        preview={<NiriPreview />}
        controls={<NiriThemeControls />}
      />
    </NiriThemeProvider>
  )
}

export function NiriCustomizer() {
  return (
    <Suspense>
      <NiriCustomizerInner />
    </Suspense>
  )
}
