import { Link } from "react-router-dom";
import classes from "./index.module.css";

export const SearchComponent = () => (
  <div className={classes.wrapper}>
    <img src="../starwars.svg" alt="logo" />

    <nav>
      <ul>
        <li>
          <Link to="/">Main Page</Link>
        </li>
        <li>
          <Link to="/uncontrol">Uncontrolled Form</Link>
        </li>
        <li>
          <Link to="/control">React Hook Form</Link>
        </li>
      </ul>
    </nav>
  </div>
);
