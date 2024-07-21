import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";

import classes from "./index.module.css";
import { useStorage } from "../../hooks/use-storage.hook";

type SearchComponentProps = {
  onChange: (value: string) => void;
};

export const SearchComponent: FC<SearchComponentProps> = ({ onChange }) => {
  const [searchValue, setValue] = useStorage("search", "");
  const [inputValue, setInputValue] = useState(searchValue || "");
  const [isError, setError] = useState(false);

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchValue = useCallback(() => {
    setValue(inputValue);
    onChange(inputValue);
  }, [onChange, inputValue, setValue]);

  const initError = () => {
    setError(true);
  };

  useEffect(() => {
    return () => {
      localStorage.setItem("search", JSON.stringify(searchValue));
    };
  }, [searchValue]);

  if (isError) {
    throw new Error("Unexpected Render Error occured!");
  }

  return (
    <div className={classes.wrapper}>
      <img src="../starwars.svg" alt="logo" />
      <input
        type="text"
        value={inputValue}
        className={classes.input}
        onChange={onChangeSearch}
        placeholder="Search..."
      />
      <button onClick={handleSearchValue}>Search</button>
      <button className={classes.error} onClick={initError}>
        Error
      </button>
    </div>
  );
};
