"use client"

import Link from "next/link"
import { useNiriTheme } from "./theme-context"
import type { NiriTheme } from "./theme-context"
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

export function NiriThemeControls() {
  const { theme, updateTheme, presets, applyPreset } = useNiriTheme()

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-4 py-5 border-b border-border">
        <h2 className="font-serif text-2xl text-foreground">Niri</h2>
        <p className="text-xs font-sans text-muted-foreground mt-1 tracking-wide uppercase">
          Customize your Niri setup
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
          <OptionButtons
            label="Workspaces"
            options={[
              { label: "123", value: "numbers" as const },
              { label: "Dots", value: "dots" as const },
              { label: "Pills", value: "pills" as const },
              { label: "Roman", value: "roman" as const },
              { label: "Lines", value: "lines" as const },
            ]}
            value={theme.workspaceStyle ?? "numbers"}
            onChange={(v) => updateTheme({ workspaceStyle: v })}
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

        <Section title="Focus Ring" icon={Square}>
          <SliderRow
            label="Width"
            value={theme.focusRingWidth}
            onChange={(v) => updateTheme({ focusRingWidth: v })}
            min={0}
            max={6}
            suffix="px"
          />
          <ColorInput
            label="Active"
            value={theme.focusRingColor}
            onChange={(v) => updateTheme({ focusRingColor: v })}
          />
          <ColorInput
            label="Inactive"
            value={theme.inactiveColor}
            onChange={(v) => updateTheme({ inactiveColor: v })}
          />
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
          <SliderRow
            label="Corner Radius"
            value={theme.borderRadius}
            onChange={(v) => updateTheme({ borderRadius: v })}
            min={0}
            max={20}
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
                label="Shadow Size"
                value={theme.shadowSize}
                onChange={(v) => updateTheme({ shadowSize: v })}
                min={1}
                max={40}
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
                label="Radius"
                value={theme.blurRadius}
                onChange={(v) => updateTheme({ blurRadius: v })}
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
                  { label: "Cubic", value: "ease-out-cubic" as const },
                  { label: "Expo", value: "ease-out-expo" as const },
                  { label: "Spring", value: "spring" as const },
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
            onUpdate={(u) => updateTheme(u as Partial<NiriTheme>)}
          />
        </Section>
      </div>

      <div className="border-t border-border px-4 py-3 space-y-2">
        <div className="flex gap-2">
          <button
            onClick={() => {
              const conf = generateNiriConfig(theme)
              const blob = new Blob([conf], { type: "text/plain" })
              const url = URL.createObjectURL(blob)
              const a = document.createElement("a")
              a.href = url
              a.download = "config.kdl"
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
          href="/docs/niri"
          className="block w-full rounded-lg py-2 text-sm font-sans font-medium text-center transition-colors border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50"
        >
          How to Install
        </Link>
      </div>
    </div>
  )
}

function generateNiriConfig(theme: NiriTheme): string {
  const easing = theme.animationStyle === "spring"
    ? `spring damping-ratio=0.6 stiffness=800 epsilon=0.0001`
    : theme.animationStyle === "ease-out-expo"
    ? `easing-curve "ease-out-expo"`
    : `easing-curve "ease-out-cubic"`

  return `// Niri Config — Generated by Linux Themer

input {
    keyboard {
        xkb {
            layout "us"
        }
    }

    touchpad {
        tap
        natural-scroll
    }
}

output "eDP-1" {
    scale 1.0
}

layout {
    gaps ${theme.gapsIn}

    center-focused-column "never"

    preset-column-widths {
        proportion 0.33333
        proportion 0.5
        proportion 0.66667
    }

    default-column-width { proportion 0.5; }

    focus-ring {
        width ${theme.focusRingWidth}
        active-color "${theme.focusRingColor}"
        inactive-color "${theme.inactiveColor}"
    }

    border {
        off
    }

    struts {
        left ${theme.gapsOut}
        right ${theme.gapsOut}
        top ${theme.gapsOut}
        bottom ${theme.gapsOut}
    }
}

prefer-no-csd

screenshot-path "~/Pictures/Screenshots/Screenshot from %Y-%m-%d %H-%M-%S.png"

${theme.animationEnabled ? `animations {
    slowdown ${theme.animationSpeed}

    workspace-switch {
        ${easing}
        duration-ms ${Math.round(250 / theme.animationSpeed)}
    }

    window-open {
        ${easing}
        duration-ms ${Math.round(200 / theme.animationSpeed)}
    }

    window-close {
        ${easing}
        duration-ms ${Math.round(150 / theme.animationSpeed)}
    }

    horizontal-view-movement {
        ${easing}
        duration-ms ${Math.round(250 / theme.animationSpeed)}
    }

    window-movement {
        ${easing}
        duration-ms ${Math.round(200 / theme.animationSpeed)}
    }

    window-resize {
        ${easing}
        duration-ms ${Math.round(200 / theme.animationSpeed)}
    }

    config-notification-open-close {
        ${easing}
        duration-ms ${Math.round(200 / theme.animationSpeed)}
    }
}` : `animations {
    off
}`}

window-rule {
    geometry-corner-radius ${theme.borderRadius}
    clip-to-geometry true
}

decoration {
    corner-radius ${theme.borderRadius}
}
`
}

function generateWaybarCSS(theme: NiriTheme): string {
  return `/* Niri Waybar CSS — Generated by Linux Themer */

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
