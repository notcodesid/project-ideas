'use client';

// import { ProjectCard } from '@/components/project-card';

// const sampleProjects = [
//   {
//     title: 'Developer Portfolio Builder',
//     description: 'Create a tool that helps developers build beautiful portfolios with minimal effort. Include template selection, GitHub integration, and custom domain support.',
//     technologies: ['React', 'TypeScript', 'Node.js'],
//     complexity: 'Intermediate',
//   },
//   {
//     title: 'AI Code Review Assistant',
//     description: 'Build an AI-powered tool that analyzes pull requests and suggests improvements based on best practices and common patterns.',
//     technologies: ['Python', 'TensorFlow', 'Docker'],
//     complexity: 'Advanced',
//   },
// ];

export function ProjectList() {
  return (
    <div className="max-w-3xl mx-auto mt-8">
      {/* <div className="space-y-4">
        {sampleProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div> */}
    </div>
  );
}