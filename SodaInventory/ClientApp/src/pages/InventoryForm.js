import React, {Component} from 'react';
import {connect} from 'react-redux';
import {apiAddress, getCookie} from '../store/DataAccess';
import * as InventoryStore from '../store/Inventory';
import {Button, Form, Grid, Header, Icon, Segment} from 'semantic-ui-react';

class InventoryForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			items: [],
            inputs: [],
            isValid: true
		}
	}

	componentDidMount() {
        this.getInventory();
    }

    getInventory = () => {
        let temp_items = [];

        fetch(apiAddress + '/api/Inventory?storeId=' + getCookie("storeId"))
            .then(results => { return results.json(); })
            .then(data => {
                this.setState({
                    items: data
                })
            })
    }

    
    clear = () => {
        this.setState({
            items: [],
            inputs: []
        });
    }

    updateInventory = () => {
        this.state.items.forEach((item) => {
            fetch(apiAddress + '/api/ItemQuantities/' + item.itemQuantityId,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "itemQuantityId": item.itemQuantityId,
                        "itemId": item.itemId,
                        "storeId": item.storeId,
                        "amount": this.state.inputs[item.itemId],
                        "moderateLevel": item.moderateLevel,
                        "urgentLevel": item.urgentLevel,
                        "lastUpdated": item.lastUpdated
					})
                })
        });
    };

    populateFields(items) {
        let list = [];
        this.getInventory();
        items.forEach((item) => {
            list.push(
                <div key={item.itemId} className='p-3'>
                    <Grid.Row style={{ marginBottom: 20 }}>
                        <Grid.Column style={{ width: '50%' }}>
                            <Grid.Row>
                                <h3 style={{ textAlign: "left", paddingLeft: 44 }}>{item.itemName}</h3>
                            </Grid.Row>
                            <Grid.Row>
                                <h6 style={{ textAlign: "left", paddingLeft: 44 }}>Current: {item.amount} {item.uom}</h6>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column style={{ width: '50%', textAlign: 'left', paddingLeft: 20 }}>
                            <Grid.Row>
                                <Form.Input style={{ maxWidth: 65 }}
                                    onChange={(e) => {
                                        let temp_inputs = this.state.inputs;
                                        temp_inputs[item.itemId] = e.target.value;
                                        this.setState({
                                            inputs: temp_inputs
                                        });
                                    }} />
                                <h4 style={{ paddingLeft: 10, paddingTop: 5 }}>{item.uom}</h4>
                            </Grid.Row>
                        </Grid.Column>
                    </Grid.Row>
                    <div className="ui section divider" />
                </div>
            );
        });

        return list;
    }


    getDate(items) {
        const months = { "01": "January", "02": "February", "03": "March", "04": "April", "05": "May", "06": "June", "07": "July", "08": "August", "09": "September", "10": "October", "11": "November", "12": "December" };
        let chosenDate = "";
        let dates = [];

        items.forEach(item => {
            if (item.lastUpdated) {
                dates.push(new Date(item.lastUpdated.substring(0, 10)).toJSON().slice(0, 10));
            }
        });

        let earliest = dates[0];
        for (let date of dates) {
            if (date < earliest) {
                earliest = date;
            }
        }

        chosenDate = earliest;
        if (chosenDate !== undefined) {
            let month = months[chosenDate.substring(5, 7)];
            let day = parseInt(chosenDate.substring(8, 10));
            let year = chosenDate.substring(0, 4);

            return `${month} ${day}, ${year}`;
        }
        else {
            return "";
        }
    }

    render() {
		return (
			<div>
				<Header as='h2' attached='top'>Inventory</Header>
				<Segment attached>
					<Header as='h3'>
						<Icon name='clipboard check' circular />
						<Header.Content>Take Inventory
                            <Header.Subheader style={{ color: 'red' }}>Inventory levels as of {this.getDate(this.state.items)}</Header.Subheader>
						</Header.Content>
					</Header>
					<div className="ui section divider" />
					<Grid textAlign='center' verticalAlign='middle' >
						<Grid.Column style={{ width: '100%', maxWidth: 650 }}>
							<Form>
                                {this.populateFields(this.state.items)}

                                <Grid.Row>
                                    <Grid.Column style={{ width: '50%' }}>
                                        <Button primary circular icon="add" onClick={() => { this.clear(); this.redirectToAddItem(); }}
                                            style={{ float: 'left', marginLeft: 50 }}></Button>
                                    </Grid.Column>
                                    <Grid.Column style={{ width: '50%' }}>
                                        <Button primary onClick={() => { this.updateInventory(); this.clear(); this.getInventory(); }}
                                            style={{ float: 'left', marginLeft: 5}}>Save</Button>
                                    </Grid.Column>
                                </Grid.Row>
							</Form>
						</Grid.Column>
					</Grid>
				</Segment>
			</div>
		);
	}

	redirectToAddItem() {
		this.props.history.push('/additem');
	}
}

export default connect(
	(state) => state.items,
	InventoryStore.actionCreator
)(InventoryForm);