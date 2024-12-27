'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categoryTechnologies } from '@/lib/data';

export function ProjectFilters() {
  const [filters, setFilters] = useState<{
    categories: string[];
    technologies: string[];
    complexity: string;
    audience: string[];
  }>({
    categories: [],
    technologies: [],
    complexity: '',
    audience: [],
  });

  const audiences = ['Developers', 'Students', 'Businesses', 'Hobbyists', 'Startups'];
  const categories = Object.keys(categoryTechnologies);

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      technologies: [],
      complexity: '',
      audience: [],
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          className="text-sm text-muted-foreground"
        >
          <X className="w-4 h-4 mr-1" />
          Clear filters
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Category</label>
          <Select
            value={filters.categories[0] || ''}
            onValueChange={(value) => 
              setFilters(prev => ({ ...prev, categories: [value] }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category..." />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Complexity Level</label>
          <Select
            value={filters.complexity}
            onValueChange={(value) => 
              setFilters(prev => ({ ...prev, complexity: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select complexity..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Target Audience</label>
          <div className="flex flex-wrap gap-2">
            {audiences.map((audience) => (
              <Button
                key={audience}
                variant={filters.audience.includes(audience) ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setFilters(prev => ({
                    ...prev,
                    audience: prev.audience.includes(audience)
                      ? prev.audience.filter(a => a !== audience)
                      : [...prev.audience, audience]
                  }));
                }}
              >
                {audience}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}