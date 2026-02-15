import type { Metadata } from "next"
import { FolderOpen, FileDown, Terminal, RefreshCw } from "lucide-react"
import { DocsPageHeader, Step, Code, CodeBlock, InfoBox } from "../docs-components"

export const metadata: Metadata = {
  title: "Rofi Installation Guide",
  description: "How to install your custom Rofi .rasi theme file.",
}

export default function RofiDocsPage() {
  return (
    <>
      <DocsPageHeader title="Rofi" description="How to install your custom Rofi .rasi theme file." />

      <Step number={1} icon={FileDown} title="Export your theme">
        <p>
          Click <strong>Export Rofi Theme</strong> in the customizer sidebar to
          download your <Code>rofi-theme.rasi</Code> file.
        </p>
      </Step>

      <Step number={2} icon={FolderOpen} title="Create the config directory">
        <CodeBlock>mkdir -p ~/.config/rofi</CodeBlock>
      </Step>

      <Step number={3} icon={Terminal} title="Copy the theme file">
        <CodeBlock>cp ~/Downloads/rofi-theme.rasi ~/.config/rofi/theme.rasi</CodeBlock>
        <p className="mt-2">
          Then reference it in your Rofi config (<Code>~/.config/rofi/config.rasi</Code>):
        </p>
        <CodeBlock>@theme &quot;~/.config/rofi/theme.rasi&quot;</CodeBlock>
      </Step>

      <Step number={4} icon={RefreshCw} title="Test the theme">
        <p>Launch Rofi to see your theme in action:</p>
        <CodeBlock>rofi -show drun</CodeBlock>
      </Step>

      <InfoBox>
        <p>
          <strong className="text-foreground">Note:</strong>{" "}
          If you have an existing theme, the exported file will override it.
          Back up your current <Code>config.rasi</Code> before applying.
        </p>
      </InfoBox>
    </>
  )
}
