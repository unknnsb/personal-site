import React from "react";
import ProjectCard from "../components/ProjectCard";

const Works = () => {
  const projects = [
    {
      title: "Netflyer",
      description: "A minimal non-ad cinema streaming platform",
      githubUrl: "https://github.com/ItzNesbro/netflyer",
      previewUrl: "https://netflyer.vercel.app",
    },
  ];

  return (
    <section id="works" className="min-h-screen bg-pastelGreen p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Works</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
}

export default Works
