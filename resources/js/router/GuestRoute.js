import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isLoggedIn} from "../helpers/auth";

function GuestRoute ({ component: Component, title, ...rest }) {

    let authenticated = isLoggedIn();

    return (
        <Route
            {...rest}
            render={props => authenticated
                ? <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
                : <Component {...props} />
            }
        />
    );
}


export default GuestRoute;
