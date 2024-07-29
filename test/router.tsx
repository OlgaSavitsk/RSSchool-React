import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";

export const renderWithRouter = (ui: ReactNode, path = "/") => {
  const router = createMemoryRouter([{ path: path, element: ui }], { initialEntries: [path] });

  return render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  );
};
