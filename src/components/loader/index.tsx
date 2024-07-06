import React, { Component } from 'react';

import classes from './index.module.css';

export class LoaderComponent extends Component {
  render() {
    return (
      <div className={classes.overlay}>
        <div className={classes.loading}>Loading...</div>
        
      </div>
    )
  }
}