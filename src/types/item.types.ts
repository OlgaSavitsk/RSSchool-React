export type StarWarsPeopleResponse = {
  results: StarWarsPeople[];
};

export type StarWarsPeople = {
  id: number;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  name: string;
  url: string;
};

export type QueryParams = {
  searchValue: string;
  page: number;
};
