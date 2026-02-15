"use client"

import Link from "next/link"
import { useNiriconf } from "./config-context"
import { generateNiriKdl } from "./config-preview"
import type { NiriKeybind, NiriWindowRule } from "./config-context"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Settings,
  Keyboard,
  Command,
  AppWindow,
  Play,
  Variable,
  Columns3,
  Square,
  Zap,
  Plus,
  X,
} from "lucide-react"
import {
  ColorInput,
  SliderRow,
  Section,
  OptionButtons,
} from "@/components/shared/control-helpers"

const ACTIONS = [
  "spawn", "close-window", "quit", "focus-column-left", "focus-column-right",
  "focus-window-up", "focus-window-down", "move-column-left", "move-column-right",
  "move-window-up", "move-window-down", "focus-workspace", "move-column-to-workspace",
  "maximize-column", "fullscreen-window", "set-column-width", "switch-preset-column-width",
  "consume-window-into-column", "expel-window-from-column", "screenshot", "screenshot-window",
  "screenshot-screen", "toggle-window-floating",
]

export function NiriconfControls() {
  const { config, updateConfig, presets, applyPreset } = useNiriconf()

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-4 py-5 border-b border-border">
        <h2 className="font-serif text-2xl text-foreground">Niri Config</h2>
        <p className="text-xs font-sans text-muted-foreground mt-1 tracking-wide uppercase">
          Full Niri configuration
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
        {/* Layout */}
        <Section title="Layout" icon={Settings} defaultOpen>
          <OptionButtons
            label="Default Column Width"
            options={[
              { label: "⅓", value: "proportion 0.33333" as const },
              { label: "½", value: "proportion 0.5" as const },
              { label: "⅔", value: "proportion 0.66667" as const },
              { label: "960px", value: "fixed 960" as const },
            ]}
            value={config.defaultColumnWidth}
            onChange={(v) => updateConfig({ defaultColumnWidth: v })}
          />
          <OptionButtons
            label="Center Focused"
            options={[
              { label: "Never", value: "never" as const },
              { label: "Always", value: "always" as const },
              { label: "Overflow", value: "on-overflow" as const },
            ]}
            value={config.centerFocusedColumn}
            onChange={(v) => updateConfig({ centerFocusedColumn: v })}
          />
        </Section>

        {/* Gaps & Focus Ring */}
        <Section title="Gaps & Ring" icon={Columns3} defaultOpen>
          <SliderRow label="Gaps" value={config.gapsIn} onChange={(v) => updateConfig({ gapsIn: v })} min={0} max={24} suffix="px" />
          <SliderRow label="Struts" value={config.gapsOut} onChange={(v) => updateConfig({ gapsOut: v })} min={0} max={30} suffix="px" />
          <SliderRow label="Corner Radius" value={config.borderRadius} onChange={(v) => updateConfig({ borderRadius: v })} min={0} max={20} suffix="px" />
          <SliderRow label="Ring Width" value={config.focusRingWidth} onChange={(v) => updateConfig({ focusRingWidth: v })} min={0} max={6} suffix="px" />
          <ColorInput label="Active Ring" value={config.focusRingActiveColor} onChange={(v) => updateConfig({ focusRingActiveColor: v })} />
          <ColorInput label="Inactive Ring" value={config.focusRingInactiveColor} onChange={(v) => updateConfig({ focusRingInactiveColor: v })} />
        </Section>

        {/* Decoration */}
        <Section title="Decoration" icon={Square}>
          <SliderRow label="Active Opacity" value={config.activeOpacity} onChange={(v) => updateConfig({ activeOpacity: v })} min={0.5} max={1} step={0.05} />
          <SliderRow label="Inactive Opacity" value={config.inactiveOpacity} onChange={(v) => updateConfig({ inactiveOpacity: v })} min={0.5} max={1} step={0.05} />
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
                  { label: "Cubic", value: "ease-out-cubic" as const },
                  { label: "Expo", value: "ease-out-expo" as const },
                  { label: "Spring", value: "spring" as const },
                ]}
                value={config.animationStyle}
                onChange={(v) => updateConfig({ animationStyle: v })}
              />
              <SliderRow label="Speed" value={config.animationSpeed} onChange={(v) => updateConfig({ animationSpeed: v })} min={0.3} max={3} step={0.1} suffix="x" />
            </>
          )}
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
              <NiriKeybindRow key={i} bind={bind}
                onChange={(updated) => { const keybinds = [...config.keybinds]; keybinds[i] = updated; updateConfig({ keybinds }) }}
                onDelete={() => updateConfig({ keybinds: config.keybinds.filter((_, j) => j !== i) })} />
            ))}
            <button onClick={() => updateConfig({ keybinds: [...config.keybinds, { mods: ["Mod"], key: "", action: "spawn", args: "" }] })}
              className="flex items-center justify-center gap-1.5 rounded-md border border-dashed border-border px-2.5 py-1.5 text-xs font-sans text-muted-foreground transition-all hover:border-accent hover:text-accent">
              <Plus size={12} /> Add Keybind
            </button>
          </div>
        </Section>

        {/* Window Rules */}
        <Section title="Window Rules" icon={AppWindow}>
          <div className="flex flex-col gap-2">
            {config.windowRules.map((rule, i) => (
              <NiriWindowRuleRow key={i} rule={rule}
                onChange={(updated) => { const windowRules = [...config.windowRules]; windowRules[i] = updated; updateConfig({ windowRules }) }}
                onDelete={() => updateConfig({ windowRules: config.windowRules.filter((_, j) => j !== i) })} />
            ))}
            <button onClick={() => updateConfig({ windowRules: [...config.windowRules, { match: 'app-id=""', rules: ["open-floating"] }] })}
              className="flex items-center justify-center gap-1.5 rounded-md border border-dashed border-border px-2.5 py-1.5 text-xs font-sans text-muted-foreground transition-all hover:border-accent hover:text-accent">
              <Plus size={12} /> Add Rule
            </button>
          </div>
        </Section>

        {/* Autostart */}
        <Section title="Spawn at Startup" icon={Play}>
          <div className="flex flex-col gap-2">
            {config.spawnAtStartup.map((cmd, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <input value={cmd} onChange={(e) => { const spawnAtStartup = [...config.spawnAtStartup]; spawnAtStartup[i] = e.target.value; updateConfig({ spawnAtStartup }) }}
                  className="flex-1 min-w-0 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-mono text-foreground" placeholder="command" />
                <button onClick={() => updateConfig({ spawnAtStartup: config.spawnAtStartup.filter((_, j) => j !== i) })}
                  className="shrink-0 rounded-md p-1 text-muted-foreground hover:text-destructive transition-colors"><X size={12} /></button>
              </div>
            ))}
            <button onClick={() => updateConfig({ spawnAtStartup: [...config.spawnAtStartup, ""] })}
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
            const conf = generateNiriKdl(config)
            const blob = new Blob([conf], { type: "text/plain" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "config.kdl"
            a.click()
            URL.revokeObjectURL(url)
          }}
          className="w-full rounded-lg py-2 text-sm font-sans font-medium transition-colors"
          style={{
            backgroundColor: "hsl(var(--accent))",
            color: "hsl(var(--accent-foreground))",
          }}
        >
          Export config.kdl
        </button>
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

function NiriKeybindRow({ bind, onChange, onDelete }: { bind: NiriKeybind; onChange: (b: NiriKeybind) => void; onDelete: () => void }) {
  const MODS = ["Mod", "Shift", "Ctrl", "Alt"] as const

  return (
    <div className="rounded-md border border-border p-2 flex flex-col gap-1.5 min-w-0 overflow-hidden">
      <div className="flex items-center gap-0.5">
        <div className="flex items-center gap-0.5 shrink-0">
          {MODS.map((mod) => (
            <button key={mod} onClick={() => {
              const mods = bind.mods.includes(mod) ? bind.mods.filter((m) => m !== mod) : [...bind.mods, mod]
              onChange({ ...bind, mods })
            }}
              className="rounded px-1 py-0.5 text-[9px] font-mono transition-all leading-none"
              style={{
                backgroundColor: bind.mods.includes(mod) ? "hsl(var(--accent) / 0.2)" : "transparent",
                color: bind.mods.includes(mod) ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))",
                borderWidth: 1, borderStyle: "solid",
                borderColor: bind.mods.includes(mod) ? "hsl(var(--accent) / 0.4)" : "hsl(var(--border))",
              }}
            >{mod}</button>
          ))}
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

function NiriWindowRuleRow({ rule, onChange, onDelete }: { rule: NiriWindowRule; onChange: (r: NiriWindowRule) => void; onDelete: () => void }) {
  return (
    <div className="rounded-md border border-border p-2 flex flex-col gap-1.5 min-w-0 overflow-hidden">
      <div className="flex items-center gap-1.5 min-w-0">
        <input value={rule.match} onChange={(e) => onChange({ ...rule, match: e.target.value })}
          className="min-w-0 flex-1 rounded border border-border bg-background px-2 py-1 text-[10px] font-mono text-foreground" placeholder='app-id="app"' />
        <button onClick={onDelete} className="shrink-0 rounded p-0.5 text-muted-foreground hover:text-destructive transition-colors"><X size={10} /></button>
      </div>
      <div className="flex items-center gap-1.5 flex-wrap min-w-0">
        {rule.rules.map((r, i) => (
          <div key={i} className="flex items-center gap-0.5 min-w-0">
            <input value={r} onChange={(e) => { const rules = [...rule.rules]; rules[i] = e.target.value; onChange({ ...rule, rules }) }}
              className="w-24 min-w-0 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono text-foreground" />
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
