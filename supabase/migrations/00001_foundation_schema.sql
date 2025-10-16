-- ============================================================================
-- Supercivilization Foundation Schema
--
-- Database: "Supercivilization" (coybefkmcykzbeosjgyt)
-- Version: 1.0.0
-- Created: October 16, 2025
--
-- Architecture: Unified foundation supporting 7 pillars
-- - Superpuzzle Developments (News)
-- - Superhuman Enhancements (Education)
-- - Personal Success Puzzle (Lifestyle)
-- - Supersociety Advancements (Social Network)
-- - Business Success Puzzle (Business)
-- - Supergenius Breakthroughs (Finance)
-- - Supermind Superpowers (Productivity)
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";      -- UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";       -- Cryptographic functions
CREATE EXTENSION IF NOT EXISTS "vector";         -- pgvector for AI embeddings
CREATE EXTENSION IF NOT EXISTS "pg_trgm";        -- Fuzzy text search

-- ============================================================================
-- LEVEL 0: FOUNDATION TAXONOMY
-- Everything depends on these - they define the system structure
-- ============================================================================

-- The 7 Pillars of Supercivilization
CREATE TABLE pillars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  color_code TEXT NOT NULL, -- Fuchsia, Rose, Amber, Lime, Teal, Sky, Violet
  description TEXT NOT NULL,
  category_primary TEXT NOT NULL, -- Documentary, Philosophy, Self-Improvement, Technology, Entrepreneurship, Management, Spirituality
  category_secondary TEXT NOT NULL, -- News Commentary, Parenting, How To, Social Sciences, etc.
  sort_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User progression stages (global across all pillars)
CREATE TABLE progression_stages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE, -- Member, Mentee, Mentor, Master
  slug TEXT NOT NULL UNIQUE,
  level INTEGER NOT NULL UNIQUE, -- 1, 2, 3, 4
  description TEXT NOT NULL,
  requirements JSONB, -- Criteria for reaching this stage
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Community types and stages
CREATE TABLE community_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE, -- Company, Community, Country
  slug TEXT NOT NULL UNIQUE,
  role_name TEXT NOT NULL, -- Core Cooperator, Mesh Connector, Node Operator
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE community_stages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE, -- Startup Society, Network Union, Network Archipelago, Network State
  slug TEXT NOT NULL UNIQUE,
  level INTEGER NOT NULL UNIQUE, -- 1, 2, 3, 4
  description TEXT NOT NULL,
  requirements JSONB, -- Criteria for reaching this stage
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Growth engine types and stages (for Supergenius pillar)
CREATE TABLE growth_engine_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE, -- Venture, Enterprise, Industry
  slug TEXT NOT NULL UNIQUE,
  role_name TEXT NOT NULL, -- Innovator, Executive, Magnate
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE growth_engine_stages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE, -- Seed, Tree, Forest, Biome
  slug TEXT NOT NULL UNIQUE,
  level INTEGER NOT NULL UNIQUE, -- 1, 2, 3, 4
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- LEVEL 1: CORE USER IDENTITY & PROGRESSION
-- Depends on: Level 0 (progression_stages)
-- ============================================================================

-- Extended user profiles (Supabase auth.users is the source of truth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,

  -- Global progression
  progression_stage_id UUID REFERENCES progression_stages(id) NOT NULL,
  progression_achieved_at TIMESTAMPTZ,

  -- Pillar focus (which pillars is user active in)
  pillar_focus UUID[] DEFAULT '{}', -- Array of pillar IDs

  -- AI personalization (pgvector embeddings)
  interests_embedding vector(1536), -- OpenAI ada-002 dimension
  preferences JSONB DEFAULT '{}',

  -- Metadata
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User progression history (audit trail)
CREATE TABLE user_progression_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  from_stage_id UUID REFERENCES progression_stages(id),
  to_stage_id UUID REFERENCES progression_stages(id) NOT NULL,
  reason TEXT,
  metadata JSONB DEFAULT '{}',
  achieved_at TIMESTAMPTZ DEFAULT NOW()
);

-- User pillar-specific progress
CREATE TABLE user_pillar_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  pillar_id UUID REFERENCES pillars(id) ON DELETE CASCADE NOT NULL,

  -- Progress metrics
  contribution_count INTEGER DEFAULT 0,
  engagement_score NUMERIC DEFAULT 0,
  specialization_level INTEGER DEFAULT 1, -- 1-10 scale

  -- AI insights
  activity_embedding vector(1536), -- Tracks what user does in this pillar

  -- Timestamps
  first_engaged_at TIMESTAMPTZ DEFAULT NOW(),
  last_active_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, pillar_id)
);

-- ============================================================================
-- LEVEL 2: CONTENT SYSTEM (Cross-Pillar)
-- Depends on: Level 0 (pillars), Level 1 (profiles)
-- ============================================================================

CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Taxonomy
  pillar_id UUID REFERENCES pillars(id) NOT NULL,
  type TEXT NOT NULL, -- article, course, video, podcast, discussion, resource

  -- Content
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  body TEXT,
  excerpt TEXT,
  cover_image_url TEXT,

  -- Authorship
  creator_id UUID REFERENCES profiles(id) ON DELETE SET NULL,

  -- AI/Search
  content_embedding vector(1536), -- Semantic search
  tags TEXT[] DEFAULT '{}',
  keywords TEXT[] DEFAULT '{}',

  -- Publishing
  status TEXT DEFAULT 'draft', -- draft, published, archived
  published_at TIMESTAMPTZ,

  -- Engagement
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,

  -- Metadata
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(pillar_id, slug)
);

-- Content reactions (likes, votes, etc.)
CREATE TABLE content_reactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id UUID REFERENCES content(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL, -- like, upvote, bookmark, etc.
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(content_id, user_id, type)
);

-- Comments/discussions
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id UUID REFERENCES content(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,

  body TEXT NOT NULL,

  -- Engagement
  like_count INTEGER DEFAULT 0,

  -- Moderation
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- LEVEL 3: COMMUNITIES (Network Layer)
-- Depends on: Level 0 (community_types, community_stages), Level 1 (profiles)
-- ============================================================================

CREATE TABLE communities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Identity
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  avatar_url TEXT,
  cover_image_url TEXT,

  -- Classification
  type_id UUID REFERENCES community_types(id) NOT NULL, -- Company/Community/Country
  stage_id UUID REFERENCES community_stages(id) NOT NULL, -- Startup Society → Network State

  -- Network structure
  parent_community_id UUID REFERENCES communities(id), -- For hierarchical communities

  -- AI matching
  community_embedding vector(1536), -- For matching users to communities

  -- Settings
  is_public BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,

  -- Stats
  member_count INTEGER DEFAULT 0,
  content_count INTEGER DEFAULT 0,

  -- Metadata
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Community memberships
CREATE TABLE community_memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  community_id UUID REFERENCES communities(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  -- Role
  role TEXT NOT NULL DEFAULT 'member', -- member, moderator, admin, owner

  -- Contribution
  contribution_count INTEGER DEFAULT 0,
  engagement_score NUMERIC DEFAULT 0,

  -- Timestamps
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  last_active_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(community_id, user_id)
);

-- Community invitations
CREATE TABLE community_invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  community_id UUID REFERENCES communities(id) ON DELETE CASCADE NOT NULL,
  inviter_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  invitee_email TEXT NOT NULL,

  status TEXT DEFAULT 'pending', -- pending, accepted, declined, expired
  expires_at TIMESTAMPTZ NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  responded_at TIMESTAMPTZ
);

-- ============================================================================
-- LEVEL 4: AVOLVE AI ORCHESTRATION
-- Depends on: Everything above (needs data to orchestrate)
-- ============================================================================

-- AI agents (Avolve's orchestration layer)
CREATE TABLE avolve_agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Identity
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,

  -- Configuration
  purpose TEXT NOT NULL, -- personalization, moderation, matching, coaching, etc.
  model_provider TEXT NOT NULL, -- openai, anthropic, huggingface, etc.
  model_name TEXT NOT NULL, -- gpt-4, claude-3-sonnet, etc.
  config JSONB DEFAULT '{}',

  -- Status
  is_active BOOLEAN DEFAULT TRUE,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI workflows (orchestration sequences)
CREATE TABLE avolve_workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID REFERENCES avolve_agents(id) ON DELETE CASCADE NOT NULL,

  -- Identity
  name TEXT NOT NULL,
  description TEXT,

  -- Configuration
  trigger_type TEXT NOT NULL, -- manual, scheduled, event, real-time
  trigger_config JSONB DEFAULT '{}',
  actions JSONB NOT NULL, -- Array of actions to execute

  -- Status
  is_active BOOLEAN DEFAULT TRUE,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI workflow executions (audit trail)
CREATE TABLE avolve_executions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workflow_id UUID REFERENCES avolve_workflows(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL, -- If user-triggered

  -- Execution
  input JSONB NOT NULL,
  output JSONB,
  status TEXT DEFAULT 'pending', -- pending, running, completed, failed
  error_message TEXT,

  -- Performance
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  duration_ms INTEGER,

  -- Tokens (for AI model usage tracking)
  tokens_used INTEGER,
  cost_usd NUMERIC
);

-- AI recommendations (personalization output)
CREATE TABLE avolve_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  -- Recommendation
  type TEXT NOT NULL, -- content, community, user, learning_path
  target_id UUID NOT NULL, -- ID of recommended item
  score NUMERIC NOT NULL, -- Confidence score 0-1
  reason TEXT, -- Human-readable explanation

  -- Feedback
  was_shown BOOLEAN DEFAULT FALSE,
  was_clicked BOOLEAN DEFAULT FALSE,
  was_dismissed BOOLEAN DEFAULT FALSE,
  user_feedback INTEGER, -- -1 (thumbs down), 0 (neutral), 1 (thumbs up)

  -- Metadata
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Profiles
CREATE INDEX idx_profiles_progression_stage ON profiles(progression_stage_id);
CREATE INDEX idx_profiles_interests_embedding ON profiles USING ivfflat (interests_embedding vector_cosine_ops); -- pgvector similarity search

-- Content
CREATE INDEX idx_content_pillar ON content(pillar_id);
CREATE INDEX idx_content_creator ON content(creator_id);
CREATE INDEX idx_content_status ON content(status);
CREATE INDEX idx_content_published_at ON content(published_at DESC);
CREATE INDEX idx_content_embedding ON content USING ivfflat (content_embedding vector_cosine_ops); -- Semantic search
CREATE INDEX idx_content_tags ON content USING gin(tags); -- Array search

-- Communities
CREATE INDEX idx_communities_type ON communities(type_id);
CREATE INDEX idx_communities_stage ON communities(stage_id);
CREATE INDEX idx_communities_embedding ON communities USING ivfflat (community_embedding vector_cosine_ops);

-- Memberships
CREATE INDEX idx_memberships_user ON community_memberships(user_id);
CREATE INDEX idx_memberships_community ON community_memberships(community_id);

-- Comments
CREATE INDEX idx_comments_content ON comments(content_id);
CREATE INDEX idx_comments_user ON comments(user_id);
CREATE INDEX idx_comments_parent ON comments(parent_comment_id);

-- Avolve
CREATE INDEX idx_executions_workflow ON avolve_executions(workflow_id);
CREATE INDEX idx_executions_user ON avolve_executions(user_id);
CREATE INDEX idx_executions_status ON avolve_executions(status);
CREATE INDEX idx_recommendations_user ON avolve_recommendations(user_id);
CREATE INDEX idx_recommendations_type ON avolve_recommendations(type);

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT TIMESTAMPS
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_updated_at BEFORE UPDATE ON content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_communities_updated_at BEFORE UPDATE ON communities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TRIGGERS FOR COUNTERS
-- ============================================================================

-- Update content comment count
CREATE OR REPLACE FUNCTION update_content_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE content SET comment_count = comment_count + 1 WHERE id = NEW.content_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE content SET comment_count = GREATEST(comment_count - 1, 0) WHERE id = OLD.content_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_content_comment_count
  AFTER INSERT OR DELETE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_content_comment_count();

-- Update content like count
CREATE OR REPLACE FUNCTION update_content_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.type = 'like' THEN
    UPDATE content SET like_count = like_count + 1 WHERE id = NEW.content_id;
  ELSIF TG_OP = 'DELETE' AND OLD.type = 'like' THEN
    UPDATE content SET like_count = GREATEST(like_count - 1, 0) WHERE id = OLD.content_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_content_like_count
  AFTER INSERT OR DELETE ON content_reactions
  FOR EACH ROW EXECUTE FUNCTION update_content_like_count();

-- Update community member count
CREATE OR REPLACE FUNCTION update_community_member_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE communities SET member_count = member_count + 1 WHERE id = NEW.community_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE communities SET member_count = GREATEST(member_count - 1, 0) WHERE id = OLD.community_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_community_member_count
  AFTER INSERT OR DELETE ON community_memberships
  FOR EACH ROW EXECUTE FUNCTION update_community_member_count();

-- ============================================================================
-- FUNCTIONS FOR VECTOR SEARCH
-- ============================================================================

-- Search similar content (semantic search)
CREATE OR REPLACE FUNCTION search_similar_content(
  query_embedding vector(1536),
  match_threshold FLOAT DEFAULT 0.7,
  match_count INT DEFAULT 10,
  pillar_filter UUID DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    content.id,
    content.title,
    1 - (content.content_embedding <=> query_embedding) AS similarity
  FROM content
  WHERE
    content.status = 'published'
    AND (pillar_filter IS NULL OR content.pillar_id = pillar_filter)
    AND 1 - (content.content_embedding <=> query_embedding) > match_threshold
  ORDER BY content.content_embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Find similar users (for AI matching)
CREATE OR REPLACE FUNCTION find_similar_users(
  user_embedding vector(1536),
  match_threshold FLOAT DEFAULT 0.7,
  match_count INT DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  display_name TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    profiles.id,
    profiles.display_name,
    1 - (profiles.interests_embedding <=> user_embedding) AS similarity
  FROM profiles
  WHERE
    profiles.interests_embedding IS NOT NULL
    AND 1 - (profiles.interests_embedding <=> user_embedding) > match_threshold
  ORDER BY profiles.interests_embedding <=> user_embedding
  LIMIT match_count;
END;
$$;

-- Recommend communities for user
CREATE OR REPLACE FUNCTION recommend_communities(
  user_embedding vector(1536),
  match_threshold FLOAT DEFAULT 0.6,
  match_count INT DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    communities.id,
    communities.name,
    1 - (communities.community_embedding <=> user_embedding) AS similarity
  FROM communities
  WHERE
    communities.is_public = TRUE
    AND communities.community_embedding IS NOT NULL
    AND 1 - (communities.community_embedding <=> user_embedding) > match_threshold
  ORDER BY communities.community_embedding <=> user_embedding
  LIMIT match_count;
END;
$$;

-- ============================================================================
-- END OF FOUNDATION SCHEMA
-- ============================================================================
