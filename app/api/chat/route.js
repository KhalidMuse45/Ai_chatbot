import { NextResponse } from "next/server";
import OpenAI from "openai";

console.log("API Key:", process.env.OPENAI_API_KEY.slice(0, 5) + "..."); // new

const openai = new OpenAI(process.env.OPENAI_API_KEY);

const systemPrompt = `You are a helpful customer support assistant for HeadStarter AI, a platform that provides AI-powered interviews for software engineering jobs. Your role is to assist users with questions about the platform, interview process, and technical issues. Always be polite, professional, and informative.

Key points about HeadStarter AI:
1. AI-powered interviews for software engineering positions
2. Simulates real interview scenarios
3. Provides feedback and performance analysis
4. Helps candidates prepare for actual job interviews

Guidelines:
- Answer questions about the platform, interview process, and common technical issues
- Provide tips for interview preparation when appropriate
- If you don't know an answer, politely say so and offer to escalate the issue to a human support agent
- Maintain a friendly and encouraging tone to help users feel comfortable with the AI interview process
- Do not provide specific interview questions or answers, as that would defeat the purpose of the platform
- Respect user privacy and do not ask for or share personal information

Remember to tailor your responses to the context of AI-powered interviews for software engineering positions.`;

export async function POST(req) {
    try {
        const body = await req.json();
        console.log('Received request:', body);

        const messages = [
            { role: "system", content: systemPrompt },
            ...body
        ];

        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
        });

        const response = chatCompletion.choices[0].message;

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json({ 
            error: 'Internal Server Error',
            message: error.message,
        }, { status: 500 });
    }
}
