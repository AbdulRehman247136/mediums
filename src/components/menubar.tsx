"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Root menubar wrapper
const Menubar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center rounded-full bg-popover shadow-sm",
      className
    )}
    {...props}
  />
))
Menubar.displayName = "Menubar"

// Props passed down to children
interface DropdownChildProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// Menu container that controls open/close state
const MenubarMenu = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  // Close when clicking outside
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={menuRef} className="relative inline-block">
      {React.Children.map(children, (child) =>
        React.isValidElement<DropdownChildProps>(child)
          ? React.cloneElement(child, { open, setOpen })
          : child
      )}
    </div>
  )
}

// Trigger button
const MenubarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
    open?: boolean
  }
>(({ className, setOpen, open, ...props }, ref) => (
  <button
    ref={ref}
    onClick={() => setOpen?.(!open)}
    className={cn("rounded-full focus:outline-none", className)}
    {...props}
  />
))
MenubarTrigger.displayName = "MenubarTrigger"

// Dropdown content
const MenubarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { open?: boolean }
>(({ className, open, ...props }, ref) =>
  open ? (
    <div
      ref={ref}
      className={cn(
        "absolute right-0 top-full z-50 mt-2 min-w-[12rem] rounded-md border border-border bg-popover p-1 shadow-md animate-in fade-in-0 zoom-in-95",
        className
      )}
      {...props}
    />
  ) : null
)
MenubarContent.displayName = "MenubarContent"

// Item
const MenubarItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm font-medium outline-none",
      "hover:bg-primary-hover hover:text-secondary-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
))
MenubarItem.displayName = "MenubarItem"

// Separator
const MenubarSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("my-1 h-px bg-muted", className)} {...props} />
))
MenubarSeparator.displayName = "MenubarSeparator"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
}