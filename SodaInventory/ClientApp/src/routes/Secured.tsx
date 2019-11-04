import React, {Component} from 'react';
import PrivateRoute from '../hoc/PrivateRoute';
import {Switch} from "react-router";
import NavMenu from "../components/NavMenu";
import Dashboard from "../pages/Dashboard";

class Secured extends Component {
    render() {
        return (
            <div>
                <NavMenu/>
                <Switch>
                    <PrivateRoute path='/*' component={Dashboard}/>
                </Switch>
            </div>
        );
    }
}

export default Secured;