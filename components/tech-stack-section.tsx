import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TechStackSection() {
  const techStack = [
    {
      category: "Frontend",
      technologies: [
        {
          name: "Next.js 14",
          description: "React framework for production",
          version: "14.0.0",
        },
        {
          name: "React",
          description: "JavaScript library for user interfaces",
          version: "18.2.0",
        },
        {
          name: "TypeScript",
          description: "Typed JavaScript at any scale",
          version: "5.0.0",
        },
        {
          name: "Tailwind CSS",
          description: "Utility-first CSS framework",
          version: "3.3.0",
        },
        {
          name: "shadcn/ui",
          description: "Re-usable components built with Radix UI and Tailwind",
          version: "latest",
        },
      ],
    },
    {
      category: "Backend",
      technologies: [
        {
          name: "Supabase",
          description: "Open source Firebase alternative",
          version: "2.39.0",
        },
        {
          name: "PostgreSQL",
          description: "Open source relational database",
          version: "15.0",
        },
        {
          name: "Edge Functions",
          description: "Serverless functions at the edge",
          version: "latest",
        },
      ],
    },
    {
      category: "Development",
      technologies: [
        {
          name: "ESLint",
          description: "Pluggable JavaScript linter",
          version: "8.0.0",
        },
        {
          name: "Prettier",
          description: "Opinionated code formatter",
          version: "3.0.0",
        },
        {
          name: "pnpm",
          description: "Fast, disk space efficient package manager",
          version: "8.0.0",
        },
      ],
    },
    {
      category: "Deployment",
      technologies: [
        {
          name: "Vercel",
          description: "Platform for frontend frameworks and static sites",
          version: "latest",
        },
        {
          name: "GitHub Actions",
          description: "CI/CD automation",
          version: "latest",
        },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Tech Stack
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Technologies and tools used in building Supercivilization
        </p>
      </div>

      <div className="grid gap-6">
        {techStack.map((category) => (
          <Card key={category.category}>
            <CardHeader>
              <CardTitle>{category.category}</CardTitle>
              <CardDescription>
                Core {category.category.toLowerCase()} technologies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {category.technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-start justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-700"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                          {tech.name}
                        </h3>
                        <Badge variant="secondary" className="font-mono">
                          v{tech.version}
                        </Badge>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 