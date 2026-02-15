"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Monitor, Columns3, Layout, AppWindow, Menu, X } from "lucide-react"
import { getDocsCategories } from "@/lib/tools-config"

const ICON_MAP = {
  "monitor": Monitor,
  "columns-3": Columns3,
  "layout": Layout,
  "app-window": AppWindow,
} as const

const DOCS_CATEGORIES = getDocsCategories()

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  const activeSlug = pathname.replace("/docs/", "").replace("/docs", "")

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    const open: Record<string, boolean> = {}
    for (const cat of DOCS_CATEGORIES) {
      open[cat.id] = true
    }
    return open
  })

  const toggle = (id: string) => {
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <nav className="flex flex-col gap-1 py-4 px-3">
      <Link
        href="/docs"
        onClick={onNavigate}
        className={`rounded-md px-3 py-2 text-sm font-sans font-medium transition-colors ${
          activeSlug === ""
            ? "bg-accent/10 text-accent"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        }`}
      >
        Overview
      </Link>

      <div className="my-2 h-px bg-border" />

      {DOCS_CATEGORIES.map((category) => {
        const Icon = ICON_MAP[category.icon]
        const isOpen = openCategories[category.id] ?? true
        const hasActiveChild = category.tools.some((t) => t.slug === activeSlug)

        return (
          <div key={category.id}>
            <button
              onClick={() => toggle(category.id)}
              className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-sans transition-colors ${
                hasActiveChild
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon size={15} className="shrink-0" />
              <span className="flex-1 text-left">{category.docsLabel}</span>
              <ChevronRight
                size={14}
                className={`shrink-0 text-muted-foreground/50 transition-transform duration-200 ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="ml-4 mt-0.5 flex flex-col gap-0.5 border-l border-border pl-3">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/docs/${tool.slug}`}
                    onClick={onNavigate}
                    className={`rounded-md px-2.5 py-1.5 text-sm font-sans transition-colors ${
                      activeSlug === tool.slug
                        ? "bg-accent/10 text-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {tool.navLabel}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}

export function DocsSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-border overflow-y-auto">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile toggle */}
      <div className="lg:hidden border-b border-border px-4 py-2">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
        >
          <Menu size={16} />
          Navigation
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-card border-r border-border overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-sm font-sans font-medium text-foreground">Docs</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <SidebarContent pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}
