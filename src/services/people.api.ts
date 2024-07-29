import { StarWarsPeople, StarWarsPeopleResponse } from "../types/item.types";
import apiService from "./api.service";

export function getPeoples(savedValue: string, page: number): Promise<StarWarsPeopleResponse> {
  return apiService.get(`?search=${savedValue}&page=${page}`);
}

export function getPeople(id: string): Promise<StarWarsPeople> {
  return apiService.get(`${id}`);
}
