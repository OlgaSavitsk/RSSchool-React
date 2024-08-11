import HomePage from "@app/page";

import { getPeoples } from "@services/people.api";
import { StarWarsPeople } from "@typing/item.types";

export const getServerSideProps = async (): Promise<StarWarsPeople[]> => {
  const { results } = await getPeoples();
  return results;
};

export const Page = async () => {
  return <HomePage />;
};

export default Page;
