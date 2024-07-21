import { StarWarsPeople } from "../types/item.types";

export const isValueExist = (array: StarWarsPeople[], { name }: StarWarsPeople) =>
  array.some((item) => item.name === name);