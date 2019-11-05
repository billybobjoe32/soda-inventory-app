import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, Image, Icon, Input, Form } from 'semantic-ui-react';

class CreateItem extends React.Component {

    render() {
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ width: '70%', maxWidth: 450 }}>
                    <Image src={require("../resources/logo.jpg")} size='small' centered/>
                    <Grid.Row textAlign='left'>
                        <Button size='mini'>
                            <Icon name='angle left' />
                            Back
                        </Button>
                    </Grid.Row>

                    <Header as='h2' color='teal' textAlign='center' style={{marginTop: '0px'}}>
                        Create New Item
                    </Header>

                    <Form size='large' style={{textAlign: 'left'}}>
                        <Form.Input fluid label='Name'/>
                        <Form.Input fluid label='Measured In' placeholder='i.e. liters, etc.'/>
                        <Form.Input fluid label='Moderate Threshold'/>
                        <Form.Input fluid label='Urgent Threshold'/>
                    </Form>

                    <Button color='teal' fluid size='large' style={{marginTop: '15px'}}>
                        Submit
                    </Button>
                    
                </Grid.Column>
            </Grid>
        )
    }
}

export default connect()(CreateItem);