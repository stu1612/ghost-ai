"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import {
  CreateProjectDialog,
  RenameProjectDialog,
  DeleteProjectDialog,
} from "@/components/editor/project-dialogs"
import { useProjectActions } from "@/hooks/use-project-actions"
import type { Project } from "@/types/projects"
import { Button } from "@/components/ui/button"

interface EditorHomeClientProps {
  projects: Project[]
}

export function EditorHomeClient({ projects }: EditorHomeClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const {
    openDialog,
    targetProject,
    formName,
    setFormName,
    slug,
    slugIsValid,
    openCreate,
    openRename,
    openDelete,
    closeDialog,
    confirmCreate,
    confirmRename,
    confirmDelete,
  } = useProjectActions()

  return (
    <>
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={() => setIsSidebarOpen((o) => !o)}
      />
      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        projects={projects}
        onCreateProject={openCreate}
        onRenameProject={openRename}
        onDeleteProject={openDelete}
      />
      <main className="flex min-h-screen flex-col items-center justify-center pt-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-copy-primary">
              Create a project or open an existing one
            </h1>
            <p className="text-sm text-copy-muted">
              Start a new architecture workspace, or choose a project from the sidebar.
            </p>
          </div>
          <Button onClick={openCreate}>
            <Plus />
            New Project
          </Button>
        </div>
      </main>
      <CreateProjectDialog
        open={openDialog === "create"}
        onClose={closeDialog}
        onSubmit={confirmCreate}
        name={formName}
        slug={slug}
        slugIsValid={slugIsValid}
        onNameChange={setFormName}
      />
      <RenameProjectDialog
        open={openDialog === "rename"}
        onClose={closeDialog}
        onSubmit={confirmRename}
        project={targetProject}
        name={formName}
        onNameChange={setFormName}
      />
      <DeleteProjectDialog
        open={openDialog === "delete"}
        onClose={closeDialog}
        onConfirm={confirmDelete}
        project={targetProject}
      />
    </>
  )
}
