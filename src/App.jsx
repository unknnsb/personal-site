import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import ProjectCard from "./components/ProjectCard.jsx";
import SocialLinks from "./components/SocialLinks.jsx";

const App = () => {
  const featuredProjects = [
    {
      title: "netflyer",
      description: "minimal ad-free streaming, rebuilt for performance",
      githubUrl: "https://github.com/madsykle/netflyer",
      previewUrl: "https://netflyer.vercel.app",
    },
    {
      title: "tiak",
      description: "self-hosted video downloader + gallery",
      githubUrl: "https://github.com/madsykle/tiak",
      previewUrl: "https://github.com/madsykle/tiak",
    },
    {
      title: "dotfiles",
      description: "termux + proot setup",
      githubUrl: "https://github.com/madsykle/dotfiles",
      previewUrl: "https://github.com/madsykle/dotfiles",
    },
  ];

  return (
    <section id="home" className="container-pro">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        className="py-10 md:py-16"
      >
        <header className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <h1 className="font-serif text-[42px] leading-[1.05] tracking-[-0.02em] text-text md:text-[58px]">
              Nesbeer.
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-sm text-muted">
                16 · building things on a phone
              </span>
            </div>

            <div className="mt-7 space-y-4 text-[15px] leading-relaxed text-muted md:text-[16px]">
              <p>
                i build things i'd actually want to use. into cinema,
                self-hosting, and tools that don't get in the way. running
                @thebyteatlas.
              </p>
              <p>
                not trying to be a dev god. just making things i’d wanna use.
              </p>
              <p className="text-text/75">react · next.js · tailwind</p>
            </div>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link
                to="/works"
                className="inline-flex items-center justify-center rounded-full border border-border/70 bg-surface px-5 py-2 text-sm text-text/90 transition-colors hover:border-border hover:text-text focus-visible:outline-none"
              >
                View archives
              </Link>

              <Link
                to="/journal"
                className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm text-muted underline decoration-border underline-offset-8 transition-colors hover:text-text hover:decoration-accent focus-visible:outline-none"
              >
                Read journal
              </Link>
            </div>

            <div className="mt-7">
              <p className="mb-3 font-mono text-[11px] tracking-[0.22em] text-muted">
                FIND ME
              </p>
              <SocialLinks />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="card p-6 md:p-7">
              <p className="font-mono text-[11px] tracking-[0.22em] text-muted">
                NOTE
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text/80 italic">
                ‘i don’t exist in real life.’
              </p>

              <div className="mt-6 h-px w-full bg-border/70" />

              <p className="mt-6 text-sm leading-relaxed text-muted">
                Building things that i love. Keeping it minimal.
              </p>
            </div>
          </div>
        </header>

        <div className="mt-14 md:mt-18">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs tracking-[0.28em] text-muted">
                FEATURED
              </p>
              <h2 className="mt-3 font-serif text-[28px] leading-[1.1] tracking-[-0.02em] text-text md:text-[34px]">
                Projects worth opening.
              </h2>
            </div>

            <Link
              to="/works"
              className="hidden sm:inline text-sm text-muted underline decoration-border underline-offset-8 transition-colors hover:text-text hover:decoration-accent focus-visible:outline-none"
            >
              All archives
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>
        </div>

        <div className="mt-14 md:mt-18">
          <div className="card p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="font-mono text-xs tracking-[0.28em] text-muted">
                  CONTACT
                </p>
                <h3 className="mt-3 font-serif text-[26px] leading-[1.12] tracking-[-0.02em] text-text md:text-[30px]">
                  Want to collaborate?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Best way is email or Instagram. If it’s a small idea, keep it
                  short—shipping fast is the whole thing.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:asnesbeer3@gmail.com"
                    className="inline-flex items-center justify-center rounded-full border border-border/70 bg-surface px-5 py-2 text-sm text-text/90 transition-colors hover:border-border hover:text-text focus-visible:outline-none"
                  >
                    Email me
                  </a>

                  <a
                    href="https://instagram.com/nichedonnie"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm text-muted underline decoration-border underline-offset-8 transition-colors hover:text-text hover:decoration-accent focus-visible:outline-none"
                  >
                    Instagram
                  </a>

                  <p className="text-center font-mono text-[11px] tracking-[0.22em] text-muted">
                    Reply time depends on school + sleep.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default App;
