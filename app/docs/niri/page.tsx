import type { Metadata } from "next"
import { FileDown, Terminal, RefreshCw, Shield } from "lucide-react"
import { DocsPageHeader, Step, Code, CodeBlock, InfoBox } from "../docs-components"

export const metadata: Metadata = {
  title: "Niri Theme Guide",
  description:
    "How to apply your exported Niri theme config and Waybar CSS to your scrollable-tiling desktop.",
}

export default function NiriDocsPage() {
  return (
    <>
      <DocsPageHeader title="Niri Theme" description="How to apply your exported Niri theme config and Waybar CSS." />

      <Step number={1} icon={FileDown} title="Export your config files">
        <p>
          In the Niri theme customizer, click <strong>Export Config</strong> to
          download <Code>config.kdl</Code> and <strong>Export Waybar CSS</strong>{" "}
          to download <Code>waybar-style.css</Code>. These contain your visual
          settings for Niri and Waybar.
        </p>
      </Step>

      <Step number={2} icon={Shield} title="Back up existing configs">
        <p>
          If you have existing Niri or Waybar configs, back them up first:
        </p>
        <CodeBlock>
          {`cp ~/.config/niri/config.kdl ~/.config/niri/config.kdl.bak
cp ~/.config/waybar/style.css ~/.config/waybar/style.css.bak`}
        </CodeBlock>
      </Step>

      <Step number={3} icon={Terminal} title="Copy files to config directory">
        <p>
          Move the downloaded files to your Niri and Waybar config directories:
        </p>
        <CodeBlock>
          {`cp ~/Downloads/config.kdl ~/.config/niri/config.kdl
cp ~/Downloads/waybar-style.css ~/.config/waybar/style.css`}
        </CodeBlock>
        <p className="mt-2">
          If the <Code>config.kdl</Code> contains only theme settings (from
          the Theme designer), you may want to merge the{" "}
          <Code>layout</Code> and <Code>focus-ring</Code> blocks into your
          existing config rather than replacing the whole file.
        </p>
      </Step>

      <Step number={4} icon={RefreshCw} title="Reload Niri">
        <p>
          Niri automatically watches <Code>config.kdl</Code> for changes and
          reloads. If it does not reload, you can log out and back in, or run:
        </p>
        <CodeBlock>niri msg action do-screen-transition</CodeBlock>
        <p className="mt-2">
          To reload Waybar, restart it:
        </p>
        <CodeBlock>killall waybar && waybar &</CodeBlock>
      </Step>

      <InfoBox>
        <p>
          <strong className="text-foreground">KDL format:</strong>{" "}
          Niri uses KDL (KDL Document Language) for its config, not the
          INI-style format used by Hyprland. Make sure you are editing{" "}
          <Code>config.kdl</Code>, not a <Code>.conf</Code> file.
        </p>
      </InfoBox>

      <InfoBox>
        <p>
          <strong className="text-foreground">Focus ring vs border:</strong>{" "}
          Niri uses a <Code>focus-ring</Code> around the active window instead
          of traditional window borders. The ring appears outside the window
          with a configurable gap. You can adjust the width and colors in the
          theme customizer.
        </p>
      </InfoBox>
    </>
  )
}
