import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import DateTimePicker from "../../components/DateTimePicker"
import { format } from "date-fns"

describe("DateTimePicker component", () => {
  it("renders with a label", () => {
    const label = "Select date and time"
    const { getByText, container } = render(<DateTimePicker label={label} />)
    const labelElement = getByText(label)
    const inputElement = container.querySelector(
      'input[type="datetime-local"]'
    ) as HTMLInputElement

    expect(labelElement).toBeInTheDocument()
    expect(inputElement).toBeInTheDocument()
  })

  it("sets max attribute correctly", () => {
    const now = new Date()
    const maxDateTime = format(now, "yyyy-MM-dd") + "T" + format(now, "HH:mm")
    const { container } = render(<DateTimePicker />)
    const inputElement = container.querySelector(
      'input[type="datetime-local"]'
    ) as HTMLInputElement

    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute("max", maxDateTime)
  })

  it("handles onChange event", () => {
    const handleChange = jest.fn()
    const { container } = render(<DateTimePicker onChange={handleChange} />)
    const inputElement = container.querySelector(
      'input[type="datetime-local"]'
    ) as HTMLInputElement

    fireEvent.change(inputElement, { target: { value: "2023-06-29T12:30" } })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object))
    if (inputElement) {
      expect(inputElement.value).toBe("2023-06-29T12:30")
    }
  })

  it("applies custom className to the input", () => {
    const customClassName = "custom-input"
    const { container } = render(<DateTimePicker className={customClassName} />)
    const inputContainer = container.firstChild

    expect(inputContainer).toHaveClass(customClassName)
  })

  it("renders a disabled input", () => {
    const { container } = render(<DateTimePicker disabled />)
    const inputElement = container.querySelector(
      'input[type="datetime-local"]'
    ) as HTMLInputElement

    expect(inputElement).toBeDisabled()
    expect(inputElement).toHaveClass("opacity-60")
  })
})
