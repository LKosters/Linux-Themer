# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive GNOME desktop theme customizer built with Next.js. Users adjust 20+ theme properties via a control panel, see live preview of a simulated GNOME desktop, choose from preset themes (Adwaita Dark, Nordic, Dracula, Rose Pine, Catppuccin), and export the result as GTK CSS.

## Commands

```bash
pnpm dev        # Dev server with Turbopack
pnpm build      # Production build
pnpm lint       # Next.js linter
pnpm start      # Start production server
```

## Architecture

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui (Radix primitives)

**Core files — all in `components/gnome/`:**

- **`theme-context.tsx`** — Central state management via React Context. Defines the `GnomeTheme` interface (colors, sizes, opacity, positions), preset themes, and the `useGnomeTheme()` hook. All theme state flows from here.
- **`theme-controls.tsx`** — Sidebar control panel with collapsible sections (Display, Top Bar, Colors, Windows, Dock, Wallpaper). Contains the "Export GTK CSS" logic that generates real CSS from theme state. Handles wallpaper image upload.
- **`gnome-preview.tsx`** — Live GNOME desktop renderer. Contains sub-components: TopPanel (system bar), FileManagerWindow, SettingsWindow, and Dock. All visuals react to theme context changes in real-time.

**Page layout (`app/page.tsx`):** Header + monitor frame mockup containing the preview + sidebar controls. On mobile, controls move to a bottom drawer.

**Data flow:**
```
ThemeProvider (context) → wraps page
  ├── GnomePreview (reads theme)
  └── ThemeControls (reads + writes theme)
```

## Conventions

- **Package manager:** pnpm
- **UI components:** shadcn/ui in `components/ui/` — added via `npx shadcn-ui@latest add <component>`
- **Styling:** Tailwind utility classes with HSL CSS variables defined in `app/globals.css`
- **Class merging:** Use `cn()` from `lib/utils.ts` (clsx + tailwind-merge)
- **Fonts:** Instrument Serif (serif) + Space Grotesk (sans), loaded in `app/layout.tsx`
