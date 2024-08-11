import { describe, expect, test, vi } from "vitest";
import { CardListComponent } from "@components/card-list";
import { render } from "@testing-library/react";
import { StarWarsPeople } from "../../src/types/item.types";

vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn().mockReturnValue({
    get: vi.fn(),
  }),
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
  }),
}));

describe("Card List", () => {
  test("component renders the specified number of cards", () => {
    const data = Array(10)
      .fill(null)
      .map((item, i) => ({ ...item, id: i + 1 }));
    const value = data.length;
    const { getAllByTestId } = render(<CardListComponent data={data} />);
    expect(getAllByTestId("card")).toHaveLength(value);
  });

  test("message is displayed if no cards are present", () => {
    const data: StarWarsPeople[] = [];
    const { getByText } = render(<CardListComponent data={data} />);
    const message = getByText("Nothing was found");
    expect(message).toBeInTheDocument();
  });
});
