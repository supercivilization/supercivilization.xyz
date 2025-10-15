/**
 * API Route: Completion Endpoint
 * Server-side handler for AI completions
 *
 * IMPORTANT: Template only. Add API keys to .env.local
 * Path: app/api/ai/completion/route.ts
 */

import { streamText } from 'ai';
import { models } from '@/lib/ai/config';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Stream the completion
    const result = streamText({
      model: models.fast,
      prompt,
      temperature: 0.7,
      maxTokens: 2048,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Completion API Error:', error);
    return new Response('Error processing completion request', { status: 500 });
  }
}
