import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import NowSignal from "./components/NowSignal.jsx";

const App = () => {
  const projects = [
    {
      title: "netflyer",
      description: "minimal streaming interface",
      url: "https://github.com/madsykle/netflyer",
      meta: "REACT / 2024",
    },
    {
      title: "tiak",
      description: "self-hosted archive tool",
      url: "https://github.com/madsykle/tiak",
      meta: "NODE / 2024",
    },
    {
      title: "dotfiles",
      description: "personal terminal environment",
      url: "https://github.com/madsykle/dotfiles",
      meta: "BASH / 2023",
    },
  ];

  return (
    <section className="container-pro">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
        className="py-12 md:py-20"
      >
        {/* 1. Above the fold */}
        <div className="mb-20">
          <h1 className="font-serif text-3xl sm:text-4xl tracking-widest text-text mb-4 lowercase">
            nesbeer
          </h1>
        </div>

        {/* 2. About */}
        <div className="font-serif text-lg md:text-xl text-text/80 leading-[1.8] max-w-xl space-y-6">
          <p>
            from kerala. currently studying. into code, editing, and series. obsessed with film. mostly just rotting at home, completely wasting time doing nothing.
          </p>
        </div>

        {/* 3. Now */}
        <NowSignal />

        {/* 4. Projects */}
        <div className="mb-20">
          <div className="font-mono text-[10px] tracking-[0.2em] text-text/40 uppercase mb-8">
            Projects
          </div>
          <div className="flex flex-col gap-6">
            {projects.map((p) => (
              <a
                key={p.title}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col sm:flex-row sm:items-baseline justify-between py-2 border-b border-transparent hover:border-border transition-colors duration-500"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                  <span className="font-serif text-xl text-text/90 group-hover:text-text transition-colors">
                    {p.title}
                  </span>
                  <span className="font-serif italic text-muted text-sm sm:text-base">
                    {p.description}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-text/30 mt-2 sm:mt-0 tracking-widest">
                  {p.meta}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* 5. Links */}
        <div className="mb-20 flex gap-8 font-mono text-[11px] tracking-[0.1em]">
          <a href="https://letterboxd.com/madsykle" target="_blank" rel="noreferrer" className="text-muted hover:text-text transition-colors">
            Letterboxd
          </a>
          <a href="https://instagram.com/nesbeer_" target="_blank" rel="noreferrer" className="text-muted hover:text-text transition-colors">
            Instagram
          </a>
          <a href="https://github.com/madsykle" target="_blank" rel="noreferrer" className="text-muted hover:text-text transition-colors">
            GitHub
          </a>
        </div>

        {/* 6. Footer */}
        <footer className="pt-8 text-center sm:text-left">
          <span className="font-mono text-[10px] text-text/20 tracking-widest">
            {new Date().getFullYear()}
          </span>
        </footer>

      </motion.div>
    </section>
  );
};

export default App;
