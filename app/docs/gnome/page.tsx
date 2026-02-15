import type { Metadata } from "next"
import { FolderOpen, FileDown, Terminal, RefreshCw } from "lucide-react"
import { DocsHeader, Step, Code, CodeBlock, InfoBox } from "../docs-components"

export const metadata: Metadata = {
  title: "GNOME Installation Guide",
  description: "How to install your custom GNOME GTK CSS theme on Linux.",
}

export default function GnomeDocsPage() {
  return (
    <>
      <DocsHeader active="gnome" />

      <Step number={1} icon={FileDown} title="Export your theme">
        <p>
          Click <strong>Export GTK CSS</strong> in the customizer sidebar to
          download your <Code>gtk.css</Code> file.
        </p>
      </Step>

      <Step number={2} icon={FolderOpen} title="Create the config directory">
        <p>GTK 4 reads user overrides from a specific config folder:</p>
        <CodeBlock>mkdir -p ~/.config/gtk-4.0</CodeBlock>
        <p>For GTK 3 applications:</p>
        <CodeBlock>mkdir -p ~/.config/gtk-3.0</CodeBlock>
      </Step>

      <Step number={3} icon={Terminal} title="Copy the theme file">
        <CodeBlock>cp ~/Downloads/gtk.css ~/.config/gtk-4.0/gtk.css</CodeBlock>
        <p>For GTK 3 apps as well:</p>
        <CodeBlock>cp ~/Downloads/gtk.css ~/.config/gtk-3.0/gtk.css</CodeBlock>
      </Step>

      <Step number={4} icon={RefreshCw} title="Apply the changes">
        <ul className="list-disc list-inside space-y-1 mt-1 text-muted-foreground">
          <li><strong>Wayland</strong> &mdash; Log out and log back in</li>
          <li><strong>X11</strong> &mdash; Press <Code>Alt+F2</Code>, type <Code>r</Code>, Enter</li>
        </ul>
      </Step>

      <InfoBox>
        <p>
          <strong className="text-foreground">Reverting:</strong>{" "}
          Delete the custom files to restore defaults:
        </p>
        <CodeBlock>rm ~/.config/gtk-4.0/gtk.css ~/.config/gtk-3.0/gtk.css</CodeBlock>
      </InfoBox>
    </>
  )
}
