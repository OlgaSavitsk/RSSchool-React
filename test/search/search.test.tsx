import { beforeEach, describe, expect, test } from "vitest";
import { fireEvent } from "@testing-library/dom";
import { SearchComponent } from "../../src/components/search";
import { render } from "@testing-library/react";

describe("Card", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("clicking the Search button saves the entered value to the local storage", () => {
    const { getByTestId, getByPlaceholderText } = render(
      <SearchComponent onChange={() => {}} setToggleTheme={() => {}} />,
    );

    const input = getByPlaceholderText("Search...");
    const button = getByTestId("search");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(button);
    expect(JSON.parse(localStorage.getItem("search")!)).toBe("test");
  });

  test("component retrieves the value from the local storage upon mounting", () => {
    localStorage.setItem("search", JSON.stringify("test"));
    const { getByPlaceholderText } = render(
      <SearchComponent onChange={() => {}} setToggleTheme={() => {}} />,
    );
    const input = getByPlaceholderText("Search...");
    expect(input).toHaveValue("test");
  });
});
