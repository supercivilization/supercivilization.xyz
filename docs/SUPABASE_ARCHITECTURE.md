# Supabase Architecture - Supercivilization

## Database Strategy

**Decision**: Single Supabase database named "Supercivilization"

### Rationale

Avolve.io is the **admin control panel and AI orchestration layer** for Supercivilization, not a separate product. This tight coupling makes a single database the optimal choice:

- Unified authentication (admins already authenticated in Supercivilization)
- Direct data access (no API overhead for orchestration tasks)
- Referential integrity (foreign keys between systems)
- Simplified architecture (one connection, one migration history)
- Atomic transactions across both systems

## Schema Organization

We use **schema separation within a single database** to maintain clear boundaries:

```sql
-- Main platform (public schema)
public.users
public.communities
public.content
public.memberships
public.invitations

-- Admin/AI orchestration (avolve schema)
avolve.agents           -- AI agent definitions
avolve.workflows        -- Automation workflows
avolve.executions       -- Workflow execution logs
avolve.prompts          -- AI prompt templates
avolve.embeddings       -- Vector embeddings for AI
```

### Alternative: Table Prefixes

If schema separation isn't used, table prefixes work well:

```sql
-- Main platform
users
communities
content

-- Admin/AI orchestration
avolve_agents
avolve_workflows
avolve_execution_logs
```

## Row Level Security (RLS)

Security is enforced through RLS policies, not database separation:

### Public Supercivilization Tables
```sql
-- Standard user access
CREATE POLICY "Users can read own profile"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

-- Public content
CREATE POLICY "Anyone can read published content"
  ON public.content
  FOR SELECT
  USING (published = true);
```

### Avolve Admin Tables
```sql
-- Admin-only access
CREATE POLICY "Only admins can access avolve tables"
  ON avolve.agents
  FOR ALL
  USING (
    auth.uid() IN (
      SELECT user_id FROM public.admin_roles
      WHERE role = 'admin'
    )
  );
```

## Configuration

### Environment Variables
```bash
# Supabase Project: Supercivilization
NEXT_PUBLIC_SUPABASE_URL=https://coybefkmcykzbeosjgyt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
```

### Client Usage

**Client Components** (public access):
```typescript
import { createSupabaseClient } from '@/lib/supabase/client'

const supabase = createSupabaseClient()
const { data } = await supabase.from('users').select()
```

**Server Components** (anon key):
```typescript
import { getServerSupabaseClient } from '@/lib/supabase/server'

const supabase = getServerSupabaseClient()
const { data } = await supabase.from('content').select()
```

**Server Actions** (service role for admin operations):
```typescript
import { getActionSupabaseClient } from '@/lib/supabase/server'

export async function orchestrateWorkflow(workflowId: string) {
  const supabase = getActionSupabaseClient()
  const { data } = await supabase
    .from('avolve.workflows')
    .select()
    .eq('id', workflowId)
    .single()
}
```

## Migration Strategy

### Initial Schema Setup
1. Create public schema tables (Supercivilization platform)
2. Create avolve schema (or prefixed tables)
3. Set up RLS policies
4. Create admin role tracking
5. Seed initial data

### Future Considerations

**When to Consider Separation:**
- If Avolve generates massive AI data (>50GB embeddings/logs)
- If you plan to offer Avolve as a service to other organizations
- If scaling characteristics differ dramatically (e.g., Avolve needs Redis for real-time)

**How to Separate Later:**
1. Create new Supabase project for Avolve
2. Export Avolve tables via pg_dump
3. Import to new project
4. Update application to use two Supabase clients
5. Implement API layer for cross-database queries

## Best Practices

✅ **Do:**
- Use descriptive table names (avolve_agents, not agents)
- Enforce all security via RLS policies
- Use service role only in admin operations
- Document schema changes in migrations
- Use TypeScript types generated from schema

❌ **Don't:**
- Mix admin and user data without RLS
- Use service role key in client code
- Hard-code table names (use constants)
- Skip migrations for schema changes
- Bypass RLS policies with service role unnecessarily

## Database Version

**PostgreSQL 17** (as of Oct 2025)

Update `supabase/config.toml`:
```toml
[db]
major_version = 17
```

## Connection Health

Monitor connection health in production:
- Supabase Dashboard → Project Settings → API
- Connection pooler status
- Active connections count
- Query performance metrics

## Useful Commands

```bash
# Link to project
supabase link --project-ref coybefkmcykzbeosjgyt

# Generate TypeScript types
supabase gen types typescript --linked > types/supabase-types.ts

# Create migration
supabase migration new <migration_name>

# Push migrations
supabase db push

# Reset local database
supabase db reset

# View remote database
supabase db remote ls
```

---

**Last Updated**: October 16, 2025
**Database**: Supercivilization (coybefkmcykzbeosjgyt)
**Strategy**: Single database with schema/prefix separation
**Owner**: Joshua Seymour (Founder, Supercivilization)
