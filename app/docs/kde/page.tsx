import type { Metadata } from "next"
import { FolderOpen, FileDown, Terminal, RefreshCw, Settings } from "lucide-react"
import { DocsHeader, Step, Code, CodeBlock, InfoBox } from "../docs-components"

export const metadata: Metadata = {
  title: "KDE Plasma Installation Guide",
  description:
    "How to install your custom KDE Plasma color scheme on Linux.",
}

export default function KDEDocsPage() {
  return (
    <>
      <DocsHeader active="kde" />

      <Step number={1} icon={FileDown} title="Export your color scheme">
        <p>
          Click <strong>Export Plasma Colors</strong> in the customizer sidebar
          to download your <Code>.colors</Code> file.
        </p>
      </Step>

      <Step number={2} icon={FolderOpen} title="Copy to color schemes directory">
        <p>
          Plasma reads custom color schemes from{" "}
          <Code>~/.local/share/color-schemes/</Code>:
        </p>
        <CodeBlock>
          {`mkdir -p ~/.local/share/color-schemes
cp ~/Downloads/KDEPlasmaTheme.colors ~/.local/share/color-schemes/`}
        </CodeBlock>
      </Step>

      <Step number={3} icon={Settings} title="Apply via System Settings">
        <p>Open <strong>System Settings</strong> and navigate to:</p>
        <ul className="list-disc list-inside space-y-1 mt-1 text-muted-foreground">
          <li>
            <strong>Appearance &amp; Style</strong> &rarr;{" "}
            <strong>Colors &amp; Themes</strong> &rarr; <strong>Colors</strong>
          </li>
          <li>
            Select <strong>Linux Themer Custom</strong> from the list
          </li>
          <li>
            Click <strong>Apply</strong>
          </li>
        </ul>
        <p className="mt-2">
          Alternatively, apply from the terminal:
        </p>
        <CodeBlock>
          {`plasma-apply-colorscheme LinuxThemerCustom`}
        </CodeBlock>
      </Step>

      <Step number={4} icon={RefreshCw} title="Restart running applications">
        <p>
          Most KDE apps pick up color changes immediately. For apps that
          don&apos;t, close and reopen them. GTK apps running under Plasma may
          need a logout/login to reflect the new accent color.
        </p>
      </Step>

      <InfoBox>
        <p>
          <strong className="text-foreground">Accent color:</strong>{" "}
          On Plasma 6, you can also set the accent color directly in{" "}
          <strong>System Settings &rarr; Appearance &amp; Style &rarr; Colors
          &amp; Themes</strong> without importing a full color scheme. The
          exported <Code>.colors</Code> file includes the full palette for
          deeper customization.
        </p>
      </InfoBox>

      <InfoBox>
        <p>
          <strong className="text-foreground">Reverting:</strong>{" "}
          Switch back to the default Breeze color scheme:
        </p>
        <CodeBlock>plasma-apply-colorscheme BreezeLight</CodeBlock>
        <p>
          Or delete the custom file:
        </p>
        <CodeBlock>rm ~/.local/share/color-schemes/KDEPlasmaTheme.colors</CodeBlock>
      </InfoBox>
    </>
  )
}
