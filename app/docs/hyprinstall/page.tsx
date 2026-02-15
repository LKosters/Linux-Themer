import type { Metadata } from "next"
import { FileDown, Terminal, RefreshCw, Shield, Settings } from "lucide-react"
import { DocsHeader, Step, Code, CodeBlock, InfoBox } from "../docs-components"

export const metadata: Metadata = {
  title: "Hyprland Installer Guide",
  description:
    "How to use the generated Hyprland install script to set up Hyprland, Waybar, and all configs in one command.",
}

export default function HyprInstallDocsPage() {
  return (
    <>
      <DocsHeader active="hyprinstall" />

      <Step number={1} icon={FileDown} title="Download the install script">
        <p>
          Click <strong>Download install-hyprland.sh</strong> in the customizer
          sidebar. This generates a single shell script containing everything:
          package installation, <Code>hyprland.conf</Code>,{" "}
          Waybar config and CSS, keybinds, window rules, and autostart.
        </p>
      </Step>

      <Step number={2} icon={Shield} title="Review the script">
        <p>
          Always read a script before running it. Open it in your editor:
        </p>
        <CodeBlock>less ~/Downloads/install-hyprland.sh</CodeBlock>
        <p className="mt-2">
          The script is split into clearly labeled sections so you can verify
          what it does: install packages, write config files, and set
          permissions. No system-level changes are made outside of{" "}
          <Code>~/.config/</Code>.
        </p>
      </Step>

      <Step number={3} icon={Terminal} title="Make it executable and run">
        <CodeBlock>
          {`chmod +x ~/Downloads/install-hyprland.sh
bash ~/Downloads/install-hyprland.sh`}
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
            <Code>~/.config/hypr/hyprland.conf</Code> &mdash; full Hyprland
            config with borders, blur, animations, keybinds, window rules,
            monitors, and autostart
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

      <Step number={5} icon={RefreshCw} title="Start Hyprland">
        <p>
          If you are already in a TTY, start Hyprland:
        </p>
        <CodeBlock>Hyprland</CodeBlock>
        <p className="mt-2">
          If you are in a display manager (SDDM, GDM), log out and select{" "}
          <strong>Hyprland</strong> from the session picker.
        </p>
      </Step>

      <InfoBox>
        <p>
          <strong className="text-foreground">Existing configs:</strong>{" "}
          The script overwrites files in <Code>~/.config/hypr/</Code>,{" "}
          <Code>~/.config/waybar/</Code>, and <Code>~/.config/dunst/</Code>.
          If you have existing configs, back them up first:
        </p>
        <CodeBlock>
          {`cp -r ~/.config/hypr ~/.config/hypr.bak
cp -r ~/.config/waybar ~/.config/waybar.bak`}
        </CodeBlock>
      </InfoBox>

      <InfoBox>
        <p>
          <strong className="text-foreground">Customizing after install:</strong>{" "}
          The generated configs are plain text files. Edit them directly to
          tweak values, or come back to the installer, adjust your settings,
          and download a new script.
        </p>
      </InfoBox>
    </>
  )
}
