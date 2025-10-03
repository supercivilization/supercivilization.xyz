# CLAUDE.md - Super Civilization

**Project**: Comprehensive Civilization Platform with Supabase Backend
**Last Updated**: October 2, 2025
**Status**: Active Development

## 🚨 **MANDATORY WORKFLOW RULES**

**THESE RULES OVERRIDE ALL OTHER INSTRUCTIONS. FOLLOW EXACTLY.**

### **Development Workflow Process**

1. **THINK FIRST**: Before any code changes, read the codebase for relevant files and understand the problem completely
2. **PLAN IN WRITING**: Create a plan in `tasks/todo.md` with specific, checkable todo items
3. **GET APPROVAL**: Share the plan and wait for verification before starting work
4. **EXECUTE & TRACK**: Work through todo items one by one, marking each complete as you finish
5. **EXPLAIN CONCISELY**: For each change, provide only high-level summaries - what changed, not how or why
6. **SIMPLICITY FIRST**: Every change must be as simple as possible, impact minimal code, avoid complexity
7. **REVIEW & DOCUMENT**: Add a review section to `tasks/todo.md` summarizing all changes and relevant info
8. **NO LAZINESS TOLERATED**: Never use temporary fixes, always find root causes, you are a senior developer

### **Core Philosophy**

- **Root Cause Analysis**: When bugs occur, debug deeply until you find the actual problem
- **No Shortcuts**: No TODO comments, no "fix later", no workarounds - fix it right the first time
- **Minimal Impact**: Change as few files as possible, keep modifications surgical and focused
- **Senior-Level Thinking**: Approach every problem with the mindset of an experienced developer

## 🎯 **Project Overview**

**Super Civilization** is a comprehensive platform built with v0 featuring:
- Full shadcn/ui component library integration
- Supabase backend with authentication
- Advanced UI patterns (drag-and-drop, carousel, charts)
- Rate limiting with Upstash Redis
- Comprehensive form handling
- Toast notifications system
- Command palette (cmdk)

**Business Focus**: Building advanced civilization management and community platform with modern full-stack architecture.

## 🛠️ **Tech Stack**

### **Core Framework**
- **Next.js 15.5.2** - App Router
- **React 19.1.1** - Server Components
- **TypeScript 5.9.2** - Strict mode
- **Node.js 24+** - Latest LTS

### **Backend & Database**
- **Supabase 2.56.1** - PostgreSQL + Auth + Real-time
- **@supabase/ssr 0.7.0** - Server-side rendering support

### **Caching & Rate Limiting**
- **@upstash/redis 1.35.3** - Serverless Redis
- **@upstash/ratelimit 2.0.6** - Rate limiting

### **Form Handling & Validation**
- **React Hook Form 7.62** - Form state management
- **Zod 4.1.5** - Schema validation
- **@hookform/resolvers 5.2.1** - RHF + Zod integration

### **UI Component Library** (shadcn/ui - Full Suite)
- **@radix-ui/react-*** - Complete Radix UI primitives collection
  - Accordion, Alert Dialog, Aspect Ratio, Avatar
  - Checkbox, Collapsible, Context Menu, Dialog
  - Dropdown Menu, Hover Card, Label, Menubar
  - Navigation Menu, Popover, Progress, Radio Group
  - Scroll Area, Select, Separator, Slider
  - Slot, Switch, Tabs, Toast, Toggle, Toggle Group, Tooltip
- **cmdk 1.1.1** - Command palette
- **sonner 2.0.7** - Toast notifications
- **vaul 1.1.2** - Drawer component

### **Advanced UI Features**
- **@dnd-kit/** - Drag and drop
  - core 6.3.1, sortable 10.0.0, utilities 3.2.2
- **embla-carousel-react 8.6.0** - Carousel component
- **react-resizable-panels 3.0.5** - Resizable panels
- **react-intersection-observer 9.16.0** - Viewport detection
- **recharts 3.1.2** - Charts and data visualization
- **react-day-picker 9.9.0** - Date picker
- **input-otp 1.4.2** - OTP input

### **Styling**
- **Tailwind CSS 4.1.12** - CSS-first configuration
- **tailwindcss-animate 1.0.7** - Animation utilities
- **Framer Motion 12.23.12** - Advanced animations
- **next-themes 0.4.6** - Theme management
- **Lucide React 0.542** - Icon system

### **Utilities**
- **date-fns 4.1.0** - Date utilities
- **node-fetch 3.3.2** - Fetch polyfill
- **class-variance-authority 0.7.1** - Component variants
- **clsx 2.1.1** - Conditional classes
- **tailwind-merge 3.3.1** - Class merging

### **Testing**
- **Vitest 3.2.4** - Unit testing
- **Playwright 1.55.0** - E2E testing
- **Testing Library** - React component testing

### **Development Tools**
- **tsx 4.20.5** - TypeScript execution
- **dotenv 17.2.1** - Environment variables

## ⚡ **Essential Commands**

```bash
# Development
pnpm dev                  # Start Next.js dev server
pnpm build                # Production build
pnpm start                # Start production server
pnpm lint                 # Run Next.js linting

# Testing
pnpm test                 # Run unit tests
pnpm test:watch           # Watch mode
pnpm test:coverage        # Coverage report
pnpm test:e2e             # Playwright E2E tests
pnpm test:e2e:ui          # Playwright UI mode
```

## 🏗️ **Project Structure**

```
supercivilization/
├── app/                  # Next.js App Router
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Homepage
│   └── (auth)/         # Auth routes group
├── components/          # React components
│   ├── ui/             # shadcn/ui components (extensive)
│   ├── forms/          # Form components
│   ├── layout/         # Layout components
│   └── charts/         # Data visualization
├── lib/                # Utilities and helpers
│   ├── supabase/      # Supabase client utilities
│   ├── upstash/       # Redis and rate limiting
│   ├── schemas/       # Zod validation schemas
│   └── utils.ts       # Helper functions
├── types/             # TypeScript definitions
└── tests/             # Test files
```

## 🔐 **Backend Integration**

### **Supabase Setup**

**Server Component:**
```typescript
import { createClient } from '@/lib/supabase/server';

export default async function ServerComponent() {
  const supabase = createClient();
  const { data } = await supabase.from('table').select();
  return <div>{/* Use data */}</div>;
}
```

**Client Component:**
```typescript
'use client';
import { createClient } from '@/lib/supabase/client';

export function ClientComponent() {
  const supabase = createClient();
  // Use client
}
```

### **Rate Limiting with Upstash**

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return Response.json({ error: 'Too many requests' }, { status: 429 });
  }

  // Handle request
}
```

## 🎨 **Component Patterns**

### **shadcn/ui Component Usage**

This project has the FULL shadcn/ui component suite. Use these instead of building custom:

```typescript
// Dialogs and Modals
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Forms
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Navigation
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

// Feedback
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

// Data Display
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
```

### **Toast Notifications (Sonner)**

```typescript
'use client';
import { toast } from 'sonner';

export function Component() {
  return (
    <button onClick={() => toast('Event has been created')}>
      Show Toast
    </button>
  );
}

// Root layout
import { Toaster } from 'sonner';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

### **Command Palette (cmdk)**

```typescript
'use client';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

export function CommandMenu() {
  return (
    <Command>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

### **Drag and Drop (@dnd-kit)**

```typescript
'use client';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
```

### **Charts (Recharts)**

```typescript
'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export function Chart({ data }) {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  );
}
```

## 📝 **Form Handling**

### **Complete Form Example**

```typescript
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Handle submission
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" {...register('email')} />
        {errors.email && <p className="text-destructive">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register('password')} />
        {errors.password && <p className="text-destructive">{errors.password.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
```

## 🧪 **Testing Strategy**

### **Unit Tests** (Vitest)
- Component rendering and behavior
- Utility functions
- Form validation
- Hook logic

### **E2E Tests** (Playwright)
- User flows
- Authentication
- Complex interactions
- Multi-step processes

## 🔧 **Common Tasks**

### **Adding New Features**
1. Check if shadcn/ui component exists first
2. Use Supabase for backend data
3. Implement rate limiting for API routes
4. Add proper error handling with toast
5. Follow TypeScript strict mode

### **Adding API Routes**
```typescript
// app/api/example/route.ts
import { NextRequest } from 'next/server';
import { ratelimit } from '@/lib/upstash';

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return Response.json({ error: 'Too many requests' }, { status: 429 });
  }

  // Handle request
  const body = await request.json();

  return Response.json({ success: true });
}
```

### **Working with Environment Variables**
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

UPSTASH_REDIS_REST_URL=your_url
UPSTASH_REDIS_REST_TOKEN=your_token
```

## 🐛 **Troubleshooting**

### **Build Errors**
```bash
# TypeScript
pnpm type-check

# Clear cache
rm -rf .next
pnpm build
```

### **Supabase Issues**
- Check environment variables
- Verify RLS policies
- Review auth configuration
- Check Supabase logs

### **Rate Limiting Issues**
- Verify Upstash Redis connection
- Check rate limit configuration
- Test with different IPs

### **Component Issues**
- Verify shadcn/ui installation
- Check Radix UI peer dependencies
- Review theme configuration

## 🤖 **AI Assistant Guidelines**

### **Before Any Changes**
1. Read this CLAUDE.md
2. Check if shadcn/ui component exists
3. Review Supabase patterns
4. Verify rate limiting setup

### **During Development**
1. Use shadcn/ui components (don't reinvent)
2. Apply Supabase for data operations
3. Implement rate limiting on API routes
4. Use toast for user feedback
5. Follow React Hook Form + Zod pattern

### **After Changes**
1. Run `pnpm type-check`
2. Run `pnpm lint`
3. Test rate limiting
4. Test auth flows
5. Verify toast notifications
6. Run relevant tests

### **Component Priority**
1. Use shadcn/ui first
2. Enhance with custom logic
3. Build custom only if necessary

---

**Focus**: Comprehensive full-stack platform with complete shadcn/ui integration, Supabase backend, and advanced UI patterns.
