import { ModalComponent } from "@components/modal";
import { useAppContext } from "@hooks/use-context.hook";
import { getPeoples } from "@services/people.api";
import { QueryParams, StarWarsPeople } from "@typing/item.types";
import { useEffect } from "react";
import { appActions } from "src/store";

type StaticProps = {
  results: StarWarsPeople[];
};

export const getStaticProps = async (params: QueryParams) => {
  const { results } = await getPeoples(params);
  return { props: { results } };
};

export const HomePage = ({ results }: StaticProps) => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    dispatch(appActions.setPeoples(results));
  }, [results]);

  return <ModalComponent />;
};

export default HomePage;
