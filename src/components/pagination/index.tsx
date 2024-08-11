"use client";

import { FC, useCallback, useEffect, useState } from "react";

import classes from "./index.module.css";

type SearchComponentProps = {
  setPage: (value: number) => void;
};

export const PaginationComponent: FC<SearchComponentProps> = ({ setPage }) => {
  const [id, setId] = useState(1);

  const handleNextClick = useCallback(() => {
    setId((prev) => {
      if (prev > 5) return prev;
      return prev + 1;
    });
  }, []);

  const handlePrevClick = useCallback(() => {
    setId((prev) => {
      if (prev < 2) return prev;
      return prev - 1;
    });
  }, []);

  useEffect(() => {
    setPage(id);
  }, [id, setPage]);

  return (
    <div className={classes.wrapper}>
      <button onClick={handlePrevClick}>Prev</button>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};
