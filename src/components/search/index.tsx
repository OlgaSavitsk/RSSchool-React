import { ChangeEvent, FC, useCallback, useState } from "react";

import { useStorage } from "../../hooks/use-storage.hook";
import { ThemeButton } from "../theme-button";
import Image from "next/image";
import classes from "./index.module.css";

type SearchComponentProps = {
  onChange: (value: string) => void;
  setToggleTheme: (theme: "dark" | "light") => void;
};

export const SearchComponent: FC<SearchComponentProps> = ({ onChange, setToggleTheme }) => {
  const [searchValue] = useStorage("search", "");
  const [inputValue, setInputValue] = useState(searchValue || "");
  const [isError, setError] = useState(false);
  const [themeValue, setTheme] = useState<"dark" | "light">("dark");

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchValue = useCallback(() => {
    onChange(inputValue);
    localStorage.setItem("search", JSON.stringify(inputValue));
  }, [onChange, inputValue]);

  const handleToggleTheme = useCallback(() => {
    setTheme(themeValue === "dark" ? "light" : "dark");
    setToggleTheme(themeValue);
  }, [themeValue, setToggleTheme]);

  const initError = () => {
    setError(true);
  };

  if (isError) {
    throw new Error("Unexpected Render Error occured!");
  }

  return (
    <div className={classes.wrapper}>
      <Image src="/starwars.svg" width={100} height={70} alt="logo" />
      <input
        type="text"
        value={inputValue}
        className={classes.input}
        onChange={onChangeSearch}
        placeholder="Search..."
      />
      <button data-testid="search" className={classes.button} onClick={handleSearchValue}>
        Search
      </button>
      <button className={classes.error} onClick={initError}>
        Error
      </button>
      <ThemeButton onClick={handleToggleTheme} />
    </div>
  );
};
