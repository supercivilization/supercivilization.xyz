import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  Book,
  Code2,
  Database,
  Palette,
  Server,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { useState } from "react"

interface DocumentationSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function DocumentationSidebar({
  activeTab,
  onTabChange,
}: DocumentationSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const items = [
    {
      id: "user-guide",
      label: "User Guide",
      icon: Book,
      sections: [
        "Getting Started",
        "Authentication",
        "Dashboard",
        "Product Board",
        "Documentation",
        "Settings",
      ],
    },
    {
      id: "api",
      label: "API Documentation",
      icon: Code2,
      sections: [
        "Authentication",
        "Users",
        "Products",
        "Ideas",
        "Comments",
        "Votes",
      ],
    },
    {
      id: "database",
      label: "Database Schema",
      icon: Database,
      sections: [
        "Users",
        "Products",
        "Ideas",
        "Comments",
        "Votes",
        "Relationships",
      ],
    },
    {
      id: "design-system",
      label: "Design System",
      icon: Palette,
      sections: [
        "Colors",
        "Typography",
        "Components",
        "Icons",
        "Layouts",
        "Animations",
      ],
    },
    {
      id: "tech-stack",
      label: "Tech Stack",
      icon: Server,
      sections: [
        "Frontend",
        "Backend",
        "Database",
        "Authentication",
        "Deployment",
        "Testing",
      ],
    },
  ]

  return (
    <div
      className={cn(
        "border-r border-zinc-200 dark:border-zinc-700 bg-white/90 dark:bg-zinc-800/90 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center justify-between px-4 border-b border-zinc-200 dark:border-zinc-700">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            Documentation
          </h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <div className="p-2">
          {items.map((item) => (
            <div key={item.id} className="mb-4">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2",
                  activeTab === item.id &&
                    "bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <item.icon className="h-4 w-4" />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
              {!isCollapsed && activeTab === item.id && (
                <div className="mt-1 ml-6 space-y-1">
                  {item.sections.map((section) => (
                    <Button
                      key={section}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    >
                      {section}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
} 