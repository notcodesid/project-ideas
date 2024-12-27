import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });

    try {
      const { filters } = await req.json();
      
      // Validate filters
      if (!filters?.categories || !filters?.technologies || !filters?.complexity || !filters?.audience) {
        return NextResponse.json(
          { error: 'Missing required filter fields' },
          { status: 400 }
        );
      }
  
      const promptText = `Generate a project idea with:
      Category: ${filters.categories.join(', ')}
      Technologies: ${filters.technologies.join(', ')}
      Complexity: ${filters.complexity}
      Audience: ${filters.audience.join(', ')}`;
  
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a creative project idea generator. Provide detailed, practical project suggestions."
          },
          {
            role: "user",
            content: promptText
          }
        ]
      });
  
      return NextResponse.json({
        idea: completion.choices[0].message.content
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('API Error:', {
          message: error.message,
          stack: error.stack,
          response: (error as { response?: { data?: unknown } }).response?.data
        });
      } else {
        console.error('API Error:', error);
      }
      
      return NextResponse.json(
        { error: (error as Error).message || 'Failed to generate idea' },
        { status: 500 }
      );
    }
  }