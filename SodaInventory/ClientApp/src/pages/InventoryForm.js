import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as InventoryStore from '../store/Inventory';
import {Button, Form, Grid, Header, Icon, Segment} from 'semantic-ui-react';

class InventoryForm extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let itemArr = [-1, -1, -1, -1, -1, -1, -1, -1];

        return (
            <div>
                <Header as='h2' attached='top'>Inventory</Header>
                <Segment attached>
                    <Header as='h3'>
                        <Icon name='clipboard check' circular/>
                        <Header.Content>Take Inventory
                            <Header.Subheader style={{color: 'red'}}>Inventory levels as of November 1st,
                                2019</Header.Subheader>
                        </Header.Content>
                    </Header>
                    <div className="ui section divider"/>
                    <Grid textAlign='center' verticalAlign='middle' >
                        <Grid.Column style={{ width: '70%', maxWidth: 650 }}>
                            <Form>
                                {this.props.items.map((item) =>
                                    <div className='p-3'>
                                        <Grid.Row style={{marginBottom: 20}}>
                                            <Grid.Column style={{ width: '50%'}}>
                                                <h3 style={{textAlign: "center"}}>{item.name}</h3>
                                            </Grid.Column>
                                            <Grid.Column style={{ width: '50%' }}>
                                                <h4 style={{ textAlign: "center" }}>Current Value: {item.quantity}</h4>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Form.Input style={{maxWidth: 300}}
                                                    onChange={(e) => itemArr[item.id] = parseInt(e.target.value)} />
                                        <div className="ui section divider" />
                                    </div>
                                )}

                                <Button primary onClick={() => this.props.updateInventory(itemArr)}>Submit</Button>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </div>
        );
    }
}

export default connect(
    (state) => state.items,
    InventoryStore.actionCreator
)(InventoryForm);