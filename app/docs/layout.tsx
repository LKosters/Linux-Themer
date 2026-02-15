import { SiteHeader } from "@/components/shared/site-header"
import { DocsSidebar } from "./docs-sidebar"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-background">
      <SiteHeader activeSection="docs" />

      <div className="flex flex-1 overflow-hidden">
        <DocsSidebar />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-2xl px-6 py-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
