import React from 'react';
import { Copy, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

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
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <h3 className="text-xl font-semibold">{project.title}</h3>
      <p className="text-muted-foreground">{project.description}</p>
      
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <span className="text-sm text-muted-foreground">
          Complexity: {project.complexity}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="text-sm"
        >
          {copied ? (
            <CheckCircle className="w-4 h-4 mr-1" />
          ) : (
            <Copy className="w-4 h-4 mr-1" />
          )}
          {copied ? 'Copied!' : 'Copy Idea'}
        </Button>
      </div>
    </div>
  );
}