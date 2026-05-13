import { auth, currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import type { Project } from "@/types/projects"

export async function getProjectsForCurrentUser(): Promise<{
  owned: Project[]
  shared: Project[]
}> {
  const { userId } = await auth()
  if (!userId) return { owned: [], shared: [] }

  const user = await currentUser()
  const email = user?.emailAddresses[0]?.emailAddress

  const [ownedRaw, sharedRaw] = await Promise.all([
    prisma.project.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true },
    }),
    email
      ? prisma.project.findMany({
          where: { collaborators: { some: { collaboratorEmail: email } } },
          orderBy: { createdAt: "desc" },
          select: { id: true, name: true },
        })
      : Promise.resolve([]),
  ])

  return {
    owned: ownedRaw.map((p) => ({ ...p, isOwned: true })),
    shared: sharedRaw.map((p) => ({ ...p, isOwned: false })),
  }
}
