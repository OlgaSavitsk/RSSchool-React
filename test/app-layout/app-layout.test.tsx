import { render, screen } from "@testing-library/react";
import LayoutComponent from "@components/app-layout/index";
import { AppContext } from "src/context";
import { vi, describe, it, expect } from "vitest";
import { RoutePath } from "src/constants/routes.constants";

const mockRouter = (route = RoutePath.Home) => {
  return vi.spyOn(require("next/router"), "useRouter").mockReturnValue({
    route,
    query: { page: "1" },
    push: vi.fn(),
  });
};

describe("LayoutComponent", () => {
  it("renders the correct layout based on the current route", () => {
    mockRouter();
    render(
      <AppContext.Provider value={{ theme: "dark" }}>
        <LayoutComponent>
          <div>Content</div>
        </LayoutComponent>
      </AppContext.Provider>,
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Switch to light")).toBeInTheDocument();
  });

  it("renders the NotFoundPage for the 404 route", () => {
    mockRouter(RoutePath.NotFound);
    render(
      <AppContext.Provider value={{ theme: "dark" }}>
        <LayoutComponent>
          <div>Content</div>
        </LayoutComponent>
      </AppContext.Provider>,
    );

    expect(screen.getByText("404")).toBeInTheDocument();
  });
});
