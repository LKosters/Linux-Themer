"use client"

import Link from "next/link"
import { useCinnamonTheme } from "./theme-context"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Paintbrush,
  Layout,
  Monitor,
  PanelTop,
  Ratio,
  Menu,
} from "lucide-react"
import {
  ColorInput,
  SliderRow,
  Section,
  AspectRatioSelector,
  OptionButtons,
  WallpaperControls,
} from "@/components/shared/control-helpers"

export function CinnamonThemeControls() {
  const { theme, updateTheme, presets, applyPreset } = useCinnamonTheme()

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-4 py-5 border-b border-border">
        <h2 className="font-serif text-2xl text-foreground">Cinnamon</h2>
        <p className="text-xs font-sans text-muted-foreground mt-1 tracking-wide uppercase">
          Customize your Cinnamon desktop
        </p>
      </div>

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

      <div className="flex-1 overflow-y-auto">
        <Section title="Display" icon={Ratio} defaultOpen>
          <AspectRatioSelector
            value={theme.aspectRatio}
            onChange={(v) => updateTheme({ aspectRatio: v })}
          />
        </Section>

        <Section title="Panel" icon={PanelTop} defaultOpen>
          <OptionButtons
            label="Position"
            options={[
              { label: "Bottom", value: "bottom" as const },
              { label: "Top", value: "top" as const },
            ]}
            value={theme.panelPosition}
            onChange={(v) => updateTheme({ panelPosition: v })}
          />
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
            min={22}
            max={52}
            suffix="px"
          />
          <SliderRow
            label="Width"
            value={theme.panelWidth}
            onChange={(v) => updateTheme({ panelWidth: v })}
            min={30}
            max={100}
            suffix="%"
          />
          <SliderRow
            label="Corner Radius"
            value={theme.panelBorderRadius}
            onChange={(v) => updateTheme({ panelBorderRadius: v })}
            min={0}
            max={26}
            suffix="px"
          />
          <SliderRow
            label="Margin"
            value={theme.panelMargin}
            onChange={(v) => updateTheme({ panelMargin: v })}
            min={0}
            max={16}
            suffix="px"
          />
          <SliderRow
            label="Icon Size"
            value={theme.panelIconSize}
            onChange={(v) => updateTheme({ panelIconSize: v })}
            min={8}
            max={22}
            suffix="px"
          />
        </Section>

        <Section title="Menu" icon={Menu}>
          <ColorInput
            label="Background"
            value={theme.menuBg}
            onChange={(v) => updateTheme({ menuBg: v })}
          />
          <ColorInput
            label="Text Color"
            value={theme.menuText}
            onChange={(v) => updateTheme({ menuText: v })}
          />
          <ColorInput
            label="Highlight"
            value={theme.menuHighlight}
            onChange={(v) => updateTheme({ menuHighlight: v })}
          />
          <SliderRow
            label="Border Radius"
            value={theme.menuBorderRadius}
            onChange={(v) => updateTheme({ menuBorderRadius: v })}
            min={0}
            max={16}
            suffix="px"
          />
          <SliderRow
            label="Opacity"
            value={theme.menuOpacity}
            onChange={(v) => updateTheme({ menuOpacity: v })}
            min={0.5}
            max={1}
            step={0.05}
          />
          <SliderRow
            label="Width"
            value={theme.menuWidth}
            onChange={(v) => updateTheme({ menuWidth: v })}
            min={30}
            max={60}
            suffix="%"
          />
          <SliderRow
            label="Icon Size"
            value={theme.menuIconSize}
            onChange={(v) => updateTheme({ menuIconSize: v })}
            min={16}
            max={36}
            suffix="px"
          />
          <ColorInput
            label="Separator"
            value={theme.menuSeparatorColor}
            onChange={(v) => updateTheme({ menuSeparatorColor: v })}
          />
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
            max={16}
            suffix="px"
          />
          <OptionButtons
            label="Button Layout"
            options={[
              { label: "Right", value: "right" as const },
              { label: "Left", value: "left" as const },
            ]}
            value={theme.windowButtonLayout}
            onChange={(v) => updateTheme({ windowButtonLayout: v })}
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

      <div className="border-t border-border px-4 py-3">
        <button
          onClick={() => {
            const script = generateInstallScript(theme)
            const blob = new Blob([script], { type: "text/x-shellscript" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "cinnamon-theme.sh"
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
            const css = generateCinnamonCSS(theme)
            const blob = new Blob([css], { type: "text/css" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "cinnamon.css"
            a.click()
            URL.revokeObjectURL(url)
          }}
          className="w-full rounded-lg py-2 text-sm font-sans font-medium text-center transition-colors border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 mt-2"
        >
          Export CSS Only
        </button>
        <Link
          href="/docs/cinnamon"
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

function generateCinnamonCSS(theme: import("./theme-context").CinnamonTheme): string {
  const { r, g, b } = hexToRgb(theme.panelBg)
  const panelRgba = `rgba(${r}, ${g}, ${b}, ${theme.panelOpacity})`
  const { r: mr, g: mg, b: mb } = hexToRgb(theme.menuBg)
  const menuRgba = `rgba(${mr}, ${mg}, ${mb}, ${theme.menuOpacity})`

  return `/* Cinnamon Theme — Generated by Linux Themer */

/* ── Panel ──────────────────────────────────────────── */
.panel-top, .panel-bottom {
  background-color: ${panelRgba};
  color: ${theme.panelText};
  height: ${theme.panelHeight}px;
  font-size: 10pt;
}

.panel-button {
  color: ${theme.panelText};
  -st-icon-size: ${theme.panelIconSize}px;
}
.panel-button:hover {
  background-color: rgba(255,255,255,0.1);
}
.panel-button:active, .panel-button:checked {
  background-color: rgba(255,255,255,0.15);
}

.system-tray-icon {
  icon-size: ${theme.panelIconSize}px;
}

/* ── Menu ───────────────────────────────────────────── */
.menu {
  background-color: ${menuRgba};
  color: ${theme.menuText};
  border-radius: ${theme.menuBorderRadius}px;
}
.menu .menu-selected-app-box,
.menu .selected-app-box,
.menu StButton:hover,
.popup-menu-item:active,
.popup-menu-item.active {
  background-color: ${theme.menuHighlight};
  color: #ffffff;
  border-radius: ${Math.max(theme.menuBorderRadius - 4, 4)}px;
}
.menu StIcon {
  icon-size: ${theme.menuIconSize}px;
}
.menu .separator {
  background-color: ${theme.menuSeparatorColor};
}

/* ── Focus / accent ─────────────────────────────────── */
StButton:focus,
StEntry:focus,
.keyboard-key:focus {
  border-color: ${theme.accentColor};
}
.check-box StBin:checked {
  background-color: ${theme.accentColor};
}

/* ── Window list ────────────────────────────────────── */
.window-list-item-box {
  background-color: transparent;
  color: ${theme.panelText};
}
.window-list-item-box:hover {
  background-color: rgba(255,255,255,0.1);
}
.window-list-item-box:active,
.window-list-item-box:focus {
  background-color: ${theme.accentColor};
}

/* ── Tooltip ────────────────────────────────────────── */
.tooltip {
  background-color: ${theme.menuBg};
  color: ${theme.menuText};
  border-radius: ${theme.borderRadius}px;
}

/* ── Modal dialogs ──────────────────────────────────── */
.modal-dialog {
  background-color: ${theme.windowBg};
  color: ${theme.windowHeaderText};
  border-radius: ${theme.borderRadius}px;
}
`
}

function generateInstallScript(theme: import("./theme-context").CinnamonTheme): string {
  const css = generateCinnamonCSS(theme)
  const btnLayout = theme.windowButtonLayout === "left"
    ? "close,minimize,maximize:menu"
    : "menu:minimize,maximize,close"

  return `#!/bin/bash
# Cinnamon Theme Install Script
# Generated by Linux Themer
set -e

THEME_NAME="LinuxThemer"
GREEN='\\033[0;32m'; YELLOW='\\033[0;33m'; NC='\\033[0m'
ok()   { echo -e "  \${GREEN}✓\${NC} $1"; }
warn() { echo -e "  \${YELLOW}!\${NC} $1"; }

echo ""
echo "Installing Cinnamon theme..."
echo ""

# ── 1. Write Cinnamon CSS ────────────────────────────────
THEME_DIR="$HOME/.themes/$THEME_NAME/cinnamon"
mkdir -p "$THEME_DIR"
cat > "$THEME_DIR/cinnamon.css" << 'CSSEOF'
${css}CSSEOF
ok "Cinnamon CSS written to $THEME_DIR/cinnamon.css"

# ── 2. Apply theme ──────────────────────────────────────
gsettings set org.cinnamon.theme name "$THEME_NAME" 2>/dev/null && \\
  ok "Theme set to $THEME_NAME" || warn "Could not set theme"

# ── 3. Window button layout ────────────────────────────
gsettings set org.cinnamon.desktop.wm.preferences button-layout '${btnLayout}' 2>/dev/null && \\
  ok "Button layout set (${theme.windowButtonLayout})" || warn "Could not set button layout"

# ── 4. Panel settings ──────────────────────────────────
# Panel height (applies to all panels)
dconf write /org/cinnamon/panels-height "['1:${theme.panelHeight}']" 2>/dev/null && \\
  ok "Panel height set to ${theme.panelHeight}px" || warn "Could not set panel height"

echo ""
echo -e "\${GREEN}Done!\${NC} Changes should apply immediately."
echo ""
echo "To revert:"
echo "  rm -rf ~/.themes/$THEME_NAME"
echo "  gsettings reset org.cinnamon.theme name"
echo "  gsettings reset org.cinnamon.desktop.wm.preferences button-layout"
`
}
