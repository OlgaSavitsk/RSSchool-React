import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, expect, it } from "vitest";
import { RoutePath } from "src/constants/routes.constants";
import LayoutComponent from "@components/app-layout";
import * as useStorage from "@hooks/use-storage.hook";
import * as usePathname from "next/navigation";

vi.mock("@hooks/use-storage.hook");
vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn().mockReturnValue(new URLSearchParams()),
  usePathname: vi.fn(),
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
  }),
}));

describe("LayoutComponent", () => {
  vi.spyOn(useStorage, "useStorage").mockReturnValue(["", vi.fn()]);
  vi.spyOn(usePathname, "usePathname").mockReturnValue(RoutePath.Home);

  it("should render the component with default values", () => {
    render(
      <LayoutComponent>
        <div>Content</div>
      </LayoutComponent>,
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("");
    expect(screen.getByText("Switch to light")).toBeInTheDocument();
  });

  it("should update the search value", () => {
    render(
      <LayoutComponent>
        <div>Content</div>
      </LayoutComponent>,
    );

    const searchInput = screen.getByRole("textbox");
    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(searchInput).toHaveValue("test");
  });

  it("should toggle the theme", () => {
    render(
      <LayoutComponent>
        <div>Content</div>
      </LayoutComponent>,
    );

    const themeButton = screen.getByText("Switch to light");
    fireEvent.click(themeButton);

    expect(themeButton).toHaveTextContent("Switch to dark");
  });

  it("should render the correct layout component based on pathname", () => {
    vi.spyOn(usePathname, "usePathname").mockReturnValueOnce(RoutePath.NotFound);
    render(
      <LayoutComponent>
        <div>Content</div>
      </LayoutComponent>,
    );

    expect(screen.getByText("404")).toBeInTheDocument();

    vi.spyOn(usePathname, "usePathname").mockReturnValueOnce(RoutePath.Home);
    render(
      <LayoutComponent>
        <div>Content Home</div>
      </LayoutComponent>,
    );

    expect(screen.getByText("Content Home")).toBeInTheDocument();
  });
});
