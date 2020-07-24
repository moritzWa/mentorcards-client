import { act, fireEvent, render } from "@testing-library/react"
import { MockedProvider } from "@apollo/react-testing"

import Home from "./pages/Home"

test("renders home headers", () => {
  const { getByText } = render(<Home />)
  const HomeHeader = getByText("Recent Quotes")
  expect(HomeHeader).toBeInTheDocument()
})
