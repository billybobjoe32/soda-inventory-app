import React, {Component} from 'react';
import PrivateRoute from '../hoc/PrivateRoute';
import Home from "../pages/Home";
import {Switch} from "react-router";
import NavMenu from "../components/NavMenu";

class Secured extends Component {
    render() {
        return (
            <div>
                <NavMenu/>
                <Switch>
                    <PrivateRoute path='/*' component={Home}/>
                </Switch>
            </div>
        );
    }
}

export default Secured;