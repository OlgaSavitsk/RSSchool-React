import { describe, expect, test } from "vitest";
import { DetailsComponent } from "../../src/components/details";
import { renderWithRouter } from "../router";

describe("Detailed", () => {
  test("loading indicator is displayed while fetching data", async () => {
    const { getByText } = renderWithRouter(<DetailsComponent />, "/people/12");
    const loader = getByText("Loading...");
    expect(loader).toBeInTheDocument();
  });
});
