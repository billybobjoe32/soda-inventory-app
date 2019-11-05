import React, {Component} from 'react';
import PrivateRoute from '../hoc/PrivateRoute';
import {Switch} from "react-router";
import NavMenu from "../components/NavMenu";
import Location from '../components/Location';
import AddLocation from '../components/AddLocation';
import Dashboard from "../pages/Dashboard";

class Secured extends Component {
    render() {
        return (
            <div>
                <NavMenu/>
                <Switch>
                    <PrivateRoute path="/select-store" component={Location} />
                    <PrivateRoute path="/add-store" component={AddLocation} />
                    <PrivateRoute path='/*' component={Dashboard} />
                </Switch>
            </div>
        );
    }
}

export default Secured;