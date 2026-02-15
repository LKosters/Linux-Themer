"use client"

import { useMemo } from "react"
import { useHyprInstall } from "./install-context"
import { generateInstallScript } from "./script-generator"

type TokenType = "comment" | "keyword" | "string" | "variable" | "command" | "text" | "heredoc-tag" | "heredoc"

interface Token {
  type: TokenType
  text: string
}

const BASH_KEYWORDS = /^(if|then|else|elif|fi|for|do|done|while|case|esac|function|return|exit|set|echo|cat|mkdir|sudo|chmod)$/

function tokenizeBashLine(line: string, inHeredoc: boolean): { tokens: Token[]; heredocEnded: boolean; heredocStarted: string | null } {
  const trimmed = line.trimStart()

  // Check if this line ends a heredoc
  if (inHeredoc) {
    if (/^[A-Z]+$/.test(trimmed)) {
      return { tokens: [{ type: "heredoc-tag", text: line }], heredocEnded: true, heredocStarted: null }
    }
    return { tokens: [{ type: "heredoc", text: line }], heredocEnded: false, heredocStarted: null }
  }

  // Comment
  if (trimmed.startsWith("#")) {
    return { tokens: [{ type: "comment", text: line }], heredocEnded: false, heredocStarted: null }
  }

  // Empty
  if (trimmed === "") {
    return { tokens: [{ type: "text", text: line }], heredocEnded: false, heredocStarted: null }
  }

  // Check for heredoc start
  const heredocMatch = line.match(/<<\s*'?([A-Z]+)'?\s*$/)
  const heredocStarted = heredocMatch ? heredocMatch[1] : null

  // Tokenize the line
  const tokens: Token[] = []
  let remaining = line
  let pos = 0

  // Preserve leading whitespace
  const indent = line.match(/^(\s*)/)?.[1] || ""
  if (indent) {
    remaining = remaining.slice(indent.length)
    pos += indent.length
    tokens.push({ type: "text", text: indent })
  }

  // Simple word-by-word tokenization
  const parts = remaining.split(/(\s+|"[^"]*"|\$\{?\w+\}?|\$\([^)]*\))/)
  for (const part of parts) {
    if (!part) continue

    if (part.startsWith('"') && part.endsWith('"')) {
      tokens.push({ type: "string", text: part })
    } else if (part.startsWith("$")) {
      tokens.push({ type: "variable", text: part })
    } else if (part.match(/^\s+$/)) {
      tokens.push({ type: "text", text: part })
    } else if (BASH_KEYWORDS.test(part)) {
      tokens.push({ type: "keyword", text: part })
    } else if (part === "<<" || part.match(/^'?[A-Z]+'?$/)) {
      tokens.push({ type: "heredoc-tag", text: part })
    } else if (part.includes("=")) {
      const eqIdx = part.indexOf("=")
      tokens.push({ type: "variable", text: part.slice(0, eqIdx + 1) })
      tokens.push({ type: "string", text: part.slice(eqIdx + 1) })
    } else {
      tokens.push({ type: "text", text: part })
    }
  }

  return { tokens, heredocEnded: false, heredocStarted }
}

const TOKEN_COLORS: Record<TokenType, string> = {
  comment: "text-muted-foreground/50",
  keyword: "text-accent",
  string: "text-green-400",
  variable: "text-amber-400",
  command: "text-accent",
  text: "text-foreground/80",
  "heredoc-tag": "text-red-400 font-medium",
  heredoc: "text-foreground/60",
}

export function ScriptPreview() {
  const { config } = useHyprInstall()

  const script = useMemo(() => generateInstallScript(config), [config])
  const lines = useMemo(() => script.split("\n"), [script])

  const tokenizedLines = useMemo(() => {
    let inHeredoc = false
    return lines.map((line) => {
      const result = tokenizeBashLine(line, inHeredoc)
      if (result.heredocStarted) inHeredoc = true
      if (result.heredocEnded) inHeredoc = false
      return result.tokens
    })
  }, [lines])

  return (
    <div className="h-full w-full overflow-auto bg-[#0d0d0d] p-6 font-mono text-xs leading-relaxed">
      <div className="min-w-0">
        {tokenizedLines.map((tokens, i) => (
          <div key={i} className="flex">
            <span className="inline-block w-10 shrink-0 select-none text-right pr-4 text-muted-foreground/30">
              {i + 1}
            </span>
            <span className="whitespace-pre">
              {tokens.map((token, j) => (
                <span key={j} className={TOKEN_COLORS[token.type]}>
                  {token.text}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
