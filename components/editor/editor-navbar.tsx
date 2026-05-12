"use client"

import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EditorNavbarProps {
  isSidebarOpen: boolean
  onSidebarToggle: () => void
  className?: string
}

export function EditorNavbar({ isSidebarOpen, onSidebarToggle, className }: EditorNavbarProps) {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 flex h-12 items-center bg-surface border-b border-surface-border",
        className
      )}
    >
      <div className="flex items-center px-3">
        <Button variant="ghost" size="icon" onClick={onSidebarToggle} aria-label="Toggle sidebar">
          {isSidebarOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
        </Button>
      </div>
      <div className="flex-1" />
      <div className="flex items-center px-3">
        <UserButton />
      </div>
    </header>
  )
}
