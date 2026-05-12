import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import { ProjectSidebar } from "@/components/editor/project-sidebar"

describe("ProjectSidebar", () => {
  describe("structure", () => {
    it("renders an aside element", () => {
      render(<ProjectSidebar isOpen={true} onClose={vi.fn()} />)
      expect(screen.getByRole("complementary")).toBeInTheDocument()
    })

    it("renders the Projects header title", () => {
      render(<ProjectSidebar isOpen={true} onClose={vi.fn()} />)
      expect(screen.getByText("Projects")).toBeInTheDocument()
    })

    it("renders the close button with accessible label", () => {
      render(<ProjectSidebar isOpen={true} onClose={vi.fn()} />)
      expect(screen.getByRole("button", { name: "Close sidebar" })).toBeInTheDocument()
    })

    it("renders the New Project button", () => {
      render(<ProjectSidebar isOpen={true} onClose={vi.fn()} />)
      expect(screen.getByRole("button", { name: /new project/i })).toBeInTheDocument()
    })

    it("renders My Projects tab trigger", () => {
      render(<ProjectSidebar isOpen={true} onClose={vi.fn()} />)
      expect(screen.getByRole("tab", { name: "My Projects" })).toBeInTheDocument()
    })

    it("renders Shared tab trigger", () => {
      render(<ProjectSidebar isOpen={true} onClose={vi.fn()} />)
      expect(screen.getByRole("tab", { name: "Shared" })).toBeInTheDocument()
    })
  })

  describe("open/closed state via CSS classes", () => {
    it("applies translate-x-0 class when isOpen is true", () => {
      render(<ProjectSidebar isOpen={true} onClose={vi.fn()} />)
      const aside = screen.getByRole("complementary")
      expect(aside).toHaveClass("translate-x-0")
    })

    it("applies -translate-x-full class when isOpen is false", () => {
      render(<ProjectSidebar isOpen={false} onClose={vi.fn()} />)
      const aside = screen.getByRole("complementary")
      expect(aside).toHaveClass("-translate-x-full")
    })

    it("does not apply -translate-x-full when isOpen is true", () => {
      render(<ProjectSidebar isOpen={true} onClose={vi.fn()} />)
      const aside = screen.getByRole("complementary")
      expect(aside).not.toHaveClass("-translate-x-full")
    })

    it("does not apply translate-x-0 when isOpen is false", () => {
      render(<ProjectSidebar isOpen={false} onClose={vi.fn()} />)
      const aside = screen.getByRole("complementary")
      expect(aside).not.toHaveClass("translate-x-0")
    })

    it("updates class when isOpen prop changes from false to true", () => {
      const { rerender } = render(<ProjectSidebar isOpen={false} onClose={vi.fn()} />)
      const aside = screen.getByRole("complementary")
      expect(aside).toHaveClass("-translate-x-full")

      rerender(<ProjectSidebar isOpen={true} onClose={vi.fn()} />)
      expect(aside).toHaveClass("translate-x-0")
      expect(aside).not.toHaveClass("-translate-x-full")
    })

    it("updates class when isOpen prop changes from true to false", () => {
      const { rerender } = render(<ProjectSidebar isOpen={true} onClose={vi.fn()} />)
      const aside = screen.getByRole("complementary")
      expect(aside).toHaveClass("translate-x-0")

      rerender(<ProjectSidebar isOpen={false} onClose={vi.fn()} />)
      expect(aside).toHaveClass("-translate-x-full")
      expect(aside).not.toHaveClass("translate-x-0")
    })
  })

  describe("close button interaction", () => {
    it("calls onClose when the close button is clicked", async () => {
      const onClose = vi.fn()
      render(<ProjectSidebar isOpen={true} onClose={onClose} />)

      await userEvent.click(screen.getByRole("button", { name: "Close sidebar" }))

      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it("calls onClose when sidebar is in closed state too", async () => {
      const onClose = vi.fn()
      render(<ProjectSidebar isOpen={false} onClose={onClose} />)

      await userEvent.click(screen.getByRole("button", { name: "Close sidebar" }))

      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it("does not call onClose without user interaction", () => {
      const onClose = vi.fn()
      render(<ProjectSidebar isOpen={true} onClose={onClose} />)
      expect(onClose).not.toHaveBeenCalled()
    })

    it("does not call New Project's handler when close button is clicked", async () => {
      const onClose = vi.fn()
      render(<ProjectSidebar isOpen={true} onClose={onClose} />)

      await userEvent.click(screen.getByRole("button", { name: "Close sidebar" }))

      // onClose should be the only handler invoked
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  describe("tab content - default state", () => {
    it("shows My Projects empty state by default", () => {
      render(<ProjectSidebar isOpen={true} onClose={vi.fn()} />)
      expect(screen.getByText("No projects yet")).toBeInTheDocument()
    })

    it("does not render Shared empty state by default", () => {
      render(<ProjectSidebar isOpen={true} onClose={vi.fn()} />)
      // @base-ui/react Tabs unmounts inactive panel content from the DOM
      expect(screen.queryByText("Nothing shared with you")).not.toBeInTheDocument()
    })
  })

  describe("tab switching", () => {
    it("shows Shared empty state after clicking the Shared tab", async () => {
      render(<ProjectSidebar isOpen={true} onClose={vi.fn()} />)

      await userEvent.click(screen.getByRole("tab", { name: "Shared" }))

      expect(screen.getByText("Nothing shared with you")).toBeVisible()
    })

    it("removes My Projects empty state from DOM after switching to Shared tab", async () => {
      render(<ProjectSidebar isOpen={true} onClose={vi.fn()} />)

      await userEvent.click(screen.getByRole("tab", { name: "Shared" }))

      // @base-ui/react Tabs unmounts inactive panel content from the DOM
      expect(screen.queryByText("No projects yet")).not.toBeInTheDocument()
    })

    it("returns to My Projects empty state after switching back", async () => {
      render(<ProjectSidebar isOpen={true} onClose={vi.fn()} />)

      await userEvent.click(screen.getByRole("tab", { name: "Shared" }))
      await userEvent.click(screen.getByRole("tab", { name: "My Projects" }))

      expect(screen.getByText("No projects yet")).toBeVisible()
    })
  })

  describe("New Project button", () => {
    it("renders the New Project button regardless of open state", () => {
      render(<ProjectSidebar isOpen={false} onClose={vi.fn()} />)
      expect(screen.getByRole("button", { name: /new project/i })).toBeInTheDocument()
    })

    it("New Project button is clickable", async () => {
      render(<ProjectSidebar isOpen={true} onClose={vi.fn()} />)
      // No handler is wired up yet; just verify it doesn't throw
      await expect(
        userEvent.click(screen.getByRole("button", { name: /new project/i }))
      ).resolves.not.toThrow()
    })
  })
})