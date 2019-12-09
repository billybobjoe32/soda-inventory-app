import {Redirect, Route} from "react-router";
import React from "react";
import * as DataAccess from '../store/DataAccess'

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        sessionStorage.getItem('token') === null
            ? <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
            : DataAccess.getCookie("storeId") === ""
                ? <Redirect to={{ pathname: '/select-store', state: { from: props.location }}} />
                : <Component {...props} />
    )} />
);

export default ProtectedRoute;