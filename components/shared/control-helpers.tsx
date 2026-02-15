"use client"

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"

export function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (val: string) => void
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Label className="text-xs font-sans text-muted-foreground shrink-0">
        {label}
      </Label>
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 h-6 w-6 cursor-pointer opacity-0"
          />
          <div
            className="h-6 w-6 rounded-md border border-border"
            style={{ backgroundColor: value }}
          />
        </div>
        <span className="text-[10px] font-mono text-muted-foreground uppercase w-16">
          {value}
        </span>
      </div>
    </div>
  )
}

export function SliderRow({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix = "",
}: {
  label: string
  value: number
  onChange: (val: number) => void
  min: number
  max: number
  step?: number
  suffix?: string
}) {
  return (
    <div className="flex items-center justify-between">
      <Label className="text-xs font-sans text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-2 w-32">
        <Slider
          value={[value ?? min]}
          onValueChange={([v]) => onChange(v)}
          min={min}
          max={max}
          step={step}
          className="flex-1"
        />
        <span className="text-[10px] font-mono text-muted-foreground w-8 text-right">
          {step < 1 ? (value ?? 0).toFixed(2) : (value ?? 0)}{suffix}
        </span>
      </div>
    </div>
  )
}

export function Section({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string
  icon: React.ElementType
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/50"
      >
        <Icon size={14} className="text-accent" />
        <span className="text-sm font-sans font-medium text-foreground flex-1">
          {title}
        </span>
        {open ? (
          <ChevronDown size={14} className="text-muted-foreground" />
        ) : (
          <ChevronRight size={14} className="text-muted-foreground" />
        )}
      </button>
      {open && <div className="flex flex-col gap-3 px-4 pb-4">{children}</div>}
    </div>
  )
}

export const ASPECT_RATIOS = [
  { label: "16:10", value: "16/10" },
  { label: "16:9", value: "16/9" },
  { label: "4:3", value: "4/3" },
  { label: "21:9", value: "21/9" },
  { label: "3:2", value: "3/2" },
]

export function AspectRatioSelector({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs font-sans text-muted-foreground">
        Aspect Ratio
      </Label>
      <div className="flex flex-wrap gap-1.5">
        {ASPECT_RATIOS.map((ar) => (
          <button
            key={ar.value}
            onClick={() => onChange(ar.value)}
            className="rounded-md border px-2.5 py-1 text-xs font-sans transition-all"
            style={{
              borderColor:
                value === ar.value
                  ? "hsl(var(--accent))"
                  : "hsl(var(--border))",
              color:
                value === ar.value
                  ? "hsl(var(--accent))"
                  : "hsl(var(--foreground))",
              backgroundColor:
                value === ar.value
                  ? "hsl(var(--accent) / 0.1)"
                  : "transparent",
            }}
          >
            {ar.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export function OptionButtons<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { label: string; value: T }[]
  value: T
  onChange: (val: T) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs font-sans text-muted-foreground">{label}</Label>
      <div className="flex gap-1.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className="flex-1 rounded-md border px-2 py-1 text-xs font-sans transition-all"
            style={{
              borderColor:
                value === opt.value
                  ? "hsl(var(--accent))"
                  : "hsl(var(--border))",
              color:
                value === opt.value
                  ? "hsl(var(--accent))"
                  : "hsl(var(--foreground))",
              backgroundColor:
                value === opt.value
                  ? "hsl(var(--accent) / 0.1)"
                  : "transparent",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export function WallpaperControls({
  gradientFrom,
  gradientTo,
  imageUrl,
  imageOpacity,
  onUpdate,
}: {
  gradientFrom: string
  gradientTo: string
  imageUrl: string
  imageOpacity: number
  onUpdate: (updates: Record<string, unknown>) => void
}) {
  const fileInputRef = useState<HTMLInputElement | null>(null)

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    onUpdate({ wallpaperImageUrl: url })
  }

  return (
    <>
      <ColorInput
        label="Gradient From"
        value={gradientFrom}
        onChange={(v) => onUpdate({ wallpaperGradientFrom: v })}
      />
      <ColorInput
        label="Gradient To"
        value={gradientTo}
        onChange={(v) => onUpdate({ wallpaperGradientTo: v })}
      />
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-sans text-muted-foreground">
          Wallpaper Image
        </Label>
        <input
          ref={(el) => { fileInputRef[1](el) }}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef[0]?.click()}
            className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-sans text-foreground transition-all hover:border-accent hover:text-accent"
          >
            {imageUrl ? "Change Image" : "Upload Image"}
          </button>
          {imageUrl && (
            <button
              onClick={() => onUpdate({ wallpaperImageUrl: "" })}
              className="rounded-md border border-border px-2 py-1.5 text-xs font-sans text-destructive transition-all hover:border-destructive"
            >
              Remove
            </button>
          )}
        </div>
        {imageUrl && (
          <div
            className="h-16 w-full rounded-md border border-border bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        )}
      </div>
      {imageUrl && (
        <SliderRow
          label="Image Opacity"
          value={imageOpacity}
          onChange={(v) => onUpdate({ wallpaperImageOpacity: v })}
          min={0.05}
          max={1}
          step={0.05}
        />
      )}
    </>
  )
}
