import React from "react";
import JournalClient from "./JournalClient";
import { getAllNotes, getAllReviews } from "../../utils/mdx";
import { tmdbCache } from "../../utils/cache";

export const metadata = {
  title: 'journal',
  description: 'just writing things down.',
};

export default async function Journal() {
  const notes = getAllNotes();
  const baseReviews = getAllReviews();
  const tmdbKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || process.env.VITE_TMDB_API_KEY;

  const reviewsWithTmdb = await Promise.all(
    baseReviews.map(async (review) => {
      const slug = review.slug;
      const match = slug.match(/^(.*)-(\d{4})$/);
      let titleQuery = slug.replace(/-/g, " ");
      let yearQuery = "";

      if (match) {
        titleQuery = match[1].replace(/-/g, " ");
        yearQuery = match[2];
      }

      let tmdbData = null;
      const cacheKey = `${titleQuery}-${yearQuery}`;
      
      if (tmdbCache[cacheKey]) {
        tmdbData = tmdbCache[cacheKey];
      } else if (tmdbKey) {
        try {
          const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${encodeURIComponent(titleQuery)}&year=${yearQuery}`);
          const json = await res.json();
          if (json.results && json.results.length > 0) {
            tmdbData = json.results[0];
            tmdbCache[cacheKey] = tmdbData;
          }
        } catch (e) {
          console.error("Failed to fetch TMDB data for", titleQuery, e);
        }
      }

      return {
        ...review,
        tmdb: tmdbData,
        fallbackTitle: titleQuery
      };
    })
  );

  return <JournalClient initialEntries={notes} initialReviews={reviewsWithTmdb} />;
}
