"use server";

import { FilterType } from "@/types/filterType";
import { OutputType } from "@/types/outputType";
import axios, { AxiosResponse } from "axios";

const { GEMINI_API_KEY: API_KEY } = process.env;

export type ResultType = {
    description: string;
    features: Record<string, string>;
}

export default async function getProjectIdeas(filters: FilterType): Promise<OutputType<ResultType | null>> {
    const output: OutputType<ResultType | null> = {
        error: null,
        result: null,
    }

    const payload = {
        contents: [
            {
                parts: [
                    {
                        text: `Generate a project idea with the following filters: 
                            Categories: ${filters.categories.join(", ")}, 
                            Technologies: ${filters.technologies.join(", ")}, 
                            Complexity: ${filters.complexity}, 
                            Audience: ${filters.audience.join(", ")}

                            The output should be a json with these keys:
                            - description: this will contain the project description in a string format
                            - features: this has to be an object, the keys will be titles for different for features and and each feature will then have a string type value that describes the feature in detail
                        `
                    }
                ]
            }
        ]
    };

    try {
        // eslint will show error on using type any but here we can't set unknown.
        const response: AxiosResponse<any, any> = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, payload); //eslint-disable-line
        const responseJSON: string = response.data.candidates[0].content.parts[0].text;
        const start: number = responseJSON.indexOf("{");
        const end: number = responseJSON.lastIndexOf("}");

        if (start === -1 || end === -1) {
            throw new Error("Something went wrong in parsing output from AI");
        }

        output.result = JSON.parse(responseJSON.slice(start, end + 1));
    } catch (error) {
        console.error(error);
        output.error = "Something went wrong";
    }

    return output;
}