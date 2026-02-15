// Content block types for doc pages — add new guides by adding to the GUIDES array.
// Text supports **bold** and `code` inline formatting.

export type ContentBlock =
  | { type: "text"; text: string }
  | { type: "code"; code: string }
  | { type: "list"; items: string[] }

export interface GuideStep {
  icon: "file-down" | "folder-open" | "terminal" | "refresh-cw" | "shield" | "settings"
  title: string
  content: ContentBlock[]
}

export interface GuideInfoBox {
  content: ContentBlock[]
}

export interface Guide {
  slug: string
  title: string
  description: string
  meta: { title: string; description: string }
  steps: GuideStep[]
  infoBoxes: GuideInfoBox[]
}

export const GUIDES: Guide[] = [
  // ── GNOME ──────────────────────────────────────────────────────────
  {
    slug: "gnome",
    title: "GNOME",
    description: "How to apply your custom GTK CSS and GNOME Shell theme.",
    meta: {
      title: "GNOME Installation Guide",
      description: "How to install your custom GNOME GTK CSS and Shell theme on Linux.",
    },
    steps: [
      {
        icon: "settings",
        title: "Install required extensions",
        content: [
          { type: "text", text: "To apply panel, dock, and shell styling, you need these GNOME Shell extensions:" },
          {
            type: "list",
            items: [
              "**User Themes** — Allows loading custom GNOME Shell themes from `~/.themes/`. Install from [extensions.gnome.org](https://extensions.gnome.org/extension/19/user-themes/) or your package manager (`gnome-shell-extension-user-theme`).",
              "**Dash to Dock** — Required for dock customization (position, icon size, always visible). Install from [extensions.gnome.org](https://extensions.gnome.org/extension/307/dash-to-dock/).",
            ],
          },
          { type: "text", text: "If you only want to change app colors (GTK CSS), these extensions are not required. They are only needed for the **Export Install Script** option." },
        ],
      },
      {
        icon: "file-down",
        title: "Export your theme",
        content: [
          { type: "text", text: "You have two export options:" },
          {
            type: "list",
            items: [
              "**Export Install Script** — A bash script that applies GTK CSS, GNOME Shell theme (panel/dock styling), and dock settings all at once. Requires the extensions above.",
              "**Export GTK CSS Only** — Just the `gtk.css` file for app window colors. No extensions needed.",
            ],
          },
        ],
      },
      {
        icon: "folder-open",
        title: "Create the config directory",
        content: [
          { type: "text", text: "GTK 4 reads user overrides from a specific config folder:" },
          { type: "code", code: "mkdir -p ~/.config/gtk-4.0" },
          { type: "text", text: "For GTK 3 applications:" },
          { type: "code", code: "mkdir -p ~/.config/gtk-3.0" },
        ],
      },
      {
        icon: "terminal",
        title: "Copy the theme file",
        content: [
          { type: "code", code: "cp ~/Downloads/gtk.css ~/.config/gtk-4.0/gtk.css" },
          { type: "text", text: "For GTK 3 apps as well:" },
          { type: "code", code: "cp ~/Downloads/gtk.css ~/.config/gtk-3.0/gtk.css" },
        ],
      },
      {
        icon: "refresh-cw",
        title: "Apply the changes",
        content: [
          { type: "text", text: "If you used the **Install Script**, it handles everything automatically. Otherwise:" },
          {
            type: "list",
            items: [
              "**Wayland** — Log out and log back in",
              "**X11** — Press `Alt+F2`, type `r`, Enter",
            ],
          },
          { type: "text", text: "If you installed a shell theme, enable it via GNOME Tweaks or:" },
          { type: "code", code: 'gsettings set org.gnome.shell.extensions.user-theme name "LinuxThemer"' },
        ],
      },
    ],
    infoBoxes: [
      {
        content: [
          { type: "text", text: "**Reverting:** Delete the custom files to restore defaults:" },
          { type: "code", code: "rm ~/.config/gtk-4.0/gtk.css ~/.config/gtk-3.0/gtk.css\nrm -rf ~/.themes/LinuxThemer" },
          { type: "text", text: "Reset the shell theme:" },
          { type: "code", code: "gsettings reset org.gnome.shell.extensions.user-theme name" },
        ],
      },
    ],
  },

  // ── Cinnamon ───────────────────────────────────────────────────────
  {
    slug: "cinnamon",
    title: "Cinnamon",
    description: "How to install your custom Cinnamon CSS theme on Linux Mint.",
    meta: {
      title: "Cinnamon Installation Guide",
      description: "How to install your custom Cinnamon CSS theme on Linux Mint.",
    },
    steps: [
      {
        icon: "file-down",
        title: "Export your theme",
        content: [
          { type: "text", text: "Click **Export Cinnamon CSS** in the customizer sidebar to download your `cinnamon.css` file." },
        ],
      },
      {
        icon: "folder-open",
        title: "Create a theme directory",
        content: [
          { type: "text", text: "Cinnamon themes live under `~/.themes/`. Create a new theme folder:" },
          { type: "code", code: "mkdir -p ~/.themes/MyCustomTheme/cinnamon" },
        ],
      },
      {
        icon: "terminal",
        title: "Copy the theme file",
        content: [
          { type: "code", code: "cp ~/Downloads/cinnamon.css ~/.themes/MyCustomTheme/cinnamon/cinnamon.css" },
        ],
      },
      {
        icon: "refresh-cw",
        title: "Apply the theme",
        content: [
          { type: "text", text: "Open **System Settings > Themes** and select your custom theme under the **Desktop** category. Alternatively, use the command line:" },
          { type: "code", code: 'gsettings set org.cinnamon.theme name "MyCustomTheme"' },
        ],
      },
    ],
    infoBoxes: [
      {
        content: [
          { type: "text", text: "**Reverting:** Switch back to your previous theme in System Settings, or:" },
          { type: "code", code: 'gsettings set org.cinnamon.theme name "Mint-Y-Dark"' },
        ],
      },
    ],
  },

  // ── KDE Plasma ─────────────────────────────────────────────────────
  {
    slug: "kde",
    title: "KDE Plasma",
    description: "How to install your custom KDE Plasma color scheme.",
    meta: {
      title: "KDE Plasma Installation Guide",
      description: "How to install your custom KDE Plasma color scheme on Linux.",
    },
    steps: [
      {
        icon: "file-down",
        title: "Export your color scheme",
        content: [
          { type: "text", text: "Click **Export Plasma Colors** in the customizer sidebar to download your `.colors` file." },
        ],
      },
      {
        icon: "folder-open",
        title: "Copy to color schemes directory",
        content: [
          { type: "text", text: "Plasma reads custom color schemes from `~/.local/share/color-schemes/`:" },
          { type: "code", code: "mkdir -p ~/.local/share/color-schemes\ncp ~/Downloads/KDEPlasmaTheme.colors ~/.local/share/color-schemes/" },
        ],
      },
      {
        icon: "settings",
        title: "Apply via System Settings",
        content: [
          { type: "text", text: "Open **System Settings** and navigate to:" },
          {
            type: "list",
            items: [
              "**Appearance & Style** → **Colors & Themes** → **Colors**",
              "Select **Linux Themer Custom** from the list",
              "Click **Apply**",
            ],
          },
          { type: "text", text: "Alternatively, apply from the terminal:" },
          { type: "code", code: "plasma-apply-colorscheme LinuxThemerCustom" },
        ],
      },
      {
        icon: "refresh-cw",
        title: "Restart running applications",
        content: [
          { type: "text", text: "Most KDE apps pick up color changes immediately. For apps that don't, close and reopen them. GTK apps running under Plasma may need a logout/login to reflect the new accent color." },
        ],
      },
    ],
    infoBoxes: [
      {
        content: [
          { type: "text", text: "**Accent color:** On Plasma 6, you can also set the accent color directly in **System Settings → Appearance & Style → Colors & Themes** without importing a full color scheme. The exported `.colors` file includes the full palette for deeper customization." },
        ],
      },
      {
        content: [
          { type: "text", text: "**Reverting:** Switch back to the default Breeze color scheme:" },
          { type: "code", code: "plasma-apply-colorscheme BreezeLight" },
          { type: "text", text: "Or delete the custom file:" },
          { type: "code", code: "rm ~/.local/share/color-schemes/KDEPlasmaTheme.colors" },
        ],
      },
    ],
  },

  // ── Hyprland Theme ─────────────────────────────────────────────────
  {
    slug: "hyprland",
    title: "Hyprland Theme",
    description: "How to apply your custom Hyprland config and Waybar CSS.",
    meta: {
      title: "Hyprland Installation Guide",
      description: "How to install your custom Hyprland config and Waybar CSS theme.",
    },
    steps: [
      {
        icon: "file-down",
        title: "Export your config and Waybar CSS",
        content: [
          { type: "text", text: "Click **Export Config** to download `hyprland.conf` and **Export Waybar CSS** to download `waybar-style.css`." },
        ],
      },
      {
        icon: "folder-open",
        title: "Ensure config directories exist",
        content: [
          { type: "code", code: "mkdir -p ~/.config/hypr\nmkdir -p ~/.config/waybar" },
        ],
      },
      {
        icon: "terminal",
        title: "Apply the Hyprland config",
        content: [
          { type: "text", text: "Append the exported config to your Hyprland config, or merge the values manually into your existing `hyprland.conf`:" },
          { type: "code", code: "cat ~/Downloads/hyprland.conf >> ~/.config/hypr/hyprland.conf" },
          { type: "text", text: "For the Waybar theme, copy or replace the style file:" },
          { type: "code", code: "cp ~/Downloads/waybar-style.css ~/.config/waybar/style.css" },
        ],
      },
      {
        icon: "refresh-cw",
        title: "Reload",
        content: [
          { type: "text", text: "Hyprland picks up config changes automatically. To reload Waybar:" },
          { type: "code", code: "killall waybar && waybar &" },
        ],
      },
    ],
    infoBoxes: [
      {
        content: [
          { type: "text", text: "**Note:** The exported config only contains `general`, `decoration`, and `animations` sections. Review and merge with your existing config rather than replacing the entire file." },
        ],
      },
    ],
  },

  // ── Hyprland Installer ─────────────────────────────────────────────
  {
    slug: "hyprinstall",
    title: "Hyprland Installer",
    description: "How to use the generated install script to set up Hyprland in one command.",
    meta: {
      title: "Hyprland Installer Guide",
      description: "How to use the generated Hyprland install script to set up Hyprland, Waybar, and all configs in one command.",
    },
    steps: [
      {
        icon: "file-down",
        title: "Download the install script",
        content: [
          { type: "text", text: "Click **Download install-hyprland.sh** in the customizer sidebar. This generates a single shell script containing everything: package installation, `hyprland.conf`, Waybar config and CSS, keybinds, window rules, and autostart." },
        ],
      },
      {
        icon: "shield",
        title: "Review the script",
        content: [
          { type: "text", text: "Always read a script before running it. Open it in your editor:" },
          { type: "code", code: "less ~/Downloads/install-hyprland.sh" },
          { type: "text", text: "The script is split into clearly labeled sections so you can verify what it does: install packages, write config files, and set permissions. No system-level changes are made outside of `~/.config/`." },
        ],
      },
      {
        icon: "terminal",
        title: "Make it executable and run",
        content: [
          { type: "code", code: "chmod +x ~/Downloads/install-hyprland.sh\nbash ~/Downloads/install-hyprland.sh" },
          { type: "text", text: "The script will detect your distribution and use the correct package manager:" },
          {
            type: "list",
            items: [
              "**Arch** — `pacman -S`",
              "**Fedora** — `dnf install`",
              "**Ubuntu/Debian** — `apt install`",
              "**Void** — `xbps-install`",
              "**openSUSE** — `zypper install`",
            ],
          },
        ],
      },
      {
        icon: "settings",
        title: "What gets installed",
        content: [
          { type: "text", text: "The script creates the following files:" },
          {
            type: "list",
            items: [
              "`~/.config/hypr/hyprland.conf` — full Hyprland config with borders, blur, animations, keybinds, window rules, monitors, and autostart",
              "`~/.config/waybar/config.jsonc` — Waybar layout with workspaces, clock, and system tray",
              "`~/.config/waybar/style.css` — Waybar CSS matching your theme colors",
              "`~/.config/dunst/dunstrc` — basic notification daemon config",
            ],
          },
        ],
      },
      {
        icon: "refresh-cw",
        title: "Start Hyprland",
        content: [
          { type: "text", text: "If you are already in a TTY, start Hyprland:" },
          { type: "code", code: "Hyprland" },
          { type: "text", text: "If you are in a display manager (SDDM, GDM), log out and select **Hyprland** from the session picker." },
        ],
      },
    ],
    infoBoxes: [
      {
        content: [
          { type: "text", text: "**Existing configs:** The script overwrites files in `~/.config/hypr/`, `~/.config/waybar/`, and `~/.config/dunst/`. If you have existing configs, back them up first:" },
          { type: "code", code: "cp -r ~/.config/hypr ~/.config/hypr.bak\ncp -r ~/.config/waybar ~/.config/waybar.bak" },
        ],
      },
      {
        content: [
          { type: "text", text: "**Customizing after install:** The generated configs are plain text files. Edit them directly to tweak values, or come back to the installer, adjust your settings, and download a new script." },
        ],
      },
    ],
  },

  // ── Niri Theme ─────────────────────────────────────────────────────
  {
    slug: "niri",
    title: "Niri Theme",
    description: "How to apply your exported Niri theme config and Waybar CSS.",
    meta: {
      title: "Niri Theme Guide",
      description: "How to apply your exported Niri theme config and Waybar CSS to your scrollable-tiling desktop.",
    },
    steps: [
      {
        icon: "file-down",
        title: "Export your config files",
        content: [
          { type: "text", text: "In the Niri theme customizer, click **Export Config** to download `config.kdl` and **Export Waybar CSS** to download `waybar-style.css`. These contain your visual settings for Niri and Waybar." },
        ],
      },
      {
        icon: "shield",
        title: "Back up existing configs",
        content: [
          { type: "text", text: "If you have existing Niri or Waybar configs, back them up first:" },
          { type: "code", code: "cp ~/.config/niri/config.kdl ~/.config/niri/config.kdl.bak\ncp ~/.config/waybar/style.css ~/.config/waybar/style.css.bak" },
        ],
      },
      {
        icon: "terminal",
        title: "Copy files to config directory",
        content: [
          { type: "text", text: "Move the downloaded files to your Niri and Waybar config directories:" },
          { type: "code", code: "cp ~/Downloads/config.kdl ~/.config/niri/config.kdl\ncp ~/Downloads/waybar-style.css ~/.config/waybar/style.css" },
          { type: "text", text: "If the `config.kdl` contains only theme settings (from the Theme designer), you may want to merge the `layout` and `focus-ring` blocks into your existing config rather than replacing the whole file." },
        ],
      },
      {
        icon: "refresh-cw",
        title: "Reload Niri",
        content: [
          { type: "text", text: "Niri automatically watches `config.kdl` for changes and reloads. If it does not reload, you can log out and back in, or run:" },
          { type: "code", code: "niri msg action do-screen-transition" },
          { type: "text", text: "To reload Waybar, restart it:" },
          { type: "code", code: "killall waybar && waybar &" },
        ],
      },
    ],
    infoBoxes: [
      {
        content: [
          { type: "text", text: "**KDL format:** Niri uses KDL (KDL Document Language) for its config, not the INI-style format used by Hyprland. Make sure you are editing `config.kdl`, not a `.conf` file." },
        ],
      },
      {
        content: [
          { type: "text", text: "**Focus ring vs border:** Niri uses a `focus-ring` around the active window instead of traditional window borders. The ring appears outside the window with a configurable gap. You can adjust the width and colors in the theme customizer." },
        ],
      },
    ],
  },

  // ── Niri Installer ─────────────────────────────────────────────────
  {
    slug: "niriinstall",
    title: "Niri Installer",
    description: "How to use the generated install script to set up Niri in one command.",
    meta: {
      title: "Niri Installer Guide",
      description: "How to use the generated Niri install script to set up Niri, Waybar, and all configs in one command.",
    },
    steps: [
      {
        icon: "file-down",
        title: "Download the install script",
        content: [
          { type: "text", text: "Click **Download install-niri.sh** in the customizer sidebar. This generates a single shell script containing everything: package installation, `config.kdl`, Waybar config and CSS, keybinds, window rules, and autostart." },
        ],
      },
      {
        icon: "shield",
        title: "Review the script",
        content: [
          { type: "text", text: "Always read a script before running it. Open it in your editor:" },
          { type: "code", code: "less ~/Downloads/install-niri.sh" },
          { type: "text", text: "The script is split into clearly labeled sections so you can verify what it does: install packages, write config files, and set permissions. No system-level changes are made outside of `~/.config/`." },
        ],
      },
      {
        icon: "terminal",
        title: "Make it executable and run",
        content: [
          { type: "code", code: "chmod +x ~/Downloads/install-niri.sh\nbash ~/Downloads/install-niri.sh" },
          { type: "text", text: "The script will detect your distribution and use the correct package manager:" },
          {
            type: "list",
            items: [
              "**Arch** — `pacman -S`",
              "**Fedora** — `dnf install`",
              "**Ubuntu/Debian** — `apt install`",
              "**Void** — `xbps-install`",
              "**openSUSE** — `zypper install`",
            ],
          },
        ],
      },
      {
        icon: "settings",
        title: "What gets installed",
        content: [
          { type: "text", text: "The script creates the following files:" },
          {
            type: "list",
            items: [
              "`~/.config/niri/config.kdl` — full Niri config with layout, focus ring, animations, keybinds, window rules, and autostart",
              "`~/.config/waybar/config.jsonc` — Waybar layout with workspaces, clock, and system tray",
              "`~/.config/waybar/style.css` — Waybar CSS matching your theme colors",
              "`~/.config/dunst/dunstrc` — basic notification daemon config",
            ],
          },
        ],
      },
      {
        icon: "refresh-cw",
        title: "Start Niri",
        content: [
          { type: "text", text: "If you are already in a TTY, start Niri:" },
          { type: "code", code: "niri-session" },
          { type: "text", text: "If you are in a display manager (SDDM, GDM), log out and select **niri** from the session picker." },
        ],
      },
    ],
    infoBoxes: [
      {
        content: [
          { type: "text", text: "**Existing configs:** The script overwrites files in `~/.config/niri/`, `~/.config/waybar/`, and `~/.config/dunst/`. If you have existing configs, back them up first:" },
          { type: "code", code: "cp -r ~/.config/niri ~/.config/niri.bak\ncp -r ~/.config/waybar ~/.config/waybar.bak" },
        ],
      },
      {
        content: [
          { type: "text", text: "**Scrollable tiling:** Niri uses a scrollable column layout instead of traditional tiling. Windows are arranged in columns that scroll horizontally. Use `Mod+Left/Right` to navigate between columns and `Mod+R` to cycle through preset column widths." },
        ],
      },
    ],
  },

  // ── Rofi ───────────────────────────────────────────────────────────
  {
    slug: "rofi",
    title: "Rofi",
    description: "How to install your custom Rofi .rasi theme file.",
    meta: {
      title: "Rofi Installation Guide",
      description: "How to install your custom Rofi .rasi theme file.",
    },
    steps: [
      {
        icon: "file-down",
        title: "Export your theme",
        content: [
          { type: "text", text: "Click **Export Rofi Theme** in the customizer sidebar to download your `rofi-theme.rasi` file." },
        ],
      },
      {
        icon: "folder-open",
        title: "Create the config directory",
        content: [
          { type: "code", code: "mkdir -p ~/.config/rofi" },
        ],
      },
      {
        icon: "terminal",
        title: "Copy the theme file",
        content: [
          { type: "code", code: "cp ~/Downloads/rofi-theme.rasi ~/.config/rofi/theme.rasi" },
          { type: "text", text: "Then reference it in your Rofi config (`~/.config/rofi/config.rasi`):" },
          { type: "code", code: '@theme "~/.config/rofi/theme.rasi"' },
        ],
      },
      {
        icon: "refresh-cw",
        title: "Test the theme",
        content: [
          { type: "text", text: "Launch Rofi to see your theme in action:" },
          { type: "code", code: "rofi -show drun" },
        ],
      },
    ],
    infoBoxes: [
      {
        content: [
          { type: "text", text: "**Note:** If you have an existing theme, the exported file will override it. Back up your current `config.rasi` before applying." },
        ],
      },
    ],
  },
]

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug)
}

export function getAllSlugs(): string[] {
  return GUIDES.map((g) => g.slug)
}
