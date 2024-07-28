import { useEffect, useState } from "react";
import { SearchComponent } from "./components/search";
import { CardListComponent } from "./components/card-list";
import { LoaderComponent } from "./components/loader";
import { useStorage } from "./hooks/use-storage.hook";
import { PaginationComponent } from "./components/pagination";
import { useGetItemsQuery } from "./redux/services/items";
import { ModalComponent } from "./components/modal";
import { AppContext } from "./context";

import classes from "./index.module.css";
import { isArrayWithItems } from "./utils";

export const App = () => {
  const [searchValue] = useStorage("search", "");
  const [input, setSearchValue] = useState(searchValue || "");
  const [page, setPage] = useState(1);
  const [themeValue, setTheme] = useState<"dark" | "light">("dark");
  const className = classes[themeValue];
  const { data = [], refetch, isFetching } = useGetItemsQuery({ searchValue: input, page });

  useEffect(() => {
    refetch();
  }, [input, page]);

  return (
    <AppContext.Provider value={{ theme: themeValue }}>
      <SearchComponent
        onChange={(value) => setSearchValue(value)}
        setToggleTheme={(theme) => setTheme(theme === "dark" ? "light" : "dark")}
      />

      <div className={`${classes.wrapper} ${className}`}>
        <CardListComponent data={data} />
        {isArrayWithItems(data) && <PaginationComponent setPage={(page) => setPage(page)} />}
        {isFetching ? <LoaderComponent /> : null}
        <ModalComponent />
      </div>
    </AppContext.Provider>
  );
};

export default App;
