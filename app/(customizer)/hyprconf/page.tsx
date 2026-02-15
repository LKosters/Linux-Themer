import type { Metadata } from "next"
import { HyprconfCustomizer } from "./hyprconf-customizer"

export const metadata: Metadata = {
  title: "Hyprland Config Creator",
  description:
    "Create a complete Hyprland configuration with keybinds, window rules, monitors, input settings, and more. Export a ready-to-use hyprland.conf.",
}

export default function HyprconfPage() {
  return <HyprconfCustomizer />
}
