import React, { Component } from 'react';

import classes from './index.module.css';
import { StarWarsPeople } from '../../types/item.types';

type CardListComponentProps = {
  data: StarWarsPeople[]
}

export class CardListComponent extends Component<CardListComponentProps> {
  render() {
    const { data } = this.props
    return (
      <div className={classes.wrapper}>
        {data && data.map((item) =>

        (<div key={item.name} className={classes.card}>
          <h3>{item.name}</h3>
          <div className={classes.info}>
            <dl>
              <div className={classes.descriptions}>
                <dt>Height</dt><dd>{item.height}</dd>
              </div>
              <div className={classes.descriptions}>

                <dt>Mass</dt><dd>{item.mass}</dd>
              </div>

              <div className={classes.descriptions}>
                <dt>Hair Color</dt><dd>{item.hair_color}</dd>
              </div>
              <div className={classes.descriptions}>
                <dt>Gender</dt><dd>{item.gender}</dd>
              </div>
            </dl>
          </div>
        </div>
        ))}
      </div >
    )
  }
}