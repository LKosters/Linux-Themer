"use client"

import { Suspense } from "react"
import { RofiThemeProvider, defaultTheme } from "@/components/rofi/theme-context"
import { RofiPreview } from "@/components/rofi/rofi-preview"
import { RofiThemeControls } from "@/components/rofi/theme-controls"
import { CustomizerShell } from "@/components/shared/customizer-shell"
import { useThemeUrlSync } from "@/hooks/use-theme-url-sync"

function RofiCustomizerInner() {
  const { initialTheme, syncToUrl } = useThemeUrlSync(defaultTheme)

  return (
    <RofiThemeProvider initialTheme={initialTheme} onThemeChange={syncToUrl}>
      <CustomizerShell
        activeDe="rofi"
        preview={<RofiPreview />}
        controls={<RofiThemeControls />}
      />
    </RofiThemeProvider>
  )
}

export function RofiCustomizer() {
  return (
    <Suspense>
      <RofiCustomizerInner />
    </Suspense>
  )
}
