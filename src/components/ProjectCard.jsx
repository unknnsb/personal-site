import React from "react";

const ProjectCard = ({ title, description, githubUrl, previewUrl }) => {
  return (
    <div className="bg-[#121212] border border-gray-800 p-5 rounded-md shadow-inner hover:border-gray-600 transition duration-300">
      <h3 className="text-lg text-gray-100 mb-1 tracking-tight">{title}</h3>
      <p className="text-sm text-gray-400 mb-4 leading-snug">{description}</p>

      <div className="flex gap-5 text-sm text-gray-500">
        <a
          href={previewUrl}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 hover:text-gray-300"
        >
          view
        </a>
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 hover:text-gray-300"
        >
          source
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
