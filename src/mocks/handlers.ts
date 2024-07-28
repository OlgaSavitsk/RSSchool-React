import { delay, http, HttpHandler, HttpResponse } from "msw";
import { dataResponse, dataResponseList } from "./data";

export const handlers: HttpHandler[] = [
  http.get("https://swapi.dev/api/people", () => {
    return HttpResponse.json(dataResponseList);
  }),
  http.get("https://swapi.dev/api/people/:id", () => {
    return HttpResponse.json(dataResponse);
  }),
];
