import { FC, useRef } from "react";

import { useRouter } from "next/router";
import { CardComponent } from "../card";
import { isArrayWithItems } from "../../utils";
import { StarWarsPeople } from "../../types/item.types";
import classes from "./index.module.css";

type CardListComponentProps = {
  data: StarWarsPeople[];
};

export const CardListComponent: FC<CardListComponentProps> = ({ data }) => {
  const router = useRouter();
  const container = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (container.current === (event.target as HTMLElement)) {
      router.push("/");
    }
  };

  return (
    <>
      <div className={classes.wrapper}>
        <div ref={container} className={classes.content} onClick={handleClick}>
          {isArrayWithItems(data) ? (
            data.map((item, index) => <CardComponent item={item} key={index} />)
          ) : (
            <div className={classes.empty}>Nothing was found</div>
          )}
        </div>
      </div>
    </>
  );
};
