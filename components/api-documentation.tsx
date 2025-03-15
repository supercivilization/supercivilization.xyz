import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle } from "lucide-react"

export function ApiDocumentation() {
  const endpoints = [
    {
      category: "Authentication",
      routes: [
        {
          method: "POST",
          path: "/api/auth/signup",
          description: "Create a new user account",
          request: {
            email: "string",
            password: "string",
            name: "string",
            inviteCode: "string",
          },
          response: {
            user: {
              id: "string",
              email: "string",
              name: "string",
            },
            session: {
              accessToken: "string",
              refreshToken: "string",
            },
          },
        },
        {
          method: "POST",
          path: "/api/auth/login",
          description: "Log in to an existing account",
          request: {
            email: "string",
            password: "string",
          },
          response: {
            user: {
              id: "string",
              email: "string",
              name: "string",
            },
            session: {
              accessToken: "string",
              refreshToken: "string",
            },
          },
        },
      ],
    },
    {
      category: "Users",
      routes: [
        {
          method: "GET",
          path: "/api/users/me",
          description: "Get the current user's profile",
          response: {
            id: "string",
            email: "string",
            name: "string",
            createdAt: "string",
            updatedAt: "string",
          },
        },
        {
          method: "PUT",
          path: "/api/users/me",
          description: "Update the current user's profile",
          request: {
            name: "string",
            email: "string",
          },
          response: {
            id: "string",
            email: "string",
            name: "string",
            updatedAt: "string",
          },
        },
      ],
    },
  ]

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case "GET":
        return "bg-green-500"
      case "POST":
        return "bg-blue-500"
      case "PUT":
        return "bg-yellow-500"
      case "DELETE":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          API Documentation
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Complete documentation for the Supercivilization API
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          All API endpoints require authentication unless specified otherwise.
          Include the JWT token in the Authorization header:
          <code className="ml-2 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded">
            Authorization: Bearer your_jwt_token
          </code>
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        {endpoints.map((category) => (
          <Card key={category.category}>
            <CardHeader>
              <CardTitle>{category.category}</CardTitle>
              <CardDescription>
                {category.category} related endpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {category.routes.map((route) => (
                  <div
                    key={route.path}
                    className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden"
                  >
                    <div className="flex items-center gap-2 p-4 bg-zinc-50 dark:bg-zinc-800">
                      <Badge
                        className={`${getMethodColor(
                          route.method
                        )} text-white font-mono`}
                      >
                        {route.method}
                      </Badge>
                      <code className="text-sm">{route.path}</code>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                        {route.description}
                      </p>
                      <Tabs defaultValue="request">
                        <TabsList>
                          {route.request && (
                            <TabsTrigger value="request">Request</TabsTrigger>
                          )}
                          <TabsTrigger value="response">Response</TabsTrigger>
                        </TabsList>
                        {route.request && (
                          <TabsContent value="request">
                            <ScrollArea className="h-[200px] w-full rounded border border-zinc-200 dark:border-zinc-700 p-4">
                              <pre className="text-sm">
                                {JSON.stringify(route.request, null, 2)}
                              </pre>
                            </ScrollArea>
                          </TabsContent>
                        )}
                        <TabsContent value="response">
                          <ScrollArea className="h-[200px] w-full rounded border border-zinc-200 dark:border-zinc-700 p-4">
                            <pre className="text-sm">
                              {JSON.stringify(route.response, null, 2)}
                            </pre>
                          </ScrollArea>
                        </TabsContent>
                      </Tabs>
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