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
            const css = generateGTKCSS(theme)
            const blob = new Blob([css], { type: "text/css" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "gtk.css"
            a.click()
            URL.revokeObjectURL(url)
          }}
          className="w-full rounded-lg py-2 text-sm font-sans font-medium transition-colors"
          style={{
            backgroundColor: "hsl(var(--accent))",
            color: "hsl(var(--accent-foreground))",
          }}
        >
          Export GTK CSS
        </button>
        <Link
          href="/docs/gnome"
          className="block w-full rounded-lg py-2 text-sm font-sans font-medium text-center transition-colors border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 mt-2"
        >
          How to Install
        </Link>
      </div>
    </div>
  )
}

function generateGTKCSS(theme: import("./theme-context").GnomeTheme): string {
  return `/* Generated GNOME Theme */
@define-color accent_color ${theme.accentColor};
@define-color accent_bg_color ${theme.accentColor};
@define-color window_bg_color ${theme.windowBg};
@define-color headerbar_bg_color ${theme.windowHeaderBg};
@define-color headerbar_fg_color ${theme.windowHeaderText};
@define-color view_bg_color ${theme.windowBg};
@define-color card_bg_color ${theme.windowHeaderBg};

window {
  border-radius: ${theme.borderRadius}px;
}

headerbar {
  background: ${theme.windowHeaderBg};
  color: ${theme.windowHeaderText};
  border-radius: ${theme.borderRadius}px ${theme.borderRadius}px 0 0;
  ${theme.windowShadow ? `box-shadow: 0 4px 16px rgba(0,0,0,0.3);` : ""}
}

.background {
  background: linear-gradient(135deg, ${theme.wallpaperGradientFrom}, ${theme.wallpaperGradientTo});
}

/* Panel */
#panel {
  background-color: ${theme.panelBg};
  color: ${theme.panelText};
  height: ${theme.panelHeight}px;
  font-size: ${theme.panelFontSize}px;
}

/* Dash / Dock */
#dash {
  opacity: ${theme.dockOpacity};
}
`
}
