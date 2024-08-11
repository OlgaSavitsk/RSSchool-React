import { MouseEvent, FC, useCallback } from "react";

import { StarWarsPeople } from "../../types/item.types";
import { getId, isValueExist } from "../../utils";
import IconStar from "../icon-star";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { addFavourites, favouritesSelector } from "../../redux/modules/favourites";
import classes from "./index.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

type CardComponentProps = {
  item: StarWarsPeople;
};

export const CardComponent: FC<CardComponentProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { favourites } = useAppSelector(favouritesSelector);
  const router = useRouter();

  const isFavExist = isValueExist(favourites, item);

  const handleAddFavourites = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      dispatch(addFavourites(item));
    },
    [dispatch, item],
  );

  return (
    <Link
      data-testid="card"
      href={{
        pathname: `/people/${getId(item)}`,
        query: { page: router.query.page },
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
