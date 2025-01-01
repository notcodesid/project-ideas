"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryTechnologies } from "@/lib/data";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReactMarkdown from 'react-markdown';

export function ProjectIdeas() {
  const [geneIdea, setGeneIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<{
    categories: string[];
    technologies: string[];
    complexity: string;
    audience: string[];
  }>({
    categories: [],
    technologies: [],
    complexity: "",
    audience: [],
  });

  const audiences = [
    "Developers",
    "Students",
    "Businesses",
    "Hobbyists",
    "Startups",
  ];

  const sections = geneIdea.split('\n\n**').map(section => {
    const [title, ...content] = section.split(':**');
    return {
      title: title.replace('**', ''),
      content: content.join(':**')
    };
  });

  const isAllFiltersSelected = () => {
    return (
      filters.categories.length > 0 &&
      filters.technologies.length > 0 &&
      filters.complexity !== "" &&
      filters.audience.length > 0
    );
  };

  const categories = Object.keys(categoryTechnologies);

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      technologies: [],
      complexity: "",
      audience: [],
    });
    setLoading(false);
  };

  const handleSubmit = () => {
    if (!isAllFiltersSelected()) {
      alert("Please select all filters before generating an idea");
      return;
    }

    const API_KEY = "AIzaSyCFVmDkx0sCFwC6cKZPo_g3gmi3P5exzas";
    console.log(API_KEY)
    console.log("loading...")
    setLoading(true);
    
    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Generate a project idea with the following filters: 
              Categories: ${filters.categories.join(", ")}, 
              Technologies: ${filters.technologies.join(", ")}, 
              Complexity: ${filters.complexity}, 
              Audience: ${filters.audience.join(", ")}`
            }
          ]
        }
      ]
    };

    axios
      .post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, payload)
      .then((response) => {
        setGeneIdea(response.data.candidates[0].content.parts[0].text);
        setLoading(false);
        handleClearFilters();
      })
      .catch((error) => {
        console.error(
          "Error generating idea:",
          error.response?.data || error.message
        );
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const selectedTechnologies =
    filters.categories.length > 0
      ? categoryTechnologies[
          filters.categories[0] as keyof typeof categoryTechnologies
        ]
      : [];

  return (
    <div className="container p-10 w-full max-w-3xl mx-auto">
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
              value={filters.categories[0] || ""}
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
                      filters.technologies.includes(tech) ? "default" : "outline"
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
                    filters.audience.includes(audience) ? "default" : "outline"
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

        <Button className="mt-6 w-full" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <span className="mr-2">Loading...</span>
            </>
          ) : (
            "Generate Project Idea"
          )}
        </Button>
        
        {sections.length > 0 && (
          <div className="mt-8 border rounded-lg overflow-hidden">
            <Tabs defaultValue={sections[0]?.title} className="w-full">
              <TabsList className="w-full h-auto flex flex-wrap gap-2 justify-start p-2 bg-muted/50">
                {sections.map(section => (
                  <TabsTrigger 
                    key={section.title} 
                    value={section.title}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-md"
                  >
                    {section.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {sections.map(section => (
                <TabsContent 
                  key={section.title} 
                  value={section.title} 
                  className="mt-4 p-6 focus-visible:outline-none focus-visible:ring-0"
                >
                  <ReactMarkdown>
                    {section.content}
                  </ReactMarkdown>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}