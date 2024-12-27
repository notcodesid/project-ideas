import React from 'react';
import { X } from 'lucide-react';

interface FiltersProps {
  filters: {
    categories: string[];
    technologies: string[];
    complexity: string;
    audience: string[];
  };
  setFilters: (filters: { categories: string[]; technologies: string[]; complexity: string; audience: string[] }) => void;
  onClearFilters: () => void;
}

export function Filters({ filters, setFilters, onClearFilters }: FiltersProps) {
  const audiences = ['Developers', 'Students', 'Businesses', 'Hobbyists', 'Startups'];

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-white">Filters</h2>
        <button
          onClick={onClearFilters}
          className="text-sm text-gray-400 hover:text-white flex items-center space-x-1"
        >
          <X className="w-4 h-4" />
          <span>Clear filters</span>
        </button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm text-gray-300">Category</label>
          <select
            value={filters.categories[0] || ''}
            onChange={(e) => setFilters({ ...filters, categories: [e.target.value] })}
            className="w-full bg-[#1e2030] text-white rounded-lg border-none px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category...</option>
            <option value="web">Web Development</option>
            <option value="mobile">Mobile Development</option>
            <option value="ai">AI/ML</option>
            <option value="blockchain">Blockchain</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-gray-300">Complexity Level</label>
          <select
            value={filters.complexity}
            onChange={(e) => setFilters({ ...filters, complexity: e.target.value })}
            className="w-full bg-[#1e2030] text-white rounded-lg border-none px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select complexity...</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-gray-300">Target Audience</label>
          <div className="flex flex-wrap gap-2">
            {audiences.map((audience) => (
              <button
                key={audience}
                onClick={() => {
                  const newAudience = filters.audience.includes(audience)
                    ? filters.audience.filter(a => a !== audience)
                    : [...filters.audience, audience];
                  setFilters({ ...filters, audience: newAudience });
                }}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  filters.audience.includes(audience)
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#1e2030] text-gray-300 hover:bg-[#2a2d3d]'
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