import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { tmdbCache } from "../utils/cache";
import PosterModal from "../components/PosterModal";

const parseFrontmatter = (mdContent) => {
  const match = mdContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: mdContent };
  
  const yaml = match[1];
  const content = match[2];
  const data = {};
  
  yaml.split('\n').forEach(line => {
    const [key, ...values] = line.split(':');
    if (key && values.length > 0) {
      let val = values.join(':').trim();
      val = val.replace(/^["'](.*)["']$/, '$1');
      if (key.trim() === 'rating') val = Number(val);
      data[key.trim()] = val;
    }
  });
  
  return { data, content };
};

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [reviews, setReviews] = useState({ items: [], loading: true });
  const [customPosters, setCustomPosters] = useState({});
  const [activePosterModal, setActivePosterModal] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('custom_posters');
    if (saved) setCustomPosters(JSON.parse(saved));
  }, []);

  const handleSelectPoster = (slug, path) => {
    const updated = { ...customPosters, [slug]: path };
    setCustomPosters(updated);
    localStorage.setItem('custom_posters', JSON.stringify(updated));
  };

  useEffect(() => {
    const loadEntries = async () => {
      const files = import.meta.glob("../notes/*.md", {
        query: "?raw",
        import: "default",
      });

      const all = [];
      for (const path in files) {
        const raw = await files[path]();
        const { data } = parseFrontmatter(raw);
        const slug = path.split("/").pop().replace(".md", "");
        all.push({ ...data, slug });
      }

      all.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEntries(all);
    };

    const loadManualReviews = async () => {
      try {
        const files = import.meta.glob("../reviews/*.md", {
          query: "?raw",
          import: "default",
        });

        const allReviews = [];
        const tmdbKey = import.meta.env.VITE_TMDB_API_KEY;

        for (const path in files) {
          const raw = await files[path]();
          const { data } = parseFrontmatter(raw);
          const slug = path.split("/").pop().replace(".md", "");
          
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
            const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${encodeURIComponent(titleQuery)}&year=${yearQuery}`);
            const json = await res.json();
            if (json.results && json.results.length > 0) {
              tmdbData = json.results[0];
              tmdbCache[cacheKey] = tmdbData;
            }
          }

          allReviews.push({
            slug,
            frontmatter: data || {},
            tmdb: tmdbData,
            fallbackTitle: titleQuery
          });
        }

        // Sort by frontmatter date if available
        allReviews.sort((a, b) => {
          const dateA = a.frontmatter.date ? new Date(a.frontmatter.date) : new Date(0);
          const dateB = b.frontmatter.date ? new Date(b.frontmatter.date) : new Date(0);
          return dateB - dateA;
        });

        setReviews({ items: allReviews, loading: false });
      } catch (e) {
        console.error("Journal loading error:", e);
        setReviews({ items: [], loading: false });
      }
    };

    loadEntries();
    loadManualReviews();
  }, []);

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
                      to={`/journal/${entry.slug}`}
                      className="group block py-2 transition-colors duration-500"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                        <h2 className="font-serif text-xl text-text/90 group-hover:text-text transition-colors">
                          {entry.title}
                        </h2>
                        <time
                          className="font-mono text-[10px] text-text/30 tracking-widest"
                          dateTime={entry.date}
                        >
                          {entry.date}
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
            {reviews.loading ? (
              <p className="font-mono text-xs text-text/30 tracking-widest">fetching...</p>
            ) : reviews.items.length === 0 ? (
              <p className="font-mono text-xs text-text/30 tracking-widest">no reviews found.</p>
            ) : (
              <ul className="flex flex-col gap-8">
                {reviews.items.map((review) => {
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
                        to={`/review/${review.slug}`}
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
};

export default Journal;
