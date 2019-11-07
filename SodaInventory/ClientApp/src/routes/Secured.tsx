import React, {Component} from 'react';
import PrivateRoute from '../hoc/PrivateRoute';
import {Switch} from "react-router";
import NavMenu from "../components/NavMenu";
import Location from '../pages/Location';
import InventoryForm from '../pages/InventoryForm';
import Dashboard from "../pages/Dashboard";
import AddItem from "../pages/AddItem";
import CreateItem from "../modals/CreateItemModal";

class Secured extends Component {
    render() {
        return (
            <div>
                <NavMenu/>
                <Switch>
                    <PrivateRoute path="/AddItem" component={AddItem}/>
                    <PrivateRoute path="/CreateItem" component={CreateItem}/>
                    <PrivateRoute path="/select-store" component={Location} />
                    <PrivateRoute path='/inventory-form' component={InventoryForm} />
                    <PrivateRoute path='/*' component={Dashboard} />
                </Switch>
            </div>
        );
    }
}

export default Secured;