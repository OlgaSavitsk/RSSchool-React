import classes from "./index.module.css";

export const LoaderComponent = () => (
  <div className={classes.overlay} data-testid="loader">
    <div className={classes.loading}>Loading...</div>
  </div>
);
