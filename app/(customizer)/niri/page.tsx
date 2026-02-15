import type { Metadata } from "next"
import { NiriCustomizer } from "./niri-customizer"

export const metadata: Metadata = {
  title: "Niri Theme Customizer",
  description:
    "Customize Niri scrollable-tiling compositor themes with live preview. Configure focus ring, gaps, Waybar, blur, animations, and export as config.kdl.",
}

export default function NiriPage() {
  return <NiriCustomizer />
}
