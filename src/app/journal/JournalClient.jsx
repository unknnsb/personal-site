"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PosterModal from "../../components/PosterModal";

export default function JournalClient({ initialEntries, initialReviews }) {
  const [entries] = useState(initialEntries);
  const [reviews] = useState(initialReviews);
  const [customPosters, setCustomPosters] = useState({});
  const [activePosterModal, setActivePosterModal] = useState(null);

  useEffect(() => {
    const saved = typeof window !== "undefined" && window.localStorage ? window.localStorage.getItem('custom_posters') : null;
    if (saved) setCustomPosters(JSON.parse(saved));
  }, []);

  const handleSelectPoster = (slug, path) => {
    const updated = { ...customPosters, [slug]: path };
    setCustomPosters(updated);
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem('custom_posters', JSON.stringify(updated));
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: "easeInOut" }}
      className="container-pro"
    >
      <div className="py-12 md:py-20">
        <header className="mb-20">
          <h1 className="font-serif text-3xl sm:text-4xl tracking-widest text-text mb-4 lowercase">
            journal
          </h1>
          <p className="font-serif text-lg text-muted italic">
            just writing things down.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Notes column */}
          <div className="flex-1">
            <h2 className="font-mono text-[10px] tracking-[0.2em] text-text/40 uppercase mb-8 border-b border-border/50 pb-2">
              Notes
            </h2>
            {entries.length === 0 ? (
              <p className="font-mono text-xs text-text/30 tracking-widest">nothing yet.</p>
            ) : (
              <ul className="flex flex-col gap-6">
                {entries.map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      href={`/journal/${entry.slug}`}
                      className="group block py-2 transition-colors duration-500"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                        <h2 className="font-serif text-xl text-text/90 group-hover:text-text transition-colors">
                          {entry.frontmatter.title}
                        </h2>
                        <time
                          className="font-mono text-[10px] text-text/30 tracking-widest"
                          dateTime={entry.frontmatter.date}
                        >
                          {entry.frontmatter.date}
                        </time>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Reviews column */}
          <div className="flex-1">
            <h2 className="font-mono text-[10px] tracking-[0.2em] text-text/40 uppercase mb-8 border-b border-border/50 pb-2">
              Film Reviews
            </h2>
            {reviews.length === 0 ? (
              <p className="font-mono text-xs text-text/30 tracking-widest">no reviews found.</p>
            ) : (
              <ul className="flex flex-col gap-8">
                {reviews.map((review) => {
                  const title = review.tmdb?.title || review.fallbackTitle;
                  const year = review.tmdb?.release_date ? review.tmdb.release_date.split("-")[0] : "";
                  const customPath = customPosters[review.slug];
                  const activePath = customPath || review.tmdb?.poster_path;
                  const poster = activePath 
                    ? `https://image.tmdb.org/t/p/w200${activePath}` 
                    : null;

                  return (
                    <li key={review.slug}>
                      <Link
                        href={`/review/${review.slug}`}
                        className="group block transition-colors duration-500"
                      >
                        <div className="flex gap-4 items-start">
                          {poster ? (
                            <div className="relative w-16 h-24 shrink-0 group/poster">
                              <img 
                                src={poster} 
                                alt={title} 
                                className="w-full h-full object-cover rounded shadow-sm opacity-80 group-hover:opacity-100 transition-opacity"
                              />
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setActivePosterModal({
                                    slug: review.slug,
                                    movieId: review.tmdb?.id,
                                    title: title
                                  });
                                }}
                                className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/poster:opacity-100 transition-opacity rounded"
                                title="Change poster"
                              >
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <div className="w-16 h-24 bg-border/30 rounded flex items-center justify-center text-[10px] text-text/30 text-center p-1">
                              no poster
                            </div>
                          )}
                          <div className="flex flex-col gap-1 pt-1">
                            <h2 className="font-serif text-lg leading-snug text-text/90 group-hover:text-text transition-colors">
                              {title} {year && <span className="text-text/40 text-sm font-mono tracking-widest ml-1">({year})</span>}
                            </h2>
                            <div className="flex gap-3 items-center mt-2 font-mono text-[10px] tracking-widest uppercase text-text/30">
                              {review.frontmatter.rating && (
                                <span className="text-text/60">
                                  {"★".repeat(Math.floor(review.frontmatter.rating)) + (review.frontmatter.rating % 1 !== 0 ? "½" : "")}
                                </span>
                              )}
                              {review.frontmatter.date && (
                                <time>
                                  {new Date(review.frontmatter.date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
                                </time>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

        </div>
      </div>
      
      <PosterModal 
        isOpen={!!activePosterModal}
        onClose={() => setActivePosterModal(null)}
        movieId={activePosterModal?.movieId}
        slug={activePosterModal?.slug}
        title={activePosterModal?.title}
        onSelect={handleSelectPoster}
      />
    </motion.section>
  );
}
