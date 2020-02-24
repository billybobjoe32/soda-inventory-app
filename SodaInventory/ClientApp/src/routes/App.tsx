import {Route, Switch} from 'react-router';
import Login from '../pages/Login';
import Location from '../pages/Location';
import LoggedIn from './Secured';

import '../custom.css'
import 'react-s-alert/dist/s-alert-default.css';

import {BrowserRouter} from "react-router-dom";
import React, {Component} from 'react';
import SignUp from "../pages/SignUp";
import EmailSent from "../pages/EmailSent";
import SetPassword from "../pages/SetPassword";
import RegistrationError from "../pages/RegistrationError";

class App extends Component {
    render() {
        return (
                <BrowserRouter>
                    <div>
                        <Switch>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/signup" component={SignUp}/>
                            <Route exact path="/registration/*" component={SetPassword}/>
                            <Route exact path="/registration-error" component={RegistrationError}/>
                            <Route exact path="/email-sent" component={EmailSent}/>
                            <Route exact path="/select-store" component={Location}/>
                            <Route exact path="/*" component={LoggedIn}/>
                        </Switch>
                    </div>
                </BrowserRouter>
        );
    }
}

export default App;
