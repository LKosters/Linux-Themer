import type { Metadata } from "next"
import { FolderOpen, FileDown, Terminal, RefreshCw } from "lucide-react"
import { DocsHeader, Step, Code, CodeBlock, InfoBox } from "../docs-components"

export const metadata: Metadata = {
  title: "Hyprland Installation Guide",
  description: "How to install your custom Hyprland config and Waybar CSS theme.",
}

export default function HyprlandDocsPage() {
  return (
    <>
      <DocsHeader active="hyprland" />

      <Step number={1} icon={FileDown} title="Export your config and Waybar CSS">
        <p>
          Click <strong>Export Config</strong> to download <Code>hyprland.conf</Code> and{" "}
          <strong>Export Waybar CSS</strong> to download <Code>waybar-style.css</Code>.
        </p>
      </Step>

      <Step number={2} icon={FolderOpen} title="Ensure config directories exist">
        <CodeBlock>mkdir -p ~/.config/hypr{"\n"}mkdir -p ~/.config/waybar</CodeBlock>
      </Step>

      <Step number={3} icon={Terminal} title="Apply the Hyprland config">
        <p>
          Append the exported config to your Hyprland config, or merge the
          values manually into your existing <Code>hyprland.conf</Code>:
        </p>
        <CodeBlock>cat ~/Downloads/hyprland.conf &gt;&gt; ~/.config/hypr/hyprland.conf</CodeBlock>
        <p className="mt-2">
          For the Waybar theme, copy or replace the style file:
        </p>
        <CodeBlock>cp ~/Downloads/waybar-style.css ~/.config/waybar/style.css</CodeBlock>
      </Step>

      <Step number={4} icon={RefreshCw} title="Reload">
        <p>
          Hyprland picks up config changes automatically. To reload Waybar:
        </p>
        <CodeBlock>killall waybar &amp;&amp; waybar &amp;</CodeBlock>
      </Step>

      <InfoBox>
        <p>
          <strong className="text-foreground">Note:</strong>{" "}
          The exported config only contains <Code>general</Code>,{" "}
          <Code>decoration</Code>, and <Code>animations</Code> sections. Review and merge with your existing
          config rather than replacing the entire file.
        </p>
      </InfoBox>
    </>
  )
}
