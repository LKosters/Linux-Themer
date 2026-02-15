import { Monitor } from "lucide-react"
import Link from "next/link"

export function SiteHeader({
  activeSection,
}: {
  activeSection?: "tools" | "docs"
}) {
  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-2">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex items-center justify-center rounded-lg bg-accent/10 p-1.5">
          <Monitor size={18} className="text-accent" />
        </div>
        <span className="font-serif text-xl leading-tight text-foreground">
          Linux Themer
        </span>
      </Link>
      <nav className="hidden items-center gap-6 md:flex">
        <Link
          href="/gnome"
          className={`relative text-xs font-sans uppercase tracking-[0.19em] transition-colors ${
            activeSection === "tools" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Tools
          {activeSection === "tools" && (
            <span className="absolute -bottom-2.5 left-0 right-0 h-px bg-accent" />
          )}
        </Link>
        <Link
          href="/docs"
          className={`relative text-xs font-sans uppercase tracking-[0.19em] transition-colors ${
            activeSection === "docs" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Docs
          {activeSection === "docs" && (
            <span className="absolute -bottom-2.5 left-0 right-0 h-px bg-accent" />
          )}
        </Link>
      </nav>
    </header>
  )
}
