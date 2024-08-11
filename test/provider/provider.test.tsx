import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { getPeoples } from "@services/people.api";
import React from "react";
import { AppProvider } from "src/store/provider";
import { AppContext } from "src/store/context";
import { ContextProps } from "src/store/types";

vi.mock("@services/people.api", () => ({
  getPeoples: vi.fn(),
  getPeople: vi.fn(),
}));

describe("AppProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should fetch data on mount", async () => {
    const mockResults = [{ name: "Luke Skywalker" }];
    (getPeoples as vi.Mock).mockResolvedValue({ results: mockResults });

    render(
      <AppProvider>
        <div>Test</div>
      </AppProvider>,
    );

    expect(getPeoples).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("should set loading state during fetch", async () => {
    const mockResults = [{ name: "Luke Skywalker" }];
    (getPeoples as vi.Mock).mockResolvedValue({ results: mockResults });

    let contextValue: ContextProps = {
      state: {
        items: [],
        item: null,
        isLoading: false,
        params: null,
        theme: "dark",
      },
      dispatch: function (): void {},
      fetchDetails: function (): void {},
    };
    function TestComponent() {
      contextValue = React.useContext(AppContext);
      return <div>Test</div>;
    }

    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>,
    );

    expect(contextValue.state.isLoading).toBe(true);
    await screen.findByText("Test");
    expect(contextValue.state.isLoading).toBe(false);
  });
});
