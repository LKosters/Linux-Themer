import type { Metadata } from "next"
import Link from "next/link"
import { Monitor, Columns3, Layout, AppWindow } from "lucide-react"

export const metadata: Metadata = {
  title: "Installation Guides",
  description:
    "Learn how to apply your exported Linux themes. Guides for GNOME, Cinnamon, KDE Plasma, Hyprland, Niri, and Rofi.",
}

const GUIDE_GROUPS = [
  {
    label: "Desktop Environments",
    icon: Monitor,
    guides: [
      {
        slug: "gnome",
        title: "GNOME",
        description: "Apply a custom GTK CSS theme to GNOME Shell.",
      },
      {
        slug: "cinnamon",
        title: "Cinnamon",
        description: "Install a GTK CSS theme on Linux Mint / Cinnamon.",
      },
      {
        slug: "kde",
        title: "KDE Plasma",
        description: "Apply a Plasma color scheme and window decorations.",
      },
    ],
  },
  {
    label: "Hyprland",
    icon: Columns3,
    guides: [
      {
        slug: "hyprland",
        title: "Hyprland Theme",
        description: "Copy your hyprland.conf and Waybar CSS into place.",
      },
      {
        slug: "hyprinstall",
        title: "Hyprland Installer",
        description: "Run the generated install script to set up Hyprland in one command.",
      },
    ],
  },
  {
    label: "Niri",
    icon: Layout,
    guides: [
      {
        slug: "niri",
        title: "Niri Theme",
        description: "Apply your config.kdl and Waybar CSS to Niri.",
      },
      {
        slug: "niriinstall",
        title: "Niri Installer",
        description: "Run the generated install script to set up Niri in one command.",
      },
    ],
  },
  {
    label: "Launchers",
    icon: AppWindow,
    guides: [
      {
        slug: "rofi",
        title: "Rofi",
        description: "Install a custom .rasi theme for the Rofi application launcher.",
      },
    ],
  },
]

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
        {GUIDE_GROUPS.map((group) => {
          const Icon = group.icon
          return (
            <div key={group.label}>
              <div className="flex items-center gap-2 mb-3">
                <Icon size={15} className="text-muted-foreground" />
                <h3 className="text-xs font-sans font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {group.label}
                </h3>
              </div>
              <div className="grid gap-2">
                {group.guides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/docs/${guide.slug}`}
                    className="group flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-accent/30 hover:bg-accent/5"
                  >
                    <div>
                      <span className="text-sm font-sans font-medium text-foreground group-hover:text-accent transition-colors">
                        {guide.title}
                      </span>
                      <p className="text-xs font-sans text-muted-foreground mt-0.5">
                        {guide.description}
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
