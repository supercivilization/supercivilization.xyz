-- ============================================================================
-- Row Level Security (RLS) Policies
--
-- Security model:
-- - Public content is readable by all
-- - Users can only modify their own data
-- - Admins (Masters) have elevated privileges
-- - Avolve orchestration uses service role (bypasses RLS)
-- ============================================================================

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Check if current user is the owner
CREATE OR REPLACE FUNCTION auth.is_owner(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN auth.uid() = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if current user is an admin (Master level)
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    JOIN progression_stages ON profiles.progression_stage_id = progression_stages.id
    WHERE profiles.id = auth.uid()
    AND progression_stages.slug = 'master'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user is a community admin
CREATE OR REPLACE FUNCTION auth.is_community_admin(community_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM community_memberships
    WHERE community_memberships.community_id = $1
    AND community_memberships.user_id = auth.uid()
    AND community_memberships.role IN ('admin', 'owner')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user is a community member
CREATE OR REPLACE FUNCTION auth.is_community_member(community_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM community_memberships
    WHERE community_memberships.community_id = $1
    AND community_memberships.user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- TAXONOMY TABLES (PUBLIC READ, ADMIN WRITE)
-- ============================================================================

-- Pillars
ALTER TABLE pillars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pillars are viewable by everyone"
  ON pillars FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage pillars"
  ON pillars FOR ALL
  USING (auth.is_admin());

-- Progression stages
ALTER TABLE progression_stages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Progression stages are viewable by everyone"
  ON progression_stages FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage progression stages"
  ON progression_stages FOR ALL
  USING (auth.is_admin());

-- Community types
ALTER TABLE community_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Community types are viewable by everyone"
  ON community_types FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage community types"
  ON community_types FOR ALL
  USING (auth.is_admin());

-- Community stages
ALTER TABLE community_stages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Community stages are viewable by everyone"
  ON community_stages FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage community stages"
  ON community_stages FOR ALL
  USING (auth.is_admin());

-- Growth engine types
ALTER TABLE growth_engine_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Growth engine types are viewable by everyone"
  ON growth_engine_types FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage growth engine types"
  ON growth_engine_types FOR ALL
  USING (auth.is_admin());

-- Growth engine stages
ALTER TABLE growth_engine_stages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Growth engine stages are viewable by everyone"
  ON growth_engine_stages FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage growth engine stages"
  ON growth_engine_stages FOR ALL
  USING (auth.is_admin());

-- ============================================================================
-- USER PROFILES & PROGRESSION
-- ============================================================================

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.is_owner(id));

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.is_owner(id))
  WITH CHECK (auth.is_owner(id));

CREATE POLICY "Users can delete their own profile"
  ON profiles FOR DELETE
  USING (auth.is_owner(id));

-- User progression history (audit trail - read-only for users)
ALTER TABLE user_progression_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own progression history"
  ON user_progression_history FOR SELECT
  USING (auth.is_owner(user_id));

CREATE POLICY "System can insert progression history"
  ON user_progression_history FOR INSERT
  WITH CHECK (true); -- Controlled by triggers/functions

-- User pillar progress
ALTER TABLE user_pillar_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own pillar progress"
  ON user_pillar_progress FOR SELECT
  USING (auth.is_owner(user_id));

CREATE POLICY "Users can update their own pillar progress"
  ON user_pillar_progress FOR UPDATE
  USING (auth.is_owner(user_id))
  WITH CHECK (auth.is_owner(user_id));

CREATE POLICY "System can insert pillar progress"
  ON user_pillar_progress FOR INSERT
  WITH CHECK (true); -- Auto-created on first activity

-- ============================================================================
-- CONTENT
-- ============================================================================

-- Content
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published content is viewable by everyone"
  ON content FOR SELECT
  USING (status = 'published' OR auth.is_owner(creator_id) OR auth.is_admin());

CREATE POLICY "Users can create content"
  ON content FOR INSERT
  WITH CHECK (auth.is_owner(creator_id));

CREATE POLICY "Users can update their own content"
  ON content FOR UPDATE
  USING (auth.is_owner(creator_id) OR auth.is_admin())
  WITH CHECK (auth.is_owner(creator_id) OR auth.is_admin());

CREATE POLICY "Users can delete their own content"
  ON content FOR DELETE
  USING (auth.is_owner(creator_id) OR auth.is_admin());

-- Content reactions
ALTER TABLE content_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reactions are viewable by everyone"
  ON content_reactions FOR SELECT
  USING (true);

CREATE POLICY "Users can create reactions"
  ON content_reactions FOR INSERT
  WITH CHECK (auth.is_owner(user_id));

CREATE POLICY "Users can delete their own reactions"
  ON content_reactions FOR DELETE
  USING (auth.is_owner(user_id));

-- Comments
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Non-deleted comments are viewable by everyone"
  ON comments FOR SELECT
  USING (is_deleted = false OR auth.is_owner(user_id) OR auth.is_admin());

CREATE POLICY "Users can create comments"
  ON comments FOR INSERT
  WITH CHECK (auth.is_owner(user_id));

CREATE POLICY "Users can update their own comments"
  ON comments FOR UPDATE
  USING (auth.is_owner(user_id) OR auth.is_admin())
  WITH CHECK (auth.is_owner(user_id) OR auth.is_admin());

CREATE POLICY "Users can delete their own comments"
  ON comments FOR DELETE
  USING (auth.is_owner(user_id) OR auth.is_admin());

-- ============================================================================
-- COMMUNITIES
-- ============================================================================

-- Communities
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public communities are viewable by everyone"
  ON communities FOR SELECT
  USING (is_public = true OR auth.is_community_member(id) OR auth.is_admin());

CREATE POLICY "Authenticated users can create communities"
  ON communities FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Community admins can update their community"
  ON communities FOR UPDATE
  USING (auth.is_community_admin(id) OR auth.is_admin())
  WITH CHECK (auth.is_community_admin(id) OR auth.is_admin());

CREATE POLICY "Community owners can delete their community"
  ON communities FOR DELETE
  USING (auth.is_community_admin(id) OR auth.is_admin());

-- Community memberships
ALTER TABLE community_memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Memberships are viewable by community members"
  ON community_memberships FOR SELECT
  USING (
    auth.is_community_member(community_id) OR
    auth.is_owner(user_id) OR
    auth.is_admin()
  );

CREATE POLICY "Users can join public communities"
  ON community_memberships FOR INSERT
  WITH CHECK (
    auth.is_owner(user_id) AND
    EXISTS (
      SELECT 1 FROM communities
      WHERE communities.id = community_id
      AND communities.is_public = true
    )
  );

CREATE POLICY "Community admins can manage memberships"
  ON community_memberships FOR UPDATE
  USING (auth.is_community_admin(community_id) OR auth.is_admin())
  WITH CHECK (auth.is_community_admin(community_id) OR auth.is_admin());

CREATE POLICY "Users can leave communities"
  ON community_memberships FOR DELETE
  USING (auth.is_owner(user_id) OR auth.is_community_admin(community_id) OR auth.is_admin());

-- Community invitations
ALTER TABLE community_invitations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view invitations they sent or received"
  ON community_invitations FOR SELECT
  USING (
    auth.is_owner(inviter_id) OR
    auth.is_community_admin(community_id) OR
    auth.is_admin()
  );

CREATE POLICY "Community members can create invitations"
  ON community_invitations FOR INSERT
  WITH CHECK (
    auth.is_owner(inviter_id) AND
    auth.is_community_member(community_id)
  );

CREATE POLICY "Inviters can delete their invitations"
  ON community_invitations FOR DELETE
  USING (auth.is_owner(inviter_id) OR auth.is_admin());

-- ============================================================================
-- AVOLVE (ADMIN-ONLY ACCESS)
-- All Avolve tables are admin-only - normal users never interact directly
-- Avolve orchestration uses service role key (bypasses RLS entirely)
-- ============================================================================

-- Avolve agents
ALTER TABLE avolve_agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view agents"
  ON avolve_agents FOR SELECT
  USING (auth.is_admin());

CREATE POLICY "Only admins can manage agents"
  ON avolve_agents FOR ALL
  USING (auth.is_admin());

-- Avolve workflows
ALTER TABLE avolve_workflows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view workflows"
  ON avolve_workflows FOR SELECT
  USING (auth.is_admin());

CREATE POLICY "Only admins can manage workflows"
  ON avolve_workflows FOR ALL
  USING (auth.is_admin());

-- Avolve executions
ALTER TABLE avolve_executions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all executions"
  ON avolve_executions FOR SELECT
  USING (auth.is_admin());

CREATE POLICY "Users can view their own executions"
  ON avolve_executions FOR SELECT
  USING (auth.is_owner(user_id));

CREATE POLICY "System can insert executions"
  ON avolve_executions FOR INSERT
  WITH CHECK (true); -- Service role only

-- Avolve recommendations
ALTER TABLE avolve_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own recommendations"
  ON avolve_recommendations FOR SELECT
  USING (auth.is_owner(user_id));

CREATE POLICY "Users can update recommendation feedback"
  ON avolve_recommendations FOR UPDATE
  USING (auth.is_owner(user_id))
  WITH CHECK (auth.is_owner(user_id));

CREATE POLICY "System can insert recommendations"
  ON avolve_recommendations FOR INSERT
  WITH CHECK (true); -- Service role only

-- ============================================================================
-- END OF RLS POLICIES
-- ============================================================================
