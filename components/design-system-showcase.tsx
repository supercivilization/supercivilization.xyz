import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Check, X } from "lucide-react"

export function DesignSystemShowcase() {
  const colors = [
    { name: "zinc-50", value: "bg-zinc-50" },
    { name: "zinc-100", value: "bg-zinc-100" },
    { name: "zinc-200", value: "bg-zinc-200" },
    { name: "zinc-300", value: "bg-zinc-300" },
    { name: "zinc-400", value: "bg-zinc-400" },
    { name: "zinc-500", value: "bg-zinc-500" },
    { name: "zinc-600", value: "bg-zinc-600" },
    { name: "zinc-700", value: "bg-zinc-700" },
    { name: "zinc-800", value: "bg-zinc-800" },
    { name: "zinc-900", value: "bg-zinc-900" },
  ]

  const typography = [
    { name: "Heading 1", class: "text-4xl font-bold" },
    { name: "Heading 2", class: "text-3xl font-bold" },
    { name: "Heading 3", class: "text-2xl font-bold" },
    { name: "Heading 4", class: "text-xl font-bold" },
    { name: "Body Large", class: "text-lg" },
    { name: "Body", class: "text-base" },
    { name: "Body Small", class: "text-sm" },
    { name: "Caption", class: "text-xs" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Design System
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Visual design language and component library for Supercivilization
        </p>
      </div>

      <Tabs defaultValue="colors">
        <TabsList>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
              <CardDescription>
                The Zinc color palette used throughout the application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {colors.map((color) => (
                  <div key={color.name} className="space-y-2">
                    <div
                      className={`${color.value} h-16 rounded-lg border border-zinc-200 dark:border-zinc-700`}
                    />
                    <div className="text-sm font-mono">{color.name}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>
                Text styles and font settings used in the interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {typography.map((type) => (
                  <div
                    key={type.name}
                    className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 pb-4"
                  >
                    <span className={type.class}>The quick brown fox</span>
                    <Badge variant="outline" className="font-mono">
                      {type.name}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>
                Button variations and states
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button disabled>Disabled</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Form Elements</CardTitle>
              <CardDescription>
                Input fields and form controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Text Input</Label>
                <Input placeholder="Enter some text" />
              </div>
              <div className="space-y-2">
                <Label>Disabled Input</Label>
                <Input disabled placeholder="Disabled input" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
              <CardDescription>
                Notification and alert components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  A neutral informational alert
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <X className="h-4 w-4" />
                <AlertDescription>
                  A destructive error alert
                </AlertDescription>
              </Alert>
              <Alert variant="default">
                <Check className="h-4 w-4" />
                <AlertDescription>
                  A success confirmation alert
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>
                Status and label indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 