import { Fragment } from "react"
import { FileDown, FolderOpen, Terminal, RefreshCw, Shield, Settings } from "lucide-react"
import { Step, Code, InfoBox } from "./docs-components"
import { CodeBlock } from "./code-block"
import type { Guide, ContentBlock } from "./guides"

const ICONS = {
  "file-down": FileDown,
  "folder-open": FolderOpen,
  "terminal": Terminal,
  "refresh-cw": RefreshCw,
  "shield": Shield,
  "settings": Settings,
} as const

/** Parse inline **bold** and `code` within a text string. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="text-foreground">{part.slice(2, -2)}</strong>
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return <Code key={i}>{part.slice(1, -1)}</Code>
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}

function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "text":
      return (
        <p>
          <RichText text={block.text} />
        </p>
      )
    case "code":
      return <CodeBlock>{block.code}</CodeBlock>
    case "list":
      return (
        <ul className="list-disc list-inside space-y-1 mt-1 text-muted-foreground">
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText text={item} />
            </li>
          ))}
        </ul>
      )
  }
}

export function GuideRenderer({ guide }: { guide: Guide }) {
  return (
    <>
      <div className="mb-10">
        <h2 className="font-serif text-3xl text-foreground mb-2">{guide.title}</h2>
        <p className="text-sm font-sans text-muted-foreground">{guide.description}</p>
      </div>

      {guide.steps.map((step, i) => (
        <Step key={i} number={i + 1} icon={ICONS[step.icon]} title={step.title}>
          {step.content.map((block, j) => (
            <BlockRenderer key={j} block={block} />
          ))}
        </Step>
      ))}

      {guide.infoBoxes.map((box, i) => (
        <InfoBox key={i}>
          {box.content.map((block, j) => (
            <BlockRenderer key={j} block={block} />
          ))}
        </InfoBox>
      ))}
    </>
  )
}
