import * as React from 'react';
import {Button, Card, Grid, Header, Icon, Image} from 'semantic-ui-react'

class EmailSent extends React.Component {

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
						Email Sent!
					</Header>
					<Card centered color="teal">
						<Card.Content description ="Check your email to continue registration"/>
						<Card.Content extra>
							<Button floated={"right"} className={"mt-2"} primary onClick={() => document.location.href="./login"}><Icon name="arrow alternate circle left outline"/>login page</Button>
						</Card.Content>
					</Card>
				</Grid.Column>
			</Grid>
		);
	}
}

export default (EmailSent);