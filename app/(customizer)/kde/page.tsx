import type { Metadata } from "next"
import { KDECustomizer } from "./kde-customizer"

export const metadata: Metadata = {
  title: "KDE Plasma Theme Customizer",
  description:
    "Customize KDE Plasma desktop with live preview. Style the panel, Breeze window decorations, accent colors, and widgets. Export as a Plasma color scheme file.",
}

export default function KDEPage() {
  return <KDECustomizer />
}
