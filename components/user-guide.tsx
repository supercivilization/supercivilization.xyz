import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

type TextContent = {
  type: "text"
  content: string
}

type Step = {
  title: string
  description: string
}

type StepsContent = {
  type: "steps"
  steps: Step[]
}

type ListContent = {
  type: "list"
  items: string[]
}

type AlertContent = {
  type: "alert"
  variant: "default" | "destructive"
  icon: "success" | "warning"
  content: string
}

type ContentItem = TextContent | StepsContent | ListContent | AlertContent

type Section = {
  title: string
  description: string
  content: ContentItem[]
}

export function UserGuide() {
  const sections: Section[] = [
    {
      title: "Getting Started",
      description: "Learn how to get started with Supercivilization",
      content: [
        {
          type: "text",
          content: "Welcome to Supercivilization! This guide will help you understand how to use the platform effectively."
        },
        {
          type: "steps",
          steps: [
            {
              title: "Create an account",
              description: "Sign up using your email address and create a secure password."
            },
            {
              title: "Verify your email",
              description: "Click the verification link sent to your email to activate your account."
            },
            {
              title: "Complete your profile",
              description: "Add your name and customize your profile settings."
            }
          ]
        },
        {
          type: "alert",
          variant: "default",
          icon: "success",
          content: "Once verified, you'll have full access to all platform features."
        }
      ]
    },
    {
      title: "Authentication",
      description: "Understanding login and account management",
      content: [
        {
          type: "text",
          content: "We use secure authentication to protect your account and data."
        },
        {
          type: "list",
          items: [
            "Use your email and password to log in",
            "Reset your password if needed",
            "Enable two-factor authentication for extra security",
            "Manage active sessions"
          ]
        },
        {
          type: "alert",
          variant: "destructive",
          icon: "warning",
          content: "Never share your password or authentication tokens with anyone."
        }
      ]
    },
    {
      title: "Dashboard",
      description: "Navigate and use your personal dashboard",
      content: [
        {
          type: "text",
          content: "Your dashboard is your central hub for managing all activities."
        },
        {
          type: "list",
          items: [
            "View your recent activity",
            "Access quick actions",
            "Check notifications",
            "Manage your settings"
          ]
        }
      ]
    },
    {
      title: "Product Board",
      description: "Collaborate on product development",
      content: [
        {
          type: "text",
          content: "The product board helps track and manage product development ideas and features."
        },
        {
          type: "steps",
          steps: [
            {
              title: "Create ideas",
              description: "Submit new product ideas or feature requests."
            },
            {
              title: "Vote and discuss",
              description: "Participate in discussions and vote on proposals."
            },
            {
              title: "Track progress",
              description: "Monitor the development status of approved features."
            }
          ]
        },
        {
          type: "alert",
          variant: "default",
          icon: "success",
          content: "All team members can contribute ideas and participate in discussions."
        }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          User Guide
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Learn how to use Supercivilization effectively
        </p>
      </div>

      <div className="grid gap-6">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {section.content.map((item, index) => {
                if (item.type === "text") {
                  return (
                    <p key={index} className="text-zinc-600 dark:text-zinc-400">
                      {item.content}
                    </p>
                  )
                }

                if (item.type === "steps") {
                  return (
                    <div key={index} className="space-y-4">
                      {item.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="space-y-2">
                          <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                            {step.title}
                          </h3>
                          <p className="text-zinc-600 dark:text-zinc-400">
                            {step.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )
                }

                if (item.type === "list") {
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
                      {item.items.map((listItem, itemIndex) => (
                        <li key={itemIndex}>{listItem}</li>
                      ))}
                    </ul>
                  )
                }

                if (item.type === "alert") {
                  return (
                    <Alert key={index} variant={item.variant}>
                      {item.icon === "success" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      <AlertDescription>{item.content}</AlertDescription>
                    </Alert>
                  )
                }
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 