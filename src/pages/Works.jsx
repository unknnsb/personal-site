import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Works = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("https://api.github.com/users/madsykle/repos?per_page=100");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        
        // Sort by stars (descending)
        const sorted = data.sort((a, b) => b.stargazers_count - a.stargazers_count);
        
        // Exclude forks if desired, but user said "all my github repos", so we just show all.
        setRepos(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
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
            projects
          </h1>
        </header>

        {loading ? (
          <p className="font-mono text-xs text-text/30 tracking-widest">loading...</p>
        ) : (
          <div className="flex flex-col gap-6">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col sm:flex-row sm:items-baseline justify-between py-2 border-b border-transparent hover:border-border transition-colors duration-500"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-xl text-text/90 group-hover:text-text transition-colors">
                      {repo.name}
                    </span>
                    {repo.archived && (
                      <span className="font-mono text-[9px] px-1.5 py-0.5 bg-border/50 text-text/50 rounded tracking-widest">
                        ARCHIVED
                      </span>
                    )}
                  </div>
                  <span className="font-serif italic text-muted text-sm sm:text-base">
                    {repo.description || "no description"}
                  </span>
                </div>
                <div className="font-mono text-[10px] text-text/30 mt-2 sm:mt-0 tracking-widest flex gap-4">
                  {repo.language && <span>{repo.language.toUpperCase()}</span>}
                  {repo.stargazers_count > 0 && <span>★ {repo.stargazers_count}</span>}
                </div>
              </a>
            ))}
            {repos.length === 0 && (
              <p className="font-mono text-xs text-text/30 tracking-widest">no repositories found.</p>
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Works;
