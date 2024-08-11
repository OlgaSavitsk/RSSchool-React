import HomePage from "@pages/index";
import { expect, it } from "vitest";
import { render } from "@testing-library/react";

import { store } from "@store/store";
import { Provider } from "react-redux";

it("should render the home page correctly", () => {
  const { getByText } = render(
    <Provider store={store}>
      <HomePage results={[]} />
    </Provider>,
  );

  expect(getByText("Download")).toBeInTheDocument();
});
