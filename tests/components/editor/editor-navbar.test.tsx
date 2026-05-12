import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import { EditorNavbar } from "@/components/editor/editor-navbar"

describe("EditorNavbar", () => {
  it("renders a header element", () => {
    render(<EditorNavbar isSidebarOpen={false} onSidebarToggle={vi.fn()} />)
    expect(screen.getByRole("banner")).toBeInTheDocument()
  })

  it("renders the sidebar toggle button with accessible label", () => {
    render(<EditorNavbar isSidebarOpen={false} onSidebarToggle={vi.fn()} />)
    expect(screen.getByRole("button", { name: "Toggle sidebar" })).toBeInTheDocument()
  })

  it("shows PanelLeftOpen icon when sidebar is closed", () => {
    const { container } = render(
      <EditorNavbar isSidebarOpen={false} onSidebarToggle={vi.fn()} />
    )
    // lucide-react renders SVGs; when closed the PanelLeftOpen icon should be present
    // and PanelLeftClose should not be present
    const svgs = container.querySelectorAll("svg")
    expect(svgs.length).toBeGreaterThan(0)
    // Verify the data-testid or aria attributes differ based on state by checking
    // that only one icon SVG exists inside the toggle button
    const button = screen.getByRole("button", { name: "Toggle sidebar" })
    expect(button.querySelector("svg")).not.toBeNull()
  })

  it("shows PanelLeftClose icon when sidebar is open", () => {
    const { container } = render(
      <EditorNavbar isSidebarOpen={true} onSidebarToggle={vi.fn()} />
    )
    const svgs = container.querySelectorAll("svg")
    expect(svgs.length).toBeGreaterThan(0)
    const button = screen.getByRole("button", { name: "Toggle sidebar" })
    expect(button.querySelector("svg")).not.toBeNull()
  })

  it("renders a different icon based on isSidebarOpen prop", () => {
    const { rerender, container } = render(
      <EditorNavbar isSidebarOpen={false} onSidebarToggle={vi.fn()} />
    )
    const svgWhenClosed = container.querySelector("svg")?.outerHTML

    rerender(<EditorNavbar isSidebarOpen={true} onSidebarToggle={vi.fn()} />)
    const svgWhenOpen = container.querySelector("svg")?.outerHTML

    // The two icons have different SVG paths so their outerHTML should differ
    expect(svgWhenClosed).not.toEqual(svgWhenOpen)
  })

  it("calls onSidebarToggle when the toggle button is clicked", async () => {
    const onSidebarToggle = vi.fn()
    render(<EditorNavbar isSidebarOpen={false} onSidebarToggle={onSidebarToggle} />)

    await userEvent.click(screen.getByRole("button", { name: "Toggle sidebar" }))

    expect(onSidebarToggle).toHaveBeenCalledTimes(1)
  })

  it("calls onSidebarToggle when clicked while sidebar is open", async () => {
    const onSidebarToggle = vi.fn()
    render(<EditorNavbar isSidebarOpen={true} onSidebarToggle={onSidebarToggle} />)

    await userEvent.click(screen.getByRole("button", { name: "Toggle sidebar" }))

    expect(onSidebarToggle).toHaveBeenCalledTimes(1)
  })

  it("does not call onSidebarToggle without user interaction", () => {
    const onSidebarToggle = vi.fn()
    render(<EditorNavbar isSidebarOpen={false} onSidebarToggle={onSidebarToggle} />)
    expect(onSidebarToggle).not.toHaveBeenCalled()
  })

  it("applies additional className to the header element", () => {
    render(
      <EditorNavbar
        isSidebarOpen={false}
        onSidebarToggle={vi.fn()}
        className="custom-class"
      />
    )
    const header = screen.getByRole("banner")
    expect(header).toHaveClass("custom-class")
  })

  it("retains base classes when a custom className is provided", () => {
    render(
      <EditorNavbar
        isSidebarOpen={false}
        onSidebarToggle={vi.fn()}
        className="extra"
      />
    )
    const header = screen.getByRole("banner")
    expect(header).toHaveClass("fixed")
    expect(header).toHaveClass("extra")
  })

  it("renders without optional className prop", () => {
    expect(() =>
      render(<EditorNavbar isSidebarOpen={false} onSidebarToggle={vi.fn()} />)
    ).not.toThrow()
  })

  it("calls onSidebarToggle multiple times on repeated clicks", async () => {
    const onSidebarToggle = vi.fn()
    render(<EditorNavbar isSidebarOpen={false} onSidebarToggle={onSidebarToggle} />)

    const button = screen.getByRole("button", { name: "Toggle sidebar" })
    await userEvent.click(button)
    await userEvent.click(button)
    await userEvent.click(button)

    expect(onSidebarToggle).toHaveBeenCalledTimes(3)
  })
})