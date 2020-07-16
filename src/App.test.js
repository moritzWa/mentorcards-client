import React from "react"
import { render } from "@testing-library/react"
import Home from "./pages/Home"

test("renders home headers", () => {
  const { getByText } = render(<Home />)
  const HomeHeader = getByText("Recent Quotes")
  expect(HomeHeader).toBeInTheDocument()
})
