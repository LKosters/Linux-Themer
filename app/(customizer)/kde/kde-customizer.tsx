"use client"

import { Suspense } from "react"
import { KDEThemeProvider, defaultTheme } from "@/components/kde/theme-context"
import { KDEPreview } from "@/components/kde/kde-preview"
import { KDEThemeControls } from "@/components/kde/theme-controls"
import { CustomizerShell } from "@/components/shared/customizer-shell"
import { useThemeUrlSync } from "@/hooks/use-theme-url-sync"

function KDECustomizerInner() {
  const { initialTheme, syncToUrl } = useThemeUrlSync(defaultTheme)

  return (
    <KDEThemeProvider initialTheme={initialTheme} onThemeChange={syncToUrl}>
      <CustomizerShell
        activeDe="kde"
        preview={<KDEPreview />}
        controls={<KDEThemeControls />}
      />
    </KDEThemeProvider>
  )
}

export function KDECustomizer() {
  return (
    <Suspense>
      <KDECustomizerInner />
    </Suspense>
  )
}
