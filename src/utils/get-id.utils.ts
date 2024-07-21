import { StarWarsPeople } from "../types/item.types";

export const getId = (item: StarWarsPeople) => item.url && item.url.split("/").filter((i) => i)[4];
