import ProjectCard from "../components/ProjectCard.jsx";

const projects = [
  {
    title: "netflyer",
    description: "minimal, ad-free movie and series streaming. fast UI, no bloat.",
    githubUrl: "https://github.com/madsykle/netflyer",
    previewUrl: "https://netflyer.vercel.app",
  },
  {
    title: "tiak",
    description: "self-hosted TikTok/Instagram downloader and media gallery.",
    githubUrl: "https://github.com/madsykle/tiak",
    previewUrl: "https://github.com/madsykle/tiak",
  },
  {
    title: "dotfiles",
    description: "termux + proot setup. shell tweaks, scripts, configs.",
    githubUrl: "https://github.com/madsykle/dotfiles",
    previewUrl: "https://github.com/madsykle/dotfiles",
  },
  {
    title: "promio",
    description: "local-first web app that refines rough inputs into clean LLM prompts.",
    githubUrl: "https://github.com/madsykle/promio",
    previewUrl: "https://github.com/madsykle/promio",
  },
];

const Works = () => {
  return (
    <section id="works" className="container-pro">
      <div className="py-10 md:py-16">
        <header className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs tracking-[0.28em] text-muted">
            /ARCHIVES
          </p>

          <h1 className="mt-4 font-serif text-[34px] leading-[1.08] tracking-[-0.02em] text-text md:text-[44px]">
            Selected work.
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-muted">
            Small projects, experiments, and client work—built with restraint and
            shipped fast.
          </p>
        </header>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
