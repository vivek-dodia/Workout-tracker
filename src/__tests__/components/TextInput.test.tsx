import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import TextInput from "../../components/TextInput"

describe("TextInput component", () => {
  it("renders with a label", () => {
    const label = "Username"
    const { getByText } = render(<TextInput label={label} />)
    const labelElement = getByText(label)

    expect(labelElement).toBeInTheDocument()
  })

  it("renders with a placeholder", () => {
    const placeholder = "Enter your username"
    const { getByPlaceholderText } = render(
      <TextInput placeholder={placeholder} />
    )
    const inputElement = getByPlaceholderText(placeholder)

    expect(inputElement).toBeInTheDocument()
  })

  it("handles onChange event", () => {
    const handleChange = jest.fn()
    const { getByRole } = render(<TextInput onChange={handleChange} />)
    const inputElement = getByRole("textbox") as HTMLInputElement

    fireEvent.change(inputElement, { target: { value: "Test" } })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object))
    expect(inputElement.value).toBe("Test")
  })

  it("applies custom className to the input container", () => {
    const customClassName = "custom-input"
    const { container } = render(<TextInput className={customClassName} />)
    const inputContainer = container.firstChild

    expect(inputContainer).toHaveClass(customClassName)
  })

  it("renders a simple input", () => {
    const { container } = render(<TextInput simple />)
    const inputElement = container.querySelector("input")

    expect(inputElement).toHaveClass("outline-none")
    expect(inputElement).not.toHaveClass("rounded-md")
    expect(inputElement).not.toHaveClass("shadow-sm")
    expect(inputElement).not.toHaveClass("ring-1")
    expect(inputElement).not.toHaveClass("ring-inset")
    expect(inputElement).not.toHaveClass("ring-gray-300")
    expect(inputElement).not.toHaveClass("focus:ring-2")
    expect(inputElement).not.toHaveClass("focus:ring-inset")
    expect(inputElement).not.toHaveClass("focus:ring-blue-500")
  })

  it("renders a disabled input", () => {
    const { container } = render(<TextInput disabled />)
    const inputElement = container.querySelector("input")

    expect(inputElement).toBeDisabled()
    expect(inputElement).toHaveClass("opacity-60")
  })
})
