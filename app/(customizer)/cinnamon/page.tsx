import type { Metadata } from "next"
import { CinnamonCustomizer } from "./cinnamon-customizer"

export const metadata: Metadata = {
  title: "Cinnamon Theme Customizer",
  description:
    "Customize and preview Cinnamon desktop themes in real-time. Configure panel, menu, windows, and colors, then export as Cinnamon CSS.",
}

export default function CinnamonPage() {
  return <CinnamonCustomizer />
}
