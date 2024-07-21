import { useEffect, useState } from "react";
import "./App.css";
import { SearchComponent } from "./components/search";
import { CardListComponent } from "./components/card-list";
import { LoaderComponent } from "./components/loader";
import { useStorage } from "./hooks/use-storage.hook";
import { PaginationComponent } from "./components/pagination";
import { useGetItemsQuery } from "./redux/services/items";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { appSelector } from "./redux/modules/app";

export const App = () => {
  const [searchValue] = useStorage("search", "");
  const [input, setSearchValue] = useState(searchValue || "");
  const [page, setPage] = useState(1);
  const { items } = useAppSelector(appSelector);
  const { data = [], refetch, isLoading } = useGetItemsQuery({ searchValue: input, page });
  // const dispatch = useAppDispatch();

  useEffect(() => {
    refetch();
  }, [refetch, input, page]);

  return (
    <>
      <SearchComponent onChange={(value) => setSearchValue(value)} />
      <CardListComponent data={data} />
      {data && <PaginationComponent setPage={(page) => setPage(page)} />}
      {isLoading ? <LoaderComponent /> : null}
    </>
  );
};

export default App;
