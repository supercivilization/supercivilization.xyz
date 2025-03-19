import type { SupabaseClient } from "@supabase/supabase-js"

export interface TrustScore {
  total: number
  components: {
    primeLaw: number
    verification: number
    activity: number
    connections: number
    reputation: number
  }
  badges: string[]
  level: "Bronze" | "Silver" | "Gold" | "Platinum"
}

export interface TrustMetrics {
  primeLawScore: number
  verificationCount: number
  activeDays: number
  connectedAccounts: number
  communityReputation: number
}

const TRUST_LEVELS = {
  Bronze: { min: 0, max: 25 },
  Silver: { min: 26, max: 50 },
  Gold: { min: 51, max: 75 },
  Platinum: { min: 76, max: 100 }
}

const BADGES = {
  primeLaw: {
    "Law Adherent": { min: 80, description: "Demonstrates strong understanding of The Prime Law" },
    "Law Guardian": { min: 90, description: "Teaches and upholds The Prime Law" }
  },
  verification: {
    "Verified Human": { min: 2, description: "Verified by multiple members" },
    "Trusted Member": { min: 5, description: "Highly verified member" }
  },
  activity: {
    "Active Participant": { min: 30, description: "Active for 30+ days" },
    "Community Pillar": { min: 90, description: "Active for 90+ days" }
  },
  connections: {
    "Connected": { min: 3, description: "Connected multiple accounts" },
    "Well Connected": { min: 5, description: "Highly connected profile" }
  }
}

export async function calculateTrustScore(
  supabase: SupabaseClient,
  userId: string
): Promise<TrustScore> {
  // Fetch user metrics
  const metrics = await fetchUserMetrics(supabase, userId)

  // Calculate component scores
  const components = {
    primeLaw: calculatePrimeLawScore(metrics.primeLawScore),
    verification: calculateVerificationScore(metrics.verificationCount),
    activity: calculateActivityScore(metrics.activeDays),
    connections: calculateConnectionsScore(metrics.connectedAccounts),
    reputation: calculateReputationScore(metrics.communityReputation)
  }

  // Calculate total score
  const total = Object.values(components).reduce((sum, score) => sum + score, 0) / 5

  // Determine level
  const level = determineTrustLevel(total)

  // Calculate badges
  const badges = calculateBadges(metrics)

  return {
    total,
    components,
    badges,
    level
  }
}

async function fetchUserMetrics(
  supabase: SupabaseClient,
  userId: string
): Promise<TrustMetrics> {
  // Fetch Prime Law agreement
  const { data: primeLaw } = await supabase
    .from("prime_law_agreements")
    .select("understanding_score")
    .eq("user_id", userId)
    .single()

  // Fetch verification count
  const { count: verificationCount } = await supabase
    .from("verifications")
    .select("*", { count: "exact" })
    .eq("user_id", userId)

  // Fetch activity metrics
  const { data: activity } = await supabase
    .from("user_activity")
    .select("active_days")
    .eq("user_id", userId)
    .single()

  // Fetch connected accounts
  const { count: connectedAccounts } = await supabase
    .from("connected_accounts")
    .select("*", { count: "exact" })
    .eq("user_id", userId)

  // Fetch community reputation
  const { data: reputation } = await supabase
    .from("reputation")
    .select("score")
    .eq("user_id", userId)
    .single()

  return {
    primeLawScore: primeLaw?.understanding_score || 0,
    verificationCount: verificationCount || 0,
    activeDays: activity?.active_days || 0,
    connectedAccounts: connectedAccounts || 0,
    communityReputation: reputation?.score || 0
  }
}

function calculatePrimeLawScore(score: number): number {
  return Math.min(score, 100)
}

function calculateVerificationScore(count: number): number {
  return Math.min(count * 20, 100) // 5 verifications = 100%
}

function calculateActivityScore(days: number): number {
  return Math.min(days, 100) // 100 days = 100%
}

function calculateConnectionsScore(count: number): number {
  return Math.min(count * 20, 100) // 5 connections = 100%
}

function calculateReputationScore(score: number): number {
  return Math.min(score, 100)
}

function determineTrustLevel(total: number): "Bronze" | "Silver" | "Gold" | "Platinum" {
  for (const [level, range] of Object.entries(TRUST_LEVELS)) {
    if (total >= range.min && total <= range.max) {
      return level as "Bronze" | "Silver" | "Gold" | "Platinum"
    }
  }
  return "Bronze"
}

function calculateBadges(metrics: TrustMetrics): string[] {
  const badges: string[] = []

  // Prime Law badges
  if (metrics.primeLawScore >= BADGES.primeLaw["Law Adherent"].min) {
    badges.push("Law Adherent")
  }
  if (metrics.primeLawScore >= BADGES.primeLaw["Law Guardian"].min) {
    badges.push("Law Guardian")
  }

  // Verification badges
  if (metrics.verificationCount >= BADGES.verification["Verified Human"].min) {
    badges.push("Verified Human")
  }
  if (metrics.verificationCount >= BADGES.verification["Trusted Member"].min) {
    badges.push("Trusted Member")
  }

  // Activity badges
  if (metrics.activeDays >= BADGES.activity["Active Participant"].min) {
    badges.push("Active Participant")
  }
  if (metrics.activeDays >= BADGES.activity["Community Pillar"].min) {
    badges.push("Community Pillar")
  }

  // Connection badges
  if (metrics.connectedAccounts >= BADGES.connections["Connected"].min) {
    badges.push("Connected")
  }
  if (metrics.connectedAccounts >= BADGES.connections["Well Connected"].min) {
    badges.push("Well Connected")
  }

  return badges
} 