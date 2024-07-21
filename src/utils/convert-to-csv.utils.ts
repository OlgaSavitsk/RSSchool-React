import { StarWarsPeople } from "../types/item.types";

export const convertCSV = (data: StarWarsPeople[]) => {
  const header = "data:text/csv;charset=utf-8,";
  const body = data.map((item) => Object.values(item).join(".")).join("\n");
  return header + body;
};
