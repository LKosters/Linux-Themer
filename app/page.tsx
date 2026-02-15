import Link from "next/link"
import { Monitor, ArrowRight, Eye, FileDown, Link2, Palette } from "lucide-react"

const DE_CARDS = [
  {
    slug: "gnome",
    name: "GNOME",
    description: "The modern, clean desktop. Customize panel, dock, windows, and export as GTK CSS.",
    accent: "#3584e4",
    gradient: "from-blue-500/20 to-indigo-500/20",
  },
  {
    slug: "cinnamon",
    name: "Cinnamon",
    description: "Traditional desktop with panel, menu, and window decorations. Export as Cinnamon CSS.",
    accent: "#8ab4f8",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    slug: "hyprland",
    name: "Hyprland",
    description: "Tiling compositor with blur, animations, gradient borders, and Waybar. Export as hyprland.conf.",
    accent: "#89b4fa",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    slug: "rofi",
    name: "Rofi",
    description: "Application launcher with grid and list modes, custom input bar. Export as .rasi theme.",
    accent: "#f9e2af",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    slug: "hyprconf",
    name: "Hypr Config",
    description: "Full Hyprland config creator with keybinds, window rules, monitors, input, and autostart.",
    accent: "#a6e3a1",
    gradient: "from-green-500/20 to-teal-500/20",
  },
  {
    slug: "hyprinstall",
    name: "Hypr Installer",
    description: "Generate a one-click install script for Hyprland with packages, config, Waybar, and keybinds.",
    accent: "#f5c2e7",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
]

const FEATURES = [
  {
    icon: Eye,
    title: "Live Preview",
    description: "See every change instantly in a realistic desktop preview.",
  },
  {
    icon: Palette,
    title: "Preset Themes",
    description: "Start from curated presets like Catppuccin, Nord, Gruvbox, and more.",
  },
  {
    icon: Link2,
    title: "Shareable Links",
    description: "Every customization is saved in the URL. Share your setup with a link.",
  },
  {
    icon: FileDown,
    title: "Export Ready",
    description: "Download config files ready to drop into your Linux setup.",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between border-b border-border px-6 py-3">
        <div className="flex items-center gap-3">
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
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/gnome"
            className="text-xs font-sans uppercase tracking-[0.19em] text-muted-foreground hover:text-foreground transition-colors hidden md:block"
          >
            Customize
          </Link>
          <Link
            href="/docs"
            className="text-xs font-sans uppercase tracking-[0.19em] text-muted-foreground hover:text-foreground transition-colors hidden md:block"
          >
            Docs
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="px-6 py-20 md:py-32 text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
            Customize your Linux desktop, visually.
          </h2>
          <p className="mt-4 text-sm md:text-base font-sans text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Design themes for GNOME, Cinnamon, Hyprland, and Rofi with a live preview.
            Build complete Hyprland configs with keybinds and window rules.
            Export production-ready config files and share your setup with a link.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/gnome"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-sans font-medium transition-colors"
              style={{
                backgroundColor: "hsl(var(--accent))",
                color: "hsl(var(--accent-foreground))",
              }}
            >
              Get Started
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-sans font-medium text-foreground transition-colors hover:bg-muted/50"
            >
              Read Docs
            </Link>
          </div>
        </section>

        {/* DE Cards */}
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DE_CARDS.map((de) => (
              <Link
                key={de.slug}
                href={`/${de.slug}`}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-black/20"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${de.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
                />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: de.accent }}
                    />
                    <h3 className="font-serif text-lg text-foreground">{de.name}</h3>
                  </div>
                  <p className="text-xs font-sans text-muted-foreground leading-relaxed">
                    {de.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-sans text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    Customize
                    <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <feature.icon size={18} className="text-accent" />
                </div>
                <h3 className="text-sm font-sans font-medium text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-[11px] font-sans text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-6 text-center">
        <p className="text-[10px] font-sans uppercase tracking-[0.19em] text-muted-foreground">
          Linux Themer
        </p>
      </footer>
    </div>
  )
}
