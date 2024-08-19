import { useAppSelector } from "../../hooks/redux.hook";
import { appSelector } from "../../redux/modules/app";
import classes from "./index.module.css";

export const MainPage = () => {
  const { controlledForm, uncontrolledForm } = useAppSelector(appSelector);

  return (
    <><h1>Main Page</h1><div className={classes.wrapper}>
      <div>
        <h2>Uncontrolled Form Data</h2>
        <p>{uncontrolledForm?.name}</p>
        <p>{uncontrolledForm?.age}</p>
        <p>{uncontrolledForm?.password}</p>
        <p>{uncontrolledForm?.country}</p>
        <p>{uncontrolledForm?.gender}</p>
        <p>{uncontrolledForm?.email}</p>
        <img src={uncontrolledForm?.image as string} />
      </div>
      <div>
        <h2>React Hook Form Data</h2>
        <p>{controlledForm?.name}</p>
        <p>{controlledForm?.age}</p>
        <p>{controlledForm?.password}</p>
        <p>{controlledForm?.country}</p>
        <p>{controlledForm?.gender}</p>
        <p>{controlledForm?.email}</p>
        <img src={controlledForm?.image as string} />
      </div>

    </div></>
  );
};
