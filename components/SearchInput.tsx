import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
}

export function SearchInput({ prompt, setPrompt, onGenerate }: SearchInputProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <div className="relative flex items-center">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the kind of project you're looking for..."
          className="w-full px-4 py-3 pr-24 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={onGenerate}
          className="absolute right-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}