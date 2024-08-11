import { StarWarsPeople, StarWarsPeopleResponse } from "../types/item.types";
import apiService from "./api.service";

export function getPeoples<T>(params: T): Promise<StarWarsPeopleResponse> {
  return apiService.get("/", params);
}

export function getPeople(id: string): Promise<StarWarsPeople> {
  return apiService.get(`${id}`);
}
