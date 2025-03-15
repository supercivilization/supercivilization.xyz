"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const drawerVariants = cva(
  "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
  {
    variants: {
      variant: {
        default: "border-t shadow-lg",
        destructive: "border-destructive/50 bg-destructive text-destructive-foreground shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const Overlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 z-40 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  ),
)
Overlay.displayName = "DrawerOverlay"

interface DrawerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof drawerVariants> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onClose?: () => void
  shouldScaleBackground?: boolean
  overlay?: boolean
}

const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      className,
      children,
      variant,
      open,
      onOpenChange,
      onClose,
      shouldScaleBackground = false,
      overlay = true,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(open || false)

    React.useEffect(() => {
      if (open !== undefined) {
        setIsOpen(open)
      }
    }, [open])

    const handleClose = React.useCallback(() => {
      setIsOpen(false)
      onOpenChange?.(false)
      onClose?.()
    }, [onOpenChange, onClose])

    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
          handleClose()
        }
      }

      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }, [isOpen, handleClose])

    React.useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }

      return () => {
        document.body.style.overflow = ""
      }
    }, [isOpen])

    if (!isOpen) return null

    return (
      <>
        {overlay && <Overlay onClick={handleClose} />}
        <div ref={ref} className={cn(drawerVariants({ variant }), className)} {...props}>
          <div className="flex items-center justify-end p-4">
            <button onClick={handleClose} className="rounded-full p-2 hover:bg-muted" aria-label="Close drawer">
              <X className="h-4 w-4" />
            </button>
          </div>
          {children}
        </div>
      </>
    )
  },
)
Drawer.displayName = "Drawer"

const DrawerContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col overflow-auto p-4", className)} {...props} />
  ),
)
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-4 text-center", className)} {...props} />
  ),
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-4", className)}
      {...props}
    />
  ),
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
  ),
)
DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
DrawerDescription.displayName = "DrawerDescription"

export { Drawer, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription }

