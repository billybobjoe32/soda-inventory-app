"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
//import * as CounterStore from '../store/Counter';
//type CounterProps =
//	CounterStore.CounterState &
//	typeof CounterStore.actionCreators &
//	RouteComponentProps<{}>;
var Login = function () { return (React.createElement("div", null,
    "Login: ",
    React.createElement("input", { type: "text" }),
    React.createElement("br", null),
    "Password: ",
    React.createElement("input", { type: "password" }),
    React.createElement("br", null),
    React.createElement("input", { type: "button", value: "Login" }))); };
exports.default = react_redux_1.connect()(Login);
//# sourceMappingURL=Login.js.map