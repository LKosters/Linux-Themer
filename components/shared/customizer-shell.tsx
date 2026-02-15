"use client"

import { Fragment } from "react"
import Link from "next/link"
import { SiteHeader } from "./site-header"
import { TOOL_CATEGORIES, FRAMELESS_SLUGS, getCategoryForSlug } from "@/lib/tools-config"

export function CustomizerShell({
  activeDe,
  preview,
  controls,
}: {
  activeDe: string
  preview: React.ReactNode
  controls: React.ReactNode
}) {
  const activeCategory = getCategoryForSlug(activeDe) ?? TOOL_CATEGORIES[0]
  const isFrameless = FRAMELESS_SLUGS.has(activeDe)

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <SiteHeader activeSection="tools" />

      {/* Desktop nav — grouped tabs with dividers */}
      <div className="hidden lg:flex items-center border-b border-border px-6">
        {TOOL_CATEGORIES.map((category, catIndex) => (
          <Fragment key={category.id}>
            {catIndex > 0 && (
              <div className="mx-3 h-4 w-px bg-border" />
            )}
            <div className="flex items-center">
              <span className="mr-2 text-[9px] font-sans uppercase tracking-[0.15em] text-muted-foreground/50">
                {category.label}
              </span>
              {category.tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  className={`relative px-3 py-2.5 text-xs font-sans transition-colors ${
                    activeDe === tool.slug
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tool.navLabel}
                  {activeDe === tool.slug && (
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
          {TOOL_CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory.id
            return (
              <Link
                key={cat.id}
                href={`/${cat.tools[0].slug}`}
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
        {activeCategory.tools.length > 1 && (
          <div className="flex items-center gap-0 px-4 py-1.5">
            {activeCategory.tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className={`relative px-2.5 py-1 text-xs font-sans transition-colors ${
                  activeDe === tool.slug
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {tool.navLabel}
                {activeDe === tool.slug && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-px bg-accent" />
                )}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex flex-1 flex-col overflow-hidden">
          {isFrameless ? (
            <div className="flex-1 overflow-hidden">
              {preview}
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center overflow-auto p-4 lg:p-6">
              <div className="w-full max-w-5xl">
                <div className="overflow-hidden rounded-lg shadow-2xl shadow-black/50">
                  {preview}
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
