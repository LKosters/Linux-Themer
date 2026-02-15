import type { Metadata } from "next"
import { GnomeCustomizer } from "./gnome-customizer"

export const metadata: Metadata = {
  title: "GNOME Theme Customizer",
  description:
    "Customize and preview GNOME desktop themes in real-time. Adjust colors, panel, dock, windows, and wallpaper, then export as GTK CSS.",
}

export default function GnomePage() {
  return <GnomeCustomizer />
}
