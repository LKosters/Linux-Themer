"use client"

import { Fragment } from "react"
import Link from "next/link"
import { SiteHeader } from "./site-header"

type DE = "gnome" | "cinnamon" | "kde" | "hyprland" | "rofi" | "hyprconf" | "hyprinstall"

interface NavItem {
  value: DE
  label: string
}

interface NavCategory {
  id: string
  label: string
  items: NavItem[]
}

const NAV_CATEGORIES: NavCategory[] = [
  {
    id: "de",
    label: "Desktop",
    items: [
      { value: "gnome", label: "GNOME" },
      { value: "cinnamon", label: "Cinnamon" },
      { value: "kde", label: "KDE Plasma" },
    ],
  },
  {
    id: "hyprland",
    label: "Hyprland",
    items: [
      { value: "hyprland", label: "Theme" },
      { value: "hyprconf", label: "Config" },
      { value: "hyprinstall", label: "Installer" },
    ],
  },
  {
    id: "launcher",
    label: "Launcher",
    items: [
      { value: "rofi", label: "Rofi" },
    ],
  },
]

function getActiveCategory(activeDe: DE): NavCategory {
  return NAV_CATEGORIES.find((cat) => cat.items.some((item) => item.value === activeDe)) ?? NAV_CATEGORIES[0]
}

export function CustomizerShell({
  activeDe,
  preview,
  controls,
}: {
  activeDe: DE
  preview: React.ReactNode
  controls: React.ReactNode
}) {
  const activeCategory = getActiveCategory(activeDe)

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <SiteHeader activeSection="tools" />

      {/* Desktop nav — grouped tabs with dividers */}
      <div className="hidden lg:flex items-center border-b border-border px-6">
        {NAV_CATEGORIES.map((category, catIndex) => (
          <Fragment key={category.id}>
            {catIndex > 0 && (
              <div className="mx-3 h-4 w-px bg-border" />
            )}
            <div className="flex items-center">
              <span className="mr-2 text-[9px] font-sans uppercase tracking-[0.15em] text-muted-foreground/50">
                {category.label}
              </span>
              {category.items.map((item) => (
                <Link
                  key={item.value}
                  href={`/${item.value}`}
                  className={`relative px-3 py-2.5 text-xs font-sans transition-colors ${
                    activeDe === item.value
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {activeDe === item.value && (
                    <span className="absolute bottom-0 left-3 right-3 h-px bg-accent" />
                  )}
                </Link>
              ))}
            </div>
          </Fragment>
        ))}
      </div>

      {/* Mobile nav — two-tier */}
      <div className="flex flex-col border-b border-border lg:hidden">
        <div className="flex items-center gap-1 px-4 py-1.5 border-b border-border/50">
          {NAV_CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory.id
            return (
              <Link
                key={cat.id}
                href={`/${cat.items[0].value}`}
                className={`rounded px-2 py-1 text-[10px] font-sans uppercase tracking-[0.1em] transition-colors ${
                  isActive
                    ? "bg-accent/15 text-accent"
                    : "text-muted-foreground"
                }`}
              >
                {cat.label}
              </Link>
            )
          })}
        </div>
        {activeCategory.items.length > 1 && (
          <div className="flex items-center gap-0 px-4 py-1.5">
            {activeCategory.items.map((item) => (
              <Link
                key={item.value}
                href={`/${item.value}`}
                className={`relative px-2.5 py-1 text-xs font-sans transition-colors ${
                  activeDe === item.value
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
                {activeDe === item.value && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-px bg-accent" />
                )}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex flex-1 flex-col overflow-hidden">
          {activeDe === "hyprconf" || activeDe === "hyprinstall" ? (
            <div className="flex-1 overflow-hidden">
              {preview}
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center overflow-auto p-6 lg:p-10">
              <div className="w-full max-w-4xl">
                <div className="overflow-hidden rounded-xl border border-border/50 bg-card shadow-2xl shadow-black/30">
                  <div className="flex items-center justify-center bg-card py-1.5">
                    <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                  </div>
                  <div className="mx-1 mb-1">
                    {preview}
                  </div>
                </div>
                <div className="mx-auto flex flex-col items-center">
                  <div className="h-5 w-16 rounded-b bg-card border-x border-b border-border/50" />
                  <div className="h-1 w-24 rounded-b-lg bg-card border-x border-b border-border/50" />
                </div>
              </div>
            </div>
          )}
        </main>

        <aside className="hidden w-80 flex-shrink-0 border-l border-border bg-card lg:block overflow-hidden">
          {controls}
        </aside>

        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 lg:hidden">
          <details className="group">
            <summary className="flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-lg shadow-black/30 list-none">
              <span className="text-xs font-sans text-foreground">Customize</span>
              <span className="text-[10px] text-muted-foreground group-open:rotate-180 transition-transform">
                {"^"}
              </span>
            </summary>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 max-h-[60vh] overflow-y-auto rounded-xl border border-border bg-card shadow-xl shadow-black/40">
              {controls}
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}
