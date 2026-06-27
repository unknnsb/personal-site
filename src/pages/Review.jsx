import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { tmdbCache } from "../utils/cache";

const parseFrontmatter = (mdContent) => {
  const match = mdContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
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

const Review = () => {
  const { slug } = useParams();
  const [content, setContent] = useState("");
  const [filmData, setFilmData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [customPoster, setCustomPoster] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('custom_posters');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed[slug]) setCustomPoster(parsed[slug]);
    }
  }, [slug]);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const files = import.meta.glob("../reviews/*.md", {
          query: "?raw",
          import: "default",
        });

        const targetFile = `../reviews/${slug}.md`;
        
        if (!files[targetFile]) {
          setStatus("missing");
          return;
        }

        const raw = await files[targetFile]();
        const { data, content: mdContent } = parseFrontmatter(raw);
        setContent(mdContent);

        const match = slug.match(/^(.*)-(\d{4})$/);
        let titleQuery = slug.replace(/-/g, " ");
        let yearQuery = "";

        if (match) {
          titleQuery = match[1].replace(/-/g, " ");
          yearQuery = match[2];
        }

        const tmdbKey = import.meta.env.VITE_TMDB_API_KEY;
        const cacheKey = `${titleQuery}-${yearQuery}`;
        
        if (tmdbCache[cacheKey]) {
          setFilmData({ ...tmdbCache[cacheKey], frontmatter: data });
        } else if (tmdbKey) {
          const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${encodeURIComponent(titleQuery)}&year=${yearQuery}`);
          const json = await res.json();
          if (json.results && json.results.length > 0) {
            tmdbCache[cacheKey] = json.results[0];
            setFilmData({ ...json.results[0], frontmatter: data });
          } else {
            setFilmData({ title: titleQuery, fallback: true, frontmatter: data });
          }
        }
        
        setStatus("ready");
      } catch (e) {
        setStatus("missing");
      }
    };
    fetchReview();
  }, [slug]);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: "easeInOut" }}
      className="container-pro"
    >
      <div className="py-12 md:py-20">
        <div className="mb-16">
          <Link
            to="/journal"
            className="font-mono text-[11px] tracking-[0.2em] text-muted hover:text-text transition-all underline decoration-transparent hover:decoration-muted underline-offset-4"
          >
            ← BACK
          </Link>
        </div>

        {status === "missing" ? (
          <p className="font-mono text-xs text-text/30 tracking-widest">not found.</p>
        ) : status === "loading" ? (
          <p className="font-mono text-xs text-text/30 tracking-widest">loading...</p>
        ) : (
          <>
            <header className="mb-16 flex flex-col sm:flex-row gap-8 items-start sm:items-end">
              {filmData?.poster_path && (
                <img 
                  src={`https://image.tmdb.org/t/p/w500${customPoster || filmData.poster_path}`} 
                  alt={filmData?.title} 
                  className="w-32 sm:w-48 shrink-0 rounded shadow-lg opacity-90"
                />
              )}
              <div className="flex flex-col gap-2">
                <h1 className="font-serif text-3xl sm:text-5xl tracking-widest text-text lowercase leading-tight">
                  {filmData?.title}
                </h1>
                <div className="flex flex-wrap gap-x-5 gap-y-2 items-center text-text/30 font-mono text-[10px] tracking-widest uppercase mt-1">
                  {filmData?.release_date && <span>{filmData.release_date.split("-")[0]}</span>}
                  
                  {filmData?.frontmatter?.rating && (
                    <span className="text-text/60 text-[12px]">
                      {"★".repeat(Math.floor(filmData.frontmatter.rating)) + (filmData.frontmatter.rating % 1 !== 0 ? "½" : "")}
                    </span>
                  )}
                  
                  {filmData?.frontmatter?.date && (
                    <span>REVIEWED: {new Date(filmData.frontmatter.date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  )}
                </div>
              </div>
            </header>

            <article className="prose max-w-none prose-invert prose-p:font-serif prose-p:text-lg prose-p:leading-[1.8] prose-p:text-text/80 prose-a:text-text prose-a:underline prose-a:decoration-border hover:prose-a:decoration-muted prose-a:underline-offset-4 mb-16">
              <ReactMarkdown>{content}</ReactMarkdown>
            </article>
            
            {filmData?.frontmatter?.link && (
              <div className="mt-8 pt-8 border-t border-border/30">
                <a 
                  href={filmData.frontmatter.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-mono text-[11px] tracking-[0.2em] text-muted hover:text-text transition-all underline decoration-transparent hover:decoration-muted underline-offset-4"
                >
                  READ ON LETTERBOXD ↗
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </motion.section>
  );
};

export default Review;
