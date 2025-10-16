# Supercivilization Database Migrations

Database schema for the unified Supercivilization platform, supporting both the public platform (`supercivilization.xyz`) and admin interface (`avolve.io`).

## Database Architecture

**Single Database Strategy:**
- Database Name: "Supercivilization"
- Project ID: `coybefkmcykzbeosjgyt`
- Shared by both `supercivilization.xyz` (platform) and `avolve.io` (admin)

**Why Single Database?**
- Avolve is the admin orchestration layer for Supercivilization, not a separate product
- Unified authentication and data model
- Direct data access without API overhead
- Simplified operations and backups

## Migration Files

### 00001_foundation_schema.sql
**Foundation schema with modern Supabase features**

**Level 0 - Taxonomy (Foundation for everything):**
- `pillars` - The 7 pillars of Supercivilization
- `progression_stages` - Member → Mentee → Mentor → Master
- `community_types` - Company, Community, Country
- `community_stages` - Startup Society → Network State
- `growth_engine_types` - Venture, Enterprise, Industry
- `growth_engine_stages` - Seed → Tree → Forest → Biome

**Level 1 - User Identity:**
- `profiles` - Extended user data with progression tracking
- `user_progression_history` - Audit trail of level ups
- `user_pillar_progress` - Per-pillar specialization tracking

**Level 2 - Content System:**
- `content` - Cross-pillar content (articles, courses, videos, etc.)
- `content_reactions` - Likes, upvotes, bookmarks
- `comments` - Discussions and replies

**Level 3 - Communities:**
- `communities` - Network structures (companies, communities, countries)
- `community_memberships` - User participation and roles
- `community_invitations` - Invitation system

**Level 4 - Avolve AI Orchestration:**
- `avolve_agents` - AI agent definitions
- `avolve_workflows` - Orchestration sequences
- `avolve_executions` - Execution logs and metrics
- `avolve_recommendations` - Personalization output

**Modern Features:**
- ✅ **pgvector** for AI embeddings and semantic search
- ✅ **Vector similarity functions** for recommendations
- ✅ **Automated counters** via triggers
- ✅ **Full-text search** with pg_trgm
- ✅ **Performance indexes** including IVFFlat for vector ops

### 00002_rls_policies.sql
**Row Level Security policies**

**Security Model:**
- Public content readable by all
- Users can only modify their own data
- Admins (Masters) have elevated privileges
- Avolve orchestration uses service role (bypasses RLS)

**Key Policies:**
- Taxonomy tables: public read, admin write
- User profiles: own data access
- Content: published = public, drafts = creator only
- Communities: public/private visibility controls
- Avolve tables: admin-only access

### 00003_seed_taxonomy.sql
**Initial taxonomy data**

Seeds:
- **7 Pillars** with colors, descriptions, categories
- **Progression Stages** with requirements
- **Community Types & Stages** with criteria
- **Growth Engine Types & Stages**
- **Initial Avolve Agents** (5 core agents)
- **Initial Workflows** (4 orchestration workflows)

## How to Apply Migrations

### Option 1: Supabase CLI (Recommended)

```bash
# Link to remote project (one-time setup)
supabase link --project-ref coybefkmcykzbeosjgyt

# Apply all migrations
supabase db push

# Or apply specific migration
supabase migration up --version 00001
```

### Option 2: Supabase Dashboard

1. Go to [SQL Editor](https://supabase.com/dashboard/project/coybefkmcykzbeosjgyt/sql)
2. Copy contents of each migration file in order
3. Execute one at a time:
   - `00001_foundation_schema.sql`
   - `00002_rls_policies.sql`
   - `00003_seed_taxonomy.sql`

### Option 3: psql (Direct PostgreSQL)

```bash
# Get connection string from Supabase dashboard
psql "postgresql://postgres:[password]@db.coybefkmcykzbeosjgyt.supabase.co:5432/postgres"

# Run migrations
\i supabase/migrations/00001_foundation_schema.sql
\i supabase/migrations/00002_rls_policies.sql
\i supabase/migrations/00003_seed_taxonomy.sql
```

## Post-Migration Tasks

### 1. Generate TypeScript Types

```bash
# For supercivilization.xyz
cd /Users/avolve/dev/active/supercivilization
supabase gen types typescript --linked > src/lib/supabase/database.types.ts

# For avolve.io (same database)
cd /Users/avolve/dev/active/avolve
supabase gen types typescript --project-id coybefkmcykzbeosjgyt > src/lib/supabase/database.types.ts
```

### 2. Verify Schema

```sql
-- Check all tables
SELECT schemaname, tablename
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Verify RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- Check vector extension
SELECT * FROM pg_extension WHERE extname = 'vector';
```

### 3. Test Vector Search

```sql
-- Should return similar content
SELECT * FROM search_similar_content(
  '[0.1, 0.2, 0.3, ...]'::vector(1536),
  0.7,
  10
);
```

## Schema Diagram

```
Taxonomy (Level 0)
├── pillars
├── progression_stages
├── community_types
├── community_stages
├── growth_engine_types
└── growth_engine_stages

Users (Level 1)
├── profiles (auth.users)
├── user_progression_history
└── user_pillar_progress

Content (Level 2)
├── content
├── content_reactions
└── comments

Communities (Level 3)
├── communities
├── community_memberships
└── community_invitations

Avolve AI (Level 4)
├── avolve_agents
├── avolve_workflows
├── avolve_executions
└── avolve_recommendations
```

## The 7 Pillars

After migration, these pillars will exist in the database:

1. **Superpuzzle Developments** (Fuchsia/Pink) - News & Commentary
2. **Superhuman Enhancements** (Rose/Red/Orange) - Education & Philosophy
3. **Personal Success Puzzle** (Amber/Yellow) - Lifestyle & Self-Improvement
4. **Supersociety Advancements** (Lime/Green/Emerald) - Social Network & Technology
5. **Business Success Puzzle** (Teal/Cyan) - Business & Entrepreneurship
6. **Supergenius Breakthroughs** (Sky/Blue/Indigo) - Finance & Management
7. **Supermind Superpowers** (Violet/Purple) - Productivity & Spirituality

## Progression Model

**Individual (Vivify):**
- Member → Mentee → Mentor → Master

**Collective (Unify):**
- Startup Society → Network Union → Network Archipelago → Network State

**Ecosystem (Thrive):**
- Seed → Tree → Forest → Biome

## AI Orchestration (Avolve)

**Initial Agents:**
1. Content Curator (Personalization)
2. Community Matchmaker (Matching)
3. Learning Coach (Coaching)
4. Content Moderator (Moderation)
5. Engagement Optimizer (Optimization)

**Initial Workflows:**
1. Daily Content Recommendations (Scheduled)
2. New User Onboarding (Event-driven)
3. Real-time Content Moderation (Event-driven)
4. Weekly Engagement Analysis (Scheduled)

## Development Workflow

```bash
# Create new migration
supabase migration new <description>

# Test locally
supabase db reset  # Wipes local DB and reapplies all migrations

# Push to remote
supabase db push

# Generate types
supabase gen types typescript --linked > src/lib/supabase/database.types.ts
```

## Rollback Strategy

```bash
# View migration history
supabase migration list

# Rollback to specific version
supabase db reset --version <version>
```

## Important Notes

1. **Shared Database**: Both repos (`supercivilization.xyz` and `avolve.io`) share this database
2. **Migrations Location**: Keep migrations in `supercivilization` repo only (source of truth)
3. **Service Role**: Avolve orchestration uses service role key (bypasses RLS)
4. **Vector Search**: Requires embeddings to be generated for users/content/communities
5. **Admin Access**: Only users with progression_stage = 'master' can access Avolve features

## Security Checklist

- ✅ All tables have RLS enabled
- ✅ Public content is readable by all
- ✅ Users can only modify their own data
- ✅ Avolve tables are admin-only
- ✅ Service role used for AI orchestration
- ✅ Sensitive fields protected via RLS

## Performance Considerations

- ✅ Vector indexes created for similarity search
- ✅ Standard indexes on foreign keys and common queries
- ✅ Automated counters via triggers (no manual updates)
- ✅ Soft deletes for comments (is_deleted flag)

## Next Steps After Migration

1. **Configure Auth Providers** in Supabase Dashboard
2. **Generate Embeddings** for existing content (if any)
3. **Test RLS Policies** with different user roles
4. **Set up Cron Jobs** for scheduled Avolve workflows
5. **Configure Realtime** for community presence features
6. **Enable Backups** in Supabase Dashboard

---

**Last Updated**: October 16, 2025
**Database**: Supercivilization (coybefkmcykzbeosjgyt)
**Schema Version**: 1.0.0
