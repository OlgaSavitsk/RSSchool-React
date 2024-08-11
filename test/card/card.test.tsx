import { afterEach, describe, expect, test, vi } from "vitest";
import { CardComponent } from "../../src/components/card/index";
import { render } from "@testing-library/react";

const dataResponse = {
  id: "1",
  gender: "male",
  hair_color: "blond",
  height: "172",
  mass: "77",
  name: "Luke Skywalker",
  url: "https://swapi.dev/api/people/12/",
};

vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn().mockReturnValue({
    get: vi.fn(),
  }),
}));

describe("Card", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("card component renders the relevant card data", () => {
    const { getByText } = render(<CardComponent item={dataResponse} />);
    expect(getByText(dataResponse.name)).toBeInTheDocument();
    expect(getByText(dataResponse.gender)).toBeInTheDocument();
    expect(getByText(dataResponse.hair_color)).toBeInTheDocument();
    expect(getByText(dataResponse.height)).toBeInTheDocument();
    expect(getByText(dataResponse.mass)).toBeInTheDocument();
  });

  // test("clicking triggers an additional API call to fetch detailed information", () => {
  //   const spy = vi.spyOn(reduxHook, "useAppSelector");
  //   const { getByTestId } = render(

  //       <CardComponent item={dataResponse} />
  //   );
  //   const button = getByTestId("favourites");
  //   fireEvent.click(button);

  //   expect(spy).toHaveBeenCalled();
  // });
});
