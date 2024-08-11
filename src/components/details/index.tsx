import { FC, useEffect } from "react";
import { useParams } from "next/navigation";
import { CardComponent } from "@components/card";
import LoaderComponent from "@components/loader";
import { useAppContext } from "@hooks/use-context.hook";
import classes from "./index.module.css";
import { useRouter } from "next/navigation";

export const DetailsComponent: FC = () => {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const {
    fetchDetails,
    state: { item, isLoading },
  } = useAppContext();

  const handleClick = () => {
    router.push("/");
  };

  useEffect(() => {
    slug && fetchDetails(slug);
  }, [slug]);

  return (
    <div data-testid="detail" className={classes.wrapper}>
      <button className={classes.button} onClick={handleClick}>
        Back
      </button>
      <div className={classes.content}>{item && <CardComponent item={item} />}</div>
      {isLoading ? <LoaderComponent /> : null}
    </div>
  );
};
