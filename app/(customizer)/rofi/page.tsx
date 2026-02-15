import type { Metadata } from "next"
import { RofiCustomizer } from "./rofi-customizer"

export const metadata: Metadata = {
  title: "Rofi Theme Customizer",
  description:
    "Design Rofi application launcher themes visually. Customize layout, colors, input bar, and list view, then export as a .rasi theme file.",
}

export default function RofiPage() {
  return <RofiCustomizer />
}
