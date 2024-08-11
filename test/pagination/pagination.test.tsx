import { expect, describe, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PaginationComponent } from "../../src/components/pagination";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
  usePathname: vi.fn(),
}));

describe("Pagination", () => {
  test("the component updates URL query parameter when page changes", () => {
    const func = vi.fn();
    render(<PaginationComponent setPage={(page: number) => func(page)} />);
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    expect(func).toHaveBeenCalledWith(2);
  });

  test("should render the component", () => {
    const setPage = vi.fn();
    render(<PaginationComponent setPage={setPage} />);
    expect(screen.getByRole("button", { name: "Prev" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });

  test("should call setPage with the correct page number when clicking Next", () => {
    const setPage = vi.fn();
    render(<PaginationComponent setPage={setPage} />);
    const nextButton = screen.getByRole("button", { name: "Next" });
    fireEvent.click(nextButton);
    expect(setPage).toHaveBeenCalledWith(2);
  });

  test("should call setPage with the correct page number when clicking Prev", () => {
    const setPage = vi.fn();
    render(<PaginationComponent setPage={setPage} />);
    const prevButton = screen.getByRole("button", { name: "Prev" });
    fireEvent.click(prevButton);
    expect(setPage).toHaveBeenCalledWith(1);
  });

  test("should not allow the page to go below 1", () => {
    const setPage = vi.fn();
    render(<PaginationComponent setPage={setPage} />);
    const prevButton = screen.getByRole("button", { name: "Prev" });
    fireEvent.click(prevButton);
    fireEvent.click(prevButton);
    expect(setPage).toHaveBeenCalledWith(1);
  });

  test("should not allow the page to go above 5", () => {
    const setPage = vi.fn();
    render(<PaginationComponent setPage={setPage} />);
    const nextButton = screen.getByRole("button", { name: "Next" });
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(setPage).toHaveBeenCalledWith(5);
  });
});
