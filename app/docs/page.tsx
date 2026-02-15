import type { Metadata } from "next"
import Link from "next/link"
import { Monitor, Columns3, Layout, AppWindow } from "lucide-react"
import { getDocsCategories } from "@/lib/tools-config"

export const metadata: Metadata = {
  title: "Installation Guides",
  description:
    "Learn how to apply your exported Linux themes. Guides for GNOME, Cinnamon, KDE Plasma, Hyprland, Niri, and Rofi.",
}

const ICON_MAP = {
  "monitor": Monitor,
  "columns-3": Columns3,
  "layout": Layout,
  "app-window": AppWindow,
} as const

const DOCS_CATEGORIES = getDocsCategories()

export default function DocsPage() {
  return (
    <>
      <div className="mb-10">
        <h2 className="font-serif text-3xl text-foreground mb-2">
          Installation Guides
        </h2>
        <p className="text-sm font-sans text-muted-foreground">
          Step-by-step instructions for applying your exported themes to your
          Linux desktop.
        </p>
      </div>

      <div className="space-y-8">
        {DOCS_CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.icon]
          return (
            <div key={cat.id}>
              <div className="flex items-center gap-2 mb-3">
                <Icon size={15} className="text-muted-foreground" />
                <h3 className="text-xs font-sans font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {cat.docsLabel}
                </h3>
              </div>
              <div className="grid gap-2">
                {cat.tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/docs/${tool.slug}`}
                    className="group flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-accent/30 hover:bg-accent/5"
                  >
                    <div>
                      <span className="text-sm font-sans font-medium text-foreground group-hover:text-accent transition-colors">
                        {tool.title}
                      </span>
                      <p className="text-xs font-sans text-muted-foreground mt-0.5">
                        {tool.docsDescription}
                      </p>
                    </div>
                    <span className="text-muted-foreground/40 group-hover:text-accent/60 transition-colors text-sm">
                      &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
