import type { Metadata } from "next"
import { HyprInstallCustomizer } from "./hyprinstall-customizer"

export const metadata: Metadata = {
  title: "Hyprland Installer",
  description:
    "Generate a complete Hyprland install script with config, waybar, keybinds, and packages. Download and run to set up Hyprland in one command.",
}

export default function HyprInstallPage() {
  return <HyprInstallCustomizer />
}
