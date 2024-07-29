import { useEffect, useState } from "react";

export function useStorage(key: string, init: string): [string, (value: string) => void] {
  const [searchValue, setSearchValue] = useState<string>(() => {
    const savedValue = JSON.parse(localStorage.getItem(key)!);
    return savedValue ?? init;
  });

  useEffect(() => {
    return () => {
      localStorage.setItem("search", JSON.stringify(searchValue));
    };
  }, [searchValue]);

  return [searchValue, setSearchValue];
}
