"use client"

import Link from "next/link"
import { useHyprlandTheme } from "./theme-context"
import type { HyprlandTheme } from "./theme-context"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Paintbrush,
  Monitor,
  PanelTop,
  Ratio,
  Columns3,
  Square,
  Sparkles,
  Eye,
  Zap,
  Layout,
} from "lucide-react"
import {
  ColorInput,
  SliderRow,
  Section,
  AspectRatioSelector,
  OptionButtons,
  WallpaperControls,
} from "@/components/shared/control-helpers"

export function HyprlandThemeControls() {
  const { theme, updateTheme, presets, applyPreset } = useHyprlandTheme()

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-4 py-5 border-b border-border">
        <h2 className="font-serif text-2xl text-foreground">Hyprland</h2>
        <p className="text-xs font-sans text-muted-foreground mt-1 tracking-wide uppercase">
          Customize your Hyprland setup
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
          <OptionButtons
            label="Layout"
            options={[
              { label: "Dwindle", value: "dwindle" as const },
              { label: "Master", value: "master" as const },
            ]}
            value={theme.layout}
            onChange={(v) => updateTheme({ layout: v })}
          />
        </Section>

        <Section title="Waybar" icon={PanelTop} defaultOpen>
          <OptionButtons
            label="Position"
            options={[
              { label: "Top", value: "top" as const },
              { label: "Bottom", value: "bottom" as const },
            ]}
            value={theme.barPosition}
            onChange={(v) => updateTheme({ barPosition: v })}
          />
          <ColorInput
            label="Background"
            value={theme.barBg}
            onChange={(v) => updateTheme({ barBg: v })}
          />
          <ColorInput
            label="Text Color"
            value={theme.barText}
            onChange={(v) => updateTheme({ barText: v })}
          />
          <ColorInput
            label="Module BG"
            value={theme.barModuleBg}
            onChange={(v) => updateTheme({ barModuleBg: v })}
          />
          <SliderRow
            label="Opacity"
            value={theme.barOpacity}
            onChange={(v) => updateTheme({ barOpacity: v })}
            min={0.1}
            max={1}
            step={0.05}
          />
          <SliderRow
            label="Height"
            value={theme.barHeight}
            onChange={(v) => updateTheme({ barHeight: v })}
            min={20}
            max={42}
            suffix="px"
          />
          <SliderRow
            label="Corner Radius"
            value={theme.barBorderRadius}
            onChange={(v) => updateTheme({ barBorderRadius: v })}
            min={0}
            max={22}
            suffix="px"
          />
          <SliderRow
            label="Margin"
            value={theme.barMargin}
            onChange={(v) => updateTheme({ barMargin: v })}
            min={0}
            max={16}
            suffix="px"
          />
          <SliderRow
            label="Module Radius"
            value={theme.barModuleRadius}
            onChange={(v) => updateTheme({ barModuleRadius: v })}
            min={0}
            max={16}
            suffix="px"
          />
          <SliderRow
            label="Module Spacing"
            value={theme.barModuleSpacing}
            onChange={(v) => updateTheme({ barModuleSpacing: v })}
            min={0}
            max={8}
            suffix="px"
          />
          <SliderRow
            label="Font Size"
            value={theme.barFontSize}
            onChange={(v) => updateTheme({ barFontSize: v })}
            min={7}
            max={14}
            suffix="px"
          />
        </Section>

        <Section title="Borders" icon={Square}>
          <SliderRow
            label="Size"
            value={theme.borderSize}
            onChange={(v) => updateTheme({ borderSize: v })}
            min={0}
            max={6}
            suffix="px"
          />
          <SliderRow
            label="Radius"
            value={theme.borderRadius}
            onChange={(v) => updateTheme({ borderRadius: v })}
            min={0}
            max={20}
            suffix="px"
          />
          <ColorInput
            label="Active"
            value={theme.activeColor}
            onChange={(v) => updateTheme({ activeColor: v })}
          />
          <ColorInput
            label="Inactive"
            value={theme.inactiveColor}
            onChange={(v) => updateTheme({ inactiveColor: v })}
          />
          <div className="flex items-center justify-between">
            <Label className="text-xs font-sans text-muted-foreground">
              Gradient Border
            </Label>
            <Switch
              checked={theme.borderGradient}
              onCheckedChange={(v) => updateTheme({ borderGradient: v })}
            />
          </div>
          {theme.borderGradient && (
            <>
              <ColorInput
                label="Gradient Color 2"
                value={theme.borderGradientColor2}
                onChange={(v) => updateTheme({ borderGradientColor2: v })}
              />
              <SliderRow
                label="Gradient Angle"
                value={theme.borderGradientAngle}
                onChange={(v) => updateTheme({ borderGradientAngle: v })}
                min={0}
                max={360}
                suffix="°"
              />
            </>
          )}
        </Section>

        <Section title="Gaps" icon={Columns3}>
          <SliderRow
            label="Inner"
            value={theme.gapsIn}
            onChange={(v) => updateTheme({ gapsIn: v })}
            min={0}
            max={20}
            suffix="px"
          />
          <SliderRow
            label="Outer"
            value={theme.gapsOut}
            onChange={(v) => updateTheme({ gapsOut: v })}
            min={0}
            max={30}
            suffix="px"
          />
        </Section>

        <Section title="Windows" icon={Monitor}>
          <ColorInput
            label="Background"
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
          <div className="flex items-center justify-between">
            <Label className="text-xs font-sans text-muted-foreground">
              Shadow
            </Label>
            <Switch
              checked={theme.windowShadow}
              onCheckedChange={(v) => updateTheme({ windowShadow: v })}
            />
          </div>
          {theme.windowShadow && (
            <>
              <ColorInput
                label="Shadow Color"
                value={theme.shadowColor}
                onChange={(v) => updateTheme({ shadowColor: v })}
              />
              <SliderRow
                label="Shadow Range"
                value={theme.shadowRange}
                onChange={(v) => updateTheme({ shadowRange: v })}
                min={1}
                max={30}
              />
              <SliderRow
                label="Shadow Power"
                value={theme.shadowRenderPower}
                onChange={(v) => updateTheme({ shadowRenderPower: v })}
                min={1}
                max={5}
              />
            </>
          )}
        </Section>

        <Section title="Blur" icon={Sparkles}>
          <div className="flex items-center justify-between">
            <Label className="text-xs font-sans text-muted-foreground">
              Enable Blur
            </Label>
            <Switch
              checked={theme.blurEnabled}
              onCheckedChange={(v) => updateTheme({ blurEnabled: v })}
            />
          </div>
          {theme.blurEnabled && (
            <>
              <SliderRow
                label="Size"
                value={theme.blurSize}
                onChange={(v) => updateTheme({ blurSize: v })}
                min={1}
                max={20}
              />
              <SliderRow
                label="Passes"
                value={theme.blurPasses}
                onChange={(v) => updateTheme({ blurPasses: v })}
                min={1}
                max={6}
              />
              <SliderRow
                label="Vibrancy"
                value={theme.blurVibrancy}
                onChange={(v) => updateTheme({ blurVibrancy: v })}
                min={0}
                max={1}
                step={0.05}
              />
            </>
          )}
        </Section>

        <Section title="Animations" icon={Zap}>
          <div className="flex items-center justify-between">
            <Label className="text-xs font-sans text-muted-foreground">
              Enable Animations
            </Label>
            <Switch
              checked={theme.animationEnabled}
              onCheckedChange={(v) => updateTheme({ animationEnabled: v })}
            />
          </div>
          {theme.animationEnabled && (
            <>
              <OptionButtons
                label="Style"
                options={[
                  { label: "Default", value: "default" as const },
                  { label: "Slide", value: "slide" as const },
                  { label: "Pop-in", value: "popin" as const },
                  { label: "Fade", value: "fade" as const },
                ]}
                value={theme.animationStyle}
                onChange={(v) => updateTheme({ animationStyle: v })}
              />
              <SliderRow
                label="Speed"
                value={theme.animationSpeed}
                onChange={(v) => updateTheme({ animationSpeed: v })}
                min={0.3}
                max={3}
                step={0.1}
                suffix="x"
              />
            </>
          )}
        </Section>

        <Section title="Effects" icon={Eye}>
          <div className="flex items-center justify-between">
            <Label className="text-xs font-sans text-muted-foreground">
              Dim Inactive
            </Label>
            <Switch
              checked={theme.dimInactive}
              onCheckedChange={(v) => updateTheme({ dimInactive: v })}
            />
          </div>
          {theme.dimInactive && (
            <SliderRow
              label="Dim Strength"
              value={theme.dimStrength}
              onChange={(v) => updateTheme({ dimStrength: v })}
              min={0.05}
              max={0.5}
              step={0.05}
            />
          )}
        </Section>

        <Section title="Colors" icon={Paintbrush}>
          <ColorInput
            label="Accent"
            value={theme.accentColor}
            onChange={(v) => updateTheme({ accentColor: v })}
          />
        </Section>

        <Section title="Wallpaper" icon={Layout}>
          <WallpaperControls
            gradientFrom={theme.wallpaperGradientFrom}
            gradientTo={theme.wallpaperGradientTo}
            imageUrl={theme.wallpaperImageUrl}
            imageOpacity={theme.wallpaperImageOpacity}
            onUpdate={(u) => updateTheme(u as Partial<HyprlandTheme>)}
          />
        </Section>
      </div>

      <div className="border-t border-border px-4 py-3 space-y-2">
        <div className="flex gap-2">
          <button
            onClick={() => {
              const conf = generateHyprlandConf(theme)
              const blob = new Blob([conf], { type: "text/plain" })
              const url = URL.createObjectURL(blob)
              const a = document.createElement("a")
              a.href = url
              a.download = "hyprland.conf"
              a.click()
              URL.revokeObjectURL(url)
            }}
            className="flex-1 rounded-lg py-2 text-sm font-sans font-medium transition-colors"
            style={{
              backgroundColor: "hsl(var(--accent))",
              color: "hsl(var(--accent-foreground))",
            }}
          >
            Export Config
          </button>
          <button
            onClick={() => {
              const css = generateWaybarCSS(theme)
              const blob = new Blob([css], { type: "text/css" })
              const url = URL.createObjectURL(blob)
              const a = document.createElement("a")
              a.href = url
              a.download = "waybar-style.css"
              a.click()
              URL.revokeObjectURL(url)
            }}
            className="flex-1 rounded-lg py-2 text-sm font-sans font-medium transition-colors border border-border text-foreground hover:bg-muted/50"
          >
            Export Waybar CSS
          </button>
        </div>
        <Link
          href="/docs/hyprland"
          className="block w-full rounded-lg py-2 text-sm font-sans font-medium text-center transition-colors border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50"
        >
          How to Install
        </Link>
      </div>
    </div>
  )
}

function generateHyprlandConf(theme: HyprlandTheme): string {
  const gradientBorder = theme.borderGradient
    ? `col.active_border = rgb(${theme.activeColor.slice(1)}) rgb(${theme.borderGradientColor2.slice(1)}) ${theme.borderGradientAngle}deg`
    : `col.active_border = rgb(${theme.activeColor.slice(1)})`

  return `# Generated Hyprland Config

general {
    border_size = ${theme.borderSize}
    gaps_in = ${theme.gapsIn}
    gaps_out = ${theme.gapsOut}
    ${gradientBorder}
    col.inactive_border = rgb(${theme.inactiveColor.slice(1)})
    layout = ${theme.layout}
}

decoration {
    rounding = ${theme.borderRadius}
    active_opacity = ${theme.windowOpacity}
    inactive_opacity = ${Math.max(theme.windowOpacity - 0.1, 0.5).toFixed(2)}
    dim_inactive = ${theme.dimInactive}
    dim_strength = ${theme.dimStrength}

    shadow {
        enabled = ${theme.windowShadow}
        color = 0x${theme.shadowColor.slice(1)}
        range = ${theme.shadowRange}
        render_power = ${theme.shadowRenderPower}
    }

    blur {
        enabled = ${theme.blurEnabled}
        size = ${theme.blurSize}
        passes = ${theme.blurPasses}
        vibrancy = ${theme.blurVibrancy}
    }
}

animations {
    enabled = ${theme.animationEnabled}

    bezier = smooth, 0.05, 0.9, 0.1, 1.05
    bezier = quick, 0.25, 1, 0.5, 1

    animation = windows, 1, ${(7 / theme.animationSpeed).toFixed(0)}, smooth, ${theme.animationStyle === "default" ? "" : theme.animationStyle}
    animation = windowsOut, 1, ${(7 / theme.animationSpeed).toFixed(0)}, smooth, ${theme.animationStyle === "default" ? "" : theme.animationStyle === "popin" ? "popin 80%" : theme.animationStyle}
    animation = fade, 1, ${(7 / theme.animationSpeed).toFixed(0)}, smooth
    animation = workspaces, 1, ${(6 / theme.animationSpeed).toFixed(0)}, smooth, ${theme.animationStyle === "slide" ? "slide" : "fade"}
}
`
}

function generateWaybarCSS(theme: HyprlandTheme): string {
  return `/* Generated Waybar CSS */

* {
    font-family: "JetBrains Mono", monospace;
    font-size: ${theme.barFontSize + 2}px;
}

window#waybar {
    background-color: ${theme.barBg};
    color: ${theme.barText};
    opacity: ${theme.barOpacity};${theme.barBorderRadius > 0 ? `
    border-radius: ${theme.barBorderRadius}px;` : ""}${theme.barMargin > 0 ? `
    margin: ${theme.barMargin}px;` : ""}
}

#workspaces button {
    padding: 2px 8px;
    color: ${theme.barText};
    background: transparent;
    border-radius: ${theme.barModuleRadius}px;
    margin: 0 ${theme.barModuleSpacing}px;
}

#workspaces button.active {
    background: ${theme.accentColor};
    color: ${theme.barBg};
}

#clock,
#network,
#pulseaudio,
#battery {
    padding: 2px 10px;
    margin: 4px ${theme.barModuleSpacing}px;
    background: ${theme.barModuleBg};
    border-radius: ${theme.barModuleRadius}px;
    color: ${theme.barText};
}

#clock {
    color: ${theme.accentColor};
    font-weight: bold;
}
`
}
