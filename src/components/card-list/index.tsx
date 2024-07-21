import { FC, useRef } from "react";

import classes from "./index.module.css";
import { StarWarsPeople } from "../../types/item.types";
import { CardComponent } from "../card";
import { Outlet, useNavigate } from "react-router-dom";

type CardListComponentProps = {
  data?: StarWarsPeople[];
};

export const CardListComponent: FC<CardListComponentProps> = ({ data }) => {
  const navigate = useNavigate();
  const container = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (container.current === (event.target as HTMLElement)) {
      navigate("/");
    }
  };

  return (
    <div className={classes.wrapper}>
      <div ref={container} className={classes.content} onClick={handleClick}>
        {data ? (
          data.map((item, index) => <CardComponent item={item} key={index} />)
        ) : (
          <div>Nothing was found</div>
        )}
      </div>
      <Outlet />
    </div>
  );
};
