import { Monitor } from "lucide-react"
import Link from "next/link"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
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
            <Link
              href="/gnome"
              className="text-xs font-sans uppercase tracking-[0.19em] text-muted-foreground hover:text-foreground transition-colors"
            >
              Customize
            </Link>
            <span className="text-xs font-sans uppercase tracking-[0.19em] text-foreground">
              Docs
              <span className="block mx-auto mt-0.5 h-px w-full bg-accent" />
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-6 py-12">
          {children}
        </div>
      </main>
    </div>
  )
}
