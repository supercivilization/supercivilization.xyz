# Supercivilization Database Schema v1.0

**Created**: October 16, 2025
**Database**: Supercivilization (coybefkmcykzbeosjgyt)
**Status**: Ready to Apply

---

## Executive Summary

This document describes the complete database schema for the Supercivilization platform, designed to support:

- **7 Pillars** of personal and collective development
- **3-Level Progression** (Individual → Collective → Ecosystem)
- **AI Orchestration** via Avolve agents
- **Modern Features**: pgvector embeddings, semantic search, real-time capabilities

---

## Architecture Decisions

### Single Database for Two Applications

**Decision**: Use one Supabase database for both:
- `supercivilization.xyz` (public platform)
- `avolve.io` (admin interface)

**Rationale**:
- Avolve is the admin orchestration layer, not a separate product
- Unified data model and authentication
- Direct data access without API overhead
- Simplified operations and backups

### Modern Supabase Features Leveraged

Based on latest Supabase capabilities (Oct 2025):

1. **pgvector** for AI embeddings and semantic search
2. **Automated embeddings** generation
3. **Real-time broadcast** from database for communities
4. **OAuth 2.1** server capabilities for progression-based auth
5. **Declarative schemas** for version control

---

## The 7 Pillars

```
1. Superpuzzle Developments (Fuchsia/Pink)
   → News app for progress tracking

2. Superhuman Enhancements (Rose/Red/Orange)
   → Education app for personal development
   → Academy (0-12), University (12-25), Institute (25+)

3. Personal Success Puzzle (Amber/Yellow)
   → Lifestyle app for health, wealth, peace

4. Supersociety Advancements (Lime/Green/Emerald)
   → Social network for building communities
   → Company → Community → Country

5. Business Success Puzzle (Teal/Cyan)
   → Business app for network and net worth

6. Supergenius Breakthroughs (Sky/Blue/Indigo)
   → Finance app for growth engines
   → Ventures → Enterprises → Industries

7. Supermind Superpowers (Violet/Purple)
   → Productivity app for goal achievement
```

---

## Progression Models

### Individual (Vivify Further)
```
Member → Mentee → Mentor → Master

Learn for entertainment
Apply for enlightenment
Teach for empowerment
```

### Collective (Unify Faster)
```
Startup Society → Network Union → Network Archipelago → Network State

Personalize (Company - Core Cooperators)
Globalize (Community - Mesh Connectors)
Localize (Country - Node Operators)
```

### Ecosystem (Thrive Forever)
```
Seed → Tree → Forest → Biome

Create the new (Ventures - Innovators)
Evolve the now (Enterprises - Executives)
Manage the next (Industries - Magnates)
```

---

## Database Schema Overview

### Level 0: Taxonomy Tables (Foundation)

**Purpose**: Define the system structure
**Dependencies**: None
**Access**: Public read, admin write

```sql
pillars                 -- 7 pillars with colors and descriptions
progression_stages      -- Member → Master
community_types         -- Company, Community, Country
community_stages        -- Startup Society → Network State
growth_engine_types     -- Venture, Enterprise, Industry
growth_engine_stages    -- Seed → Biome
```

### Level 1: User Identity & Progression

**Purpose**: Track users and their growth
**Dependencies**: Level 0 (progression_stages)
**Access**: Own data only

```sql
profiles                    -- Extended user info + interests_embedding
user_progression_history    -- Audit trail of level ups
user_pillar_progress        -- Per-pillar specialization tracking
```

**Key Features**:
- Global progression (Member → Master)
- Per-pillar specialization (1-10 scale)
- AI embeddings for personalization (vector(1536))

### Level 2: Content System

**Purpose**: Cross-pillar knowledge base
**Dependencies**: Level 0 (pillars), Level 1 (profiles)
**Access**: Published = public, drafts = creator only

```sql
content              -- Articles, courses, videos, podcasts, etc.
content_reactions    -- Likes, upvotes, bookmarks
comments             -- Discussions with threading
```

**Key Features**:
- Semantic search via content_embedding
- Automated counters (views, likes, comments)
- Soft delete for comments

### Level 3: Communities

**Purpose**: Network layer for collaboration
**Dependencies**: Level 0 (community types/stages), Level 1 (profiles)
**Access**: Public/private based on is_public flag

```sql
communities              -- Network structures
community_memberships    -- User participation + roles
community_invitations    -- Invitation system
```

**Key Features**:
- Three types: Company, Community, Country
- Four stages: Startup Society → Network State
- AI embeddings for matching users to communities
- Hierarchical structure (parent_community_id)

### Level 4: Avolve AI Orchestration

**Purpose**: AI-powered personalization and automation
**Dependencies**: All above (needs data to orchestrate)
**Access**: Admin-only (service role for AI)

```sql
avolve_agents             -- AI agent definitions
avolve_workflows          -- Orchestration sequences
avolve_executions         -- Execution logs
avolve_recommendations    -- Personalization output
```

**Initial Agents**:
1. Content Curator (personalization)
2. Community Matchmaker (matching)
3. Learning Coach (coaching)
4. Content Moderator (moderation)
5. Engagement Optimizer (optimization)

---

## AI/Vector Capabilities

### Embeddings Storage

**Dimension**: 1536 (OpenAI ada-002 compatible)

```sql
profiles.interests_embedding          -- User interests
content.content_embedding             -- Semantic search
communities.community_embedding       -- Community matching
```

### Vector Search Functions

```sql
-- Find similar content
search_similar_content(
  query_embedding vector(1536),
  match_threshold FLOAT,
  match_count INT,
  pillar_filter UUID
)

-- Find similar users
find_similar_users(
  user_embedding vector(1536),
  match_threshold FLOAT,
  match_count INT
)

-- Recommend communities
recommend_communities(
  user_embedding vector(1536),
  match_threshold FLOAT,
  match_count INT
)
```

---

## Security Model (RLS Policies)

### Public Access
- ✅ All taxonomy tables (pillars, stages, types)
- ✅ Published content
- ✅ Public communities
- ✅ User profiles (metadata only)

### User Access
- ✅ Own profile (full access)
- ✅ Own content (create, edit, delete)
- ✅ Own comments and reactions
- ✅ Communities they're members of
- ✅ Own recommendations and progress

### Admin Access (Masters)
- ✅ All content (moderation)
- ✅ All communities (management)
- ✅ All Avolve orchestration features
- ✅ User progression management

### Service Role (Avolve AI)
- ✅ Bypasses RLS entirely
- ✅ Used for AI orchestration workflows
- ✅ Never exposed to client

---

## Performance Optimizations

### Indexes Created

**Standard Indexes**:
- Foreign keys (user_id, pillar_id, community_id, etc.)
- Common queries (status, published_at, type)
- Array fields with GIN (tags, keywords)

**Vector Indexes** (IVFFlat):
- profiles.interests_embedding
- content.content_embedding
- communities.community_embedding

**Full-Text Search**:
- pg_trgm for fuzzy matching

### Automated Counters

**Via Triggers** (no manual updates needed):
- content.comment_count
- content.like_count
- communities.member_count

**Benefits**:
- Always accurate
- No race conditions
- No manual maintenance

---

## Migration Files

Located in `/supabase/migrations/`:

1. `00001_foundation_schema.sql` (Tables, indexes, functions)
2. `00002_rls_policies.sql` (Security policies)
3. `00003_seed_taxonomy.sql` (Initial data)

**To Apply**:
```bash
supabase link --project-ref coybefkmcykzbeosjgyt
supabase db push
```

---

## Initial Data Seeded

### 7 Pillars
All 7 pillars with:
- Names and slugs
- Color codes
- Full descriptions
- Podcast categories
- Sort order

### Progression Stages
4 stages with:
- Level progression (1-4)
- Requirements JSONB
- Descriptions

### Community Taxonomy
- 3 types (Company, Community, Country)
- 4 stages (Startup Society → Network State)
- Role names for each type

### Growth Engine Taxonomy
- 3 types (Venture, Enterprise, Industry)
- 4 stages (Seed → Biome)
- Role names for each type

### Avolve Agents (5)
1. Content Curator (OpenAI GPT-4)
2. Community Matchmaker (Anthropic Claude 3 Sonnet)
3. Learning Coach (OpenAI GPT-4)
4. Content Moderator (Anthropic Claude 3 Sonnet)
5. Engagement Optimizer (OpenAI GPT-4)

### Avolve Workflows (4)
1. Daily Content Recommendations (Cron: 9am daily)
2. New User Onboarding (Event: onboarding_completed)
3. Real-time Content Moderation (Event: content.created)
4. Weekly Engagement Analysis (Cron: 10am Monday)

---

## Next Steps

### Immediate (Required)

1. **Apply Migrations**
   ```bash
   cd /Users/avolve/dev/active/supercivilization
   supabase link --project-ref coybefkmcykzbeosjgyt
   supabase db push
   ```

2. **Generate TypeScript Types**
   ```bash
   # For supercivilization.xyz
   supabase gen types typescript --linked > src/lib/supabase/database.types.ts

   # For avolve.io (same database)
   cd /Users/avolve/dev/active/avolve
   supabase gen types typescript --project-id coybefkmcykzbeosjgyt > src/lib/supabase/database.types.ts
   ```

3. **Configure Auth**
   - Enable auth providers in Supabase Dashboard
   - Set redirect URLs for production domains
   - Configure email templates

### Short-Term (Recommended)

4. **Create Auth Pages**
   - `/login` - Sign in
   - `/signup` - Registration
   - `/auth/callback` - OAuth redirect

5. **Test RLS Policies**
   - Create test users at different progression levels
   - Verify data access patterns
   - Test admin vs. regular user permissions

6. **Set Up Middleware**
   - Auth session refresh
   - Route protection (admin routes)

### Medium-Term (Enhancement)

7. **Generate Embeddings**
   - Set up embedding generation workflow
   - Populate interests_embedding for users
   - Populate content_embedding for existing content

8. **Configure Real-time**
   - Community presence features
   - Live notifications
   - Real-time collaboration

9. **Set Up Cron Jobs**
   - Daily content recommendations
   - Weekly engagement analysis
   - Scheduled Avolve workflows

### Long-Term (Production)

10. **Enable Backups**
11. **Add Monitoring** (Sentry, logging)
12. **Load Testing**
13. **Disaster Recovery Planning**

---

## Schema Evolution Strategy

### Adding New Pillars
```sql
INSERT INTO pillars (name, slug, color_code, ...) VALUES (...);
```

### Adding Pillar-Specific Tables
```sql
-- Example: Learning paths for Superhuman Enhancements
CREATE TABLE superhuman_learning_paths (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pillar_id UUID REFERENCES pillars(id),
  age_group TEXT, -- academy/university/institute
  ...
);
```

### Adding New Avolve Agents
```sql
INSERT INTO avolve_agents (name, slug, purpose, ...) VALUES (...);
INSERT INTO avolve_workflows (agent_id, ...) VALUES (...);
```

---

## Questions & Decisions Deferred

These can be addressed as you build out specific features:

1. **Content Types**: Which specific types beyond article/course/video?
2. **Learning Paths**: Detailed structure for Superhuman Enhancements pillar
3. **Growth Engines**: Actual entity structure vs. metadata tracking
4. **Reputation System**: Points, badges, leaderboards
5. **Messaging**: Direct messages between users
6. **Notifications**: Preference management, delivery channels

---

## Resources

- [Supabase Dashboard](https://supabase.com/dashboard/project/coybefkmcykzbeosjgyt)
- [Schema README](/supabase/migrations/README.md)
- [RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [pgvector Guide](https://supabase.com/docs/guides/ai/vector-columns)
- [Real-time Features](https://supabase.com/docs/guides/realtime)

---

**This schema is production-ready foundation** that supports your full vision while allowing incremental feature development across all 7 pillars.
