"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Moon, Sun } from "lucide-react"

export function DesignSystemShowcase() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    // This would normally toggle the theme, but for showcase purposes we're just tracking the state
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Design System</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Consistent design language using Inter font and Zinc color palette
        </p>
      </div>

      <Tabs defaultValue="typography" className="space-y-4">
        <TabsList>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
        </TabsList>

        <TabsContent value="typography" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inter Font Family</CardTitle>
              <CardDescription>A carefully crafted typeface designed for computer screens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-zinc-500 mb-1">Display</div>
                  <div className="text-5xl font-bold">The quick brown fox jumps over the lazy dog</div>
                </div>

                <div>
                  <div className="text-xs text-zinc-500 mb-1">Heading 1</div>
                  <div className="text-4xl font-bold">The quick brown fox jumps over the lazy dog</div>
                </div>

                <div>
                  <div className="text-xs text-zinc-500 mb-1">Heading 2</div>
                  <div className="text-3xl font-bold">The quick brown fox jumps over the lazy dog</div>
                </div>

                <div>
                  <div className="text-xs text-zinc-500 mb-1">Heading 3</div>
                  <div className="text-2xl font-bold">The quick brown fox jumps over the lazy dog</div>
                </div>

                <div>
                  <div className="text-xs text-zinc-500 mb-1">Heading 4</div>
                  <div className="text-xl font-bold">The quick brown fox jumps over the lazy dog</div>
                </div>

                <div>
                  <div className="text-xs text-zinc-500 mb-1">Body</div>
                  <div className="text-base">The quick brown fox jumps over the lazy dog</div>
                </div>

                <div>
                  <div className="text-xs text-zinc-500 mb-1">Small</div>
                  <div className="text-sm">The quick brown fox jumps over the lazy dog</div>
                </div>

                <div>
                  <div className="text-xs text-zinc-500 mb-1">Tiny</div>
                  <div className="text-xs">The quick brown fox jumps over the lazy dog</div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <h3 className="text-lg font-semibold mb-2">Font Weights</h3>
                <div className="space-y-2">
                  <div className="font-light">Inter Light (300): The quick brown fox jumps over the lazy dog</div>
                  <div className="font-normal">Inter Regular (400): The quick brown fox jumps over the lazy dog</div>
                  <div className="font-medium">Inter Medium (500): The quick brown fox jumps over the lazy dog</div>
                  <div className="font-semibold">Inter SemiBold (600): The quick brown fox jumps over the lazy dog</div>
                  <div className="font-bold">Inter Bold (700): The quick brown fox jumps over the lazy dog</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Zinc Color Palette</CardTitle>
              <CardDescription>A sophisticated monochromatic color scheme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Primary Colors</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <div className="h-20 bg-zinc-900 rounded-md mb-2"></div>
                      <div className="font-medium">zinc-900</div>
                      <div className="text-sm text-zinc-500">#18181B</div>
                    </div>
                    <div>
                      <div className="h-20 bg-zinc-800 rounded-md mb-2"></div>
                      <div className="font-medium">zinc-800</div>
                      <div className="text-sm text-zinc-500">#27272A</div>
                    </div>
                    <div>
                      <div className="h-20 bg-zinc-700 rounded-md mb-2"></div>
                      <div className="font-medium">zinc-700</div>
                      <div className="text-sm text-zinc-500">#3F3F46</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Secondary Colors</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="h-16 bg-zinc-600 rounded-md mb-2"></div>
                      <div className="font-medium">zinc-600</div>
                      <div className="text-sm text-zinc-500">#52525B</div>
                    </div>
                    <div>
                      <div className="h-16 bg-zinc-500 rounded-md mb-2"></div>
                      <div className="font-medium">zinc-500</div>
                      <div className="text-sm text-zinc-500">#71717A</div>
                    </div>
                    <div>
                      <div className="h-16 bg-zinc-400 rounded-md mb-2"></div>
                      <div className="font-medium">zinc-400</div>
                      <div className="text-sm text-zinc-500">#A1A1AA</div>
                    </div>
                    <div>
                      <div className="h-16 bg-zinc-300 rounded-md mb-2"></div>
                      <div className="font-medium">zinc-300</div>
                      <div className="text-sm text-zinc-500">#D4D4D8</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Background Colors</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="h-16 bg-zinc-200 rounded-md mb-2"></div>
                      <div className="font-medium">zinc-200</div>
                      <div className="text-sm text-zinc-500">#E4E4E7</div>
                    </div>
                    <div>
                      <div className="h-16 bg-zinc-100 rounded-md mb-2"></div>
                      <div className="font-medium">zinc-100</div>
                      <div className="text-sm text-zinc-500">#F4F4F5</div>
                    </div>
                    <div>
                      <div className="h-16 bg-zinc-50 rounded-md mb-2"></div>
                      <div className="font-medium">zinc-50</div>
                      <div className="text-sm text-zinc-500">#FAFAFA</div>
                    </div>
                    <div>
                      <div className="h-16 bg-white rounded-md border border-zinc-200 mb-2"></div>
                      <div className="font-medium">white</div>
                      <div className="text-sm text-zinc-500">#FFFFFF</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Dark Mode Colors</h3>
                  <div className="p-6 bg-zinc-900 rounded-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="h-16 bg-zinc-800 rounded-md mb-2"></div>
                        <div className="font-medium text-zinc-100">zinc-800</div>
                        <div className="text-sm text-zinc-400">#27272A</div>
                      </div>
                      <div>
                        <div className="h-16 bg-zinc-700 rounded-md mb-2"></div>
                        <div className="font-medium text-zinc-100">zinc-700</div>
                        <div className="text-sm text-zinc-400">#3F3F46</div>
                      </div>
                      <div>
                        <div className="h-16 bg-zinc-600 rounded-md mb-2"></div>
                        <div className="font-medium text-zinc-100">zinc-600</div>
                        <div className="text-sm text-zinc-400">#52525B</div>
                      </div>
                      <div>
                        <div className="h-16 bg-zinc-500 rounded-md mb-2"></div>
                        <div className="font-medium text-zinc-100">zinc-500</div>
                        <div className="text-sm text-zinc-400">#71717A</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>shadcn/ui Components</CardTitle>
              <CardDescription>
                Accessible, customizable components built with Radix UI and Tailwind CSS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Buttons</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Form Elements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="Enter your email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="Enter your password" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="airplane-mode" />
                      <Label htmlFor="airplane-mode">Airplane Mode</Label>
                    </div>
                    <div className="space-y-2">
                      <Label>Volume</Label>
                      <Slider defaultValue={[50]} max={100} step={1} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Cards</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card description goes here</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>Card content and details would go here.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Another Card</CardTitle>
                        <CardDescription>With different content</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>More information can be placed here.</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Badges</h3>
                  <div className="flex flex-wrap gap-4">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Theme Toggle</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4" />
                      <span>Light</span>
                    </div>
                    <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
                    <div className="flex items-center space-x-2">
                      <Moon className="h-4 w-4" />
                      <span>Dark</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                    The application supports both light and dark modes, with seamless transitions between them. The
                    theme respects the user's system preferences by default.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

