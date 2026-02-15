"use client"

import { Monitor } from "lucide-react"
import Link from "next/link"

type DE = "gnome" | "cinnamon" | "hyprland" | "rofi" | "hyprconf"

const DE_OPTIONS: { value: DE; label: string; description: string }[] = [
  { value: "gnome", label: "GNOME", description: "Modern, minimal" },
  { value: "cinnamon", label: "Cinnamon", description: "Traditional desktop" },
  { value: "hyprland", label: "Hyprland", description: "Tiling compositor" },
  { value: "rofi", label: "Rofi", description: "App launcher" },
  { value: "hyprconf", label: "Hypr Config", description: "Full config" },
]

export function CustomizerShell({
  activeDe,
  preview,
  controls,
}: {
  activeDe: DE
  preview: React.ReactNode
  controls: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <header className="flex items-center justify-between border-b border-border px-6 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-lg bg-accent/10 p-1.5">
            <Monitor size={18} className="text-accent" />
          </div>
          <div>
            <h1 className="font-serif text-xl leading-tight text-foreground">
              Linux Themer
            </h1>
            <p className="text-[10px] font-sans uppercase tracking-[0.19em] text-muted-foreground">
              Desktop Customization Studio
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-6 md:flex">
            <NavLink label="Customize" href={`/${activeDe}`} active />
            <NavLink label="Docs" href="/docs" />
          </div>
        </div>
      </header>

      <div className="flex items-center gap-1 border-b border-border px-6 py-2">
        {DE_OPTIONS.map((opt) => (
          <Link
            key={opt.value}
            href={`/${opt.value}`}
            className="rounded-md px-3 py-1.5 text-xs font-sans transition-all"
            style={{
              backgroundColor:
                activeDe === opt.value ? "hsl(var(--accent) / 0.15)" : "transparent",
              color:
                activeDe === opt.value ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor:
                activeDe === opt.value ? "hsl(var(--accent) / 0.3)" : "transparent",
            }}
          >
            <span className="font-medium">{opt.label}</span>
            <span className="hidden sm:inline ml-1.5 opacity-60">{opt.description}</span>
          </Link>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex flex-1 flex-col overflow-hidden">
          {activeDe === "hyprconf" ? (
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

function NavLink({ label, href, active = false }: { label: string; href: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`text-xs font-sans uppercase tracking-[0.19em] transition-colors ${
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
      {active && (
        <span className="block mx-auto mt-0.5 h-px w-full bg-accent" />
      )}
    </Link>
  )
}
