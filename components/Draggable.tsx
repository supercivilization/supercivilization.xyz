"use client"

import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import type { PropsWithChildren } from "react"

interface DraggableProps {
  id: string
}

export function Draggable({ id, children }: PropsWithChildren<DraggableProps>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  })

  const style = transform
    ? {
        transform: CSS.Transform.toString(transform),
      }
    : undefined

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="cursor-move">
      {children}
    </div>
  )
}

