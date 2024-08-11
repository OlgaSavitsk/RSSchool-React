import HomePage from "@app/page";
import { expect, it } from "vitest";
import { render } from "@testing-library/react";

it("should render the home page correctly", () => {
  const { getByText } = render(<HomePage />);

  expect(getByText("Download")).toBeInTheDocument();
});
