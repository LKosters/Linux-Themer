"use client"

import Link from "next/link"
import { useKDETheme } from "./theme-context"
import type { KDETheme } from "./theme-context"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Paintbrush,
  Layout,
  Monitor,
  Layers,
  PanelTop,
  Ratio,
  Square,
} from "lucide-react"
import {
  ColorInput,
  SliderRow,
  Section,
  AspectRatioSelector,
  OptionButtons,
  WallpaperControls,
} from "@/components/shared/control-helpers"

export function KDEThemeControls() {
  const { theme, updateTheme, presets, applyPreset } = useKDETheme()

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 py-5 border-b border-border">
        <h2 className="font-serif text-2xl text-foreground">KDE Plasma</h2>
        <p className="text-xs font-sans text-muted-foreground mt-1 tracking-wide uppercase">
          Customize your Plasma desktop
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
            min={28}
            max={56}
            suffix="px"
          />
          <SliderRow
            label="Font Size"
            value={theme.panelFontSize}
            onChange={(v) => updateTheme({ panelFontSize: v })}
            min={8}
            max={16}
            suffix="px"
          />
          <div className="flex items-center justify-between">
            <Label className="text-xs font-sans text-muted-foreground">
              Floating Panel
            </Label>
            <Switch
              checked={theme.panelFloating}
              onCheckedChange={(v) => updateTheme({ panelFloating: v })}
            />
          </div>
          <ColorInput
            label="Tray BG"
            value={theme.trayBg}
            onChange={(v) => updateTheme({ trayBg: v })}
          />
        </Section>

        <Section title="Colors" icon={Paintbrush}>
          <ColorInput
            label="Accent"
            value={theme.accentColor}
            onChange={(v) => updateTheme({ accentColor: v })}
          />
          <ColorInput
            label="Highlight"
            value={theme.highlightColor}
            onChange={(v) => updateTheme({ highlightColor: v })}
          />
        </Section>

        <Section title="Windows" icon={Layout}>
          <ColorInput
            label="Title Bar BG"
            value={theme.windowHeaderBg}
            onChange={(v) => updateTheme({ windowHeaderBg: v })}
          />
          <ColorInput
            label="Title Bar Text"
            value={theme.windowHeaderText}
            onChange={(v) => updateTheme({ windowHeaderText: v })}
          />
          <ColorInput
            label="Window BG"
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
            max={20}
            suffix="px"
          />
          <OptionButtons
            label="Button Style"
            options={[
              { label: "Breeze", value: "breeze" as const },
              { label: "Oxygen", value: "oxygen" as const },
              { label: "Circles", value: "circles" as const },
            ]}
            value={theme.windowButtonStyle}
            onChange={(v) => updateTheme({ windowButtonStyle: v })}
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

        <Section title="Widgets" icon={Square}>
          <ColorInput
            label="Widget BG"
            value={theme.widgetBg}
            onChange={(v) => updateTheme({ widgetBg: v })}
          />
          <ColorInput
            label="Widget Text"
            value={theme.widgetText}
            onChange={(v) => updateTheme({ widgetText: v })}
          />
          <SliderRow
            label="Opacity"
            value={theme.widgetOpacity}
            onChange={(v) => updateTheme({ widgetOpacity: v })}
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
            onUpdate={(u) => updateTheme(u as Partial<KDETheme>)}
          />
        </Section>
      </div>

      {/* Footer */}
      <div className="border-t border-border px-4 py-3">
        <button
          onClick={() => {
            const colors = generatePlasmaColors(theme)
            const blob = new Blob([colors], { type: "text/plain" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "KDEPlasmaTheme.colors"
            a.click()
            URL.revokeObjectURL(url)
          }}
          className="w-full rounded-lg py-2 text-sm font-sans font-medium transition-colors"
          style={{
            backgroundColor: "hsl(var(--accent))",
            color: "hsl(var(--accent-foreground))",
          }}
        >
          Export Plasma Colors
        </button>
        <Link
          href="/docs/kde"
          className="block w-full rounded-lg py-2 text-sm font-sans font-medium text-center transition-colors border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 mt-2"
        >
          How to Install
        </Link>
      </div>
    </div>
  )
}

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "")
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return `${r},${g},${b}`
}

function generatePlasmaColors(theme: KDETheme): string {
  return `[ColorEffects:Disabled]
Color=${hexToRgb(theme.windowBg)}
ColorAmount=0
ColorEffect=0
ContrastAmount=0.65
ContrastEffect=1
IntensityAmount=0.1
IntensityEffect=2

[ColorEffects:Inactive]
ChangeSelectionColor=true
Color=${hexToRgb(theme.windowBg)}
ColorAmount=0.025
ColorEffect=2
ContrastAmount=0.1
ContrastEffect=2
Enable=false
IntensityAmount=0
IntensityEffect=0

[Colors:Button]
BackgroundAlternate=${hexToRgb(theme.windowHeaderBg)}
BackgroundNormal=${hexToRgb(theme.windowHeaderBg)}
DecorationFocus=${hexToRgb(theme.accentColor)}
DecorationHover=${hexToRgb(theme.highlightColor)}
ForegroundActive=${hexToRgb(theme.accentColor)}
ForegroundNormal=${hexToRgb(theme.windowHeaderText)}

[Colors:Selection]
BackgroundAlternate=${hexToRgb(theme.accentColor)}
BackgroundNormal=${hexToRgb(theme.accentColor)}
DecorationFocus=${hexToRgb(theme.accentColor)}
DecorationHover=${hexToRgb(theme.highlightColor)}
ForegroundActive=${hexToRgb(theme.accentColor)}
ForegroundNormal=255,255,255

[Colors:Tooltip]
BackgroundAlternate=${hexToRgb(theme.widgetBg)}
BackgroundNormal=${hexToRgb(theme.widgetBg)}
DecorationFocus=${hexToRgb(theme.accentColor)}
DecorationHover=${hexToRgb(theme.highlightColor)}
ForegroundNormal=${hexToRgb(theme.widgetText)}

[Colors:View]
BackgroundAlternate=${hexToRgb(theme.windowBg)}
BackgroundNormal=${hexToRgb(theme.windowBg)}
DecorationFocus=${hexToRgb(theme.accentColor)}
DecorationHover=${hexToRgb(theme.highlightColor)}
ForegroundActive=${hexToRgb(theme.accentColor)}
ForegroundNormal=${hexToRgb(theme.windowHeaderText)}

[Colors:Window]
BackgroundAlternate=${hexToRgb(theme.windowHeaderBg)}
BackgroundNormal=${hexToRgb(theme.windowBg)}
DecorationFocus=${hexToRgb(theme.accentColor)}
DecorationHover=${hexToRgb(theme.highlightColor)}
ForegroundActive=${hexToRgb(theme.accentColor)}
ForegroundNormal=${hexToRgb(theme.windowHeaderText)}

[General]
ColorScheme=LinuxThemerCustom
Name=Linux Themer Custom
shadeSortColumn=true

[WM]
activeBackground=${hexToRgb(theme.windowHeaderBg)}
activeBlend=${hexToRgb(theme.windowHeaderBg)}
activeForeground=${hexToRgb(theme.windowHeaderText)}
inactiveBackground=${hexToRgb(theme.windowBg)}
inactiveBlend=${hexToRgb(theme.windowBg)}
inactiveForeground=${hexToRgb(theme.windowHeaderText)}
`
}
