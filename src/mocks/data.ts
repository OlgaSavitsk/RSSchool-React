import { StarWarsPeople, StarWarsPeopleResponse } from "../types/item.types";

export const dataResponse: StarWarsPeople = {
  id: "12",
  gender: "male",
  hair_color: "blond",
  height: "172",
  mass: "77",
  name: "Luke Skywalker",
  url: "https://swapi.dev/api/people/12/",
};

export const dataResponseList: StarWarsPeopleResponse = {
  results: [dataResponse],
};
