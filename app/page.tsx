import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/shared/site-header"
import { TOOL_CATEGORIES } from "@/lib/tools-config"

const TERMINAL_LINES = [
  { type: "comment", text: "# ~/.config/hypr/hyprland.conf" },
  { type: "blank", text: "" },
  { type: "section", text: "general {" },
  { type: "kv", key: "    gaps_in", value: "5" },
  { type: "kv", key: "    gaps_out", value: "10" },
  { type: "kv", key: "    border_size", value: "2" },
  { type: "kv", key: "    col.active_border", value: "rgba(89b4faee) rgba(cba6f7ee) 45deg" },
  { type: "kv", key: "    col.inactive_border", value: "rgba(45475aaa)" },
  { type: "close", text: "}" },
  { type: "blank", text: "" },
  { type: "section", text: "decoration {" },
  { type: "kv", key: "    rounding", value: "10" },
  { type: "kv", key: "    blur {" , value: ""},
  { type: "kv", key: "        enabled", value: "true" },
  { type: "kv", key: "        size", value: "6" },
  { type: "kv", key: "        passes", value: "3" },
  { type: "close", text: "    }" },
  { type: "close", text: "}" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Hero — asymmetric */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.92] tracking-[-0.02em] text-foreground">
                Linux
                <br />
                Themer
              </h2>
              <div className="mt-5 h-px w-20 bg-border" />
              <p className="mt-5 max-w-md text-sm md:text-base font-sans text-muted-foreground leading-relaxed">
                Design themes for GNOME, KDE Plasma, Hyprland, Niri, Cinnamon, and Rofi with a live desktop preview.
                Generate complete config files. Share your setup with a URL.
              </p>
              <div className="mt-8 flex items-center gap-3">
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
                  href="#tools"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-sans font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/20"
                >
                  Browse Tools
                </Link>
              </div>
            </div>

            {/* Terminal mockup */}
            <div className="hidden md:block">
              <div className="rounded-lg border border-border bg-card overflow-hidden shadow-2xl shadow-black/40">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 text-[10px] font-sans text-muted-foreground">hyprland.conf</span>
                </div>
                <div className="px-4 py-3 font-mono text-[11px] leading-[1.7]">
                  {TERMINAL_LINES.map((line, i) => (
                    <div key={i} className="flex">
                      <span className="w-6 shrink-0 text-right text-muted-foreground/40 select-none mr-3">
                        {line.type !== "blank" ? i + 1 : ""}
                      </span>
                      {line.type === "comment" && (
                        <span className="text-muted-foreground">{line.text}</span>
                      )}
                      {line.type === "section" && (
                        <span className="text-accent">{line.text}</span>
                      )}
                      {line.type === "kv" && (
                        <span>
                          <span className="text-foreground/70">{line.key}</span>
                          {line.value && (
                            <>
                              <span className="text-muted-foreground"> = </span>
                              <span style={{ color: "hsl(var(--accent-warm))" }}>{line.value}</span>
                            </>
                          )}
                        </span>
                      )}
                      {line.type === "close" && (
                        <span className="text-accent">{line.text}</span>
                      )}
                      {line.type === "blank" && <span>&nbsp;</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools — driven by config */}
        <section id="tools" className="mx-auto max-w-6xl px-6 pb-16">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1px_1fr]">
            {/* Left column: first "full" layout category */}
            <div className="pr-0 lg:pr-10">
              {TOOL_CATEGORIES.filter((c) => c.homeLayout === "full").slice(0, 1).map((cat) => (
                <div key={cat.id}>
                  <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground">
                    {cat.docsLabel}
                  </p>
                  <div className="mt-1 h-px w-full bg-border" />
                  <div className="mt-8 space-y-8">
                    {cat.tools.map((tool) => (
                      <div key={tool.slug}>
                        <Link href={`/${tool.slug}`} className="group">
                          <h3 className="font-serif text-2xl text-foreground">{tool.title}</h3>
                          <p className="mt-1.5 text-sm font-sans text-muted-foreground leading-relaxed max-w-sm">
                            {tool.homeDescription}
                          </p>
                          <span className="mt-2 inline-flex items-center gap-1 text-xs font-sans text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                            {tool.cta} <ArrowRight size={11} />
                          </span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Vertical divider */}
            <div className="hidden lg:block bg-border" />

            {/* Right column: first "compact" layout category */}
            <div className="pl-0 lg:pl-10 mt-10 lg:mt-0">
              {TOOL_CATEGORIES.filter((c) => c.homeLayout === "compact").slice(0, 1).map((cat) => (
                <div key={cat.id}>
                  <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground">
                    {cat.label}
                  </p>
                  <div className="mt-1 h-px w-full bg-border" />
                  <div className="mt-8 space-y-6">
                    {cat.tools.map((tool) => (
                      <div key={tool.slug}>
                        <Link href={`/${tool.slug}`} className="group flex items-start gap-3">
                          {tool.dotColor && (
                            <span
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ backgroundColor: tool.dotColor }}
                            />
                          )}
                          <div>
                            <h3 className="font-serif text-xl text-foreground">{tool.title}</h3>
                            <p className="mt-1 text-sm font-sans text-muted-foreground leading-relaxed">
                              {tool.homeDescription}
                            </p>
                            <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-sans text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                              {tool.cta} <ArrowRight size={11} />
                            </span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Remaining compact categories (Niri, etc.) */}
          {TOOL_CATEGORIES.filter((c) => c.homeLayout === "compact").slice(1).map((cat) => (
            <div key={cat.id} className="mt-12">
              <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground">
                {cat.label}
              </p>
              <div className="mt-1 h-px w-full bg-border" />
              <div className="mt-8 space-y-6">
                {cat.tools.map((tool) => (
                  <div key={tool.slug}>
                    <Link href={`/${tool.slug}`} className="group flex items-start gap-3">
                      {tool.dotColor && (
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: tool.dotColor }}
                        />
                      )}
                      <div>
                        <h3 className="font-serif text-xl text-foreground">{tool.title}</h3>
                        <p className="mt-1 text-sm font-sans text-muted-foreground leading-relaxed">
                          {tool.homeDescription}
                        </p>
                        <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-sans text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                          {tool.cta} <ArrowRight size={11} />
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Remaining full categories (Rofi, etc.) */}
          {TOOL_CATEGORIES.filter((c) => c.homeLayout === "full").slice(1).map((cat) => (
            <div key={cat.id} className="mt-12">
              <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground">
                {cat.docsLabel}
              </p>
              <div className="mt-1 h-px w-full bg-border" />
              <div className="mt-6">
                {cat.tools.map((tool) => (
                  <div key={tool.slug}>
                    <Link href={`/${tool.slug}`} className="group">
                      <h3 className="font-serif text-2xl text-foreground">{tool.title}</h3>
                      <p className="mt-1.5 text-sm font-sans text-muted-foreground leading-relaxed max-w-lg">
                        {tool.homeDescription}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-sans text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                        {tool.cta} <ArrowRight size={11} />
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* SEO Content */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <h2 className="font-serif text-3xl text-foreground">What is Linux Themer?</h2>
          <div className="mt-1 h-px w-20 bg-border" />
          <div className="mt-6 columns-1 md:columns-2 gap-10 text-sm font-sans text-muted-foreground leading-[1.75]">
            <p>
              Linux Themer is a browser-based visual configuration tool for Linux desktop environments.
              Instead of manually editing GTK CSS files, KDE Plasma color schemes, Hyprland config, Niri config.kdl, or Rofi .rasi stylesheets,
              you adjust sliders and color pickers while watching a live preview that simulates
              your actual desktop layout — panels, windows, docks, and Waybar included.
            </p>
            <p className="mt-4 md:mt-0">
              Every customizer exports production-ready config files. The GNOME and Cinnamon themers
              generate GTK CSS that you drop into <span className="text-foreground/70">~/.config/gtk-4.0/</span>.
              The KDE Plasma themer exports a <span className="text-foreground/70">.colors</span> scheme file for Plasma System Settings.
              The Hyprland tools produce a complete <span className="text-foreground/70">hyprland.conf</span>,
              and the Niri tools generate <span className="text-foreground/70">config.kdl</span> for Niri&apos;s scrollable-tiling compositor.
              Both include Waybar <span className="text-foreground/70">config.jsonc</span> and <span className="text-foreground/70">style.css</span>,
              and their installers generate a single shell script that sets up everything from packages to dotfiles.
              Rofi exports <span className="text-foreground/70">.rasi</span> theme files.
            </p>
            <p className="mt-4">
              All customization state is encoded in the URL — every tweak you make is instantly shareable.
              Copy the link to share your exact setup, or bookmark it to come back later.
              Built-in presets include popular color schemes like Catppuccin Mocha, Nord, Gruvbox,
              Dracula, Tokyo Night, and Ros&eacute; Pine so you can start from a solid foundation
              and make it yours.
            </p>
            <p className="mt-4">
              Whether you are setting up Hyprland or Niri for the first time with the full installer,
              fine-tuning your Waybar spacing, or building a GNOME theme from scratch,
              Linux Themer gives you a visual workflow with real-time feedback and
              config files that work out of the box on Arch, Fedora, Ubuntu, and other distributions.
            </p>
          </div>
        </section>

        {/* Features — numbered strip */}
        <section className="mx-auto max-w-6xl px-6 pb-16 border-t border-border pt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                num: "01",
                title: "Live Preview",
                desc: "See every change in a realistic desktop mockup. Panels, windows, blur, and animations update instantly.",
              },
              {
                num: "02",
                title: "Preset Themes",
                desc: "Start from Catppuccin, Nord, Gruvbox, Dracula, Tokyo Night, and more. Tweak from there.",
              },
              {
                num: "03",
                title: "Shareable URLs",
                desc: "Your entire config is saved in the URL. Share your setup or bookmark it — no accounts needed.",
              },
              {
                num: "04",
                title: "Export Ready",
                desc: "Download hyprland.conf, GTK CSS, Waybar config, Rofi .rasi, or a full install script.",
              },
            ].map((f) => (
              <div key={f.num}>
                <span
                  className="font-serif text-2xl"
                  style={{ color: "hsl(var(--accent-warm))" }}
                >
                  {f.num}
                </span>
                <h3 className="mt-1 text-sm font-sans font-medium text-foreground">
                  {f.title}
                </h3>
                <p className="mt-1 text-xs font-sans text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-6">
        <span className="font-serif text-sm text-muted-foreground">Linux Themer</span>
      </footer>
    </div>
  )
}
