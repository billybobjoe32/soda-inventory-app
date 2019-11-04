import {Redirect, Route} from "react-router";
import React from "react";

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        sessionStorage.getItem('token') !== null ?
            <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
    )} />
);

export default ProtectedRoute;