import { afterEach, describe, expect, test, vi } from "vitest";
import { CardComponent } from "../../src/components/card/index";
import { renderWithRouter } from "../router";
import { fireEvent } from "@testing-library/dom";
import * as reduxHook from '../../src/hooks/redux.hook'

const dataResponse = {
  id: '1',
  gender: "male",
  hair_color: "blond",
  height: "172",
  mass: "77",
  name: "Luke Skywalker",
  url: "https://swapi.dev/api/people/12/",
};

describe("Card", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("card component renders the relevant card data", () => {
    const { getByText } = renderWithRouter(
      <CardComponent item={dataResponse} />
    );
    expect(getByText(dataResponse.name)).toBeInTheDocument();
    expect(getByText(dataResponse.gender)).toBeInTheDocument();
    expect(getByText(dataResponse.hair_color)).toBeInTheDocument();
    expect(getByText(dataResponse.height)).toBeInTheDocument();
    expect(getByText(dataResponse.mass)).toBeInTheDocument();
  });

  test("clicking triggers an additional API call to fetch detailed information", () => {
    const spy = vi.spyOn(reduxHook, 'useAppSelector')
    const { getByTestId } = renderWithRouter(
      <CardComponent item={dataResponse} />
    );
    const button = getByTestId('favourites')
    fireEvent.click(button)

    expect(spy).toHaveBeenCalled()
  });
});
