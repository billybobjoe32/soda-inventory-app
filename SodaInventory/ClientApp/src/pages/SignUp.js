import * as React from 'react';
import {Button, Form, Grid, Header, Icon, Image, Segment} from 'semantic-ui-react'
import {apiAddress} from "../store/DataAccess";

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        if (sessionStorage.getItem("token") !== null) {
            window.location.href = "/"
        }
    }

    handleChange = (e, {value}) => {
        this.setState({[e.target.id]: value})
    };

    render() {
        return (
            <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Image src={require("../resources/logo.jpg")} size='small' centered/>
                    <Header as='h2' color='teal' textAlign='center' style={{marginTop: "0px"}}>
                        Create Company
                    </Header>
                    <Form size='large' onSubmit={() => this.sendEmail()}>
                        <Segment stacked>
                            <Form.Input
								id="company"
                                fluid
                                icon='warehouse'
                                iconPosition='left'
								placeholder='Company Name'
								onChange={this.handleChange}/>
                            <Form.Input
								id="email"
								fluid
								icon='user'
								iconPosition='left'
								placeholder='E-mail address'
								type='email'
								onChange={this.handleChange}
                            />

                            <Form.Button color='teal' fluid size='large' >Submit</Form.Button>
                        </Segment>
                    </Form>
                    <Button floated={"right"} className={"mt-2"} primary
                            onClick={() => document.location.href = "./login"}><Icon
                        name="arrow alternate circle left outline"/>login page</Button>
                </Grid.Column>
            </Grid>
        );
    }

    sendEmail = () => {
        fetch(`${apiAddress}/api/Registration/registrant`, {
        	method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.state)
		})
			.then(() => document.location.href = "/email-sent")
    }
}

export default (SignUp);