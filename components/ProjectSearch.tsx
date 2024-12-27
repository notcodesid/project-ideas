'use client';

import {useState ,useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function ProjectSearch() {
  const [prompt, setPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const handleGenerate = () => {
    // Handle generation logic
    console.log('Generating with prompt:', prompt);
  };

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
          className="pr-12 min-h-[48px] resize-none"
          rows={1}
        />
        <Button
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          onClick={handleGenerate}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}