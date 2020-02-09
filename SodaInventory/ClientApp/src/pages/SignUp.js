import * as React from 'react';
import {setCookie} from '../store/DataAccess';
import {Button, Form, Grid, Header, Icon, Image, Segment} from 'semantic-ui-react'

class SignUp extends React.Component {

	componentDidMount() {
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
						Create Company
					</Header>
					<Form size='large' onSubmit={() => document.location.href="/email-sent"}>
						<Segment stacked>
							<Form.Input fluid icon='warehouse' iconPosition='left' placeholder='Company Name' />
							<Form.Input
								fluid
								icon='user'
								iconPosition='left'
								placeholder='E-mail address'
								type='email'
							/>

                            <Button color='teal' fluid size='large' onClick={() => setCookie("companyId", "2")}>
								Submit
							</Button>
						</Segment>
					</Form>
					<Button floated={"right"} className={"mt-2"} primary onClick={() => document.location.href="./login"}><Icon name="arrow alternate circle left outline"/>login page</Button>
				</Grid.Column>
			</Grid>
		);
	}
}

export default (SignUp);