import { FC } from "react";

import classes from "./index.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderComponent } from "../loader";
import { CardComponent } from "../card";
import { useGetItemQuery } from "../../redux/services/items";

export const DetailsComponent: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data = null, isLoading } = useGetItemQuery(id ?? '');
 
  const handleClick = () => {
    navigate("/");
  };

  return (
      <div data-testid="detail" className={classes.wrapper}>
        <button className={classes.button} onClick={handleClick}>
          Back
        </button>
        <div className={classes.content}>{data && <CardComponent item={data} />}</div>
        {isLoading ? <LoaderComponent /> : null}
      </div>
  );
};
