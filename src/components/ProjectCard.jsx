import React from "react";

const ProjectCard = ({ title, description, githubUrl, previewUrl }) => {
  return (
    <div className="rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-all">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600 my-2">{description}</p>
      <div className="flex gap-4 mt-4">
        <a href={githubUrl} className="text-blue-500 hover:underline">
          GitHub
        </a>
        {previewUrl && (
          <a href={previewUrl} className="text-green-500 hover:underline">
            Live Preview
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectCard
