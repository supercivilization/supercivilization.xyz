/**
 * API Route: Chat Endpoint
 * Server-side handler for AI chat using Vercel AI SDK
 *
 * IMPORTANT: Template only. Add API keys to .env.local
 * Path: app/api/ai/chat/route.ts
 */

import { streamText } from 'ai';
import { models } from '@/lib/ai/config';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Stream the AI response
    const result = streamText({
      model: models.balanced,
      messages,
      // Optional: Add system prompt
      system: 'You are a helpful assistant for the Super Civilization platform.',
      // Optional: Configure temperature
      temperature: 0.7,
      // Optional: Max tokens
      maxTokens: 4096,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response('Error processing chat request', { status: 500 });
  }
}
