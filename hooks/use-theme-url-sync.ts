"use client"

import { useSearchParams } from "next/navigation"
import { useMemo, useCallback, useRef } from "react"

type ThemeValue = string | number | boolean

const EXCLUDE_KEYS = ["wallpaperImageUrl"]

function serializeValue(value: ThemeValue): string {
  if (typeof value === "boolean") return value ? "1" : "0"
  return String(value)
}

function deserializeValue(raw: string, defaultValue: ThemeValue): ThemeValue {
  if (typeof defaultValue === "boolean") return raw === "1"
  if (typeof defaultValue === "number") {
    const n = Number(raw)
    return isNaN(n) ? defaultValue : n
  }
  return raw
}

export function useThemeUrlSync<T extends Record<string, ThemeValue>>(
  defaultTheme: T
): {
  initialTheme: T
  syncToUrl: (theme: T) => void
} {
  const searchParams = useSearchParams()
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()

  const initialTheme = useMemo(() => {
    const result = { ...defaultTheme }
    for (const key of Object.keys(defaultTheme)) {
      if (EXCLUDE_KEYS.includes(key)) continue
      const raw = searchParams.get(key)
      if (raw !== null) {
        ;(result as Record<string, ThemeValue>)[key] = deserializeValue(raw, defaultTheme[key])
      }
    }
    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const syncToUrl = useCallback((theme: T) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams()
      for (const key of Object.keys(defaultTheme)) {
        if (EXCLUDE_KEYS.includes(key)) continue
        const current = theme[key]
        const def = defaultTheme[key]
        if (current !== def) {
          params.set(key, serializeValue(current))
        }
      }
      const qs = params.toString()
      const newUrl = window.location.pathname + (qs ? `?${qs}` : "")
      window.history.replaceState(null, "", newUrl)
    }, 250)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { initialTheme, syncToUrl }
}
