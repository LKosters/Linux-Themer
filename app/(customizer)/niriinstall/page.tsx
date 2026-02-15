import type { Metadata } from "next"
import { NiriInstallCustomizer } from "./niriinstall-customizer"

export const metadata: Metadata = {
  title: "Niri Installer",
  description:
    "Generate a complete Niri install script with packages, config.kdl, Waybar, keybinds, and everything you need to set up Niri on Arch, Fedora, or Ubuntu.",
}

export default function NiriInstallPage() {
  return <NiriInstallCustomizer />
}
