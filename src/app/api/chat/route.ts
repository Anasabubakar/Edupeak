import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { message } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
            return NextResponse.json(
                { error: 'API key not configured. Please add GEMINI_API_KEY to .env.local' },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: "System Instruction: You are Cortex-AI, a personal learning assistant for Edupeak students. You are helpful, encouraging, and knowledgeable about school subjects and financial literacy. Keep your responses concise and engaging. Use emojis occasionally." }],
                },
                {
                    role: 'model',
                    parts: [{ text: "Understood! I am Cortex-AI, ready to help Edupeak students learn and grow. 🚀" }],
                },
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ response: text });
    } catch (error) {
        console.error('Error in chat API:', error);
        return NextResponse.json(
            { error: 'Failed to generate response' },
            { status: 500 }
        );
    }
}
