import React from 'react';
import { Copy, CheckCircle } from 'lucide-react';

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    technologies: string[];
    complexity: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const text = `${project.title}\n\n${project.description}\n\nTechnologies: ${project.technologies.join(', ')}\nComplexity: ${project.complexity}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02]">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Complexity: {project.complexity}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          {copied ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          <span>{copied ? 'Copied!' : 'Copy Idea'}</span>
        </button>
      </div>
    </div>
  );
}