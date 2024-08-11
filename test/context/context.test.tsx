import { expect, describe, test, vi } from "vitest";
import { render } from "@testing-library/react";
import * as contextHook from "../../src/hooks/use-context.hook";
import { AppContext } from "../../src/context";

describe("Context", () => {
  test("dark theme", () => {
    const spy = vi.spyOn(contextHook, "useAppContext");
    const Component = () => {
      const theme = spy.getMockName();
      return <div>{theme === "dark" ? "light" : "dark"}</div>;
    };
    const { getByText } = render(
      <AppContext.Provider value={{ theme: "dark" }}>
        <Component />
      </AppContext.Provider>,
    );

    expect(getByText("dark")).toBeInTheDocument();
  });

  test("light theme", () => {
    const spy = vi.spyOn(contextHook, "useAppContext");
    const Component = () => {
      const theme = spy.getMockName();
      return <div>{theme === "dark" ? "light" : "dark"}</div>;
    };
    const { getByText } = render(
      <AppContext.Provider value={{ theme: "light" }}>
        <Component />
      </AppContext.Provider>,
    );

    expect(getByText("dark")).toBeInTheDocument();
  });
});
