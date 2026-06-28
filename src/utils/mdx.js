import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const notesDir = path.join(process.cwd(), 'src', 'notes');
const reviewsDir = path.join(process.cwd(), 'src', 'reviews');

export function getNoteSlugs() {
  if (!fs.existsSync(notesDir)) return [];
  return fs.readdirSync(notesDir).filter((file) => file.endsWith('.md'));
}

export function getReviewSlugs() {
  if (!fs.existsSync(reviewsDir)) return [];
  return fs.readdirSync(reviewsDir).filter((file) => file.endsWith('.md'));
}

export function getNoteBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(notesDir, `${realSlug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return { slug: realSlug, frontmatter: data, content };
}

export function getReviewBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(reviewsDir, `${realSlug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return { slug: realSlug, frontmatter: data, content };
}

export function getAllNotes() {
  const slugs = getNoteSlugs();
  const notes = slugs.map((slug) => getNoteBySlug(slug)).filter(Boolean);
  // Sort notes by date in descending order
  return notes.sort((a, b) => (new Date(b.frontmatter.date || 0) > new Date(a.frontmatter.date || 0) ? 1 : -1));
}

export function getAllReviews() {
  const slugs = getReviewSlugs();
  const reviews = slugs.map((slug) => getReviewBySlug(slug)).filter(Boolean);
  // Sort reviews by date in descending order
  return reviews.sort((a, b) => (new Date(b.frontmatter.date || 0) > new Date(a.frontmatter.date || 0) ? 1 : -1));
}
