import { getProjectsForCurrentUser } from "@/lib/data/projects"
import { EditorHomeClient } from "@/components/editor/editor-home-client"

export default async function EditorPage() {
  const { owned, shared } = await getProjectsForCurrentUser()
  return <EditorHomeClient projects={[...owned, ...shared]} />
}
