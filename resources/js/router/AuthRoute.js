import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {getStatus} from "../store/selectors/auth";
import {connect} from "react-redux";

function AuthRoute ({ component: Component, isLoggedIn, ...rest }) {

    return (
        <Route
            {...rest}
            render={props => {
                return isLoggedIn
                    ?
                        <Component {...props} />
                    :
                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
            }
            }
        />
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: getStatus(state)
    }
};

export default connect(mapStateToProps)(AuthRoute);
