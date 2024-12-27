'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categoryTechnologies } from '@/lib/data';

export function ProjectIdeas() {
  const [prompt, setPrompt] = useState('');
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const audiences = ['Developers', 'Students', 'Businesses', 'Hobbyists', 'Startups'];
  const categories = Object.keys(categoryTechnologies);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const handleGenerate = () => {
    console.log({
      prompt,
      filters,
    });
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      technologies: [],
      complexity: '',
      audience: [],
    });
  };

  const selectedTechnologies =
    filters.categories.length > 0
      ? categoryTechnologies[filters.categories[0] as keyof typeof categoryTechnologies]
      : [];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleGenerate();
            }
          }}
          placeholder="Describe the kind of project you're looking for..."
          className="pr-12 min-h-[48px] resize-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
          rows={5}
        />
        <Button
          size="icon"
          className="absolute right-2 bottom-2"
          onClick={handleGenerate}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-6">
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
                setFilters((prev) => ({ ...prev, categories: [value] }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category..." />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedTechnologies.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Technologies</label>
              <div className="flex flex-wrap gap-2">
                {selectedTechnologies.map((tech) => (
                  <Button
                    key={tech}
                    variant={
                      filters.technologies.includes(tech) ? 'default' : 'outline'
                    }
                    size="sm"
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        technologies: prev.technologies.includes(tech)
                          ? prev.technologies.filter((t) => t !== tech)
                          : [...prev.technologies, tech],
                      }))
                    }
                  >
                    {tech}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Complexity Level</label>
            <Select
              value={filters.complexity}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, complexity: value }))
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
                  variant={
                    filters.audience.includes(audience) ? 'default' : 'outline'
                  }
                  size="sm"
                  onClick={() => {
                    setFilters((prev) => ({
                      ...prev,
                      audience: prev.audience.includes(audience)
                        ? prev.audience.filter((a) => a !== audience)
                        : [...prev.audience, audience],
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
    </div>
  );
}
