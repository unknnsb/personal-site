"use client";
import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

export default function EntryClient({ entry }) {
  if (!entry) {
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

        <header className="mb-16">
          <h1 className="font-serif text-3xl sm:text-4xl tracking-widest text-text mb-4 lowercase">
            {entry.frontmatter.title || "untitled"}
          </h1>
          {entry.frontmatter.date ? (
            <time
              className="font-mono text-[10px] text-text/30 tracking-widest"
              dateTime={entry.frontmatter.date}
            >
              {entry.frontmatter.date}
            </time>
          ) : null}
        </header>

        <article className="prose max-w-none prose-invert prose-p:font-serif prose-p:text-lg prose-p:leading-[1.8] prose-p:text-text/80 prose-headings:font-serif prose-headings:text-text prose-a:text-text prose-a:underline prose-a:decoration-border hover:prose-a:decoration-muted prose-a:underline-offset-4 prose-hr:border-border prose-blockquote:border-l-border prose-blockquote:text-muted prose-blockquote:font-serif prose-blockquote:italic">
          <ReactMarkdown>{entry.content}</ReactMarkdown>
        </article>
      </div>
    </motion.section>
  );
}
