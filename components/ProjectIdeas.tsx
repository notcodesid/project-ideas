"use client";

import { useEffect, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; //eslint-disable-line
import { FilterType } from "@/types/filterType";
import getProjectIdeas from "@/utils/getProjectIdeas";
import capitalize from "@/utils/capitalize";

export type SectionsType = {
    title: string;
    content: string;
}[];

const categories = Object.keys(categoryTechnologies);
const audiences = ["Developers", "Students", "Businesses", "Hobbyists", "Startups"];

export function ProjectIdeas() {
	const [geneIdea, setGeneIdea] = useState<Record<string, unknown> | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [filters, setFilters] = useState<FilterType>({
		categories: [],
		technologies: [],
		complexity: "",
		audience: [],
	});
	const [selectedTechnologies, setSelectedTechnologies] = useState<(typeof categoryTechnologies)[keyof typeof categoryTechnologies] | never[]>([]);

	useEffect(() => {
		setSelectedTechnologies(filters.categories.length > 0?
			categoryTechnologies[filters.categories[0] as keyof typeof categoryTechnologies]
			: []
		);
	}, [filters.categories]);


	const isAllFiltersSelected = () => {
		return (
			filters.categories.length > 0 &&
			filters.technologies.length > 0 &&
			filters.complexity !== "" &&
			filters.audience.length > 0
		);
	};
	const handleClearFilters = () => {
		setFilters({
			categories: [],
			technologies: [],
			complexity: "",
			audience: [],
		});
		setLoading(false);
	};
	const handleSubmit = async () => {
		if (!isAllFiltersSelected()) {
			alert("Please select all filters before generating an idea");
			return;
		}

		setLoading(true);

		const { error, result } = await getProjectIdeas(filters);

		if (error !== null) {
			console.error("An error occured");
			return ;
		}

		setGeneIdea(result);
		setLoading(false);
	};

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
				
				{geneIdea !== null &&
					Object.entries(geneIdea).map((elem, row) => (
						<div
							key={row}
							className="grid grid-cols-[1fr_4fr] [&_>_*]:p-2 mt-6 border"
						>
							{typeof elem[1] === "string" &&
								<>
									<span>{capitalize(elem[0])}</span>
									<span>{elem[1]}</span>
								</>
							}
							{typeof elem[1] === "object" && elem[1] !== null &&
								<>
									<div>{capitalize(elem[0])}</div>
									<div className="space-y-3">
										{Object.entries(elem[1]).map((value, col) => (
											<div key={col} className="grid grid-cols-[1fr_3fr] gap-3">
												<div>{value[0]}</div>
												<div>{value[1]}</div>
											</div>
										))}
									</div>
									
								</>
							}
						</div>
					))
				}
			</div>
		</div>
	);
}