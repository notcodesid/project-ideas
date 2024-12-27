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
    <div className="bg-[#1e2030] rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-semibold text-white">{project.title}</h3>
      <p className="text-gray-300">{project.description}</p>
      
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-sm rounded-full bg-blue-600/20 text-blue-400"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <span className="text-sm text-gray-400">
          Complexity: {project.complexity}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
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