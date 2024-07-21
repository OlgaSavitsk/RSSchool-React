import { FC } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { favouritesSelector, removeFavourites } from "../../redux/modules/favourites";
import { convertCSV, transformNumber } from "../../utils";
import classes from "./index.module.css";

export const ModalComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { favourites } = useAppSelector(favouritesSelector);

  const handleSelectAll = () => {
    dispatch(removeFavourites());
  };

  const handleDownload = () => {
    const encodeURL = encodeURI(convertCSV(favourites));
    const link = document.createElement("a");
    link.href = encodeURL;
    link.download = `${favourites.length}_peoples.csv`;
    link.click();
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
        <button className={classes.button} onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
};
