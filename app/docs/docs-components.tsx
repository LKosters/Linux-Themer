import { Info } from "lucide-react"
export { CodeBlock } from "./code-block"

export function Step({
  number,
  icon: Icon,
  title,
  children,
}: {
  number: number
  icon: React.ElementType
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-8 flex gap-4">
      <div className="flex flex-col items-center">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Icon size={16} />
        </div>
        <div className="mt-2 w-px flex-1 bg-border" />
      </div>
      <div className="pb-2">
        <h3 className="font-sans text-sm font-medium text-foreground mb-1">
          <span className="text-accent mr-1.5">{number}.</span>
          {title}
        </h3>
        <div className="text-sm font-sans text-muted-foreground space-y-2">
          {children}
        </div>
      </div>
    </div>
  )
}

export function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">
      {children}
    </code>
  )
}

export function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-10 flex gap-3 rounded-lg border border-border bg-card p-4">
      <Info size={18} className="text-accent shrink-0 mt-0.5" />
      <div className="text-sm font-sans text-muted-foreground space-y-2">
        {children}
      </div>
    </div>
  )
}
