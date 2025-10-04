"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SubmitIdeaModal } from "@/components/submit-idea-modal"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { createPortal } from "react-dom"

// Define types for our data
type EffortLevel = "Low" | "Medium" | "High"
type ImpactLevel = "Low" | "Medium" | "High"
type Category = "Security" | "Community" | "Growth"
type Status = "Released" | "In Development" | "On Deck" | "Under Consideration"

interface ProductItem {
  id: string
  title: string
  description: string
  category: Category
  effort: EffortLevel
  impact: ImpactLevel
  status: Status
  created_at?: string
  updated_at?: string
  created_by?: string
}

// Component for a single product card
const ProductCard = ({ item }: { item: ProductItem }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    data: {
      type: "item",
      item,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="p-3 bg-white shadow-md rounded border border-zinc-300 cursor-move mb-2"
      {...attributes}
      {...listeners}
    >
      <div className="space-y-1">
        <div className="font-medium text-zinc-800">{item.title}</div>
        <p className="text-sm text-zinc-600">{item.description}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          <Badge variant="outline" className="text-xs">
            {item.category}
          </Badge>
          <Badge
            variant={item.effort === "Low" ? "secondary" : item.effort === "Medium" ? "outline" : "destructive"}
            className="text-xs"
          >
            Effort: {item.effort}
          </Badge>
          <Badge
            variant={item.impact === "Low" ? "outline" : item.impact === "Medium" ? "secondary" : "default"}
            className="text-xs"
          >
            Impact: {item.impact}
          </Badge>
        </div>
      </div>
    </Card>
  )
}

// Loading skeleton for product card
const ProductCardSkeleton = () => (
  <Card className="p-3 bg-white shadow-md rounded border border-zinc-300 mb-2">
    <div className="space-y-2">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <div className="flex gap-2 mt-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
  </Card>
)

// Component for a column
const Column = ({
  title,
  items,
  bgColor,
  id,
  isLoading = false,
}: {
  title: Status
  items: ProductItem[]
  bgColor: string
  id: string
  isLoading?: boolean
}) => {
  const { setNodeRef } = useSortable({
    id,
    data: {
      type: "container",
      status: title,
    },
  })

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col max-w-xs w-full p-4 rounded-lg space-y-2 ${bgColor} bg-opacity-50 text-zinc-800`}
    >
      <h3 className="font-semibold text-center pb-2 border-b border-zinc-400">{title}</h3>
      <div className="overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
        {isLoading ? (
          // Show skeletons when loading
          Array.from({ length: 3 }).map((_, index) => <ProductCardSkeleton key={index} />)
        ) : (
          <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </SortableContext>
        )}
      </div>
    </div>
  )
}

// Function to get the background color for a column based on status
const getColumnStyle = (status: Status) => {
  switch (status) {
    case "Released":
      return "bg-zinc-200"
    case "In Development":
      return "bg-zinc-300"
    case "On Deck":
      return "bg-zinc-400"
    case "Under Consideration":
      return "bg-zinc-500"
    default:
      return "bg-zinc-200"
  }
}

function ProductBoardClient() {
  const [items, setItems] = useState<ProductItem[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Fetch product items from Supabase
  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Fetch product items - we don't need the user ID for this operation
        const { data, error } = await supabase
          .from("product_items")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) throw error

        setItems(data || [])
      } catch (err: any) {
        console.error("Error fetching product items:", err)
        setError(err.message || "Failed to load product items")
        toast({
          title: "Error loading product board",
          description: err.message || "Please try refreshing the page",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchItems()
  }, [toast])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    // If no over element or same element, return
    if (!over || active.id === over.id) return

    // Find the active item
    const activeItem = items.find((item) => item.id === active.id)
    if (!activeItem) return

    // Check if over is a container
    if (over.data.current?.type === "container") {
      const newStatus = over.data.current.status as Status

      // Only update if status is changing
      if (activeItem.status !== newStatus) {
        // Optimistically update UI
        setItems((items) => items.map((item) => (item.id === active.id ? { ...item, status: newStatus } : item)))
      }
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveId(null)
      return
    }

    // Find the active item
    const activeItem = items.find((item) => item.id === active.id)
    if (!activeItem) {
      setActiveId(null)
      return
    }

    // Handle container drops (changing status)
    if (over.data.current?.type === "container") {
      const newStatus = over.data.current.status as Status

      // Only update if status is changing
      if (activeItem.status !== newStatus) {
        setIsSaving(true)

        try {
          // Optimistically update UI
          setItems((items) => items.map((item) => (item.id === active.id ? { ...item, status: newStatus } : item)))

          // Update in Supabase
          const { error } = await supabase
            .from("product_items")
            .update({
              status: newStatus,
              updated_at: new Date().toISOString(),
            })
            .eq("id", activeItem.id)

          if (error) throw error

          toast({
            title: "Item updated",
            description: `Moved "${activeItem.title}" to ${newStatus}`,
          })
        } catch (err: any) {
          console.error("Error updating item status:", err)

          // Revert optimistic update
          setItems((items) =>
            items.map((item) => (item.id === activeItem.id ? { ...item, status: activeItem.status } : item)),
          )

          toast({
            title: "Error updating item",
            description: err.message || "Failed to update item status",
            variant: "destructive",
          })
        } finally {
          setIsSaving(false)
        }
      }
    }
    // Handle reordering within the same container
    else if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        // Update the order in the UI
        return arrayMove(items, oldIndex, newIndex)
      })

      // Note: We could also update the order in the database here
      // by adding a 'position' field to the items and updating it
    }

    setActiveId(null)
  }

  const handleDragCancel = () => {
    setActiveId(null)
  }

  const getActiveItem = () => {
    if (!activeId) return null
    return items.find((item) => item.id === activeId) || null
  }

  const handleSubmitIdea = async (idea: {
    title: string
    description: string
    category: string
    effort: string
    impact: string
  }) => {
    setIsSaving(true)

    try {
      // Get current user
      const { data: userData } = await supabase.auth.getUser()
      const userId = userData?.user?.id

      const newItem: ProductItem = {
        id: `temp-${Date.now()}`, // Temporary ID for optimistic UI
        title: idea.title,
        description: idea.description,
        category: idea.category as Category,
        effort: idea.effort as EffortLevel,
        impact: idea.impact as ImpactLevel,
        status: "Under Consideration",
        created_by: userId || undefined,
      }

      // Optimistically update UI
      setItems([newItem, ...items])

      // Save to Supabase
      const { data, error } = await supabase
        .from("product_items")
        .insert({
          title: idea.title,
          description: idea.description,
          category: idea.category,
          effort: idea.effort,
          impact: idea.impact,
          status: "Under Consideration",
          created_by: userId || null,
        })
        .select()
        .single()

      if (error) throw error

      // Update with the real ID from the database
      setItems((currentItems) => currentItems.map((item) => (item.id === newItem.id ? { ...data, id: data.id } : item)))

      toast({
        title: "Idea submitted",
        description: "Your idea has been added to the product board",
      })
    } catch (err: any) {
      console.error("Error submitting idea:", err)

      // Remove the optimistic item
      setItems((currentItems) => currentItems.filter((item) => !item.id.startsWith("temp-")))

      toast({
        title: "Error submitting idea",
        description: err.message || "Failed to submit your idea",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const refreshData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.from("product_items").select("*").order("created_at", { ascending: false })

      if (error) throw error

      setItems(data || [])
      toast({
        title: "Board refreshed",
        description: "Product board data has been updated",
      })
    } catch (err: any) {
      console.error("Error refreshing data:", err)
      setError(err.message || "Failed to refresh data")
      toast({
        title: "Error refreshing board",
        description: err.message || "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const releasedItems = items.filter((item) => item.status === "Released")
  const inDevelopmentItems = items.filter((item) => item.status === "In Development")
  const onDeckItems = items.filter((item) => item.status === "On Deck")
  const underConsiderationItems = items.filter((item) => item.status === "Under Consideration")

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-zinc-50">
      <div className="w-full max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="flex-1 mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold text-zinc-900 text-center">Supercivilization Product Board</h1>
            <p className="text-center text-zinc-600">Shape the future of our network state</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={refreshData}
              disabled={isLoading}
              className="flex items-center gap-1"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
            </Button>
            <SubmitIdeaModal onSubmit={handleSubmitIdea} disabled={isSaving} />
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isSaving && (
          <div className="fixed bottom-4 right-4 bg-zinc-800 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2 z-50">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Saving changes...</span>
          </div>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Column
              id="released-column"
              title="Released"
              items={releasedItems}
              bgColor={getColumnStyle("Released")}
              isLoading={isLoading}
            />
            <Column
              id="in-development-column"
              title="In Development"
              items={inDevelopmentItems}
              bgColor={getColumnStyle("In Development")}
              isLoading={isLoading}
            />
            <Column
              id="on-deck-column"
              title="On Deck"
              items={onDeckItems}
              bgColor={getColumnStyle("On Deck")}
              isLoading={isLoading}
            />
            <Column
              id="under-consideration-column"
              title="Under Consideration"
              items={underConsiderationItems}
              bgColor={getColumnStyle("Under Consideration")}
              isLoading={isLoading}
            />
          </div>

          {typeof window !== "undefined" &&
            createPortal(
              <DragOverlay>{activeId ? <ProductCard item={getActiveItem()!} /> : null}</DragOverlay>,
              document.body,
            )}
        </DndContext>
      </div>
    </div>
  )
}

export default ProductBoardClient

