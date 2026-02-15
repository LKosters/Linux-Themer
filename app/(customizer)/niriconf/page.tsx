import type { Metadata } from "next"
import { NiriconfCustomizer } from "./niriconf-customizer"

export const metadata: Metadata = {
  title: "Niri Config Creator",
  description:
    "Create a complete Niri configuration with keybinds, window rules, input settings, column layout, and more. Export a ready-to-use config.kdl.",
}

export default function NiriconfPage() {
  return <NiriconfCustomizer />
}
