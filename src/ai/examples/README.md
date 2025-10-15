# AI SDK Examples

This directory contains ready-to-use examples for all integrated AI SDKs.

## ⚠️ Important: Templates Only

**These are non-live templates.** Before using:

1. Copy `.env.ai.example` to `.env.local`
2. Add your API keys for the providers you want to use
3. Move the API route examples to your `app/api/ai/` directory
4. Import and use the component examples in your pages

## 📦 What's Included

### Vercel AI SDK (`ai` package)

- **chat-example.tsx** - Complete chat interface with streaming
- **streaming-example.tsx** - Real-time text generation
- **api-route-chat.ts** - Server-side chat endpoint
- **api-route-completion.ts** - Server-side completion endpoint

### Feature Flags (`@vercel/flags`)

- **flags-example.tsx** - Feature flag controls for AI features

### Streamdown

- Integrated into streaming-example.tsx for markdown rendering

## 🚀 Quick Start

### 1. Set Up Environment

```bash
# Copy environment template
cp .env.ai.example .env.local

# Add your API keys to .env.local
```

### 2. Move API Routes

```bash
# Create API directory
mkdir -p app/api/ai/chat app/api/ai/completion

# Move route files
mv src/ai/examples/api-route-chat.ts app/api/ai/chat/route.ts
mv src/ai/examples/api-route-completion.ts app/api/ai/completion/route.ts
```

### 3. Use Components

```tsx
// In any page or component
import { ChatExample } from '@/ai/examples/chat-example';
import { StreamingExample } from '@/ai/examples/streaming-example';
import { FlagsExample } from '@/ai/examples/flags-example';

export default function AIPage() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <ChatExample />
      <StreamingExample />
      <FlagsExample />
    </div>
  );
}
```

## 🎯 Use Cases to Plan

Before going live, consider these use cases:

### Chat Interfaces
- Customer support chatbot
- AI-powered search
- Interactive tutorials
- Community Q&A assistant

### Content Generation
- Blog post drafts
- Documentation generation
- Code snippet generation
- Email templates

### Feature Flags
- A/B test different AI models
- Gradual rollout of AI features
- User-specific AI capabilities
- Cost management and rate limiting

### Streaming
- Real-time code generation
- Live content translation
- Progressive form filling
- Interactive storytelling

## 🔧 Configuration

All AI providers are configured in:
- `src/lib/ai/config.ts` - Provider setup and model aliases

Available models:
- `models.reasoning` - Best for complex tasks (GPT-4)
- `models.fast` - Best for speed (Claude Haiku)
- `models.balanced` - Best overall (Claude Sonnet)
- `models.multimodal` - Best for images/audio (Gemini)

## 📚 Resources

- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)
- [Flags SDK Docs](https://flags-sdk.dev/)
- [Streamdown Docs](https://streamdown.ai/)
- [OpenAI API](https://platform.openai.com/docs)
- [Anthropic API](https://docs.anthropic.com/)
- [Google AI](https://ai.google.dev/)

## 🛡️ Security Notes

- Never commit API keys to version control
- Use environment variables for all credentials
- Implement rate limiting on API routes
- Validate and sanitize user inputs
- Monitor API usage and costs
- Use feature flags for gradual rollouts

## 💡 Next Steps

1. Plan your specific use cases
2. Configure environment variables
3. Deploy API routes
4. Test with small user group using feature flags
5. Monitor performance and costs
6. Scale gradually
