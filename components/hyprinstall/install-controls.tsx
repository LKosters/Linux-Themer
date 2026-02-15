"use client"

import Link from "next/link"
import { useHyprInstall, AVAILABLE_PACKAGES } from "./install-context"
import { generateInstallScript } from "./script-generator"
import type { Keybind, WindowRule, MonitorConfig } from "./install-context"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Settings,
  Keyboard,
  Command,
  AppWindow,
  Monitor,
  Play,
  Variable,
  Sparkles,
  Columns3,
  Square,
  Zap,
  Plus,
  X,
  Package,
  PanelTop,
  Paintbrush,
  Download,
} from "lucide-react"
import {
  ColorInput,
  SliderRow,
  Section,
  OptionButtons,
} from "@/components/shared/control-helpers"

const ACTIONS = [
  "exec", "killactive", "exit", "togglefloating", "fullscreen",
  "pseudo", "togglesplit", "movefocus", "workspace", "movetoworkspace",
  "movetoworkspacesilent", "resizeactive", "moveactive", "pin",
  "togglegroup", "changegroupactive", "focusmonitor",
  "movecurrentworkspacetomonitor",
]

export function HyprInstallControls() {
  const { config, updateConfig, presets, applyPreset } = useHyprInstall()

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-4 py-5 border-b border-border">
        <h2 className="font-serif text-2xl text-foreground">Installer</h2>
        <p className="text-xs font-sans text-muted-foreground mt-1 tracking-wide uppercase">
          Full Hyprland setup script
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
        {/* Distro & Packages */}
        <Section title="Packages" icon={Package} defaultOpen>
          <OptionButtons
            label="Distro"
            options={[
              { label: "Arch", value: "arch" as const },
              { label: "Fedora", value: "fedora" as const },
              { label: "Ubuntu", value: "ubuntu" as const },
              { label: "Void", value: "void" as const },
            ]}
            value={config.distro}
            onChange={(v) => updateConfig({ distro: v })}
          />
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-sans text-muted-foreground">
              Packages to Install
            </Label>
            <div className="flex flex-col gap-1">
              {AVAILABLE_PACKAGES.map((pkg) => (
                <label key={pkg} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.packages.includes(pkg)}
                    onChange={(e) => {
                      const packages = e.target.checked
                        ? [...config.packages, pkg]
                        : config.packages.filter((p) => p !== pkg)
                      updateConfig({ packages })
                    }}
                    className="rounded border-border accent-accent h-3 w-3"
                  />
                  <span className="text-[10px] font-mono text-foreground">{pkg}</span>
                </label>
              ))}
            </div>
          </div>
        </Section>

        {/* General */}
        <Section title="General" icon={Settings}>
          <OptionButtons
            label="Layout"
            options={[
              { label: "Dwindle", value: "dwindle" as const },
              { label: "Master", value: "master" as const },
            ]}
            value={config.layout}
            onChange={(v) => updateConfig({ layout: v })}
          />
          <SliderRow
            label="Sensitivity"
            value={config.sensitivity}
            onChange={(v) => updateConfig({ sensitivity: v })}
            min={-1}
            max={1}
            step={0.1}
          />
          <div className="flex items-center justify-between">
            <Label className="text-xs font-sans text-muted-foreground">Resize on Border</Label>
            <Switch checked={config.resizeOnBorder} onCheckedChange={(v) => updateConfig({ resizeOnBorder: v })} />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs font-sans text-muted-foreground">Allow Tearing</Label>
            <Switch checked={config.allowTearing} onCheckedChange={(v) => updateConfig({ allowTearing: v })} />
          </div>
        </Section>

        {/* Gaps & Borders */}
        <Section title="Gaps & Borders" icon={Columns3}>
          <SliderRow label="Border Size" value={config.borderSize} onChange={(v) => updateConfig({ borderSize: v })} min={0} max={6} suffix="px" />
          <SliderRow label="Gaps In" value={config.gapsIn} onChange={(v) => updateConfig({ gapsIn: v })} min={0} max={20} suffix="px" />
          <SliderRow label="Gaps Out" value={config.gapsOut} onChange={(v) => updateConfig({ gapsOut: v })} min={0} max={30} suffix="px" />
          <SliderRow label="Border Radius" value={config.borderRadius} onChange={(v) => updateConfig({ borderRadius: v })} min={0} max={20} suffix="px" />
          <ColorInput label="Active Border" value={config.activeColor} onChange={(v) => updateConfig({ activeColor: v })} />
          <ColorInput label="Inactive Border" value={config.inactiveColor} onChange={(v) => updateConfig({ inactiveColor: v })} />
          <div className="flex items-center justify-between">
            <Label className="text-xs font-sans text-muted-foreground">Gradient Border</Label>
            <Switch checked={config.borderGradient} onCheckedChange={(v) => updateConfig({ borderGradient: v })} />
          </div>
          {config.borderGradient && (
            <>
              <ColorInput label="Gradient Color 2" value={config.borderGradientColor2} onChange={(v) => updateConfig({ borderGradientColor2: v })} />
              <SliderRow label="Gradient Angle" value={config.borderGradientAngle} onChange={(v) => updateConfig({ borderGradientAngle: v })} min={0} max={360} suffix="°" />
            </>
          )}
        </Section>

        {/* Decoration */}
        <Section title="Decoration" icon={Square}>
          <ColorInput label="Window BG" value={config.windowBg} onChange={(v) => updateConfig({ windowBg: v })} />
          <SliderRow label="Active Opacity" value={config.activeOpacity} onChange={(v) => updateConfig({ activeOpacity: v })} min={0.5} max={1} step={0.05} />
          <SliderRow label="Inactive Opacity" value={config.inactiveOpacity} onChange={(v) => updateConfig({ inactiveOpacity: v })} min={0.5} max={1} step={0.05} />
          <div className="flex items-center justify-between">
            <Label className="text-xs font-sans text-muted-foreground">Shadow</Label>
            <Switch checked={config.shadow} onCheckedChange={(v) => updateConfig({ shadow: v })} />
          </div>
          {config.shadow && (
            <>
              <ColorInput label="Shadow Color" value={config.shadowColor} onChange={(v) => updateConfig({ shadowColor: v })} />
              <SliderRow label="Shadow Range" value={config.shadowRange} onChange={(v) => updateConfig({ shadowRange: v })} min={1} max={30} />
              <SliderRow label="Shadow Power" value={config.shadowRenderPower} onChange={(v) => updateConfig({ shadowRenderPower: v })} min={1} max={5} />
            </>
          )}
          <div className="flex items-center justify-between">
            <Label className="text-xs font-sans text-muted-foreground">Dim Inactive</Label>
            <Switch checked={config.dimInactive} onCheckedChange={(v) => updateConfig({ dimInactive: v })} />
          </div>
          {config.dimInactive && (
            <SliderRow label="Dim Strength" value={config.dimStrength} onChange={(v) => updateConfig({ dimStrength: v })} min={0.05} max={0.5} step={0.05} />
          )}
        </Section>

        {/* Blur */}
        <Section title="Blur" icon={Sparkles}>
          <div className="flex items-center justify-between">
            <Label className="text-xs font-sans text-muted-foreground">Enable Blur</Label>
            <Switch checked={config.blurEnabled} onCheckedChange={(v) => updateConfig({ blurEnabled: v })} />
          </div>
          {config.blurEnabled && (
            <>
              <SliderRow label="Size" value={config.blurSize} onChange={(v) => updateConfig({ blurSize: v })} min={1} max={20} />
              <SliderRow label="Passes" value={config.blurPasses} onChange={(v) => updateConfig({ blurPasses: v })} min={1} max={6} />
              <SliderRow label="Vibrancy" value={config.blurVibrancy} onChange={(v) => updateConfig({ blurVibrancy: v })} min={0} max={1} step={0.05} />
            </>
          )}
        </Section>

        {/* Animations */}
        <Section title="Animations" icon={Zap}>
          <div className="flex items-center justify-between">
            <Label className="text-xs font-sans text-muted-foreground">Enable Animations</Label>
            <Switch checked={config.animationEnabled} onCheckedChange={(v) => updateConfig({ animationEnabled: v })} />
          </div>
          {config.animationEnabled && (
            <>
              <OptionButtons
                label="Style"
                options={[
                  { label: "Default", value: "default" as const },
                  { label: "Slide", value: "slide" as const },
                  { label: "Pop-in", value: "popin" as const },
                  { label: "Fade", value: "fade" as const },
                ]}
                value={config.animationStyle}
                onChange={(v) => updateConfig({ animationStyle: v })}
              />
              <SliderRow label="Speed" value={config.animationSpeed} onChange={(v) => updateConfig({ animationSpeed: v })} min={0.3} max={3} step={0.1} suffix="x" />
            </>
          )}
        </Section>

        {/* Waybar */}
        <Section title="Waybar" icon={PanelTop}>
          <OptionButtons
            label="Position"
            options={[
              { label: "Top", value: "top" as const },
              { label: "Bottom", value: "bottom" as const },
            ]}
            value={config.barPosition}
            onChange={(v) => updateConfig({ barPosition: v })}
          />
          <ColorInput label="Background" value={config.barBg} onChange={(v) => updateConfig({ barBg: v })} />
          <ColorInput label="Text Color" value={config.barText} onChange={(v) => updateConfig({ barText: v })} />
          <ColorInput label="Module BG" value={config.barModuleBg} onChange={(v) => updateConfig({ barModuleBg: v })} />
          <SliderRow label="Opacity" value={config.barOpacity} onChange={(v) => updateConfig({ barOpacity: v })} min={0.1} max={1} step={0.05} />
          <SliderRow label="Height" value={config.barHeight} onChange={(v) => updateConfig({ barHeight: v })} min={20} max={42} suffix="px" />
          <SliderRow label="Corner Radius" value={config.barBorderRadius} onChange={(v) => updateConfig({ barBorderRadius: v })} min={0} max={22} suffix="px" />
          <SliderRow label="Margin" value={config.barMargin} onChange={(v) => updateConfig({ barMargin: v })} min={0} max={16} suffix="px" />
          <SliderRow label="Module Radius" value={config.barModuleRadius} onChange={(v) => updateConfig({ barModuleRadius: v })} min={0} max={16} suffix="px" />
          <SliderRow label="Module Spacing" value={config.barModuleSpacing} onChange={(v) => updateConfig({ barModuleSpacing: v })} min={0} max={8} suffix="px" />
          <SliderRow label="Font Size" value={config.barFontSize} onChange={(v) => updateConfig({ barFontSize: v })} min={7} max={14} suffix="px" />
        </Section>

        {/* Colors */}
        <Section title="Colors" icon={Paintbrush}>
          <ColorInput label="Accent" value={config.accentColor} onChange={(v) => updateConfig({ accentColor: v })} />
        </Section>

        {/* Input */}
        <Section title="Input" icon={Keyboard}>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-sans text-muted-foreground">Keyboard Layout</Label>
            <input value={config.kbLayout} onChange={(e) => updateConfig({ kbLayout: e.target.value })}
              className="rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-sans text-foreground" placeholder="us" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-sans text-muted-foreground">Variant</Label>
            <input value={config.kbVariant} onChange={(e) => updateConfig({ kbVariant: e.target.value })}
              className="rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-sans text-foreground" placeholder="optional" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-sans text-muted-foreground">Options</Label>
            <input value={config.kbOptions} onChange={(e) => updateConfig({ kbOptions: e.target.value })}
              className="rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-sans text-foreground" placeholder="e.g. caps:escape" />
          </div>
          <SliderRow label="Repeat Rate" value={config.repeatRate} onChange={(v) => updateConfig({ repeatRate: v })} min={10} max={100} />
          <SliderRow label="Repeat Delay" value={config.repeatDelay} onChange={(v) => updateConfig({ repeatDelay: v })} min={100} max={1000} suffix="ms" />
          <OptionButtons label="Accel Profile" options={[{ label: "Flat", value: "flat" as const }, { label: "Adaptive", value: "adaptive" as const }]} value={config.mouseAccelProfile} onChange={(v) => updateConfig({ mouseAccelProfile: v })} />
          <div className="flex items-center justify-between">
            <Label className="text-xs font-sans text-muted-foreground">Follow Mouse</Label>
            <Switch checked={config.followMouse} onCheckedChange={(v) => updateConfig({ followMouse: v })} />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs font-sans text-muted-foreground">Natural Scroll</Label>
            <Switch checked={config.naturalScroll} onCheckedChange={(v) => updateConfig({ naturalScroll: v })} />
          </div>
          <div className="border-t border-border pt-3 mt-1">
            <span className="text-[10px] font-sans text-muted-foreground uppercase tracking-widest block mb-2">Touchpad</span>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-sans text-muted-foreground">Natural Scroll</Label>
                <Switch checked={config.touchpadNaturalScroll} onCheckedChange={(v) => updateConfig({ touchpadNaturalScroll: v })} />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs font-sans text-muted-foreground">Tap to Click</Label>
                <Switch checked={config.touchpadTapToClick} onCheckedChange={(v) => updateConfig({ touchpadTapToClick: v })} />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs font-sans text-muted-foreground">Disable While Typing</Label>
                <Switch checked={config.touchpadDisableWhileTyping} onCheckedChange={(v) => updateConfig({ touchpadDisableWhileTyping: v })} />
              </div>
            </div>
          </div>
        </Section>

        {/* Keybinds */}
        <Section title="Keybinds" icon={Command}>
          <div className="flex flex-col gap-2">
            {config.keybinds.map((bind, i) => (
              <KeybindRow key={i} bind={bind}
                onChange={(updated) => { const keybinds = [...config.keybinds]; keybinds[i] = updated; updateConfig({ keybinds }) }}
                onDelete={() => updateConfig({ keybinds: config.keybinds.filter((_, j) => j !== i) })} />
            ))}
            <button onClick={() => updateConfig({ keybinds: [...config.keybinds, { mods: ["SUPER"], key: "", action: "exec", args: "" }] })}
              className="flex items-center justify-center gap-1.5 rounded-md border border-dashed border-border px-2.5 py-1.5 text-xs font-sans text-muted-foreground transition-all hover:border-accent hover:text-accent">
              <Plus size={12} /> Add Keybind
            </button>
          </div>
        </Section>

        {/* Window Rules */}
        <Section title="Window Rules" icon={AppWindow}>
          <div className="flex flex-col gap-2">
            {config.windowRules.map((rule, i) => (
              <WindowRuleRow key={i} rule={rule}
                onChange={(updated) => { const windowRules = [...config.windowRules]; windowRules[i] = updated; updateConfig({ windowRules }) }}
                onDelete={() => updateConfig({ windowRules: config.windowRules.filter((_, j) => j !== i) })} />
            ))}
            <button onClick={() => updateConfig({ windowRules: [...config.windowRules, { match: "class:^()$", rules: ["float"] }] })}
              className="flex items-center justify-center gap-1.5 rounded-md border border-dashed border-border px-2.5 py-1.5 text-xs font-sans text-muted-foreground transition-all hover:border-accent hover:text-accent">
              <Plus size={12} /> Add Rule
            </button>
          </div>
        </Section>

        {/* Monitors */}
        <Section title="Monitors" icon={Monitor}>
          <div className="flex flex-col gap-2">
            {config.monitors.map((mon, i) => (
              <MonitorRow key={i} monitor={mon}
                onChange={(updated) => { const monitors = [...config.monitors]; monitors[i] = updated; updateConfig({ monitors }) }}
                onDelete={() => updateConfig({ monitors: config.monitors.filter((_, j) => j !== i) })}
                canDelete={config.monitors.length > 1} />
            ))}
            <button onClick={() => updateConfig({ monitors: [...config.monitors, { name: "", resolution: "preferred", position: "auto", scale: "1" }] })}
              className="flex items-center justify-center gap-1.5 rounded-md border border-dashed border-border px-2.5 py-1.5 text-xs font-sans text-muted-foreground transition-all hover:border-accent hover:text-accent">
              <Plus size={12} /> Add Monitor
            </button>
          </div>
        </Section>

        {/* Autostart */}
        <Section title="Autostart" icon={Play}>
          <div className="flex flex-col gap-2">
            {config.execOnce.map((cmd, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <input value={cmd} onChange={(e) => { const execOnce = [...config.execOnce]; execOnce[i] = e.target.value; updateConfig({ execOnce }) }}
                  className="flex-1 min-w-0 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-mono text-foreground" placeholder="command" />
                <button onClick={() => updateConfig({ execOnce: config.execOnce.filter((_, j) => j !== i) })}
                  className="shrink-0 rounded-md p-1 text-muted-foreground hover:text-destructive transition-colors"><X size={12} /></button>
              </div>
            ))}
            <button onClick={() => updateConfig({ execOnce: [...config.execOnce, ""] })}
              className="flex items-center justify-center gap-1.5 rounded-md border border-dashed border-border px-2.5 py-1.5 text-xs font-sans text-muted-foreground transition-all hover:border-accent hover:text-accent">
              <Plus size={12} /> Add Command
            </button>
          </div>
        </Section>

        {/* Env Variables */}
        <Section title="Env Variables" icon={Variable}>
          <div className="flex flex-col gap-2">
            {config.envVars.map((env, i) => (
              <div key={i} className="flex items-center gap-1 min-w-0">
                <input value={env.key} onChange={(e) => { const envVars = [...config.envVars]; envVars[i] = { ...env, key: e.target.value }; updateConfig({ envVars }) }}
                  className="w-24 shrink-0 min-w-0 rounded-md border border-border bg-background px-2 py-1.5 text-[10px] font-mono text-foreground" placeholder="KEY" />
                <span className="text-[10px] text-muted-foreground shrink-0">=</span>
                <input value={env.value} onChange={(e) => { const envVars = [...config.envVars]; envVars[i] = { ...env, value: e.target.value }; updateConfig({ envVars }) }}
                  className="min-w-0 flex-1 rounded-md border border-border bg-background px-2 py-1.5 text-[10px] font-mono text-foreground" placeholder="value" />
                <button onClick={() => updateConfig({ envVars: config.envVars.filter((_, j) => j !== i) })}
                  className="shrink-0 rounded-md p-1 text-muted-foreground hover:text-destructive transition-colors"><X size={12} /></button>
              </div>
            ))}
            <button onClick={() => updateConfig({ envVars: [...config.envVars, { key: "", value: "" }] })}
              className="flex items-center justify-center gap-1.5 rounded-md border border-dashed border-border px-2.5 py-1.5 text-xs font-sans text-muted-foreground transition-all hover:border-accent hover:text-accent">
              <Plus size={12} /> Add Variable
            </button>
          </div>
        </Section>
      </div>

      <div className="border-t border-border px-4 py-3 space-y-2">
        <button
          onClick={() => {
            const script = generateInstallScript(config)
            const blob = new Blob([script], { type: "text/x-shellscript" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "install-hyprland.sh"
            a.click()
            URL.revokeObjectURL(url)
          }}
          className="w-full rounded-lg py-2 text-sm font-sans font-medium transition-colors flex items-center justify-center gap-2"
          style={{
            backgroundColor: "hsl(var(--accent))",
            color: "hsl(var(--accent-foreground))",
          }}
        >
          <Download size={14} />
          Download install-hyprland.sh
        </button>
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

// ── Sub-components ──────────────────────────────────────────────────────────

function KeybindRow({ bind, onChange, onDelete }: { bind: Keybind; onChange: (b: Keybind) => void; onDelete: () => void }) {
  const MODS = ["S", "Sh", "C", "A"] as const
  const MOD_FULL = { S: "SUPER", Sh: "SHIFT", C: "CTRL", A: "ALT" } as const

  return (
    <div className="rounded-md border border-border p-2 flex flex-col gap-1.5 min-w-0 overflow-hidden">
      <div className="flex items-center gap-0.5">
        <div className="flex items-center gap-0.5 shrink-0">
          {MODS.map((mod) => {
            const full = MOD_FULL[mod]
            return (
              <button key={mod} onClick={() => {
                const mods = bind.mods.includes(full) ? bind.mods.filter((m) => m !== full) : [...bind.mods, full]
                onChange({ ...bind, mods })
              }}
                className="rounded px-1 py-0.5 text-[9px] font-mono transition-all leading-none"
                style={{
                  backgroundColor: bind.mods.includes(full) ? "hsl(var(--accent) / 0.2)" : "transparent",
                  color: bind.mods.includes(full) ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))",
                  borderWidth: 1, borderStyle: "solid",
                  borderColor: bind.mods.includes(full) ? "hsl(var(--accent) / 0.4)" : "hsl(var(--border))",
                }}
                title={full}
              >{mod}</button>
            )
          })}
        </div>
        <span className="text-muted-foreground text-[9px] shrink-0">+</span>
        <input value={bind.key} onChange={(e) => onChange({ ...bind, key: e.target.value })}
          className="min-w-0 flex-1 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono text-foreground" placeholder="key" />
        <button onClick={onDelete} className="shrink-0 rounded p-0.5 text-muted-foreground hover:text-destructive transition-colors"><X size={10} /></button>
      </div>
      <div className="flex items-center gap-1 min-w-0">
        <select value={bind.action} onChange={(e) => onChange({ ...bind, action: e.target.value })}
          className="min-w-0 shrink rounded border border-border bg-background px-1 py-0.5 text-[10px] font-mono text-foreground max-w-[45%]">
          {ACTIONS.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        <input value={bind.args} onChange={(e) => onChange({ ...bind, args: e.target.value })}
          className="min-w-0 flex-1 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono text-foreground" placeholder="args" />
      </div>
    </div>
  )
}

function WindowRuleRow({ rule, onChange, onDelete }: { rule: WindowRule; onChange: (r: WindowRule) => void; onDelete: () => void }) {
  return (
    <div className="rounded-md border border-border p-2 flex flex-col gap-1.5 min-w-0 overflow-hidden">
      <div className="flex items-center gap-1.5 min-w-0">
        <input value={rule.match} onChange={(e) => onChange({ ...rule, match: e.target.value })}
          className="min-w-0 flex-1 rounded border border-border bg-background px-2 py-1 text-[10px] font-mono text-foreground" placeholder="class:^(app)$" />
        <button onClick={onDelete} className="shrink-0 rounded p-0.5 text-muted-foreground hover:text-destructive transition-colors"><X size={10} /></button>
      </div>
      <div className="flex items-center gap-1.5 flex-wrap min-w-0">
        {rule.rules.map((r, i) => (
          <div key={i} className="flex items-center gap-0.5 min-w-0">
            <input value={r} onChange={(e) => { const rules = [...rule.rules]; rules[i] = e.target.value; onChange({ ...rule, rules }) }}
              className="w-20 min-w-0 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono text-foreground" />
            {rule.rules.length > 1 && (
              <button onClick={() => onChange({ ...rule, rules: rule.rules.filter((_, j) => j !== i) })}
                className="shrink-0 text-muted-foreground hover:text-destructive"><X size={8} /></button>
            )}
          </div>
        ))}
        <button onClick={() => onChange({ ...rule, rules: [...rule.rules, ""] })}
          className="shrink-0 rounded px-1 py-0.5 text-[10px] text-muted-foreground hover:text-accent transition-colors"><Plus size={10} /></button>
      </div>
    </div>
  )
}

function MonitorRow({ monitor, onChange, onDelete, canDelete }: { monitor: MonitorConfig; onChange: (m: MonitorConfig) => void; onDelete: () => void; canDelete: boolean }) {
  return (
    <div className="rounded-md border border-border p-2 flex flex-col gap-1.5 min-w-0 overflow-hidden">
      <div className="flex items-center gap-1.5 min-w-0">
        <input value={monitor.name} onChange={(e) => onChange({ ...monitor, name: e.target.value })}
          className="w-16 shrink-0 rounded border border-border bg-background px-1.5 py-1 text-[10px] font-mono text-foreground" placeholder="name" />
        <input value={monitor.resolution} onChange={(e) => onChange({ ...monitor, resolution: e.target.value })}
          className="min-w-0 flex-1 rounded border border-border bg-background px-1.5 py-1 text-[10px] font-mono text-foreground" placeholder="preferred" />
        {canDelete && (
          <button onClick={onDelete} className="shrink-0 rounded p-0.5 text-muted-foreground hover:text-destructive transition-colors"><X size={10} /></button>
        )}
      </div>
      <div className="flex items-center gap-1.5 min-w-0">
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-[9px] text-muted-foreground shrink-0">pos:</span>
          <input value={monitor.position} onChange={(e) => onChange({ ...monitor, position: e.target.value })}
            className="w-14 min-w-0 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono text-foreground" placeholder="auto" />
        </div>
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-[9px] text-muted-foreground shrink-0">scale:</span>
          <input value={monitor.scale} onChange={(e) => onChange({ ...monitor, scale: e.target.value })}
            className="w-10 min-w-0 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono text-foreground" placeholder="1" />
        </div>
      </div>
    </div>
  )
}
