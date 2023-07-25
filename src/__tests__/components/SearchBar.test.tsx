import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import { Dispatch } from "react"
import SearchBar from "../../components/SearchBar"

test("SearchBar input updates searchQuery state correctly", () => {
  const placeholderText = "Search..."
  const initialSearchQuery = ""
  const updatedSearchQuery = "example search"

  const mockSetSearchQuery: Dispatch<string> = jest.fn()

  render(
    <SearchBar
      placeholder={placeholderText}
      searchQuery={initialSearchQuery}
      setSearchQuery={mockSetSearchQuery}
      className=""
    />
  )

  const inputField = screen.getByPlaceholderText(placeholderText)

  fireEvent.change(inputField, { target: { value: updatedSearchQuery } })

  expect(mockSetSearchQuery).toHaveBeenCalledWith(updatedSearchQuery)
})

test("SearchBar XMarkIcon is visible and clickable when searchQuery is not empty", () => {
  const placeholderText = "Search..."
  const searchQuery = "example search"

  const mockSetSearchQuery: Dispatch<string> = jest.fn()

  render(
    <SearchBar
      placeholder={placeholderText}
      searchQuery={searchQuery}
      setSearchQuery={mockSetSearchQuery}
      className=""
    />
  )

  const xMarkIcon = screen.getByTestId("x-mark-icon")
  expect(xMarkIcon).toBeVisible()

  fireEvent.click(xMarkIcon)

  expect(mockSetSearchQuery).toHaveBeenCalledWith("")
})

test("SearchBar XMarkIcon is not visible when searchQuery is empty", () => {
  const placeholderText = "Search..."
  const searchQuery = ""

  const mockSetSearchQuery: Dispatch<string> = jest.fn()

  render(
    <SearchBar
      placeholder={placeholderText}
      searchQuery={searchQuery}
      setSearchQuery={mockSetSearchQuery}
      className=""
    />
  )

  const xMarkIcon = screen.queryByTestId("x-mark-icon")
  expect(xMarkIcon).toBeNull()
})
