import * as React from 'react';
import {Button, Form, Grid, Header, Icon, Image, Segment} from 'semantic-ui-react'
import {apiAddress} from "../store/DataAccess";

class SetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            validToken: false
        }
    }

    componentDidMount() {
        this.validateToken();

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
                        Create Password
                    </Header>
                    <Form size='large' onSubmit={() => this.createUser()} loading={!this.state.validToken}>
                        <Segment stacked>
                            <Form.Input
								id="password"
                                fluid
                                icon='lock'
                                iconPosition='left'
								placeholder='Password'
                                type='password'
								onChange={this.handleChange}/>
                            <Form.Input
								id="passwordConfirm"
								fluid
								icon='lock'
								iconPosition='left'
								placeholder='Re-enter Password'
								type='password'
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

    createUser = () => {
        fetch(`${apiAddress}/api/Registration/registrant`, {
        	method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.state)
		})
			// .then(() => document.location.href = "/email-sent")
    }

    validateToken = () => {
        fetch(`${apiAddress}/api/Registration/validate/${document.location.href.substring(document.location.href.lastIndexOf('/') + 1)}`)
            .then(response => response.json())
            .then(validToken => {
                if (!validToken) {
                    document.location.href="./registration-error"
                } else {
                    this.setState({validToken: true})
                }
            });
    }
}

export default (SetPassword);