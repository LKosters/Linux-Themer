"use client"

import { Suspense } from "react"
import { NiriconfProvider, defaultConfig } from "@/components/niriconf/config-context"
import { NiriConfigPreview } from "@/components/niriconf/config-preview"
import { NiriconfControls } from "@/components/niriconf/config-controls"
import { CustomizerShell } from "@/components/shared/customizer-shell"
import { useConfigUrlSync } from "@/hooks/use-config-url-sync"

function NiriconfCustomizerInner() {
  const { initialConfig, syncToUrl } = useConfigUrlSync(defaultConfig)

  return (
    <NiriconfProvider initialConfig={initialConfig} onConfigChange={syncToUrl}>
      <CustomizerShell
        activeDe="niriconf"
        preview={<NiriConfigPreview />}
        controls={<NiriconfControls />}
      />
    </NiriconfProvider>
  )
}

export function NiriconfCustomizer() {
  return (
    <Suspense>
      <NiriconfCustomizerInner />
    </Suspense>
  )
}
