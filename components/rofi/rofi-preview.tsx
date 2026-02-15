"use client"

import { useRofiTheme } from "./theme-context"
import type { RofiTheme } from "./theme-context"
import {
  Search,
  Terminal,
  Globe,
  Folder,
  FileText,
  Image,
  Music,
  Settings,
  Calculator,
  Monitor,
  AppWindow,
  Play,
  Camera,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface AppItem {
  name: string
  desc: string
  icon?: LucideIcon
}

const DRUN_APPS: AppItem[] = [
  { name: "Firefox", desc: "Web Browser", icon: Globe },
  { name: "Files", desc: "File Manager", icon: Folder },
  { name: "Terminal", desc: "Terminal Emulator", icon: Terminal },
  { name: "Text Editor", desc: "Edit text files", icon: FileText },
  { name: "Calculator", desc: "Perform calculations", icon: Calculator },
  { name: "Settings", desc: "System Settings", icon: Settings },
  { name: "Image Viewer", desc: "View images", icon: Image },
  { name: "Music Player", desc: "Play music", icon: Music },
  { name: "System Monitor", desc: "Monitor resources", icon: Monitor },
  { name: "Screenshot", desc: "Take screenshots", icon: Camera },
  { name: "Video Player", desc: "Play videos", icon: Play },
  { name: "Archive Manager", desc: "Manage archives", icon: Folder },
  { name: "Disk Usage", desc: "Analyze disk usage", icon: Monitor },
  { name: "Font Viewer", desc: "Preview fonts", icon: FileText },
  { name: "Logs", desc: "View system logs", icon: Terminal },
]

const RUN_COMMANDS: AppItem[] = [
  { name: "firefox", desc: "" },
  { name: "nautilus", desc: "" },
  { name: "kitty", desc: "" },
  { name: "code", desc: "" },
  { name: "htop", desc: "" },
  { name: "nvim", desc: "" },
  { name: "pavucontrol", desc: "" },
  { name: "thunar", desc: "" },
  { name: "gimp", desc: "" },
  { name: "vlc", desc: "" },
  { name: "spotify", desc: "" },
  { name: "discord", desc: "" },
  { name: "steam", desc: "" },
  { name: "obs", desc: "" },
  { name: "blender", desc: "" },
]

const WINDOW_LIST: AppItem[] = [
  { name: "Firefox — Home", desc: "Web Browser", icon: Globe },
  { name: "Terminal — ~/projects", desc: "kitty", icon: Terminal },
  { name: "Files — Downloads", desc: "Nautilus", icon: Folder },
  { name: "VS Code — main.rs", desc: "Code Editor", icon: FileText },
  { name: "Spotify — Now Playing", desc: "Music", icon: Music },
  { name: "Discord — #general", desc: "Chat", icon: AppWindow },
  { name: "Settings — Display", desc: "System Settings", icon: Settings },
  { name: "Image Viewer — photo.jpg", desc: "Viewer", icon: Image },
  { name: "System Monitor", desc: "Monitor", icon: Monitor },
  { name: "Calculator", desc: "Utility", icon: Calculator },
  { name: "Archive Manager", desc: "Utility", icon: Folder },
  { name: "Terminal — htop", desc: "kitty", icon: Terminal },
  { name: "Firefox — GitHub", desc: "Web Browser", icon: Globe },
  { name: "Files — Documents", desc: "Nautilus", icon: Folder },
  { name: "Text Editor — notes.md", desc: "Editor", icon: FileText },
]

// ── Rofi Window ──────────────────────────────────────────────────────────────

function RofiWindow({ items }: { items: AppItem[] }) {
  const { theme } = useRofiTheme()

  const scaleFactor = 0.45
  const scaledPadding = Math.max(Math.round((theme.windowPadding ?? 20) * scaleFactor), 4)
  const scaledInputPadding = Math.max(Math.round((theme.inputbarPadding ?? 10) * scaleFactor), 3)
  const scaledElementPadding = Math.max(Math.round((theme.elementPadding ?? 8) * scaleFactor), 2)
  const scaledFontSize = Math.max(Math.round((theme.inputbarFontSize ?? 14) * scaleFactor), 6)
  const scaledSpacing = Math.max(Math.round((theme.listviewSpacing ?? 4) * scaleFactor), 1)

  return (
    <div
      style={{
        width: `${Math.min((theme.width ?? 600) / 8, 85)}%`,
        backgroundColor: theme.windowBg,
        borderRadius: `${theme.windowBorderRadius ?? 12}px`,
        border: `${theme.windowBorderSize ?? 2}px solid ${theme.windowBorderColor}`,
        padding: `${scaledPadding}px`,
        opacity: theme.windowOpacity ?? 0.95,
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}
    >
      {/* Input bar */}
      <div
        className="flex items-center"
        style={{
          backgroundColor: theme.inputbarBg,
          borderRadius: `${theme.inputbarBorderRadius ?? 8}px`,
          padding: `${scaledInputPadding}px ${scaledInputPadding + 2}px`,
          gap: "4px",
          marginBottom: `${scaledSpacing + 3}px`,
        }}
      >
        <Search
          size={Math.max(scaledFontSize, 7)}
          style={{ color: theme.promptColor, flexShrink: 0 }}
        />
        {theme.promptText && (
          <span
            className="font-mono font-medium shrink-0"
            style={{
              color: theme.promptColor,
              fontSize: `${scaledFontSize}px`,
            }}
          >
            {theme.promptText}
          </span>
        )}
        <span
          className="font-sans"
          style={{
            color: `${theme.inputbarText}50`,
            fontSize: `${scaledFontSize}px`,
          }}
        >
          {theme.inputbarPlaceholder}
        </span>
      </div>

      {/* List view */}
      <div
        style={{
          backgroundColor: theme.listviewBg,
          display: (theme.columns ?? 1) > 1 ? "grid" : "flex",
          gridTemplateColumns:
            (theme.columns ?? 1) > 1
              ? `repeat(${theme.columns}, 1fr)`
              : undefined,
          flexDirection: (theme.columns ?? 1) === 1 ? "column" : undefined,
          gap: `${scaledSpacing}px`,
        }}
      >
        {items.map((item, i) => {
          const isSelected = i === 0
          return (
            <div
              key={`${item.name}-${i}`}
              className="flex items-center"
              style={{
                backgroundColor: isSelected
                  ? theme.selectedBg
                  : theme.elementBg,
                color: isSelected ? theme.selectedText : theme.elementText,
                borderRadius: `${theme.elementBorderRadius ?? 8}px`,
                padding: `${scaledElementPadding}px ${scaledElementPadding + 2}px`,
                gap: "5px",
              }}
            >
              {item.icon && (
                <item.icon
                  size={Math.max(scaledFontSize + 1, 8)}
                  style={{
                    color: isSelected ? theme.selectedText : theme.accentColor,
                    flexShrink: 0,
                  }}
                />
              )}
              <div className="flex items-baseline gap-1 min-w-0">
                <span
                  className="font-sans font-medium truncate"
                  style={{ fontSize: `${Math.max(scaledFontSize - 1, 6)}px` }}
                >
                  {item.name}
                </span>
                {item.desc && (
                  <span
                    className="font-sans truncate"
                    style={{
                      fontSize: `${Math.max(scaledFontSize - 2, 5)}px`,
                      opacity: 0.5,
                    }}
                  >
                    {item.desc}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Main Preview ─────────────────────────────────────────────────────────────

export function RofiPreview() {
  const { theme } = useRofiTheme()

  const itemSource =
    theme.mode === "drun"
      ? DRUN_APPS
      : theme.mode === "run"
        ? RUN_COMMANDS
        : WINDOW_LIST

  const visibleItems = itemSource.slice(
    0,
    (theme.lines ?? 8) * (theme.columns ?? 1)
  )

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: theme.aspectRatio }}
    >
      {/* Wallpaper gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${theme.wallpaperGradientFrom}, ${theme.wallpaperGradientTo})`,
        }}
      />
      {/* Wallpaper image */}
      {theme.wallpaperImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${theme.wallpaperImageUrl})`,
            opacity: theme.wallpaperImageOpacity,
          }}
        />
      )}
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      />

      {/* Centered Rofi window */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <RofiWindow items={visibleItems} />
      </div>

      {/* Screen edge */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)" }}
      />
    </div>
  )
}
