// Single source of truth for all tools/DEs across the site.
// Used by: homepage, customizer nav, docs sidebar, docs home page.

export interface Tool {
  /** Route slug, e.g. "gnome", "hyprland", "hyprconf" */
  slug: string
  /** Short label for nav tabs, e.g. "Theme", "Config", "GNOME" */
  navLabel: string
  /** Full display title for homepage/docs cards */
  title: string
  /** One-line description for homepage */
  homeDescription: string
  /** One-line description for docs overview */
  docsDescription: string
  /** Colored dot on homepage (hex), optional — only for sub-tools */
  dotColor?: string
  /** CTA text on homepage hover */
  cta: string
  /** Whether this tool uses a frameless (no monitor bezel) preview */
  frameless?: boolean
}

export interface ToolCategory {
  /** Unique category id */
  id: string
  /** Display label for nav */
  label: string
  /** Longer label for docs sidebar */
  docsLabel: string
  /** lucide icon name — mapped to components where needed */
  icon: "monitor" | "columns-3" | "layout" | "app-window"
  /** Tools in this category */
  tools: Tool[]
  /** Homepage layout: "full" renders each tool as a large card, "compact" uses dot+subtitle */
  homeLayout: "full" | "compact"
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: "desktop",
    label: "Desktop",
    docsLabel: "Desktop Environments",
    icon: "monitor",
    homeLayout: "full",
    tools: [
      {
        slug: "gnome",
        navLabel: "GNOME",
        title: "GNOME",
        homeDescription: "Customize the modern GNOME desktop \u2014 shell panel, dock, window decorations, and GTK widgets. Export as a GTK CSS stylesheet.",
        docsDescription: "Apply a custom GTK CSS theme to GNOME Shell.",
        cta: "Customize GNOME",
      },
      {
        slug: "cinnamon",
        navLabel: "Cinnamon",
        title: "Cinnamon",
        homeDescription: "Traditional panel-based desktop with a familiar taskbar layout. Style the panel, menu, and window borders. Export as Cinnamon CSS.",
        docsDescription: "Install a GTK CSS theme on Linux Mint / Cinnamon.",
        cta: "Customize Cinnamon",
      },
      {
        slug: "kde",
        navLabel: "KDE Plasma",
        title: "KDE Plasma",
        homeDescription: "The feature-rich KDE Plasma desktop. Customize the panel, Breeze window decorations, accent colors, and widgets. Export as a Plasma color scheme.",
        docsDescription: "Apply a Plasma color scheme and window decorations.",
        cta: "Customize KDE Plasma",
      },
    ],
  },
  {
    id: "hyprland",
    label: "Hyprland",
    docsLabel: "Hyprland",
    icon: "columns-3",
    homeLayout: "compact",
    tools: [
      {
        slug: "hyprland",
        navLabel: "Theme",
        title: "Theme Designer",
        homeDescription: "Visual customizer for borders, blur, gaps, shadows, animations, and full Waybar styling with a live tiling desktop preview.",
        docsDescription: "Copy your hyprland.conf and Waybar CSS into place.",
        dotColor: "#89b4fa",
        cta: "Open theme designer",
      },
      {
        slug: "hyprconf",
        navLabel: "Config",
        title: "Config Creator",
        homeDescription: "Build a complete hyprland.conf with keybinds, window rules, monitor setup, input devices, and autostart programs.",
        docsDescription: "",
        dotColor: "#a6e3a1",
        cta: "Open config creator",
        frameless: true,
      },
      {
        slug: "hyprinstall",
        navLabel: "Installer",
        title: "Installer",
        homeDescription: "Generate a one-command install script that sets up Hyprland, Waybar, all configs, packages, and post-install setup for Arch, Fedora, or Ubuntu.",
        docsDescription: "Run the generated install script to set up Hyprland in one command.",
        dotColor: "#f5c2e7",
        cta: "Open installer",
        frameless: true,
      },
    ],
  },
  {
    id: "niri",
    label: "Niri",
    docsLabel: "Niri",
    icon: "layout",
    homeLayout: "compact",
    tools: [
      {
        slug: "niri",
        navLabel: "Theme",
        title: "Theme Designer",
        homeDescription: "Visual customizer for Niri\u2019s scrollable column layout \u2014 focus ring, gaps, blur, animations, and Waybar styling with a live column preview.",
        docsDescription: "Apply your config.kdl and Waybar CSS to Niri.",
        dotColor: "#74c7ec",
        cta: "Open theme designer",
      },
      {
        slug: "niriconf",
        navLabel: "Config",
        title: "Config Creator",
        homeDescription: "Build a complete config.kdl with keybinds, window rules, column widths, input devices, and spawn-at-startup programs.",
        docsDescription: "",
        dotColor: "#94e2d5",
        cta: "Open config creator",
        frameless: true,
      },
      {
        slug: "niriinstall",
        navLabel: "Installer",
        title: "Installer",
        homeDescription: "Generate a one-command install script that sets up Niri, Waybar, all configs, packages, and post-install setup for Arch, Fedora, or Ubuntu.",
        docsDescription: "Run the generated install script to set up Niri in one command.",
        dotColor: "#f2cdcd",
        cta: "Open installer",
        frameless: true,
      },
    ],
  },
  {
    id: "launcher",
    label: "Launchers",
    docsLabel: "Launchers",
    icon: "app-window",
    homeLayout: "full",
    tools: [
      {
        slug: "rofi",
        navLabel: "Rofi",
        title: "Rofi",
        homeDescription: "Application launcher and dmenu replacement. Design grid and list modes, customize the input bar, and style every element. Export as a .rasi theme file.",
        docsDescription: "Install a custom .rasi theme for the Rofi application launcher.",
        cta: "Customize Rofi",
      },
    ],
  },
]

/** All tool slugs */
export const ALL_SLUGS = TOOL_CATEGORIES.flatMap((c) => c.tools.map((t) => t.slug))

/** All frameless tool slugs (no monitor bezel in preview) */
export const FRAMELESS_SLUGS = new Set(
  TOOL_CATEGORIES.flatMap((c) => c.tools.filter((t) => t.frameless).map((t) => t.slug))
)

/** Find which category a slug belongs to */
export function getCategoryForSlug(slug: string): ToolCategory | undefined {
  return TOOL_CATEGORIES.find((c) => c.tools.some((t) => t.slug === slug))
}

/** Get only tools that have docs (non-empty docsDescription) */
export function getDocsCategories() {
  return TOOL_CATEGORIES.map((c) => ({
    ...c,
    tools: c.tools.filter((t) => t.docsDescription),
  })).filter((c) => c.tools.length > 0)
}
