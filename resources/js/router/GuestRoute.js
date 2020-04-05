import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {getStatus} from "../store/selectors/auth";
import {connect} from "react-redux";

function GuestRoute ({ component: Component, isLoggedIn, ...rest }) {


    return (
        <Route
            {...rest}
            render={props => isLoggedIn
                ? <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
                : <Component {...props} />
            }
        />
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: getStatus(state)
    }
};

export default connect(mapStateToProps)(GuestRoute);
