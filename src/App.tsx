import { useEffect, useState } from "react";
import "./App.css";
import { SearchComponent } from "./components/search";
import { CardListComponent } from "./components/card-list";
import { LoaderComponent } from "./components/loader";
import { useStorage } from "./hooks/use-storage.hook";
import { PaginationComponent } from "./components/pagination";
import { useGetItemsQuery } from "./redux/services/items";
import { ModalComponent } from "./components/modal";

export const App = () => {
  const [searchValue] = useStorage("search", "");
  const [input, setSearchValue] = useState(searchValue || "");
  const [page, setPage] = useState(1);
  const { data = [], refetch, isFetching } = useGetItemsQuery({ searchValue: input, page });

  useEffect(() => {
    refetch();
  }, [input, page]);

  return (
    <>
      <SearchComponent onChange={(value) => setSearchValue(value)} />
      <CardListComponent data={data} />
      {data && <PaginationComponent setPage={(page) => setPage(page)} />}
      {isFetching ? <LoaderComponent /> : null}
      <ModalComponent />
    </>
  );
};

export default App;
