import { getReviewBySlug, getReviewSlugs } from "../../../utils/mdx";
import ReviewClient from "./ReviewClient";
import { tmdbCache } from "../../../utils/cache";

export function generateStaticParams() {
  const slugs = getReviewSlugs();
  return slugs.map((file) => ({
    slug: file.replace(/\.md$/, ''),
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const review = getReviewBySlug(slug);
  
  let title = slug.replace(/-/g, " ");
  const match = slug.match(/^(.*)-(\d{4})$/);
  if (match) {
    title = match[1].replace(/-/g, " ");
  }
  
  if (!review) return { title };
  
  return {
    title: title,
    description: `Film review (${review.frontmatter.rating || 0} stars)`,
  };
}

export default async function ReviewPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const review = getReviewBySlug(slug);

  if (!review) {
    return <ReviewClient review={null} filmData={null} />;
  }

  const match = slug.match(/^(.*)-(\d{4})$/);
  let titleQuery = slug.replace(/-/g, " ");
  let yearQuery = "";

  if (match) {
    titleQuery = match[1].replace(/-/g, " ");
    yearQuery = match[2];
  }

  const tmdbKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || process.env.VITE_TMDB_API_KEY;
  const cacheKey = `${titleQuery}-${yearQuery}`;
  
  let filmData = { title: titleQuery, fallback: true, frontmatter: review.frontmatter };

  if (tmdbCache[cacheKey]) {
    filmData = { ...tmdbCache[cacheKey], frontmatter: review.frontmatter };
  } else if (tmdbKey) {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${encodeURIComponent(titleQuery)}&year=${yearQuery}`);
      const json = await res.json();
      if (json.results && json.results.length > 0) {
        tmdbCache[cacheKey] = json.results[0];
        filmData = { ...json.results[0], frontmatter: review.frontmatter };
      }
    } catch (e) {
      console.error("TMDB Fetch error", e);
    }
  }

  return <ReviewClient review={review} filmData={filmData} />;
}
