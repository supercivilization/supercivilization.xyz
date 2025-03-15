"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ApiDocumentation } from "@/components/api-documentation"
import { DatabaseSchema } from "@/components/database-schema"
import { DesignSystemShowcase } from "@/components/design-system-showcase"
import { DocumentationSidebar } from "@/components/documentation-sidebar"
import { TechStackSection } from "@/components/tech-stack-section"
import { UserGuide } from "@/components/user-guide"

export default function Documentation() {
  const [activeTab, setActiveTab] = useState("user-guide")

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Sidebar */}
      <DocumentationSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <Card className="h-full border-0 rounded-none bg-white/90 dark:bg-zinc-800/90">
          <ScrollArea className="h-full">
            <div className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="user-guide">User Guide</TabsTrigger>
                  <TabsTrigger value="api">API</TabsTrigger>
                  <TabsTrigger value="database">Database</TabsTrigger>
                  <TabsTrigger value="design-system">Design System</TabsTrigger>
                  <TabsTrigger value="tech-stack">Tech Stack</TabsTrigger>
                </TabsList>

                <TabsContent value="user-guide" className="mt-0">
                  <UserGuide />
                </TabsContent>

                <TabsContent value="api" className="mt-0">
                  <ApiDocumentation />
                </TabsContent>

                <TabsContent value="database" className="mt-0">
                  <DatabaseSchema />
                </TabsContent>

                <TabsContent value="design-system" className="mt-0">
                  <DesignSystemShowcase />
                </TabsContent>

                <TabsContent value="tech-stack" className="mt-0">
                  <TechStackSection />
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </Card>
      </main>
    </div>
  )
} 