import React from "react";
import ProjectCard from "../components/ProjectCard";

const Works = () => {
  const projects = [
    {
      title: "Netflyer",
      description: "simple streaming. no ads.",
      githubUrl: "https://github.com/unknnsb/netflyer",
      previewUrl: "https://netflyer.vercel.app",
    },
    {
      title: "dotfiles",
      description: "my termux + proot dotfiles. minimal.",
      githubUrl: "https://github.com/unknnsb/dotfiles",
      previewUrl: "https://github.com/unknnsb/dotfiles",
    },
    {
      title: "CaNo3",
      description: "A simple and minimal smoke grande store (client work)",
      githubUrl: "https://github.com/unknnsb/cano3",
      previewUrl: "https://cano3.vercel.app"
    }
  ];

  return (
    <section
      id="works"
      className="min-h-screen bg-[#0e0e0e] px-6 py-12 text-gray-300 font-mono"
    >
      <h2 className="text-center text-sm text-gray-500 tracking-widest uppercase mb-12">
        /archives
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Works;
