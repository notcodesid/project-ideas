import React, { useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
}

export function SearchInput({ prompt, setPrompt, onGenerate }: SearchInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onGenerate();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe the kind of project you're looking for..."
          className="w-full px-4 py-3 pr-12 rounded-lg resize-none min-h-[48px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows={1}
        />
        <button
          onClick={onGenerate}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}