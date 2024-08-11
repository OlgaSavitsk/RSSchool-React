import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import PageLayout from "@components/app-layout/page-layout/index";
import * as useContext from "@hooks/use-context.hook";
import { AppTypes } from "src/store/types";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
  }),
  useSearchParams: vi
    .fn()
    .mockReturnValue({
      get: vi.fn(),
    })
    .mockReturnValue(new URLSearchParams()),
  usePathname: vi.fn(),
}));

const dispatchMock = vi.fn();

describe("PageLayout", () => {
  vi.spyOn(useContext, "useAppContext").mockReturnValue({
    dispatch: dispatchMock,
    fetchDetails: vi.fn(),
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
      items: [
        {
          id: "12",
          gender: "male",
          hair_color: "blond",
          height: "172",
          mass: "77",
          name: "Luke Skywalker",
          url: "https://swapi.dev/api/people/12/",
        },
        {
          id: "13",
          gender: "male",
          hair_color: "blond",
          height: "170",
          mass: "70",
          name: "Luke",
          url: "https://swapi.dev/api/people/13/",
        },
      ],
      params: null,
      theme: "dark",
      favourites: [],
    },
  });

  it("should render the card list", async () => {
    render(
      <PageLayout searchValue="test">
        <div>Test</div>
      </PageLayout>,
    );
    await waitFor(() => {
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
      expect(screen.getByText("Luke")).toBeInTheDocument();
    });
  });

  it("should update the search value and dispatch the setParams action", async () => {
    render(
      <PageLayout searchValue="test">
        <div>Content</div>
      </PageLayout>,
    );

    expect(dispatchMock).toHaveBeenCalledWith({
      type: AppTypes.SET_PARAMS,
      payload: { search: "test", page: 1 },
    });
  });

  it("should update the page and dispatch the setParams action", async () => {
    render(
      <PageLayout searchValue="">
        <div>Content</div>
      </PageLayout>,
    );

    const paginationButton = screen.getByText("Next");
    await userEvent.click(paginationButton);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: AppTypes.SET_PARAMS,
      payload: { search: "", page: 2 },
    });
  });
});
