import React from 'react';
import { X } from 'lucide-react';
import { categoryTechnologies } from '../utils/categoryTechnologies';

interface FiltersProps {
  filters: {
    category: string;
    technologies: string[];
    complexity: string;
    audience: string[];
  };
  setFilters: (filters: any) => void;
  onClearFilters: () => void;
}

export function Filters({ filters, setFilters, onClearFilters }: FiltersProps) {
  const categories = Object.keys(categoryTechnologies);
  const technologies = filters.category ? categoryTechnologies[filters.category] : [];
  const complexityLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const audiences = ['Developers', 'Students', 'Businesses', 'Hobbyists', 'Startups'];

  // Clear technologies when category changes
  const handleCategoryChange = (category: string) => {
    setFilters({
      ...filters,
      category,
      technologies: [] // Reset technologies when category changes
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 p-4 bg-white dark:bg-black rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
        <button
          onClick={onClearFilters}
          className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <X className="w-4 h-4" />
          <span>Clear filters</span>
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-gray-900 dark:text-white"
          >
            <option value="">Select a category...</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {filters.category && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Technologies
            </label>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => {
                    const newTech = filters.technologies.includes(tech)
                      ? filters.technologies.filter((t) => t !== tech)
                      : [...filters.technologies, tech];
                    setFilters({ ...filters, technologies: newTech });
                  }}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.technologies.includes(tech)
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Complexity Level
          </label>
          <select
            value={filters.complexity}
            onChange={(e) => setFilters({ ...filters, complexity: e.target.value })}
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-gray-900 dark:text-white"
          >
            <option value="">Select complexity...</option>
            {complexityLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Target Audience
          </label>
          <div className="flex flex-wrap gap-2">
            {audiences.map((audience) => (
              <button
                key={audience}
                onClick={() => {
                  const newAudience = filters.audience.includes(audience)
                    ? filters.audience.filter((a) => a !== audience)
                    : [...filters.audience, audience];
                  setFilters({ ...filters, audience: newAudience });
                }}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.audience.includes(audience)
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                {audience}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}