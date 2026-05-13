"use client"

import { useState } from "react"

export interface MockProject {
  id: string
  name: string
  isOwned: boolean
}

const MOCK_PROJECTS: MockProject[] = [
  { id: "1", name: "E-commerce Platform", isOwned: true },
  { id: "2", name: "Auth Service", isOwned: true },
  { id: "3", name: "Design System", isOwned: false },
]

export type DialogType = "create" | "rename" | "delete" | null

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function useProjectDialogs() {
  const [projects, setProjects] = useState<MockProject[]>(MOCK_PROJECTS)
  const [openDialog, setOpenDialog] = useState<DialogType>(null)
  const [targetProject, setTargetProject] = useState<MockProject | null>(null)
  const [formName, setFormName] = useState("")
  const [loading, setLoading] = useState(false)

  function openCreate() {
    setFormName("")
    setTargetProject(null)
    setOpenDialog("create")
  }

  function openRename(project: MockProject) {
    setFormName(project.name)
    setTargetProject(project)
    setOpenDialog("rename")
  }

  function openDelete(project: MockProject) {
    setTargetProject(project)
    setOpenDialog("delete")
  }

  function closeDialog() {
    setOpenDialog(null)
    setTargetProject(null)
    setFormName("")
    setLoading(false)
  }

  function confirmCreate() {
    const name = formName.trim()
    if (!name || !toSlug(name)) return
    setProjects((prev) => [
      ...prev,
      { id: Date.now().toString(), name, isOwned: true },
    ])
    closeDialog()
  }

  function confirmRename() {
    const name = formName.trim()
    if (!name || !targetProject || name === targetProject.name) return
    setProjects((prev) =>
      prev.map((p) => (p.id === targetProject.id ? { ...p, name } : p))
    )
    closeDialog()
  }

  function confirmDelete() {
    if (!targetProject) return
    setProjects((prev) => prev.filter((p) => p.id !== targetProject.id))
    closeDialog()
  }

  const slug = toSlug(formName)

  return {
    projects,
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
