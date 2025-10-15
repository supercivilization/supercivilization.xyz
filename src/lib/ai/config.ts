/**
 * AI SDK Configuration
 * Centralized configuration for all AI providers
 */

import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';

/**
 * AI Provider Configuration
 * Add your API keys to .env.local
 */
export const aiProviders = {
  openai: {
    client: openai,
    models: {
      'gpt-4o': openai('gpt-4o'),
      'gpt-4o-mini': openai('gpt-4o-mini'),
      'gpt-4-turbo': openai('gpt-4-turbo'),
    },
  },
  anthropic: {
    client: anthropic,
    models: {
      'claude-3-7-sonnet': anthropic('claude-3-7-sonnet-20250219'),
      'claude-3-5-sonnet': anthropic('claude-3-5-sonnet-20241022'),
      'claude-3-5-haiku': anthropic('claude-3-5-haiku-20241022'),
    },
  },
  google: {
    client: google,
    models: {
      'gemini-2.0-flash': google('gemini-2.0-flash-exp'),
      'gemini-1.5-pro': google('gemini-1.5-pro-latest'),
      'gemini-1.5-flash': google('gemini-1.5-flash-latest'),
    },
  },
} as const;

/**
 * Default model configuration
 * Easy switching between providers
 */
export const defaultModel = aiProviders.anthropic.models['claude-3-5-sonnet'];

/**
 * Model aliases for common use cases
 */
export const models = {
  // Best for complex reasoning
  reasoning: aiProviders.openai.models['gpt-4o'],

  // Best for speed and efficiency
  fast: aiProviders.anthropic.models['claude-3-5-haiku'],

  // Best balanced model
  balanced: aiProviders.anthropic.models['claude-3-5-sonnet'],

  // Best for multimodal (images, audio)
  multimodal: aiProviders.google.models['gemini-2.0-flash'],
} as const;

/**
 * AI Configuration Options
 */
export const aiConfig = {
  // Default temperature for creative tasks
  temperature: 0.7,

  // Max tokens for responses
  maxTokens: 4096,

  // Enable streaming by default
  streaming: true,

  // Retry configuration
  retry: {
    maxRetries: 3,
    initialDelayMs: 1000,
  },
} as const;
