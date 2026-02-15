import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getGuide, getAllSlugs } from "../guides"
import { GuideRenderer } from "../guide-renderer"

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return {}
  return { title: guide.meta.title, description: guide.meta.description }
}

export default async function GuideDocsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) notFound()

  return <GuideRenderer guide={guide} />
}
