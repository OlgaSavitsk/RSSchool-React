"use client";

import classes from "./index.module.css";
import Link from "next/link";

export const NotFoundPage = () => (
  <div className={classes.wrapper}>
    <h2 className={classes.title}>404</h2>
    <Link className={classes.button} href="/">
      Home
    </Link>
  </div>
);
