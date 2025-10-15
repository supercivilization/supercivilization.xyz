# AI Implementation Critical Gaps Checklist

**IMPORTANT**: Most AI projects fail due to these missing pieces, not the AI itself.

## 🔴 Critical (Must Have Before Launch)

### Security & Safety
- [ ] **Output validation schemas** (Zod) for all AI responses
- [ ] **Prompt injection detection** on all user inputs
- [ ] **PII scanning** on AI outputs before display
- [ ] **Content moderation** queue for flagged content
- [ ] **Sandboxed execution** for any AI-generated code/queries
- [ ] **Human-in-the-loop** for privileged operations
- [ ] **Security headers** configured (CSP, X-Frame-Options)
- [ ] **RLS policies** on all Supabase tables with AI data

### Cost Management
- [ ] **Langfuse or OpenLLMetry** installed for cost tracking
- [ ] **Per-user cost tracking** in database
- [ ] **Daily spending alerts** (>$50/day threshold)
- [ ] **Token-based rate limiting** (not just request counts)
- [ ] **Cost dashboard** showing: per-user, per-feature, per-model costs
- [ ] **Emergency kill switch** via feature flags
- [ ] **Budget caps** per user tier

### Observability
- [ ] **LLM-specific monitoring** (Langfuse, Arize, or OpenLLMetry)
- [ ] **Trace every AI interaction** with context
- [ ] **Quality scoring** (track hallucinations, relevance)
- [ ] **Latency monitoring** with alerts (>5s responses)
- [ ] **Error tracking** separate from app errors (Sentry)
- [ ] **Token usage dashboards** by feature/user/model
- [ ] **Alert on anomalies** (cost spikes, quality drops)

### Feature Flags
- [ ] **Global AI kill switch** (`ai-enabled`)
- [ ] **Model selection flag** for A/B testing
- [ ] **Per-feature flags** for gradual rollout
- [ ] **User tier flags** (free vs premium features)
- [ ] **Max tokens flag** for cost control
- [ ] **Quality threshold flag** (minimum acceptable score)

## 🟡 Important (Have Within First Month)

### RAG Implementation
- [ ] **Hybrid search** (vector + keyword, not just vector)
- [ ] **Reranking** for result quality (Cohere or local)
- [ ] **Permission-aware retrieval** (respect RLS)
- [ ] **Source citations** in all RAG responses
- [ ] **Chunking strategy** documented and optimized
- [ ] **Context pruning** to fit token windows
- [ ] **Cache common queries** to reduce costs

### Testing & Quality
- [ ] **LLM evaluation framework** (PromptFoo or DeepEval)
- [ ] **Eval test sets** for each AI feature (20+ examples)
- [ ] **LLM-as-judge** quality scoring
- [ ] **Regression tests** with stored examples
- [ ] **Prompt version control** in code
- [ ] **A/B test infrastructure** for prompts
- [ ] **Quality metrics dashboard**

### Authentication & Authorization
- [ ] **Row-level security** on AI interaction logs
- [ ] **User consent management** for AI features
- [ ] **GDPR compliance** (data retention policies)
- [ ] **Audit logs** for all AI operations
- [ ] **Role-based access** (admin, user, premium)
- [ ] **API key rotation** strategy
- [ ] **Zero-trust architecture** for AI endpoints

## 🟢 Nice to Have (Optimize Over Time)

### Advanced Features
- [ ] **Multi-model fallback** (if primary model fails)
- [ ] **Caching layer** for repeated queries
- [ ] **Streaming optimization** (progressive enhancement)
- [ ] **Batch processing** for non-urgent tasks
- [ ] **Edge deployment** for global latency
- [ ] **Model fine-tuning** based on usage data
- [ ] **Custom embeddings** for domain-specific content

### Analytics & Insights
- [ ] **User satisfaction tracking** (thumbs up/down)
- [ ] **Feature usage analytics** (which AI features used most)
- [ ] **Conversion tracking** (AI feature → user action)
- [ ] **Session replay** for AI interactions (PostHog)
- [ ] **Funnel analysis** for AI-driven workflows
- [ ] **Cohort analysis** (AI users vs non-AI users)

### Developer Experience
- [ ] **AI playground** for testing prompts
- [ ] **Prompt library** with versioning
- [ ] **Documentation generation** from AI interactions
- [ ] **Automated changelog** from AI feature deployments
- [ ] **Local development** with mock AI responses
- [ ] **Staging environment** with reduced rate limits

---

## 🛠️ Quick Setup: Essential Tools

### 1. Install Observability (5 minutes)

```bash
# Install Langfuse for LLM observability
pnpm add langfuse

# Create .env.local entries
LANGFUSE_PUBLIC_KEY=pk_...
LANGFUSE_SECRET_KEY=sk_...
LANGFUSE_HOST=https://cloud.langfuse.com
```

```typescript
// lib/ai/langfuse.ts
import { Langfuse } from 'langfuse';

export const langfuse = new Langfuse({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY!,
  secretKey: process.env.LANGFUSE_SECRET_KEY!,
  baseUrl: process.env.LANGFUSE_HOST,
});
```

### 2. Add Cost Tracking (10 minutes)

```typescript
// Wrap all AI calls with cost tracking
import { langfuse } from '@/lib/ai/langfuse';

export async function trackedAICall(params: {
  userId: string;
  feature: string;
  model: string;
  messages: any[];
}) {
  const trace = langfuse.trace({
    name: params.feature,
    userId: params.userId,
    metadata: { model: params.model },
  });

  const generation = trace.generation({
    name: 'ai-generation',
    model: params.model,
    input: params.messages,
  });

  const start = Date.now();
  const response = await ai.generate(params.messages);
  const latency = Date.now() - start;

  generation.end({
    output: response.content,
    usage: {
      input_tokens: response.usage.input_tokens,
      output_tokens: response.usage.output_tokens,
    },
    metadata: {
      latency_ms: latency,
    },
  });

  await trace.finalize();

  return response;
}
```

### 3. Add Security Validation (15 minutes)

```bash
pnpm add zod
```

```typescript
// lib/ai/validation.ts
import { z } from 'zod';

// Define expected output schemas
export const ChatResponseSchema = z.object({
  answer: z.string().max(2000),
  sources: z.array(z.string()).max(5),
  confidence: z.number().min(0).max(1),
});

// Validate AI outputs
export function validateAIOutput<T>(output: unknown, schema: z.ZodSchema<T>): T {
  const result = schema.safeParse(output);

  if (!result.success) {
    console.error('AI output validation failed:', result.error);
    throw new Error('Invalid AI response format');
  }

  return result.data;
}

// Check for prompt injection
export function detectPromptInjection(input: string): boolean {
  const suspiciousPatterns = [
    /ignore (previous|all) (instructions|prompts)/i,
    /system prompt/i,
    /you are now/i,
    /forget (everything|all|previous)/i,
  ];

  return suspiciousPatterns.some(pattern => pattern.test(input));
}
```

### 4. Add Token-Based Rate Limiting (10 minutes)

```typescript
// lib/ai/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create token-based rate limiter
export const tokenRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100000, '1 h'), // 100K tokens/hour
  analytics: true,
  prefix: 'ai-tokens',
});

// Usage
export async function checkTokenLimit(userId: string, estimatedTokens: number) {
  const { success, remaining, reset } = await tokenRateLimit.limit(
    `user:${userId}`,
    { rate: estimatedTokens }
  );

  if (!success) {
    throw new Error(`Token limit exceeded. Resets in ${Math.ceil(reset / 1000)}s`);
  }

  return { remaining, reset };
}
```

### 5. Add Feature Flags (5 minutes)

```typescript
// lib/ai/flags.ts
import { unstable_flag as flag } from '@vercel/flags/next';

export const aiEnabled = flag<boolean>({
  key: 'ai-enabled',
  defaultValue: false,
  description: 'Global AI feature toggle',
});

export const aiModel = flag<'fast' | 'balanced' | 'reasoning'>({
  key: 'ai-model',
  defaultValue: 'fast',
  description: 'AI model selection',
});

export const aiMaxTokens = flag<number>({
  key: 'ai-max-tokens',
  defaultValue: 2048,
  description: 'Maximum tokens per response',
});
```

---

## 📊 Monitoring Dashboard (What to Track)

### Daily Checks
- [ ] Total AI cost (should be <$X based on your budget)
- [ ] Cost per user (identify whales early)
- [ ] Error rate (should be <5%)
- [ ] Average latency (should be <3s)
- [ ] Quality score (should be >70%)

### Weekly Reviews
- [ ] Cost trends (increasing or stable?)
- [ ] Feature usage (which AI features used most?)
- [ ] User satisfaction (thumbs up/down ratio)
- [ ] Token usage patterns
- [ ] Model performance comparison

### Monthly Audits
- [ ] Security incidents (prompt injections, PII leaks)
- [ ] Compliance checks (GDPR, data retention)
- [ ] Cost optimization opportunities
- [ ] Model upgrades evaluation
- [ ] User feedback analysis

---

## 🚨 Common Mistakes to Avoid

### ❌ Don't Do This
- Trust AI outputs without validation
- Skip rate limiting ("we'll add it later")
- Use request-based rate limits instead of token-based
- Deploy without observability
- Hardcode prompts in components
- Skip security scanning on AI outputs
- Ignore cost monitoring until the bill arrives
- Deploy to 100% of users immediately

### ✅ Do This Instead
- Validate all AI outputs with Zod schemas
- Implement token-based rate limiting from day 1
- Set up Langfuse/OpenLLMetry before first deployment
- Version control your prompts
- Scan for PII, prompt injection, toxicity
- Set up cost alerts at $50/day threshold
- Use feature flags for gradual rollout (10% → 50% → 100%)

---

## 📚 Resources

### Essential Tools
- **Langfuse** - https://langfuse.com/ (LLM observability)
- **PromptFoo** - https://promptfoo.dev/ (LLM testing)
- **Upstash** - https://upstash.com/ (Rate limiting)
- **Vercel Flags** - https://flags-sdk.dev/ (Feature flags)

### Security Resources
- **OWASP LLM Top 10** - https://owasp.org/www-project-top-10-for-large-language-model-applications/
- **AI Security Best Practices** - Vercel AI SDK docs

### Learning Resources
- **Vercel AI SDK Docs** - https://sdk.vercel.ai/docs
- **AI Engineering Guide** - https://www.oreilly.com/library/view/building-llm-apps/

---

**Remember**: These aren't "nice to haves" - they're **essential** for production AI apps. Most AI projects fail not because of the AI, but because of missing infrastructure around it.
