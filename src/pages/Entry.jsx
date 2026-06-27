import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

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

const Entry = () => {
  const { slug } = useParams();
  const [entry, setEntry] = useState({ content: "", data: {} });
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const files = import.meta.glob("../notes/*.md", {
      query: "?raw",
      import: "default",
    });

    const matchKey = Object.keys(files).find((key) => key.endsWith(`${slug}.md`));

    if (!matchKey) {
      setStatus("missing");
      return;
    }

    files[matchKey]().then((raw) => {
      const parsed = parseFrontmatter(raw);
      setEntry({ content: parsed.content, data: parsed.data || {} });
      setStatus("ready");
    });
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
            <header className="mb-16">
              <h1 className="font-serif text-3xl sm:text-4xl tracking-widest text-text mb-4 lowercase">
                {entry.data.title || "untitled"}
              </h1>
              {entry.data.date ? (
                <time
                  className="font-mono text-[10px] text-text/30 tracking-widest"
                  dateTime={entry.data.date}
                >
                  {entry.data.date}
                </time>
              ) : null}
            </header>

            <article className="prose max-w-none prose-invert prose-p:font-serif prose-p:text-lg prose-p:leading-[1.8] prose-p:text-text/80 prose-headings:font-serif prose-headings:text-text prose-a:text-text prose-a:underline prose-a:decoration-border hover:prose-a:decoration-muted prose-a:underline-offset-4 prose-hr:border-border prose-blockquote:border-l-border prose-blockquote:text-muted prose-blockquote:font-serif prose-blockquote:italic">
              <ReactMarkdown>{entry.content}</ReactMarkdown>
            </article>
          </>
        )}
      </div>
    </motion.section>
  );
};

export default Entry;
