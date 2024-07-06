import React, { Component } from 'react';

import classes from './index.module.css';

type FetchingErrorProps = {
  error?: string
}

export class FetchingError extends Component<FetchingErrorProps> {

  render() {
    return (
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Error!!</h2>
        <p className={classes.text}>{this.props.error}</p>
      </div>
    )
  }
}