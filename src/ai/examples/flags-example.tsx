/**
 * Feature Flags Example
 * Using @vercel/flags for AI feature rollouts
 *
 * IMPORTANT: This is a template. Configure flags in Vercel dashboard.
 */

'use client';

import { useFlag } from '@vercel/flags/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function FlagsExample() {
  // Example feature flags for AI features
  const aiChatEnabled = useFlag('ai-chat-enabled');
  const aiModelVersion = useFlag('ai-model-version');
  const aiMaxTokens = useFlag('ai-max-tokens');

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Feature Flags Example</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">AI Chat Enabled</span>
            <Badge variant={aiChatEnabled ? 'default' : 'secondary'}>
              {aiChatEnabled ? 'ON' : 'OFF'}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">AI Model Version</span>
            <Badge variant="outline">{aiModelVersion || 'default'}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Max Tokens</span>
            <Badge variant="outline">{aiMaxTokens || '4096'}</Badge>
          </div>
        </div>

        {/* Conditional rendering based on flags */}
        {aiChatEnabled && (
          <div className="rounded-lg border p-4 bg-muted/50">
            <p className="text-sm text-muted-foreground">
              AI Chat is enabled! Model: {aiModelVersion || 'default'}, Max Tokens:{' '}
              {aiMaxTokens || '4096'}
            </p>
          </div>
        )}

        {!aiChatEnabled && (
          <div className="rounded-lg border p-4 bg-muted/50">
            <p className="text-sm text-muted-foreground">
              AI Chat is currently disabled. Enable it in the Vercel dashboard.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
