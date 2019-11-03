import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, Segment, Checkbox, List, Image, Icon } from 'semantic-ui-react'

class AddItem extends React.Component {

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
                        Create Item
                    </Header>
                    <Header as='h5' textAlign='left' >Existing Items</Header>
                    <Segment style={{overflow: 'auto', height: '40vh' }} > 
                        <List style={{textAlign: 'left'}}>
                            <List.Item><Checkbox label='Dr. Pepper' /></List.Item>
                            <List.Item><Checkbox label='Gingerale' /></List.Item>
                            <List.Item><Checkbox label='Carbonated Water' /></List.Item>
                            <List.Item><Checkbox label='Orange Soda' /></List.Item>
                            <List.Item><Checkbox label='Plastic Cups' /></List.Item>
                            <List.Item><Checkbox label='Water Bottles' /></List.Item>
                            <List.Item><Checkbox label='Napkins' /></List.Item>
                            <List.Item><Checkbox label='Oranges' /></List.Item>
                            <List.Item><Checkbox label='Vanilla Syrup' /></List.Item>
                            <List.Item><Checkbox label='Chocolate Chip Cookies' /></List.Item>
                            <List.Item><Checkbox label='Plastic Straws' /></List.Item>
                            <List.Item><Checkbox label='7-up' /></List.Item>
                            <List.Item><Checkbox label='Dr. Pepper' /></List.Item>
                            <List.Item><Checkbox label='Gingerale' /></List.Item>
                            <List.Item><Checkbox label='Carbonated Water' /></List.Item>
                            <List.Item><Checkbox label='Orange Soda' /></List.Item>
                        </List>
                    </Segment>
                    <Button color='teal' fluid size='large'>
                        Brand New Item
                    </Button>
                </Grid.Column>
            </Grid>
        );
    }

}

export default connect()(AddItem);