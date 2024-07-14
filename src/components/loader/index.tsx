import React from 'react';

import classes from './index.module.css';

export const LoaderComponent = () => {

  return (
    <div className={classes.overlay}>
      <div className={classes.loading}>Loading...</div>

    </div>
  )
}