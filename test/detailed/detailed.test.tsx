import { vi } from "vitest";
import { describe, expect, test } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import DetailsComponent from "@pages/people/[slug]";
import { useRouter } from "next/navigation";
import { store } from "@store/store";
import { Provider } from "react-redux";
import * as useContext from "@hooks/use-context.hook";

vi.mock("next/navigation", () => ({
  useParams: vi.fn().mockReturnValue({
    slug: "12",
  }),
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
  }),
}));

vi.mock("next/router", () => ({
  useRouter: vi.fn().mockReturnValue({
    query: { page: "1" },
  }),
}));

const fetchMock = vi.fn((slug) => {
  expect(slug).toBe("12");
});

describe("Detailed", () => {
  vi.spyOn(useContext, "useAppContext").mockReturnValue({
    fetchDetails: fetchMock,
    state: {
      item: {
        id: "12",
        gender: "male",
        hair_color: "blond",
        height: "172",
        mass: "77",
        name: "Luke Skywalker",
        url: "https://swapi.dev/api/people/12/",
      },
      isLoading: false,
      items: [],
      params: null,
      theme: "dark",
    },
    dispatch: vi.fn(),
  });

  test("should render the details component correctly", () => {
    const { getByText } = render(
      <Provider store={store}>
        <DetailsComponent />
      </Provider>,
    );

    expect(getByText("Luke Skywalker")).toBeInTheDocument();
    expect(getByText("172")).toBeInTheDocument();
    expect(getByText("77")).toBeInTheDocument();
  });

  test("should call fetchDetails with the correct slug", () => {
    render(
      <Provider store={store}>
        <DetailsComponent />
      </Provider>,
    );

    expect(fetchMock).toHaveBeenCalledWith("12");
  });

  test("should navigate to the home page when the back button is clicked", () => {
    const { push } = useRouter();

    const { getByText } = render(
      <Provider store={store}>
        <DetailsComponent />
      </Provider>,
    );
    fireEvent.click(getByText("Back"));

    expect(push).toHaveBeenCalledWith("/");
  });
});
