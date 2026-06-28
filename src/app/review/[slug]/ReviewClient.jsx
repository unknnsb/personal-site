"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function ReviewClient({ review, filmData }) {
  const [customPoster, setCustomPoster] = useState(null);

  useEffect(() => {
    const saved = typeof window !== "undefined" && window.localStorage ? window.localStorage.getItem('custom_posters') : null;
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed[review?.slug]) setCustomPoster(parsed[review.slug]);
    }
  }, [review?.slug]);

  if (!review) {
    return (
      <div className="container-pro py-12 md:py-20">
        <div className="mb-16">
          <Link href="/journal" className="font-mono text-[11px] tracking-[0.2em] text-muted hover:text-text transition-all underline decoration-transparent hover:decoration-muted underline-offset-4">
            ← BACK
          </Link>
        </div>
        <p className="font-mono text-xs text-text/30 tracking-widest">not found.</p>
      </div>
    );
  }

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
            href="/journal"
            className="font-mono text-[11px] tracking-[0.2em] text-muted hover:text-text transition-all underline decoration-transparent hover:decoration-muted underline-offset-4"
          >
            ← BACK
          </Link>
        </div>

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
          <ReactMarkdown>{review.content}</ReactMarkdown>
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
      </div>
    </motion.section>
  );
}
