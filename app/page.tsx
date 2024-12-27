import React, { useState } from 'react';
import { Header } from './components/Header';
import { SearchInput } from './components/SearchInput';
import { Filters } from './components/Filters';
import { ProjectCard } from './components/ProjectCard';

// Sample data - in a real app, this would come from an API
const sampleProjects = [
  {
    title: "Developer Portfolio Builder",
    description: "Create a tool that helps developers build beautiful portfolios with minimal effort. Include template selection, GitHub integration, and custom domain support.",
    technologies: ["React", "TypeScript", "Node.js"],
    complexity: "Intermediate"
  },
  {
    title: "Code Review Assistant",
    description: "Build an AI-powered code review tool that analyzes pull requests and suggests improvements based on best practices and common patterns.",
    technologies: ["Python", "TensorFlow", "TypeScript"],
    complexity: "Advanced"
  }
];

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    technologies: [],
    complexity: '',
    audience: []
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: '',
      technologies: [],
      complexity: '',
      audience: []
    });
  };

  // Handle generate button click
  const handleGenerate = () => {
    // In a real app, this would make an API call
    console.log('Generating ideas with:', { prompt, filters });
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-black transition-colors ${isDarkMode ? 'dark' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-8">
        <SearchInput
          prompt={prompt}
          setPrompt={setPrompt}
          onGenerate={handleGenerate}
        />
        
        <Filters
          filters={filters}
          setFilters={setFilters}
          onClearFilters={clearFilters}
        />
        
        <div className="mt-8 grid grid-cols-1 gap-6 max-w-3xl mx-auto">
          {sampleProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;