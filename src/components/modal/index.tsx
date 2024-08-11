"use client";

import { FC } from "react";

import { convertCSV, transformNumber } from "../../utils";
import classes from "./index.module.css";
import Link from "next/link";
import { useAppContext } from "@hooks/use-context.hook";
import { appActions } from "src/store";

export const ModalComponent: FC = () => {
  const {
    dispatch,
    state: { favourites },
  } = useAppContext();
  const encodeURL = encodeURI(convertCSV(favourites));

  const handleSelectAll = () => {
    dispatch(appActions.removeFav());
  };

  return (
    <div
      data-testid="detail"
      className={classes.overlay}
      style={{ transform: favourites.length ? "translateX(-20px)" : "translateX(300px)" }}
    >
      <h4>{transformNumber(favourites.length)}</h4>
      <div className={classes.wrapper}>
        <button className={classes.button} onClick={handleSelectAll}>
          Unselect all
        </button>
        <Link
          href={encodeURL}
          download={`${favourites.length}_peoples.csv`}
          className={classes.button}
        >
          Download
        </Link>
      </div>
    </div>
  );
};
