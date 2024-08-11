export type StarWarsPeopleResponse = {
  results: StarWarsPeople[];
};

export type StarWarsPeople = {
  id: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  name: string;
  url: string;
};

export type QueryParams = {
  search: string;
  page?: number;
};
