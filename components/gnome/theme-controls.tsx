"use client"

import Link from "next/link"
import { useGnomeTheme } from "./theme-context"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Paintbrush,
  Layout,
  Monitor,
  Layers,
  PanelTop,
  Ratio,
} from "lucide-react"
import {
  ColorInput,
  SliderRow,
  Section,
  AspectRatioSelector,
  OptionButtons,
  WallpaperControls,
} from "@/components/shared/control-helpers"

export function ThemeControls() {
  const { theme, updateTheme, presets, applyPreset } = useGnomeTheme()

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 py-5 border-b border-border">
        <h2 className="font-serif text-2xl text-foreground">GNOME</h2>
        <p className="text-xs font-sans text-muted-foreground mt-1 tracking-wide uppercase">
          Customize your GNOME desktop
        </p>
      </div>

      {/* Presets */}
      <div className="px-4 py-3 border-b border-border">
        <span className="text-[10px] font-sans text-muted-foreground uppercase tracking-widest block mb-2">
          Presets
        </span>
        <div className="flex flex-wrap gap-1.5">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset.name)}
              className="rounded-md border border-border px-2.5 py-1 text-xs font-sans text-foreground transition-all hover:border-accent hover:text-accent"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable controls */}
      <div className="flex-1 overflow-y-auto">
        <Section title="Display" icon={Ratio} defaultOpen>
          <AspectRatioSelector
            value={theme.aspectRatio}
            onChange={(v) => updateTheme({ aspectRatio: v })}
          />
        </Section>

        <Section title="Top Bar" icon={PanelTop} defaultOpen>
          <ColorInput
            label="Background"
            value={theme.panelBg}
            onChange={(v) => updateTheme({ panelBg: v })}
          />
          <ColorInput
            label="Text Color"
            value={theme.panelText}
            onChange={(v) => updateTheme({ panelText: v })}
          />
          <SliderRow
            label="Opacity"
            value={theme.panelOpacity}
            onChange={(v) => updateTheme({ panelOpacity: v })}
            min={0.1}
            max={1}
            step={0.05}
          />
          <SliderRow
            label="Height"
            value={theme.panelHeight}
            onChange={(v) => updateTheme({ panelHeight: v })}
            min={18}
            max={40}
            suffix="px"
          />
          <SliderRow
            label="Font Size"
            value={theme.panelFontSize}
            onChange={(v) => updateTheme({ panelFontSize: v })}
            min={8}
            max={18}
            suffix="px"
          />
          <div className="flex items-center justify-between">
            <Label className="text-xs font-sans text-muted-foreground">
              Islands Mode
            </Label>
            <Switch
              checked={theme.panelIslands}
              onCheckedChange={(v) => updateTheme({ panelIslands: v })}
            />
          </div>
        </Section>

        <Section title="Colors" icon={Paintbrush}>
          <ColorInput
            label="Accent"
            value={theme.accentColor}
            onChange={(v) => updateTheme({ accentColor: v })}
          />
        </Section>

        <Section title="Windows" icon={Layout}>
          <ColorInput
            label="Header BG"
            value={theme.windowHeaderBg}
            onChange={(v) => updateTheme({ windowHeaderBg: v })}
          />
          <ColorInput
            label="Header Text"
            value={theme.windowHeaderText}
            onChange={(v) => updateTheme({ windowHeaderText: v })}
          />
          <ColorInput
            label="Body BG"
            value={theme.windowBg}
            onChange={(v) => updateTheme({ windowBg: v })}
          />
          <SliderRow
            label="Opacity"
            value={theme.windowOpacity}
            onChange={(v) => updateTheme({ windowOpacity: v })}
            min={0.1}
            max={1}
            step={0.05}
          />
          <SliderRow
            label="Corner Radius"
            value={theme.borderRadius}
            onChange={(v) => updateTheme({ borderRadius: v })}
            min={0}
            max={24}
            suffix="px"
          />
          <div className="flex items-center justify-between">
            <Label className="text-xs font-sans text-muted-foreground">
              Window Shadow
            </Label>
            <Switch
              checked={theme.windowShadow}
              onCheckedChange={(v) => updateTheme({ windowShadow: v })}
            />
          </div>
        </Section>

        <Section title="Dock" icon={Layers}>
          <OptionButtons
            label="Position"
            options={[
              { label: "Bottom", value: "bottom" as const },
              { label: "Left", value: "left" as const },
              { label: "Right", value: "right" as const },
            ]}
            value={theme.dockPosition}
            onChange={(v) => updateTheme({ dockPosition: v })}
          />
          <ColorInput
            label="Icon BG"
            value={theme.dockIconBg}
            onChange={(v) => updateTheme({ dockIconBg: v })}
          />
          <SliderRow
            label="Icon Size"
            value={theme.dockIconSize}
            onChange={(v) => updateTheme({ dockIconSize: v })}
            min={20}
            max={48}
            suffix="px"
          />
          <SliderRow
            label="Opacity"
            value={theme.dockOpacity}
            onChange={(v) => updateTheme({ dockOpacity: v })}
            min={0.1}
            max={1}
            step={0.05}
          />
        </Section>

        <Section title="Wallpaper" icon={Monitor}>
          <WallpaperControls
            gradientFrom={theme.wallpaperGradientFrom}
            gradientTo={theme.wallpaperGradientTo}
            imageUrl={theme.wallpaperImageUrl}
            imageOpacity={theme.wallpaperImageOpacity}
            onUpdate={(u) => updateTheme(u as Partial<typeof theme>)}
          />
        </Section>
      </div>

      {/* Footer */}
      <div className="border-t border-border px-4 py-3">
        <button
          onClick={() => {
            const script = generateInstallScript(theme)
            const blob = new Blob([script], { type: "text/x-shellscript" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "gnome-theme.sh"
            a.click()
            URL.revokeObjectURL(url)
          }}
          className="w-full rounded-lg py-2 text-sm font-sans font-medium transition-colors"
          style={{
            backgroundColor: "hsl(var(--accent))",
            color: "hsl(var(--accent-foreground))",
          }}
        >
          Export Install Script
        </button>
        <button
          onClick={() => {
            const css = generateGTKCSS(theme)
            const blob = new Blob([css], { type: "text/css" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "gtk.css"
            a.click()
            URL.revokeObjectURL(url)
          }}
          className="w-full rounded-lg py-2 text-sm font-sans font-medium text-center transition-colors border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 mt-2"
        >
          Export GTK CSS Only
        </button>
        <Link
          href="/docs/gnome"
          className="block w-full rounded-lg py-2 text-sm font-sans font-medium text-center transition-colors text-muted-foreground/70 hover:text-foreground mt-1.5"
        >
          How to Install
        </Link>
      </div>
    </div>
  )
}

function hexToRgb(hex: string) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return m ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) } : { r: 0, g: 0, b: 0 }
}

function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255
}

function shiftBrightness(hex: string, amount: number) {
  const { r, g, b } = hexToRgb(hex)
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v + amount)))
  return `#${c(r).toString(16).padStart(2, "0")}${c(g).toString(16).padStart(2, "0")}${c(b).toString(16).padStart(2, "0")}`
}

function hexToRgba(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex)
  return alpha >= 1 ? hex : `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function generateGTKCSS(theme: import("./theme-context").GnomeTheme): string {
  const isDark = luminance(theme.windowBg) < 0.5
  const accentFg = luminance(theme.accentColor) > 0.5 ? "#000000" : "#ffffff"
  const viewBg = isDark ? shiftBrightness(theme.windowBg, -8) : shiftBrightness(theme.windowBg, 8)
  const cardBg = isDark ? shiftBrightness(theme.windowBg, 12) : shiftBrightness(theme.windowBg, -6)
  const popoverBg = isDark ? shiftBrightness(theme.windowBg, 18) : shiftBrightness(theme.windowBg, -4)
  const sidebarBg = isDark ? shiftBrightness(theme.windowBg, 5) : shiftBrightness(theme.windowBg, -3)
  const headerBackdrop = isDark ? shiftBrightness(theme.windowHeaderBg, -8) : shiftBrightness(theme.windowHeaderBg, 8)

  return `/* GTK4 / libadwaita Theme
 * Generated by GNOME Theme Customizer
 * Place this file at: ~/.config/gtk-4.0/gtk.css
 * For GTK3 apps, also copy to: ~/.config/gtk-3.0/gtk.css
 */

/* ── Accent ─────────────────────────────────────────── */
@define-color accent_color ${theme.accentColor};
@define-color accent_bg_color ${theme.accentColor};
@define-color accent_fg_color ${accentFg};

/* ── Window ─────────────────────────────────────────── */
@define-color window_bg_color ${theme.windowBg};
@define-color window_fg_color ${theme.windowHeaderText};

/* ── View / content area ────────────────────────────── */
@define-color view_bg_color ${viewBg};
@define-color view_fg_color ${theme.windowHeaderText};

/* ── Headerbar ──────────────────────────────────────── */
@define-color headerbar_bg_color ${theme.windowHeaderBg};
@define-color headerbar_fg_color ${theme.windowHeaderText};
@define-color headerbar_border_color ${isDark ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.12)"};
@define-color headerbar_backdrop_color ${headerBackdrop};

/* ── Cards ──────────────────────────────────────────── */
@define-color card_bg_color ${cardBg};
@define-color card_fg_color ${theme.windowHeaderText};

/* ── Dialogs ────────────────────────────────────────── */
@define-color dialog_bg_color ${popoverBg};
@define-color dialog_fg_color ${theme.windowHeaderText};

/* ── Popovers / menus ───────────────────────────────── */
@define-color popover_bg_color ${popoverBg};
@define-color popover_fg_color ${theme.windowHeaderText};

/* ── Sidebar ────────────────────────────────────────── */
@define-color sidebar_bg_color ${sidebarBg};
@define-color sidebar_fg_color ${theme.windowHeaderText};
@define-color sidebar_backdrop_color ${isDark ? shiftBrightness(sidebarBg, -5) : shiftBrightness(sidebarBg, 5)};

/* ── Misc ───────────────────────────────────────────── */
@define-color shade_color ${isDark ? "rgba(0,0,0,0.36)" : "rgba(0,0,0,0.07)"};
@define-color scrollbar_outline_color ${isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.3)"};

/* ── Window chrome ──────────────────────────────────── */
window.background { border-radius: ${theme.borderRadius}px; }

headerbar {
  background: @headerbar_bg_color;
  color: @headerbar_fg_color;${theme.windowShadow ? "\n  box-shadow: 0 1px 3px rgba(0,0,0,0.18);" : ""}
}

headerbar:backdrop {
  background: @headerbar_backdrop_color;
}
`
}

function rgbaToHex(color: string): string {
  const m = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
  if (m) {
    return `#${parseInt(m[1]).toString(16).padStart(2, "0")}${parseInt(m[2]).toString(16).padStart(2, "0")}${parseInt(m[3]).toString(16).padStart(2, "0")}`
  }
  return color
}

function generateShellCSS(theme: import("./theme-context").GnomeTheme): string {
  const { r, g, b } = hexToRgb(theme.panelBg)
  const panelRgba = `rgba(${r}, ${g}, ${b}, ${theme.panelOpacity})`
  const iconRadius = Math.max(theme.borderRadius - 4, 6)

  const header = `/* GNOME Shell Theme — Generated by GNOME Theme Customizer */
/* Import the default GNOME Shell theme as base */
@import url("resource:///org/gnome/shell/theme/gnome-shell.css");

`

  const dockCss = `
/* ── Dock Icon Background (Dash-to-Dock) ────────────────── */
#dashtodockContainer .overview-icon {
  background-color: ${theme.dockIconBg} !important;
  border-radius: ${iconRadius}px !important;
}

#dashtodockContainer .app-well-app .overview-icon {
  background-color: ${theme.dockIconBg} !important;
  border-radius: ${iconRadius}px !important;
}

#dashtodockContainer .show-apps .overview-icon {
  background-color: ${theme.dockIconBg}80 !important;
  border-radius: ${iconRadius}px !important;
}
`

  const panelCommon = `  height: ${theme.panelHeight}px !important;
  color: ${theme.panelText} !important;
  font-size: ${theme.panelFontSize}pt !important;`

  if (theme.panelIslands) {
    return header + `/* ── Panel (Islands) ─────────────────────────────────── */
#panel {
  background-color: transparent !important;
${panelCommon}
}

#panel .panel-button {
  background-color: ${panelRgba} !important;
  border-radius: 999px !important;
  margin: 3px 2px !important;
  padding: 0 8px !important;
  color: ${theme.panelText} !important;
  font-size: ${theme.panelFontSize}pt !important;
}

#panel .panel-button:hover {
  background-color: rgba(255, 255, 255, 0.12) !important;
}

#panel .panel-button:active,
#panel .panel-button:checked,
#panel .panel-button:focus {
  background-color: rgba(255, 255, 255, 0.18) !important;
}

#panel .panel-button .clock {
  color: ${theme.panelText} !important;
  font-size: ${theme.panelFontSize}pt !important;
}

#panel .panel-status-indicators-box,
#panel .panel-status-menu-box {
  font-size: ${theme.panelFontSize}pt !important;
}
` + dockCss
  }

  return header + `/* ── Panel ──────────────────────────────────────────── */
#panel {
  background-color: ${panelRgba} !important;
${panelCommon}
}

#panel .panel-button {
  color: ${theme.panelText} !important;
  font-size: ${theme.panelFontSize}pt !important;
}

#panel .panel-button:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

#panel .panel-button:active,
#panel .panel-button:checked,
#panel .panel-button:focus {
  background-color: rgba(255, 255, 255, 0.15) !important;
}

#panel .panel-button .clock {
  color: ${theme.panelText} !important;
  font-size: ${theme.panelFontSize}pt !important;
}

#panel .panel-status-indicators-box,
#panel .panel-status-menu-box {
  font-size: ${theme.panelFontSize}pt !important;
}
` + dockCss
}

function generateInstallScript(theme: import("./theme-context").GnomeTheme): string {
  const css = generateGTKCSS(theme)
  const shellCss = generateShellCSS(theme)
  const dockPos = theme.dockPosition.toUpperCase()
  const dockBgHex = rgbaToHex(theme.dockBg)
  const colorScheme = theme.darkMode ? "prefer-dark" : "default"

  return `#!/bin/bash
# GNOME Theme Install Script
# Generated by GNOME Theme Customizer
# Run with: bash gnome-theme.sh
set -e

THEME_NAME="LinuxThemer"
RED='\\033[0;31m'; GREEN='\\033[0;32m'; YELLOW='\\033[0;33m'; NC='\\033[0m'

ok()   { echo -e "  \${GREEN}✓\${NC} $1"; }
warn() { echo -e "  \${YELLOW}!\${NC} $1"; }
fail() { echo -e "  \${RED}✗\${NC} $1"; }

echo ""
echo "Installing GNOME theme..."
echo ""

# ── 1. Check extensions ──────────────────────────────────
echo "Checking extensions..."

check_ext() {
  local UUID="$1" NAME="$2"
  if command -v gnome-extensions &>/dev/null; then
    if gnome-extensions list | grep -q "$UUID"; then
      if gnome-extensions info "$UUID" 2>/dev/null | grep -q "State: ENABLED"; then
        ok "$NAME is installed and enabled"
      else
        gnome-extensions enable "$UUID" 2>/dev/null && ok "Enabled $NAME" || warn "$NAME is installed but could not be enabled — enable it manually"
      fi
      return 0
    fi
  fi
  fail "$NAME is NOT installed"
  echo "    Install it from: https://extensions.gnome.org"
  return 1
}

USERTHEME_OK=false
DOCK_OK=false
check_ext "user-theme@gnome-shell-extensions.gcampax.github.com" "User Themes" && USERTHEME_OK=true
check_ext "dash-to-dock@micxgx.gmail.com" "Dash to Dock" || \\
  check_ext "ubuntu-dock@ubuntu.com" "Ubuntu Dock" && DOCK_OK=true

echo ""

# ── 2. GTK CSS ───────────────────────────────────────────
echo "Installing GTK CSS..."
mkdir -p ~/.config/gtk-4.0
cat > ~/.config/gtk-4.0/gtk.css << 'GTKEOF'
${css}GTKEOF

mkdir -p ~/.config/gtk-3.0
cp ~/.config/gtk-4.0/gtk.css ~/.config/gtk-3.0/gtk.css
ok "GTK 4 + GTK 3 CSS installed"

# ── 3. Color scheme ──────────────────────────────────────
gsettings set org.gnome.desktop.interface color-scheme '${colorScheme}' 2>/dev/null && \\
  ok "Color scheme set to ${colorScheme}" || warn "Could not set color scheme"

# ── 4. GNOME Shell theme ─────────────────────────────────
echo ""
echo "Installing Shell theme..."
THEME_DIR="$HOME/.themes/$THEME_NAME/gnome-shell"
mkdir -p "$THEME_DIR"
cat > "$THEME_DIR/gnome-shell.css" << 'SHELLEOF'
${shellCss}SHELLEOF
ok "Shell CSS written to $THEME_DIR/gnome-shell.css"

# Helper: try gsettings with schema dir search, fall back to plain gsettings
try_gsettings() {
  local SCHEMA="$1"; shift
  local KEY="$1"; shift
  local VAL="$1"; shift

  # Try well-known extension schema directories first
  for dir in \\
    "$HOME/.local/share/gnome-shell/extensions/"*/schemas \\
    "/usr/share/gnome-shell/extensions/"*/schemas; do
    if [ -d "$dir" ]; then
      GSETTINGS_SCHEMA_DIR="$dir" gsettings set "$SCHEMA" "$KEY" "$VAL" 2>/dev/null && return 0
    fi
  done
  # Fall back to system schemas
  gsettings set "$SCHEMA" "$KEY" "$VAL" 2>/dev/null && return 0
  return 1
}

if [ "$USERTHEME_OK" = true ]; then
  # First switch to empty to force a reload, then set new theme
  try_gsettings org.gnome.shell.extensions.user-theme name "''" 2>/dev/null || true
  sleep 0.3
  try_gsettings org.gnome.shell.extensions.user-theme name "$THEME_NAME" && \\
    ok "Shell theme set to $THEME_NAME" || fail "Could not apply shell theme via gsettings"
else
  warn "Skipping shell theme activation (User Themes extension not found)"
  echo "    Install User Themes, then run:"
  echo "    gsettings set org.gnome.shell.extensions.user-theme name '$THEME_NAME'"
fi

# ── 5. Dock settings ─────────────────────────────────────
echo ""
echo "Configuring dock..."

dock_set() {
  local KEY="$1" VAL="$2"
  # Try dash-to-dock first
  try_gsettings org.gnome.shell.extensions.dash-to-dock "$KEY" "$VAL" && return 0
  # Try ubuntu-dock
  try_gsettings org.gnome.shell.extensions.ubuntu-dock "$KEY" "$VAL" && return 0
  # Fall back to dconf
  dconf write "/org/gnome/shell/extensions/dash-to-dock/$KEY" "$VAL" 2>/dev/null && return 0
  return 1
}

if [ "$DOCK_OK" = true ]; then
  dock_set dock-position "'${dockPos}'"
  dock_set dash-max-icon-size ${theme.dockIconSize}
  dock_set background-opacity ${theme.dockOpacity}
  dock_set custom-background-color true
  dock_set background-color "'${dockBgHex}'"
  dock_set transparency-mode "'FIXED'"
  dock_set dock-fixed true
  dock_set apply-custom-theme true
  ok "Dock settings applied (position=${dockPos}, icon-size=${theme.dockIconSize}px)"
else
  warn "Skipping dock settings (Dash to Dock / Ubuntu Dock not found)"
fi

# ── 6. Done ──────────────────────────────────────────────
echo ""
echo -e "\${GREEN}Done!\${NC}"
echo ""
echo "If the panel/top bar did not change immediately:"
echo "  • On X11: Press Alt+F2, type 'r', press Enter"
echo "  • On Wayland: Log out and log back in"
echo ""
echo "To revert:"
echo "  rm ~/.config/gtk-4.0/gtk.css ~/.config/gtk-3.0/gtk.css"
echo "  rm -rf ~/.themes/$THEME_NAME"
echo "  gsettings reset org.gnome.shell.extensions.user-theme name"
`
}
