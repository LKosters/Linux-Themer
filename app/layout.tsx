import type { Metadata, Viewport } from 'next'
import { Instrument_Serif, Space_Grotesk } from 'next/font/google'

import './globals.css'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: {
    default: 'Linux Themer - Desktop Customization Studio',
    template: '%s | Linux Themer',
  },
  description: 'Customize and preview Linux desktop themes for GNOME, Cinnamon, Hyprland, and Rofi. Live preview, preset themes, and one-click export.',
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSerif.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
