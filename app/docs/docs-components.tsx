import { Info } from "lucide-react"
import Link from "next/link"

const TABS = [
  { slug: "gnome", label: "GNOME" },
  { slug: "cinnamon", label: "Cinnamon" },
  { slug: "kde", label: "KDE Plasma" },
  { slug: "hyprland", label: "Hyprland" },
  { slug: "hyprinstall", label: "Hypr Installer" },
  { slug: "niri", label: "Niri" },
  { slug: "niriinstall", label: "Niri Installer" },
  { slug: "rofi", label: "Rofi" },
]

export function DocsHeader({ active }: { active: string }) {
  return (
    <>
      <h2 className="font-serif text-3xl text-foreground mb-2">
        Installation Guide
      </h2>
      <p className="text-sm font-sans text-muted-foreground mb-6">
        How to apply your exported theme to your Linux desktop.
      </p>

      <div className="flex gap-1 mb-10">
        {TABS.map((tab) => (
          <Link
            key={tab.slug}
            href={`/docs/${tab.slug}`}
            className="rounded-md px-3 py-1.5 text-xs font-sans font-medium transition-all"
            style={{
              backgroundColor:
                active === tab.slug ? "hsl(var(--accent) / 0.15)" : "transparent",
              color:
                active === tab.slug ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor:
                active === tab.slug ? "hsl(var(--accent) / 0.3)" : "hsl(var(--border))",
            }}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </>
  )
}

export function Step({
  number,
  icon: Icon,
  title,
  children,
}: {
  number: number
  icon: React.ElementType
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-8 flex gap-4">
      <div className="flex flex-col items-center">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Icon size={16} />
        </div>
        <div className="mt-2 w-px flex-1 bg-border" />
      </div>
      <div className="pb-2">
        <h3 className="font-sans text-sm font-medium text-foreground mb-1">
          <span className="text-accent mr-1.5">{number}.</span>
          {title}
        </h3>
        <div className="text-sm font-sans text-muted-foreground space-y-2">
          {children}
        </div>
      </div>
    </div>
  )
}

export function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">
      {children}
    </code>
  )
}

export function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="mt-2 mb-1 overflow-x-auto rounded-lg bg-muted px-4 py-3 text-xs font-mono text-foreground whitespace-pre-wrap">
      {children}
    </pre>
  )
}

export function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-10 flex gap-3 rounded-lg border border-border bg-card p-4">
      <Info size={18} className="text-accent shrink-0 mt-0.5" />
      <div className="text-sm font-sans text-muted-foreground space-y-2">
        {children}
      </div>
    </div>
  )
}
