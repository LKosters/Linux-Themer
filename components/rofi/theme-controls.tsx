"use client"

import Link from "next/link"
import { useRofiTheme } from "./theme-context"
import type { RofiTheme } from "./theme-context"
import {
  Ratio,
  Layout,
  Square,
  Type,
  List,
  CheckSquare,
  Paintbrush,
  Monitor,
} from "lucide-react"
import {
  ColorInput,
  SliderRow,
  Section,
  AspectRatioSelector,
  OptionButtons,
  WallpaperControls,
} from "@/components/shared/control-helpers"

export function RofiThemeControls() {
  const { theme, updateTheme, presets, applyPreset } = useRofiTheme()

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-4 py-5 border-b border-border">
        <h2 className="font-serif text-2xl text-foreground">Rofi</h2>
        <p className="text-xs font-sans text-muted-foreground mt-1 tracking-wide uppercase">
          Customize your Rofi launcher
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

        <Section title="Layout" icon={Layout} defaultOpen>
          <OptionButtons
            label="Mode"
            options={[
              { label: "Apps", value: "drun" as const },
              { label: "Run", value: "run" as const },
              { label: "Window", value: "window" as const },
            ]}
            value={theme.mode}
            onChange={(v) => updateTheme({ mode: v })}
          />
          <SliderRow
            label="Width"
            value={theme.width}
            onChange={(v) => updateTheme({ width: v })}
            min={300}
            max={900}
            suffix="px"
          />
          <SliderRow
            label="Visible Rows"
            value={theme.lines}
            onChange={(v) => updateTheme({ lines: v })}
            min={3}
            max={15}
          />
          <SliderRow
            label="Columns"
            value={theme.columns}
            onChange={(v) => updateTheme({ columns: v })}
            min={1}
            max={3}
          />
        </Section>

        <Section title="Window" icon={Square}>
          <ColorInput
            label="Background"
            value={theme.windowBg}
            onChange={(v) => updateTheme({ windowBg: v })}
          />
          <SliderRow
            label="Border Radius"
            value={theme.windowBorderRadius}
            onChange={(v) => updateTheme({ windowBorderRadius: v })}
            min={0}
            max={24}
            suffix="px"
          />
          <SliderRow
            label="Border Size"
            value={theme.windowBorderSize}
            onChange={(v) => updateTheme({ windowBorderSize: v })}
            min={0}
            max={6}
            suffix="px"
          />
          <ColorInput
            label="Border Color"
            value={theme.windowBorderColor}
            onChange={(v) => updateTheme({ windowBorderColor: v })}
          />
          <SliderRow
            label="Padding"
            value={theme.windowPadding}
            onChange={(v) => updateTheme({ windowPadding: v })}
            min={5}
            max={40}
            suffix="px"
          />
          <SliderRow
            label="Opacity"
            value={theme.windowOpacity}
            onChange={(v) => updateTheme({ windowOpacity: v })}
            min={0.5}
            max={1}
            step={0.05}
          />
        </Section>

        <Section title="Input Bar" icon={Type}>
          <ColorInput
            label="Background"
            value={theme.inputbarBg}
            onChange={(v) => updateTheme({ inputbarBg: v })}
          />
          <ColorInput
            label="Text Color"
            value={theme.inputbarText}
            onChange={(v) => updateTheme({ inputbarText: v })}
          />
          <SliderRow
            label="Font Size"
            value={theme.inputbarFontSize}
            onChange={(v) => updateTheme({ inputbarFontSize: v })}
            min={10}
            max={24}
            suffix="px"
          />
          <SliderRow
            label="Border Radius"
            value={theme.inputbarBorderRadius}
            onChange={(v) => updateTheme({ inputbarBorderRadius: v })}
            min={0}
            max={16}
            suffix="px"
          />
          <SliderRow
            label="Padding"
            value={theme.inputbarPadding}
            onChange={(v) => updateTheme({ inputbarPadding: v })}
            min={4}
            max={20}
            suffix="px"
          />
        </Section>

        <Section title="List Items" icon={List}>
          <ColorInput
            label="Text Color"
            value={theme.elementText}
            onChange={(v) => updateTheme({ elementText: v })}
          />
          <SliderRow
            label="Border Radius"
            value={theme.elementBorderRadius}
            onChange={(v) => updateTheme({ elementBorderRadius: v })}
            min={0}
            max={16}
            suffix="px"
          />
          <SliderRow
            label="Padding"
            value={theme.elementPadding}
            onChange={(v) => updateTheme({ elementPadding: v })}
            min={2}
            max={16}
            suffix="px"
          />
          <SliderRow
            label="Spacing"
            value={theme.listviewSpacing}
            onChange={(v) => updateTheme({ listviewSpacing: v })}
            min={0}
            max={12}
            suffix="px"
          />
        </Section>

        <Section title="Selection" icon={CheckSquare}>
          <ColorInput
            label="Background"
            value={theme.selectedBg}
            onChange={(v) => updateTheme({ selectedBg: v })}
          />
          <ColorInput
            label="Text Color"
            value={theme.selectedText}
            onChange={(v) => updateTheme({ selectedText: v })}
          />
        </Section>

        <Section title="Colors" icon={Paintbrush}>
          <ColorInput
            label="Accent"
            value={theme.accentColor}
            onChange={(v) => updateTheme({ accentColor: v })}
          />
          <ColorInput
            label="Prompt"
            value={theme.promptColor}
            onChange={(v) => updateTheme({ promptColor: v })}
          />
        </Section>

        <Section title="Wallpaper" icon={Monitor}>
          <WallpaperControls
            gradientFrom={theme.wallpaperGradientFrom}
            gradientTo={theme.wallpaperGradientTo}
            imageUrl={theme.wallpaperImageUrl}
            imageOpacity={theme.wallpaperImageOpacity}
            onUpdate={(u) => updateTheme(u as Partial<RofiTheme>)}
          />
        </Section>
      </div>

      <div className="border-t border-border px-4 py-3">
        <button
          onClick={() => {
            const rasi = generateRofiRasi(theme)
            const blob = new Blob([rasi], { type: "text/plain" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "rofi-theme.rasi"
            a.click()
            URL.revokeObjectURL(url)
          }}
          className="w-full rounded-lg py-2 text-sm font-sans font-medium transition-colors"
          style={{
            backgroundColor: "hsl(var(--accent))",
            color: "hsl(var(--accent-foreground))",
          }}
        >
          Export Rofi Theme
        </button>
        <Link
          href="/docs/rofi"
          className="block w-full rounded-lg py-2 text-sm font-sans font-medium text-center transition-colors border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 mt-2"
        >
          How to Install
        </Link>
      </div>
    </div>
  )
}

function generateRofiRasi(theme: RofiTheme): string {
  return `/* Generated Rofi Theme */

* {
    bg: ${theme.windowBg};
    fg: ${theme.elementText};
    accent: ${theme.accentColor};
    selected-bg: ${theme.selectedBg};
    selected-fg: ${theme.selectedText};
}

configuration {
    show-icons: true;
    display-drun: "";
    display-run: "";
    display-window: "";
}

window {
    width: ${theme.width}px;
    border-radius: ${theme.windowBorderRadius}px;
    border: ${theme.windowBorderSize}px solid;
    border-color: ${theme.windowBorderColor};
    background-color: ${theme.windowBg};
    padding: ${theme.windowPadding}px;
    transparency: "real";
}

inputbar {
    background-color: ${theme.inputbarBg};
    text-color: ${theme.inputbarText};
    border-radius: ${theme.inputbarBorderRadius}px;
    padding: ${theme.inputbarPadding}px;
    children: [prompt, entry];
    spacing: 8px;
}

prompt {
    text-color: ${theme.promptColor};
    font: "monospace ${theme.inputbarFontSize}";
}

entry {
    text-color: ${theme.inputbarText};
    placeholder: "${theme.inputbarPlaceholder}";
    placeholder-color: ${theme.inputbarText}80;
    font: "monospace ${theme.inputbarFontSize}";
}

listview {
    background-color: transparent;
    columns: ${theme.columns};
    lines: ${theme.lines};
    spacing: ${theme.listviewSpacing}px;
    fixed-height: true;
}

element {
    background-color: transparent;
    text-color: ${theme.elementText};
    border-radius: ${theme.elementBorderRadius}px;
    padding: ${theme.elementPadding}px;
}

element selected {
    background-color: ${theme.selectedBg};
    text-color: ${theme.selectedText};
}

element-icon {
    size: 24px;
}

element-text {
    text-color: inherit;
}
`
}
