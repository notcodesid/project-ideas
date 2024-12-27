import { ModeToggle } from "@/components/ModeToggle";
// import { ProjectSearch } from '@/components/ProjectSearch';
// import { ProjectFilters } from '@/components/project-filters';
import { ProjectList } from "@/components/project-list";
import { ProjectIdeas } from "@/components/ProjectIdeas";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="w-full py-6 px-4 border-b">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="text-2xl font-bold">Project Ideas</h1>
              <p className="text-sm text-muted-foreground">
                Find your next project effortlessly!
              </p>
            </div>
          </div>
          <ModeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ProjectIdeas />
        <ProjectList />
      </main>
    </div>
  );
}
