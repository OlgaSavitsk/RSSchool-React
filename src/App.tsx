import React, { useEffect, useState } from "react";
import "./App.css";
import { SearchComponent } from "./components/search";
import { CardListComponent } from "./components/card-list";
import { LoaderComponent } from "./components/loader";
import { StarWarsPeople } from "./types/item.types";
import { getPeoples } from "./services/people.api";
import { useStorage } from "./hooks/use-storage.hook";
import { PaginationComponent } from "./components/pagination";


export const App = () => {
  const [searchValue] = useStorage('search', '');
  const [data, setData] = useState<StarWarsPeople[] | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [input, setSearchValue] = useState(searchValue || '')
  const [page, setPage] = useState(1)

  const fetchData = async (savedValue: string, page: number) => {
    setLoading(true)
    try {
      const data = await getPeoples(savedValue, page)
      setData(data.results)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(input, page)
  }, [input, page])

  return (
      <>
      <SearchComponent onChange={(value) => setSearchValue(value)} />
      <CardListComponent data={data} />
      {data && <PaginationComponent setPage={(page) => setPage(page)}/>}
      {isLoading ? <LoaderComponent /> : null}
      </>
  );
}

export default App;
