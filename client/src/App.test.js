import React from "react";
import { render } from "react-testing-library";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
