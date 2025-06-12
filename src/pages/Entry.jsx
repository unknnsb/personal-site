import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";

const Entry = () => {
  const { slug } = useParams();
  const [entry, setEntry] = useState({ content: "", data: {} });

  useEffect(() => {
    const files = import.meta.glob("../notes/*.md", {
      query: "?raw",
      import: "default"
    });

    const matchKey = Object.keys(files).find((key) =>
      key.endsWith(`${slug}.md`)
    );

    if (matchKey) {
      files[matchKey]().then((raw) => {
        const parsed = matter(raw);
        setEntry({ content: parsed.content, data: parsed.data });
      });
    }
  }, [slug]);

  return (
    <section className="min-h-screen bg-[#0f0f0f] text-gray-300 px-6 py-12 font-mono">
      <h1 className="text-2xl text-green-500 mb-4">{entry.data.title}</h1>
      <p className="text-sm text-gray-600 mb-6">{entry.data.date}</p>
      <article className="prose prose-invert max-w-none">
        <ReactMarkdown>{entry.content}</ReactMarkdown>
      </article>
    </section>
  );
};

export default Entry;
