import type { Metadata } from "next"
import { HyprlandCustomizer } from "./hyprland-customizer"

export const metadata: Metadata = {
  title: "Hyprland Theme Customizer",
  description:
    "Customize Hyprland window manager themes with live preview. Configure borders, gaps, Waybar, blur, animations, and export as hyprland.conf.",
}

export default function HyprlandPage() {
  return <HyprlandCustomizer />
}
