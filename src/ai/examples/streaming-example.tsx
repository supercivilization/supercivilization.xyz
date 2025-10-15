/**
 * Streaming Example with streamdown
 * Real-time markdown streaming from AI responses
 *
 * IMPORTANT: This is a template. Not connected to live API.
 */

'use client';

import { useState } from 'react';
import { useCompletion } from 'ai/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export function StreamingExample() {
  const [prompt, setPrompt] = useState('');

  const { completion, input, handleInputChange, handleSubmit, isLoading } = useCompletion({
    api: '/api/ai/completion',
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Streaming Markdown Example</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Input */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Enter your prompt..."
            className="min-h-[100px]"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Generating...' : 'Generate'}
          </Button>
        </form>

        {/* Streaming Output */}
        {completion && (
          <div className="rounded-lg border p-4 bg-muted/50">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {/* streamdown would render this as markdown in real implementation */}
              {completion}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
