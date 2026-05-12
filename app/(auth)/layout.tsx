import { Sparkles, Users, FolderOpen } from "lucide-react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden lg:flex flex-col bg-surface border-r border-surface-border">
        <div className="flex flex-1 flex-col p-10">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 flex-shrink-0 rounded-md bg-brand" />
            <span className="text-sm font-semibold tracking-tight text-copy-primary">
              Ghost AI
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-center">
            <div className="max-w-sm">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-copy-primary">
                Write at the<br />speed of thought.
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-copy-secondary">
                Describe your ideas in plain English. Ghost AI transforms them
                into polished drafts your whole team can refine in real time.
              </p>

              <ul className="mt-10 space-y-6">
                <li className="flex gap-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-accent-dim">
                    <Sparkles className="h-4 w-4 text-brand" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-copy-primary">
                      AI Draft Generation
                    </p>
                    <p className="mt-0.5 text-sm text-copy-muted">
                      Describe your content, AI writes the first draft instantly.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-ai/10">
                    <Users className="h-4 w-4 text-ai-text" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-copy-primary">
                      Real-time Collaboration
                    </p>
                    <p className="mt-0.5 text-sm text-copy-muted">
                      Edit together with your team, see changes as they happen.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-success/10">
                    <FolderOpen className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-copy-primary">
                      Smart Project Workspace
                    </p>
                    <p className="mt-0.5 text-sm text-copy-muted">
                      Organize projects and share them with your team in one click.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-xs text-copy-faint">
            © 2026 Ghost AI. All rights reserved.
          </p>
        </div>
      </div>

      <div className="flex min-h-screen items-center justify-center px-8 bg-base">
        {children}
      </div>
    </div>
  )
}
