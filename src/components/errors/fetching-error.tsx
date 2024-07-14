import React, { FC } from 'react';

import classes from './index.module.css';

type FetchingErrorProps = {
  error?: string
}

export const FetchingError: FC<FetchingErrorProps> = ({ error }) => {

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title}>Error!!</h2>
      <p className={classes.text}>{error}</p>
    </div>
  )
}
