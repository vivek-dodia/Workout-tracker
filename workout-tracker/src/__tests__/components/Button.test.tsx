import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import Button from "../../components/Button"

describe("Button component", () => {
  it("renders with the provided variant class", () => {
    const { container } = render(<Button variant="secondary">Click me</Button>)
    expect(container.firstChild).toHaveClass("bg-blue-600")
  })

  it("renders with the default variant class if not provided", () => {
    const { container } = render(<Button>Click me</Button>)
    expect(container.firstChild).toHaveClass("bg-indigo-600")
  })

  it("renders with the additional className if provided", () => {
    const { container } = render(
      <Button className="custom-class">Click me</Button>
    )
    expect(container.firstChild).toHaveClass("custom-class")
  })

  it("calls the onClick handler when clicked", () => {
    const onClickMock = jest.fn()
    const { getByText } = render(
      <Button onClick={onClickMock}>Click me</Button>
    )
    fireEvent.click(getByText("Click me"))
    expect(onClickMock).toHaveBeenCalled()
  })

  it("renders the children inside the button", () => {
    const { getByText } = render(<Button>Click me</Button>)
    expect(getByText("Click me")).toBeInTheDocument()
  })
})
