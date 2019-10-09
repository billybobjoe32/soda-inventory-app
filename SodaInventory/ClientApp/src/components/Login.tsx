import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
//import * as CounterStore from '../store/Counter';

//type CounterProps =
//	CounterStore.CounterState &
//	typeof CounterStore.actionCreators &
//	RouteComponentProps<{}>;

const Login = () => (
	<div>
		Login: <input type="text"/><br/>
		Password: <input type="password" /><br />
		<input type="button" value="Login" />
	</div>
);

export default connect()(Login);