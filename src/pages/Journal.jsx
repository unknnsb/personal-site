import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import matter from "gray-matter";

const Journal = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const loadEntries = async () => {
      const files = import.meta.glob("../notes/*.md", {
        query: "?raw",
        import: "default"
      });
      const all = [];

      for (const path in files) {
        const raw = await files[path]();
        const { data } = matter(raw);
        const slug = path.split("/").pop().replace(".md", "");

        all.push({ ...data, slug });
      }

      all.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEntries(all);
    };

    loadEntries();
  }, []);

  return (
    <section className="min-h-screen bg-[#0f0f0f] text-gray-300 px-6 py-12 font-mono">
      <h1 className="text-xl text-gray-400 mb-4 tracking-wide">~/journal</h1>
      <ul>
        {entries.map((entry, i) => (
          <li key={i} className="mb-3">
            <Link to={`/journal/${entry.slug}`} className="text-green-400 hover:underline">
              {entry.title}
            </Link>
            <span className="text-xs text-gray-600 ml-2">[{entry.date}]</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Journal;
