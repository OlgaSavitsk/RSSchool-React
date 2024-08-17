import { useAppSelector } from "../../hooks/redux.hook";
import { appSelector } from "../../redux/modules/app";

export const MainPage = () => {
  const { controlledForm, uncontrolledForm } = useAppSelector(appSelector);

  return (
    <div>
      <h1>Main Page</h1>
      <h2>Uncontrolled Form Data</h2>
      <pre>{JSON.stringify(uncontrolledForm, null, 2)}</pre>
      <h2>React Hook Form Data</h2>
      <pre>{JSON.stringify(controlledForm, null, 2)}</pre>
    </div>
  );
};
