import classes from "./index.module.css";
import { Outlet } from "react-router-dom";
import { SearchComponent } from "./components/search";

export const App = () => {
  return (
    <>
      <SearchComponent />
      <div className={classes.wrapper}>
        <Outlet />
      </div>
    </>
  );
};

export default App;
