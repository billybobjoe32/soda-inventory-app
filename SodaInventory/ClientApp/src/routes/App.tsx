import {Route, Switch} from 'react-router';
import Login from '../pages/Login';
import Location from '../pages/Location';
import LoggedIn from './Secured';

import '../custom.css'

import {BrowserRouter} from "react-router-dom";
import React, {Component} from 'react';

class App extends Component {
    render() {
        return (
                <BrowserRouter>
                    <div>
                        <Switch>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/select-store" component={Location}/>
                            <Route exact path="/*" component={LoggedIn}/>
                        </Switch>
                    </div>
                </BrowserRouter>
        );
    }
}

export default App;
