import React, { FC } from 'react';

import { StarWarsPeople } from '../../types/item.types';
import classes from './index.module.css';
import { Link } from 'react-router-dom';

type CardComponentProps = {
    item: StarWarsPeople,
}

export const CardComponent: FC<CardComponentProps> = ({ item }) => {
    const getId = (item: StarWarsPeople) => item.url && item.url.split('/').filter((i) => i)[4]

    return (
        <Link data-testid='card' to={`people/${getId(item)}`} key={item.name} >
            <div key={item.name} className={classes.card}>
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
        </Link>
    )
}