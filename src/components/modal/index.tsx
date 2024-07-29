import { FC } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { favouritesSelector, removeFavourites } from "../../redux/modules/favourites";
import { convertCSV, transformNumber } from "../../utils";
import classes from "./index.module.css";
import { Link } from "react-router-dom";

export const ModalComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { favourites } = useAppSelector(favouritesSelector);
  const encodeURL = encodeURI(convertCSV(favourites));

  const handleSelectAll = () => {
    dispatch(removeFavourites());
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
          to={encodeURL}
          download={`${favourites.length}_peoples.csv`}
          className={classes.button}
        >
          Download
        </Link>
      </div>
    </div>
  );
};
