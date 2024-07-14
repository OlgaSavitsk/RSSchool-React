import React from 'react';

import classes from './index.module.css';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className={classes.wrapper}>
            <h2 className={classes.title}>404</h2>
            <button className={classes.button} onClick={() => navigate('/')}>Home</button>
        </div>
    )
}