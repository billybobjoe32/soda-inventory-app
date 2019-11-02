import * as React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {

	componentDidMount(): void {
		if (sessionStorage.getItem("token") !== null) {
			window.location.href="/"
		}
	}

	render() {
		return (
			<div>
				Login: <input type="text"/><br/>
				Password: <input type="password"/><br/>
				<input type="button" value="Login" onClick={this.login}/>
			</div>
		);
	}

	login = () => {
		//Remove this when we get a token back from the server at login
		window.location.href="./";
		sessionStorage.setItem("token", "test");
	}
}

export default connect()(Login);