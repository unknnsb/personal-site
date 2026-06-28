import { getNoteBySlug, getNoteSlugs } from "../../../utils/mdx";
import EntryClient from "./EntryClient";

// Generate static parameters for all notes
export function generateStaticParams() {
  const slugs = getNoteSlugs();
  return slugs.map((file) => ({
    slug: file.replace(/\.md$/, ''),
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const entry = getNoteBySlug(resolvedParams.slug);
  if (!entry) return { title: 'Not Found' };
  
  return {
    title: entry.frontmatter.title || 'Journal Entry',
    description: `Journal entry from ${entry.frontmatter.date || 'unknown date'}`,
  };
}

export default async function EntryPage({ params }) {
  const resolvedParams = await params;
  const entry = getNoteBySlug(resolvedParams.slug);

  return <EntryClient entry={entry} />;
}
