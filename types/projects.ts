export interface Project {
  id: string
  name: string
  isOwned: boolean
}

export type DialogType = "create" | "rename" | "delete" | null
