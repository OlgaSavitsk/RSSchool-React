import { describe, expect, test } from "vitest";
import { CardListComponent } from "../../src/components/card-list/index";
import { StarWarsPeople } from "../../src/types/item.types";
import { renderWithRouter } from "../router";

describe("Card List", () => {
  test("component renders the specified number of cards", () => {
    const data = Array(10)
      .fill(null)
      .map((item, i) => ({ ...item, id: i + 1 }));
    const value = data.length;
    const { getAllByTestId } = renderWithRouter(<CardListComponent data={data} />);
    expect(getAllByTestId("card")).toHaveLength(value);
  });

  test("message is displayed if no cards are present", () => {
    const data: StarWarsPeople[] = [];
    const { getByText } = renderWithRouter(<CardListComponent data={data} />);
    const message = getByText("Nothing was found");
    expect(message).toBeInTheDocument();
  });
});
