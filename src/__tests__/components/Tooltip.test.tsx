import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Tooltip from "../../components/Tooltip"

describe("Tooltip component", () => {
  it("renders the tooltip text", () => {
    const text = "This is a tooltip"
    const { getByText } = render(<Tooltip text={text}>Hover me</Tooltip>)
    const tooltipElement = getByText(text)

    expect(tooltipElement).toBeInTheDocument()
  })

  it("renders with the specified position", () => {
    const text = "This is a tooltip"
    const position = "right"
    const { getByText } = render(
      <Tooltip text={text} position={position}>
        Hover me
      </Tooltip>
    )
    const tooltipElement = getByText(text)

    expect(tooltipElement).toBeInTheDocument()
    expect(tooltipElement).toHaveClass("left-full")
  })

  it("renders with the specified className", () => {
    const text = "This is a tooltip"
    const className = "custom-class"
    const { getByText, container } = render(
      <Tooltip text={text} className={className}>
        Hover me
      </Tooltip>
    )
    const tooltipElement = getByText(text)
    const tooltipContainer = container.firstChild

    expect(tooltipElement).toBeInTheDocument()
    expect(tooltipContainer).toHaveClass(className)
  })

  it("renders multiple tooltips with different positions", () => {
    const textTop = "Top tooltip"
    const textRight = "Right tooltip"
    const textBottom = "Bottom tooltip"
    const textLeft = "Left tooltip"
    const { getByText } = render(
      <>
        <Tooltip text={textTop} position="top">
          Hover me top
        </Tooltip>
        <Tooltip text={textRight} position="right">
          Hover me right
        </Tooltip>
        <Tooltip text={textBottom} position="bottom">
          Hover me bottom
        </Tooltip>
        <Tooltip text={textLeft} position="left">
          Hover me left
        </Tooltip>
      </>
    )

    const tooltipTop = getByText(textTop)
    const tooltipRight = getByText(textRight)
    const tooltipBottom = getByText(textBottom)
    const tooltipLeft = getByText(textLeft)

    expect(tooltipTop).toBeInTheDocument()
    expect(tooltipRight).toBeInTheDocument()
    expect(tooltipBottom).toBeInTheDocument()
    expect(tooltipLeft).toBeInTheDocument()

    expect(tooltipTop).toHaveClass("bottom-full")
    expect(tooltipRight).toHaveClass("left-full")
    expect(tooltipBottom).toHaveClass("top-full")
    expect(tooltipLeft).toHaveClass("right-full")
  })
})
