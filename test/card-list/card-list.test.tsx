import { describe, expect, test, vi } from "vitest";
import { CardListComponent } from "@components/card-list";
import { render } from "@testing-library/react";
import { StarWarsPeople } from "../../src/types/item.types";
import { store } from "@store/store";
import { Provider } from "react-redux";

vi.mock("next/router", () => ({
  useRouter: vi.fn().mockReturnValue({
    query: { page: "1" },
  }),
}));

describe("Card List", () => {
  test("component renders the specified number of cards", () => {
    const data = Array(10)
      .fill(null)
      .map((item, i) => ({ ...item, id: i + 1 }));
    const value = data.length;
    const { getAllByTestId } = render(
      <Provider store={store}>
        <CardListComponent data={data} />
      </Provider>,
    );
    expect(getAllByTestId("card")).toHaveLength(value);
  });

  test("message is displayed if no cards are present", () => {
    const data: StarWarsPeople[] = [];
    const { getByText } = render(
      <Provider store={store}>
        <CardListComponent data={data} />
      </Provider>,
    );
    const message = getByText("Nothing was found");
    expect(message).toBeInTheDocument();
  });
});
