import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle } from "lucide-react"
import { generateSignature } from "@/lib/signature"

const PRIME_LAW = {
  preamble: [
    "The purpose of human life is to prosper and live happily.",
    "The function of government is to provide the conditions that let individuals fulfill that purpose.",
    "The Prime Law guarantees those conditions by forbidding the use of initiatory force, fraud, or coercion by any person or group against any individual, property, or contract."
  ],
  articles: [
    {
      number: 1,
      text: "No person, group of persons, or government shall initiate force, threat of force, or fraud against any individual's self, property, or contract."
    },
    {
      number: 2,
      text: "Force is morally-and-legally justified only for protection from those who violate Article 1."
    },
    {
      number: 3,
      text: "No exceptions shall exist for Articles 1 and 2."
    }
  ],
  final: "The Prime Law may not be amended."
}

const VERIFICATION_QUESTIONS = [
  {
    id: "q1",
    question: "What is the only justified use of force according to The Prime Law?",
    correctAnswer: "Protection from those who violate Article 1",
    options: [
      "Protection from those who violate Article 1",
      "Any use of force is justified",
      "Force is never justified",
      "Force is justified for any good cause"
    ]
  },
  {
    id: "q2",
    question: "Can The Prime Law be amended?",
    correctAnswer: "No",
    options: ["No", "Yes", "Only with majority vote", "Only in special circumstances"]
  },
  {
    id: "q3",
    question: "What is the purpose of human life according to The Prime Law?",
    correctAnswer: "To prosper and live happily",
    options: [
      "To prosper and live happily",
      "To serve others",
      "To accumulate wealth",
      "To achieve power"
    ]
  }
]

export default function PrimeLawPage() {
  const [hasRead, setHasRead] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
    setShowFeedback(true)
  }

  const calculateScore = () => {
    let correct = 0
    VERIFICATION_QUESTIONS.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++
    })
    return (correct / VERIFICATION_QUESTIONS.length) * 100
  }

  const getQuestionProgress = () => {
    const answered = Object.keys(answers).length
    return (answered / VERIFICATION_QUESTIONS.length) * 100
  }

  const handleSubmit = async () => {
    if (!hasRead) {
      toast({
        title: "Please read The Prime Law",
        description: "You must read and acknowledge The Prime Law before proceeding.",
        variant: "destructive"
      })
      return
    }

    const score = calculateScore()
    if (score < 80) {
      toast({
        title: "Understanding Required",
        description: "You must demonstrate understanding of The Prime Law to proceed.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      // Get IP address from server
      const ipResponse = await fetch("/api/get-ip")
      const { ip } = await ipResponse.json()

      // Generate signature
      const signature = await generateSignature(user.id, answers)

      const { error } = await supabase.from("prime_law_agreements").insert({
        user_id: user.id,
        understanding_score: score,
        answers: answers,
        ip_address: ip,
        signature: signature,
        version: "1.0"
      })

      if (error) throw error

      toast({
        title: "Agreement Recorded",
        description: "You have successfully agreed to The Prime Law.",
      })

      router.push("/dashboard")
    } catch (error: any) {
      console.error("Agreement error:", error)
      toast({
        title: "Error",
        description: "Failed to record your agreement. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">The Prime Law</h1>
          <p className="mt-2 text-muted-foreground">
            The Fundamental of Protection
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Preamble</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {PRIME_LAW.preamble.map((line, i) => (
              <p key={i} className="text-lg">{line}</p>
            ))}
          </CardContent>
        </Card>

        {PRIME_LAW.articles.map(article => (
          <Card key={article.number}>
            <CardHeader>
              <CardTitle>Article {article.number}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">{article.text}</p>
            </CardContent>
          </Card>
        ))}

        <Card>
          <CardContent className="pt-6">
            <p className="text-lg font-semibold">{PRIME_LAW.final}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="read"
                checked={hasRead}
                onCheckedChange={(checked) => setHasRead(checked as boolean)}
              />
              <Label htmlFor="read">
                I have read and understand The Prime Law
              </Label>
            </div>
          </CardContent>
        </Card>

        {hasRead && (
          <Card>
            <CardHeader>
              <CardTitle>Verification Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(getQuestionProgress())}%</span>
                </div>
                <Progress value={getQuestionProgress()} className="h-2" />
              </div>

              {VERIFICATION_QUESTIONS.map((q, i) => (
                <div key={q.id} className="space-y-4">
                  <p className="font-medium">{q.question}</p>
                  <div className="space-y-2">
                    {q.options.map(option => (
                      <div key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`${q.id}-${option}`}
                          name={q.id}
                          value={option}
                          checked={answers[q.id] === option}
                          onChange={(e) => handleAnswer(q.id, e.target.value)}
                          disabled={showFeedback}
                        />
                        <Label htmlFor={`${q.id}-${option}`}>{option}</Label>
                      </div>
                    ))}
                  </div>
                  {showFeedback && answers[q.id] && (
                    <Alert variant={answers[q.id] === q.correctAnswer ? "default" : "destructive"}>
                      {answers[q.id] === q.correctAnswer ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                      <AlertDescription>
                        {answers[q.id] === q.correctAnswer
                          ? "Correct! Well done."
                          : `Incorrect. The correct answer is: ${q.correctAnswer}`}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={isSubmitting || !hasRead || !showFeedback}
        >
          {isSubmitting ? "Recording Agreement..." : "I Agree to The Prime Law"}
        </Button>
      </div>
    </div>
  )
} 