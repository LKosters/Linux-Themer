"use client"

import { useSearchParams } from "next/navigation"
import { useMemo, useCallback, useRef } from "react"

export function useConfigUrlSync<T>(
  defaultConfig: T
): {
  initialConfig: T
  syncToUrl: (config: T) => void
} {
  const searchParams = useSearchParams()
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()

  const initialConfig = useMemo(() => {
    const raw = searchParams.get("c")
    if (!raw) return defaultConfig
    try {
      const json = atob(raw)
      const parsed = JSON.parse(json) as Partial<T>
      return { ...defaultConfig, ...parsed }
    } catch {
      return defaultConfig
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const syncToUrl = useCallback((config: T) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      const json = JSON.stringify(config)
      const defaultJson = JSON.stringify(defaultConfig)
      if (json === defaultJson) {
        window.history.replaceState(null, "", window.location.pathname)
        return
      }
      const encoded = btoa(json)
      window.history.replaceState(null, "", `${window.location.pathname}?c=${encoded}`)
    }, 300)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { initialConfig, syncToUrl }
}
