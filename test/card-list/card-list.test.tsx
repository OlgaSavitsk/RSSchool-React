import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CardListComponent } from "../../src/components/card-list/index";
import { BrowserRouter as Router } from "react-router-dom";

describe("Card List", () => {
  test("component renders the specified number of cards", () => {
    const data = Array(10)
      .fill(null)
      .map((item, i) => ({ ...item, id: i + 1 }));
    const value = data.length;
    const { getAllByTestId } = render(
      <Router>
        <CardListComponent data={data} />
      </Router>,
    );
    expect(getAllByTestId("card")).toHaveLength(value);
  });

  test("message is displayed if no cards are present", () => {
    const data = null;
    const { getByText } = render(
      <Router>
        <CardListComponent data={data} />
      </Router>,
    );
    const message = getByText("Nothing was found");
    expect(message).toBeInTheDocument();
  });
});
