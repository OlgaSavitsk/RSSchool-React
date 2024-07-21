import classes from "./index.module.css";

export const LoaderComponent = () => (
  <div className={classes.overlay}>
    <div className={classes.loading}>Loading...</div>
  </div>
);
