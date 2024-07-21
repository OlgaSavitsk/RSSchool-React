import { FC, useEffect, useState } from "react";

import { StarWarsPeople } from "../../types/item.types";
import classes from "./index.module.css";
import { getPeople } from "../../services/people.api";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderComponent } from "../loader";
import { CardComponent } from "../card";

export const DetailsComponent: FC = () => {
  const [data, setData] = useState<StarWarsPeople | null>(null);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchDetails = async (id: string) => {
    setLoading(true);
    try {
      const data = await getPeople(id);
      setData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleClick = () => {
    setData(null);
    navigate("/");
  };

  useEffect(() => {
    if (id) fetchDetails(id);
  }, [id]);

  return (
    <>
      {id && (
        <div data-testid="detail" className={classes.wrapper}>
          <button className={classes.button} onClick={handleClick}>
            Back
          </button>
          <div className={classes.content}>{data && <CardComponent item={data} />}</div>
        </div>
      )}
      {isLoading ? <LoaderComponent /> : null}
    </>
  );
};
