"use client";

import { MouseEvent, FC, useCallback } from "react";

import { StarWarsPeople } from "../../types/item.types";
import { getId, isValueExist } from "../../utils";
import IconStar from "../icon-star";
import classes from "./index.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "@hooks/use-context.hook";
import { appActions } from "src/store";

type CardComponentProps = {
  item: StarWarsPeople;
};

export const CardComponent: FC<CardComponentProps> = ({ item }) => {
  const {
    dispatch,
    state: { favourites },
  } = useAppContext();
  const searchParams = useSearchParams();

  const search = searchParams.get("page");

  const isFavExist = isValueExist(favourites, item);

  const handleAddFavourites = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      dispatch(appActions.setFav(item));
    },
    [dispatch, item],
  );

  return (
    <Link
      data-testid="card"
      href={{
        pathname: `/people/${getId(item)}`,
        query: { page: search },
      }}
      key={item.name}
    >
      <div key={item.name} className={classes.card}>
        <div className={classes.header}>
          <h3>{item.name}</h3>
          <button
            data-testid="favourites"
            onClick={(event) => handleAddFavourites(event)}
            className={classes.button}
          >
            <IconStar color={isFavExist ? "darkmagenta" : ""} />
          </button>
        </div>

        <div className={classes.info}>
          <dl>
            <div className={classes.descriptions}>
              <dt className={classes.dt}>Height</dt>
              <dd>{item.height}</dd>
            </div>
            <div className={classes.descriptions}>
              <dt className={classes.dt}>Mass</dt>
              <dd>{item.mass}</dd>
            </div>

            <div className={classes.descriptions}>
              <dt className={classes.dt}>Hair Color</dt>
              <dd>{item.hair_color}</dd>
            </div>
            <div className={classes.descriptions}>
              <dt className={classes.dt}>Gender</dt>
              <dd>{item.gender}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Link>
  );
};
