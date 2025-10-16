-- ============================================================================
-- Seed Data for Taxonomy Tables
--
-- This populates the foundational taxonomy that defines the system structure:
-- - 7 Pillars
-- - Progression Stages
-- - Community Types & Stages
-- - Growth Engine Types & Stages
-- ============================================================================

-- ============================================================================
-- THE 7 PILLARS OF SUPERCIVILIZATION
-- ============================================================================

INSERT INTO pillars (name, slug, color_code, description, category_primary, category_secondary, sort_order) VALUES

('Superpuzzle Developments', 'superpuzzle-developments', 'Fuchsia/Pink',
 'Progress Our Grand Superpuzzle & Worldwide Drive to Ensure Wealth, Health, & Peace in Your Lifetime!',
 'Documentary', 'News Commentary', 1),

('Superhuman Enhancements', 'superhuman-enhancements', 'Rose/Red/Orange',
 'Free Yourself & Loved Ones via Superhuman Enhancements That Support Everyone: Child, Youth, & Adult!',
 'Philosophy', 'Parenting', 2),

('Personal Success Puzzle', 'personal-success-puzzle', 'Amber/Yellow',
 'Enjoy Greater Personal Successes Faster via Boosting Your Overall Health, Wealth, and Peace in Life!',
 'Self-Improvement', 'How To', 3),

('Supersociety Advancements', 'supersociety-advancements', 'Lime/Green/Emerald',
 'Free Others & Everybody via Supersociety Advancements That Help Companies, Communities, & Countries!',
 'Technology', 'Social Sciences', 4),

('Business Success Puzzle', 'business-success-puzzle', 'Teal/Cyan',
 'Enjoy Greater Business Successes Faster by Enhancing Your Network and also Advancing Your Net Worth!',
 'Entrepreneurship', 'How To', 5),

('Supergenius Breakthroughs', 'supergenius-breakthroughs', 'Sky/Blue/Indigo',
 'Solve Superpuzzles via Supergenius Breakthroughs That Help Grow Ventures, Enterprises, & Industries!',
 'Management', 'Investing', 6),

('Supermind Superpowers', 'supermind-superpowers', 'Violet/Purple',
 'Improve Your Ability to Solve a Conflict, Create a Plan for the Future & Implement Your Action Plan!',
 'Spirituality', 'Personal Journals', 7);

-- ============================================================================
-- PROGRESSION STAGES (Member → Mentee → Mentor → Master)
-- ============================================================================

INSERT INTO progression_stages (name, slug, level, description, requirements) VALUES

('Member', 'member', 1,
 'Entry-level member exploring the Supercivilization ecosystem and discovering their path.',
 '{"criteria": ["Account created", "Profile completed"]}'::jsonb),

('Mentee', 'mentee', 2,
 'Actively learning and applying knowledge from Supercivilization content and mentors.',
 '{"criteria": ["Completed 5+ learning modules", "Active for 30+ days", "Engaged with 10+ pieces of content"]}'::jsonb),

('Mentor', 'mentor', 3,
 'Contributing back by teaching others and sharing knowledge gained through experience.',
 '{"criteria": ["Created 10+ pieces of content", "Helped 5+ other users", "Active for 90+ days", "Positive community feedback"]}'::jsonb),

('Master', 'master', 4,
 'Elite contributor with deep expertise, guiding the community and advancing the ecosystem.',
 '{"criteria": ["Created 50+ pieces of content", "Mentored 20+ users", "Active for 365+ days", "Recognized expert in 2+ pillars", "Significant community impact"]}'::jsonb);

-- ============================================================================
-- COMMUNITY TYPES (Company, Community, Country)
-- ============================================================================

INSERT INTO community_types (name, slug, role_name, description) VALUES

('Company', 'company', 'Core Cooperator',
 'Personal startup society - your core network of collaborators building together.'),

('Community', 'community', 'Mesh Connector',
 'Global digital network union - connecting aligned communities worldwide.'),

('Country', 'country', 'Node Operator',
 'Local physical network archipelago - grounding digital connections in physical spaces.');

-- ============================================================================
-- COMMUNITY STAGES (Startup Society → Network State)
-- ============================================================================

INSERT INTO community_stages (name, slug, level, description, requirements) VALUES

('Startup Society', 'startup-society', 1,
 'Initial formation - a group with shared values and vision beginning to organize.',
 '{"criteria": ["10+ members", "Shared mission statement", "Regular communication"]}'::jsonb),

('Network Union', 'network-union', 2,
 'Coordinated collective - members actively collaborating and creating value together.',
 '{"criteria": ["100+ members", "Established governance", "Active projects", "Digital infrastructure"]}'::jsonb),

('Network Archipelago', 'network-archipelago', 3,
 'Physical presence - network establishes real-world locations and physical touchpoints.',
 '{"criteria": ["1000+ members", "Physical locations", "Local chapters", "Global coordination"]}'::jsonb),

('Network State', 'network-state', 4,
 'Full sovereignty - recognized entity with diplomatic relationships and global influence.',
 '{"criteria": ["10,000+ members", "International recognition", "Economic independence", "Governance systems", "Physical territory"]}'::jsonb);

-- ============================================================================
-- GROWTH ENGINE TYPES (Venture, Enterprise, Industry)
-- ============================================================================

INSERT INTO growth_engine_types (name, slug, role_name, description) VALUES

('Venture', 'venture', 'Innovator',
 'Inventing new growth engines - creating novel solutions and pioneering new markets.'),

('Enterprise', 'enterprise', 'Executive',
 'Improving existing growth engines - scaling and optimizing proven business models.'),

('Industry', 'industry', 'Magnate',
 'Managing a portfolio of growth engines - overseeing multiple ventures and enterprises.');

-- ============================================================================
-- GROWTH ENGINE STAGES (Seed → Biome)
-- ============================================================================

INSERT INTO growth_engine_stages (name, slug, level, description) VALUES

('Seed', 'seed', 1,
 'Initial concept - testing ideas and building minimum viable product.'),

('Tree', 'tree', 2,
 'Growing business - scaling operations and expanding market reach.'),

('Forest', 'forest', 3,
 'Ecosystem leader - established player with significant market influence.'),

('Biome', 'biome', 4,
 'Industry shaper - defining entire markets and creating new categories.');

-- ============================================================================
-- INITIAL AVOLVE AGENTS
-- Seed the core AI agents for orchestration
-- ============================================================================

INSERT INTO avolve_agents (name, slug, description, purpose, model_provider, model_name, config, is_active) VALUES

('Content Curator', 'content-curator',
 'Recommends personalized content based on user interests and pillar focus.',
 'personalization',
 'openai', 'gpt-4-turbo',
 '{"temperature": 0.7, "max_tokens": 1000, "top_p": 0.9}'::jsonb,
 true),

('Community Matchmaker', 'community-matchmaker',
 'Matches users to communities based on interests, goals, and values alignment.',
 'matching',
 'anthropic', 'claude-3-sonnet',
 '{"temperature": 0.6, "max_tokens": 1500}'::jsonb,
 true),

('Learning Coach', 'learning-coach',
 'Guides users through learning paths and progression in their chosen pillars.',
 'coaching',
 'openai', 'gpt-4-turbo',
 '{"temperature": 0.8, "max_tokens": 2000}'::jsonb,
 true),

('Content Moderator', 'content-moderator',
 'Reviews content for quality, appropriateness, and alignment with community standards.',
 'moderation',
 'anthropic', 'claude-3-sonnet',
 '{"temperature": 0.3, "max_tokens": 500}'::jsonb,
 true),

('Engagement Optimizer', 'engagement-optimizer',
 'Analyzes user behavior and suggests actions to increase meaningful engagement.',
 'optimization',
 'openai', 'gpt-4-turbo',
 '{"temperature": 0.5, "max_tokens": 1000}'::jsonb,
 true);

-- ============================================================================
-- CREATE AVOLVE WORKFLOWS
-- Define initial orchestration workflows
-- ============================================================================

INSERT INTO avolve_workflows (agent_id, name, description, trigger_type, trigger_config, actions, is_active) VALUES

-- Daily content recommendations
((SELECT id FROM avolve_agents WHERE slug = 'content-curator'),
 'Daily Content Recommendations',
 'Generate personalized content recommendations for active users every 24 hours.',
 'scheduled',
 '{"cron": "0 9 * * *", "timezone": "UTC"}'::jsonb,
 '[
   {"step": "fetch_user_interests", "action": "query_database"},
   {"step": "find_similar_content", "action": "vector_search"},
   {"step": "rank_recommendations", "action": "ai_inference"},
   {"step": "store_recommendations", "action": "insert_database"}
 ]'::jsonb,
 true),

-- New user onboarding
((SELECT id FROM avolve_agents WHERE slug = 'community-matchmaker'),
 'New User Onboarding',
 'Match new users to starter communities and content when they complete onboarding.',
 'event',
 '{"event": "user.onboarding_completed"}'::jsonb,
 '[
   {"step": "analyze_user_profile", "action": "ai_inference"},
   {"step": "recommend_communities", "action": "vector_search"},
   {"step": "suggest_content", "action": "database_query"},
   {"step": "send_welcome_message", "action": "notification"}
 ]'::jsonb,
 true),

-- Content moderation
((SELECT id FROM avolve_agents WHERE slug = 'content-moderator'),
 'Real-time Content Moderation',
 'Review new content submissions in real-time for quality and appropriateness.',
 'event',
 '{"event": "content.created"}'::jsonb,
 '[
   {"step": "analyze_content", "action": "ai_inference"},
   {"step": "check_guidelines", "action": "rule_evaluation"},
   {"step": "flag_if_needed", "action": "update_status"},
   {"step": "notify_admins", "action": "notification"}
 ]'::jsonb,
 true),

-- Weekly engagement insights
((SELECT id FROM avolve_agents WHERE slug = 'engagement-optimizer'),
 'Weekly Engagement Analysis',
 'Analyze user engagement patterns and suggest optimization strategies every week.',
 'scheduled',
 '{"cron": "0 10 * * 1", "timezone": "UTC"}'::jsonb,
 '[
   {"step": "fetch_user_activity", "action": "query_database"},
   {"step": "analyze_patterns", "action": "ai_inference"},
   {"step": "generate_insights", "action": "ai_inference"},
   {"step": "notify_users", "action": "notification"}
 ]'::jsonb,
 true);

-- ============================================================================
-- END OF SEED DATA
-- ============================================================================
