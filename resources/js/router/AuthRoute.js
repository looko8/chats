import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isLoggedIn} from "../helpers/auth";

function AuthRoute ({ component: Component, title, ...rest }) {

    let authenticated = isLoggedIn();

    return (
        <Route
            {...rest}
            render={props => {
                return authenticated
                    ?
                        <Component {...props} />
                    :
                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
            }
            }
        />
    );
}

export default AuthRoute;
