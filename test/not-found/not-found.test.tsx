import { expect, test, vi } from "vitest";
import NotFoundPage from "src/app/not-found";
import { render } from "@testing-library/react";

vi.mock("next/navigate", () => ({
  useRouter: vi.fn(),
}));

test("Not-found page", () => {
  const { getByText } = render(<NotFoundPage />);
  const page = getByText("404");
  expect(page).toBeInTheDocument();
});
