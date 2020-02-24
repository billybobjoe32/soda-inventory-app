import * as React from 'react';
import {Button, Grid, Header, Icon, Image} from 'semantic-ui-react'
import {apiAddress} from "../store/DataAccess";

class RegistrationError extends React.Component {

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
                        Oops looks like your registration email expired. Sign up to try again!
                    </Header>
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
			// .then(() => document.location.href = "/email-sent")
    }
}

export default (RegistrationError);