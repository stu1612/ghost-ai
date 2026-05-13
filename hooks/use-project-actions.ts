"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Project, DialogType } from "@/types/projects"

export type { Project, DialogType }

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function shortId(): string {
  return Math.random().toString(36).slice(2, 8)
}

export function useProjectActions() {
  const router = useRouter()
  const [openDialog, setOpenDialog] = useState<DialogType>(null)
  const [targetProject, setTargetProject] = useState<Project | null>(null)
  const [formName, setFormName] = useState("")
  const [loading, setLoading] = useState(false)

  function openCreate() {
    setFormName("")
    setTargetProject(null)
    setOpenDialog("create")
  }

  function openRename(project: Project) {
    setFormName(project.name)
    setTargetProject(project)
    setOpenDialog("rename")
  }

  function openDelete(project: Project) {
    setTargetProject(project)
    setOpenDialog("delete")
  }

  function closeDialog() {
    setOpenDialog(null)
    setTargetProject(null)
    setFormName("")
    setLoading(false)
  }

  async function confirmCreate() {
    const name = formName.trim()
    const slug = toSlug(name)
    if (!name || !slug) return

    const roomId = `${slug}-${shortId()}`
    setLoading(true)
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, id: roomId }),
      })
      if (!res.ok) throw new Error("Failed to create project")
      closeDialog()
      router.push(`/editor/${roomId}`)
    } catch {
      setLoading(false)
    }
  }

  async function confirmRename() {
    const name = formName.trim()
    if (!name || !targetProject || name === targetProject.name) return

    setLoading(true)
    try {
      const res = await fetch(`/api/projects/${targetProject.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })
      if (!res.ok) throw new Error("Failed to rename project")
      closeDialog()
      router.refresh()
    } catch {
      setLoading(false)
    }
  }

  async function confirmDelete() {
    if (!targetProject) return

    setLoading(true)
    try {
      const res = await fetch(`/api/projects/${targetProject.id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete project")
      closeDialog()
      if (window.location.pathname === `/editor/${targetProject.id}`) {
        router.push("/editor")
      } else {
        router.refresh()
      }
    } catch {
      setLoading(false)
    }
  }

  const slug = toSlug(formName)

  return {
    openDialog,
    targetProject,
    formName,
    setFormName,
    loading,
    slug,
    slugIsValid: slug.length > 0,
    openCreate,
    openRename,
    openDelete,
    closeDialog,
    confirmCreate,
    confirmRename,
    confirmDelete,
  }
}
