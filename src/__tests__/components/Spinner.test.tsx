import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import Spinner from "../../components/Spinner"

test("Spinner component renders correctly", () => {
  render(<Spinner />)

  // Find the SVG element
  const svgElement = document.querySelector("svg")

  // Check if the SVG element exists in the document
  expect(svgElement).toBeInTheDocument()

  if (svgElement) {
    // Verify the presence of the relevant classes and attributes
    expect(svgElement).toHaveClass("animate-spin")
    expect(svgElement).toHaveClass("h-5")
    expect(svgElement).toHaveClass("w-5")
    expect(svgElement).toHaveClass("text-white")

    // Find the circle element with the "opacity-25" class and relevant attributes
    const circleElement = svgElement.querySelector("circle.opacity-25")
    expect(circleElement).toBeInTheDocument()
    expect(circleElement).toHaveAttribute("cx", "12")
    expect(circleElement).toHaveAttribute("cy", "12")
    expect(circleElement).toHaveAttribute("r", "10")
    expect(circleElement).toHaveAttribute("stroke", "currentColor")
    expect(circleElement).toHaveAttribute("stroke-width", "4")

    // Find the path element with the "opacity-75" class and relevant attributes
    const pathElement = svgElement.querySelector("path.opacity-75")
    expect(pathElement).toBeInTheDocument()
    expect(pathElement).toHaveAttribute(
      "d",
      "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    )
    expect(pathElement).toHaveAttribute("fill", "currentColor")
  }
})
