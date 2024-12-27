import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt, filters } = await req.json();

    const systemPrompt = `You are a project idea generator. Generate a detailed project idea based on the user's requirements and following filters:
    - Category: ${filters.categories.join(', ')}
    - Technologies: ${filters.technologies.join(', ')}
    - Complexity: ${filters.complexity}
    - Target Audience: ${filters.audience.join(', ')}`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    return NextResponse.json({ idea: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate idea' }, { status: 500 });
  }
}