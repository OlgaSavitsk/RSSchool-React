import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";

import { useStorage } from "../../hooks/use-storage.hook";
import classes from "./index.module.css";
import { ThemeButton } from "../theme-button";

type SearchComponentProps = {
  onChange: (value: string) => void;
  setToggleTheme: (theme: "dark" | "light") => void;
};

export const SearchComponent: FC<SearchComponentProps> = ({ onChange, setToggleTheme }) => {
  const [searchValue, setValue] = useStorage("search", "");
  const [inputValue, setInputValue] = useState(searchValue || "");
  const [isError, setError] = useState(false);
  const [themeValue, setTheme] = useState<"dark" | "light">("dark");

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchValue = useCallback(() => {
    setValue(inputValue);
    onChange(inputValue);
  }, [onChange, inputValue, setValue]);

  const handleToggleTheme = useCallback(() => {
    setTheme(themeValue === "dark" ? "light" : "dark");
    setToggleTheme(themeValue);
  }, [themeValue, setToggleTheme]);

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
      <button className={classes.button} onClick={handleSearchValue}>
        Search
      </button>
      <button className={classes.error} onClick={initError}>
        Error
      </button>
      <ThemeButton onClick={handleToggleTheme} />
    </div>
  );
};
