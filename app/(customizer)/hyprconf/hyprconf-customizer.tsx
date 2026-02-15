"use client"

import { Suspense } from "react"
import { HyprconfProvider, defaultConfig } from "@/components/hyprconf/config-context"
import { ConfigPreview } from "@/components/hyprconf/config-preview"
import { HyprconfControls } from "@/components/hyprconf/config-controls"
import { CustomizerShell } from "@/components/shared/customizer-shell"
import { useConfigUrlSync } from "@/hooks/use-config-url-sync"

function HyprconfCustomizerInner() {
  const { initialConfig, syncToUrl } = useConfigUrlSync(defaultConfig)

  return (
    <HyprconfProvider initialConfig={initialConfig} onConfigChange={syncToUrl}>
      <CustomizerShell
        activeDe="hyprconf"
        preview={<ConfigPreview />}
        controls={<HyprconfControls />}
      />
    </HyprconfProvider>
  )
}

export function HyprconfCustomizer() {
  return (
    <Suspense>
      <HyprconfCustomizerInner />
    </Suspense>
  )
}
