"use client"

import { useState, useRef } from "react"
import { Copy, Check } from "lucide-react"

export function CodeBlock({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)

  const handleCopy = () => {
    const text = preRef.current?.textContent ?? ""
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className="group/code relative mt-2 mb-1">
      <pre
        ref={preRef}
        className="overflow-x-auto rounded-lg bg-muted px-4 py-3 pr-10 text-xs font-mono text-foreground whitespace-pre-wrap"
      >
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded-md p-1.5 text-muted-foreground/50 opacity-0 transition-all hover:text-foreground hover:bg-muted-foreground/10 group-hover/code:opacity-100"
        aria-label="Copy to clipboard"
      >
        {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
      </button>
    </div>
  )
}
