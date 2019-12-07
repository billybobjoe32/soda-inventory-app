import * as React from 'react';
import { connect } from 'react-redux';
import { setCookie } from '../store/DataAccess';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class Login extends React.Component {

	componentDidMount(): void {
		if (sessionStorage.getItem("token") !== null) {
			window.location.href="/"
		}
	}

	render() {
		return (
			<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: 450 }}>
					<Image src={require("../resources/logo.jpg")} size='small' centered/>
					<Header as='h2' color='teal' textAlign='center' style={{marginTop: "0px"}}>
						Log-in to your account
					</Header>
					<Form size='large' onSubmit={this.login}>
						<Segment stacked>
							<Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
							<Form.Input
								fluid
								icon='lock'
								iconPosition='left'
								placeholder='Password'
								type='password'
							/>

                            <Button color='teal' fluid size='large' onClick={() => setCookie("companyId", "1")}>
								Login
							</Button>
						</Segment>
					</Form>
					<Message>
						New to us? <a href='#'>Sign Up</a>
					</Message>
				</Grid.Column>
			</Grid>
		);
	}

	private login = () => {
		//Remove this when we get a token back from the server at login
		window.location.href="./select-store";
		sessionStorage.setItem("token", "test");
	}
}

export default connect()(Login);