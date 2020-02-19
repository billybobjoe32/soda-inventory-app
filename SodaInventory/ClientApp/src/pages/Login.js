import * as React from 'react';
import {apiAddress, setCookie} from '../store/DataAccess';
import {Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react'
import Alert from "react-s-alert"

class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}

	componentDidMount() {
		if (sessionStorage.getItem("token") !== null) {
			window.location.href="/"
		}
	}

	handleChange = (e, {value}) => {
		this.setState({[e.target.id]: value})
	};

	render() {
		return (
			<div>
				<Alert stack={{limit: 3, spacing: 10}}/>
				<Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
					<Grid.Column style={{maxWidth: 450}}>
						<Image src={require("../resources/logo.jpg")} size='small' centered/>
						<Header as='h2' color='teal' textAlign='center' style={{marginTop: "0px"}}>
							Log-in to your account
						</Header>
						<Form size='large' onSubmit={this.login} loading={this.state.loading}>
							<Segment stacked>
								<Form.Input
									id="email"
									fluid
									icon='user'
									iconPosition='left'
									placeholder='E-mail address'
									onChange={this.handleChange}/>
								<Form.Input
									id="password"
									fluid
									icon='lock'
									iconPosition='left'
									placeholder='Password'
									type='password'
									onChange={this.handleChange}/>

								<Form.Button color='teal' fluid size='large'>
									Login
								</Form.Button>
							</Segment>
						</Form>
						<Message>
							New to us? <a href='./signup'>Sign Up</a>
						</Message>
					</Grid.Column>
				</Grid>
			</div>
		);
	}

	login = () => {
		this.setState({loading: true});
		fetch(`${apiAddress}/api/Users/login`, {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.state)
		})
			.then(response => response.json())
			.then(response => {
				if (!response.token) {
					Alert.error("Wrong Credentials", {position: 'top-right'});
					console.error("Wrong Credentials")
				} else {
					setCookie("companyId", response.companyId);
					sessionStorage.setItem("token", response.token);
					window.location.href="./select-store";
				}
			})
			.catch((e) => {
				Alert.error("Unknown Error", {position: 'top-right'});
				console.error(e, "Login Error")
			})
			.finally(() => this.setState({loading: false}))
	}
}

export default (Login);