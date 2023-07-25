import { render, screen, fireEvent } from "@testing-library/react"
import { useNavigate } from "react-router-dom"
import GoBackButton from "../../components/GoBackButton"

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}))

test("GoBackButton navigates to the specified route when `to` prop is provided", () => {
  const mockNavigate = jest.fn()
  ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)

  const route = "/example-route"
  const buttonText = "Go Back"

  render(<GoBackButton to={route}>{buttonText}</GoBackButton>)

  const backButton = screen.getByRole("button")
  fireEvent.click(backButton)

  expect(mockNavigate).toHaveBeenCalledWith(route)
})

test("GoBackButton navigates back when `to` prop is not provided", () => {
  const mockNavigate = jest.fn()
  ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)

  const buttonText = "Go Back"

  render(<GoBackButton>{buttonText}</GoBackButton>)

  const backButton = screen.getByRole("button")
  fireEvent.click(backButton)

  expect(mockNavigate).toHaveBeenCalledWith(-1)
})
