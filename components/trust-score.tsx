import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { calculateTrustScore, type TrustScore } from "@/lib/trust-scoring"
import { createBrowserClient } from "@supabase/ssr"
import { Loader2 } from "lucide-react"

const TRUST_LEVEL_COLORS = {
  Bronze: "bg-amber-600",
  Silver: "bg-gray-400",
  Gold: "bg-yellow-500",
  Platinum: "bg-purple-500"
}

export function TrustScoreDisplay({ userId }: { userId: string }) {
  const [score, setScore] = useState<TrustScore | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadScore() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      try {
        const trustScore = await calculateTrustScore(supabase, userId)
        setScore(trustScore)
      } catch (error) {
        console.error("Failed to load trust score:", error)
      } finally {
        setLoading(false)
      }
    }

    loadScore()
  }, [userId])

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!score) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            Unable to load trust score
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Trust Score
          <Badge className={TRUST_LEVEL_COLORS[score.level]}>
            {score.level}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Score</span>
            <span>{Math.round(score.total)}%</span>
          </div>
          <Progress value={score.total} className="h-2" />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Components</h3>
          <div className="space-y-2">
            {Object.entries(score.components).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{key}</span>
                  <span>{Math.round(value)}%</span>
                </div>
                <Progress value={value} className="h-1" />
              </div>
            ))}
          </div>
        </div>

        {score.badges.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium">Badges</h3>
            <div className="flex flex-wrap gap-2">
              {score.badges.map((badge) => (
                <Badge key={badge} variant="secondary">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 