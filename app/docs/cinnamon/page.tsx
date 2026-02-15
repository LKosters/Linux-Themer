import type { Metadata } from "next"
import { FolderOpen, FileDown, Terminal, RefreshCw } from "lucide-react"
import { DocsHeader, Step, Code, CodeBlock, InfoBox } from "../docs-components"

export const metadata: Metadata = {
  title: "Cinnamon Installation Guide",
  description: "How to install your custom Cinnamon CSS theme on Linux Mint.",
}

export default function CinnamonDocsPage() {
  return (
    <>
      <DocsHeader active="cinnamon" />

      <Step number={1} icon={FileDown} title="Export your theme">
        <p>
          Click <strong>Export Cinnamon CSS</strong> in the customizer sidebar to
          download your <Code>cinnamon.css</Code> file.
        </p>
      </Step>

      <Step number={2} icon={FolderOpen} title="Create a theme directory">
        <p>
          Cinnamon themes live under <Code>~/.themes/</Code>. Create a new
          theme folder:
        </p>
        <CodeBlock>mkdir -p ~/.themes/MyCustomTheme/cinnamon</CodeBlock>
      </Step>

      <Step number={3} icon={Terminal} title="Copy the theme file">
        <CodeBlock>cp ~/Downloads/cinnamon.css ~/.themes/MyCustomTheme/cinnamon/cinnamon.css</CodeBlock>
      </Step>

      <Step number={4} icon={RefreshCw} title="Apply the theme">
        <p>Open <strong>System Settings &gt; Themes</strong> and select
          your custom theme under the <strong>Desktop</strong> category.
          Alternatively, use the command line:
        </p>
        <CodeBlock>gsettings set org.cinnamon.theme name &quot;MyCustomTheme&quot;</CodeBlock>
      </Step>

      <InfoBox>
        <p>
          <strong className="text-foreground">Reverting:</strong>{" "}
          Switch back to your previous theme in System Settings, or:
        </p>
        <CodeBlock>gsettings set org.cinnamon.theme name &quot;Mint-Y-Dark&quot;</CodeBlock>
      </InfoBox>
    </>
  )
}
