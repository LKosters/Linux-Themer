import type { Metadata } from "next"
import { FileDown, Terminal, RefreshCw, Shield, Settings } from "lucide-react"
import { DocsPageHeader, Step, Code, CodeBlock, InfoBox } from "../docs-components"

export const metadata: Metadata = {
  title: "Niri Installer Guide",
  description:
    "How to use the generated Niri install script to set up Niri, Waybar, and all configs in one command.",
}

export default function NiriInstallDocsPage() {
  return (
    <>
      <DocsPageHeader title="Niri Installer" description="How to use the generated install script to set up Niri in one command." />

      <Step number={1} icon={FileDown} title="Download the install script">
        <p>
          Click <strong>Download install-niri.sh</strong> in the customizer
          sidebar. This generates a single shell script containing everything:
          package installation, <Code>config.kdl</Code>,{" "}
          Waybar config and CSS, keybinds, window rules, and autostart.
        </p>
      </Step>

      <Step number={2} icon={Shield} title="Review the script">
        <p>
          Always read a script before running it. Open it in your editor:
        </p>
        <CodeBlock>less ~/Downloads/install-niri.sh</CodeBlock>
        <p className="mt-2">
          The script is split into clearly labeled sections so you can verify
          what it does: install packages, write config files, and set
          permissions. No system-level changes are made outside of{" "}
          <Code>~/.config/</Code>.
        </p>
      </Step>

      <Step number={3} icon={Terminal} title="Make it executable and run">
        <CodeBlock>
          {`chmod +x ~/Downloads/install-niri.sh
bash ~/Downloads/install-niri.sh`}
        </CodeBlock>
        <p className="mt-2">
          The script will detect your distribution and use the correct package
          manager:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-1 text-muted-foreground">
          <li>
            <strong>Arch</strong> &mdash; <Code>pacman -S</Code>
          </li>
          <li>
            <strong>Fedora</strong> &mdash; <Code>dnf install</Code>
          </li>
          <li>
            <strong>Ubuntu/Debian</strong> &mdash; <Code>apt install</Code>
          </li>
          <li>
            <strong>Void</strong> &mdash; <Code>xbps-install</Code>
          </li>
          <li>
            <strong>openSUSE</strong> &mdash; <Code>zypper install</Code>
          </li>
        </ul>
      </Step>

      <Step number={4} icon={Settings} title="What gets installed">
        <p>The script creates the following files:</p>
        <ul className="list-disc list-inside space-y-1 mt-1 text-muted-foreground">
          <li>
            <Code>~/.config/niri/config.kdl</Code> &mdash; full Niri
            config with layout, focus ring, animations, keybinds, window rules,
            and autostart
          </li>
          <li>
            <Code>~/.config/waybar/config.jsonc</Code> &mdash; Waybar layout
            with workspaces, clock, and system tray
          </li>
          <li>
            <Code>~/.config/waybar/style.css</Code> &mdash; Waybar CSS
            matching your theme colors
          </li>
          <li>
            <Code>~/.config/dunst/dunstrc</Code> &mdash; basic notification
            daemon config
          </li>
        </ul>
      </Step>

      <Step number={5} icon={RefreshCw} title="Start Niri">
        <p>
          If you are already in a TTY, start Niri:
        </p>
        <CodeBlock>niri-session</CodeBlock>
        <p className="mt-2">
          If you are in a display manager (SDDM, GDM), log out and select{" "}
          <strong>niri</strong> from the session picker.
        </p>
      </Step>

      <InfoBox>
        <p>
          <strong className="text-foreground">Existing configs:</strong>{" "}
          The script overwrites files in <Code>~/.config/niri/</Code>,{" "}
          <Code>~/.config/waybar/</Code>, and <Code>~/.config/dunst/</Code>.
          If you have existing configs, back them up first:
        </p>
        <CodeBlock>
          {`cp -r ~/.config/niri ~/.config/niri.bak
cp -r ~/.config/waybar ~/.config/waybar.bak`}
        </CodeBlock>
      </InfoBox>

      <InfoBox>
        <p>
          <strong className="text-foreground">Scrollable tiling:</strong>{" "}
          Niri uses a scrollable column layout instead of traditional tiling.
          Windows are arranged in columns that scroll horizontally. Use{" "}
          <Code>Mod+Left/Right</Code> to navigate between columns and{" "}
          <Code>Mod+R</Code> to cycle through preset column widths.
        </p>
      </InfoBox>
    </>
  )
}
