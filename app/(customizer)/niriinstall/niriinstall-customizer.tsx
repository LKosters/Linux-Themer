"use client"

import { Suspense } from "react"
import { NiriInstallProvider, defaultInstallConfig } from "@/components/niriinstall/install-context"
import { NiriInstallPreview } from "@/components/niriinstall/install-preview"
import { NiriInstallControls } from "@/components/niriinstall/install-controls"
import { CustomizerShell } from "@/components/shared/customizer-shell"
import { useConfigUrlSync } from "@/hooks/use-config-url-sync"

function NiriInstallCustomizerInner() {
  const { initialConfig, syncToUrl } = useConfigUrlSync(defaultInstallConfig)

  return (
    <NiriInstallProvider initialConfig={initialConfig} onConfigChange={syncToUrl}>
      <CustomizerShell
        activeDe="niriinstall"
        preview={<NiriInstallPreview />}
        controls={<NiriInstallControls />}
      />
    </NiriInstallProvider>
  )
}

export function NiriInstallCustomizer() {
  return (
    <Suspense>
      <NiriInstallCustomizerInner />
    </Suspense>
  )
}
