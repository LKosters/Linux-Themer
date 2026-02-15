"use client"

import { Suspense } from "react"
import { HyprInstallProvider, defaultInstallConfig } from "@/components/hyprinstall/install-context"
import { InstallPreview } from "@/components/hyprinstall/install-preview"
import { HyprInstallControls } from "@/components/hyprinstall/install-controls"
import { CustomizerShell } from "@/components/shared/customizer-shell"
import { useConfigUrlSync } from "@/hooks/use-config-url-sync"

function HyprInstallCustomizerInner() {
  const { initialConfig, syncToUrl } = useConfigUrlSync(defaultInstallConfig)

  return (
    <HyprInstallProvider initialConfig={initialConfig} onConfigChange={syncToUrl}>
      <CustomizerShell
        activeDe="hyprinstall"
        preview={<InstallPreview />}
        controls={<HyprInstallControls />}
      />
    </HyprInstallProvider>
  )
}

export function HyprInstallCustomizer() {
  return (
    <Suspense>
      <HyprInstallCustomizerInner />
    </Suspense>
  )
}
