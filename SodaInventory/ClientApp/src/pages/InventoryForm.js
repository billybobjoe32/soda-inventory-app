import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiAddress, getCookie } from '../store/DataAccess';
import * as InventoryStore from '../store/Inventory';
import { Button, Form, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom'

class InventoryForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			items: [],
			quantities: [],
			isValid: true
		}
	}

	componentDidMount() {
		fetch(apiAddress + '/api/Items?companyId=' + getCookie("companyId"))
			.then(results => { return results.json(); })
			.then(data => {
				let temp_items = [];
				let temp_quants = [];

				data.forEach((item) => {
					fetch(apiAddress + '/api/ItemQuantities?itemId=' + item.itemId)
						.then(results => { return results.json(); })
						.then(data => {
							data.forEach((quant) => {
								if (quant.storeId === parseInt(getCookie("storeId"))) {
									temp_items.push(item);
									temp_quants[item.itemId] = quant;
								}
							});

							this.setState({
								items: temp_items,
								quantities: temp_quants,
							});
						})
				});
			})
	}

	updateInventory = (quantities) => {
		this.state.quantities.forEach(quant => {
			console.log(quant.itemId);
			fetch(apiAddress + '/api/ItemQuantities/' + quant.itemQuantityId,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						"itemQuantityId": quant.itemQuantityId,
						"itemId": quant.itemId,
						"storeId": quant.storeId,
						"amount": parseInt(quantities[quant.itemId])
					})
				})
		});
	};

	render() {
		let quantities = [];

		return (
			<div>
				<Header as='h2' attached='top'>Inventory</Header>
				<Segment attached>
					<Header as='h3'>
						<Icon name='clipboard check' circular />
						<Header.Content>Take Inventory
                            <Header.Subheader style={{ color: 'red' }}>Inventory levels as of November 1st,
                                2019</Header.Subheader>
						</Header.Content>
					</Header>
					<div className="ui section divider" />
					<Grid textAlign='center' verticalAlign='middle' >
						<Grid.Column style={{ width: '100%', maxWidth: 650 }}>
							<Form>
								{this.state.items.map((item) =>
									<div className='p-3'>
										<Grid.Row style={{ marginBottom: 20 }}>
											<Grid.Column style={{ width: '50%' }}>
												<Grid.Row>
													<h3 style={{ textAlign: "left", paddingLeft: 20 }}>{item.itemName}</h3>
												</Grid.Row>
												<Grid.Row>
													<h6 style={{ textAlign: "left", paddingLeft: 20 }}>Current: {this.state.quantities[item.itemId].amount} {item.units}</h6>
												</Grid.Row>
											</Grid.Column>
											<Grid.Column style={{ width: '50%', textAlign: 'left' }}>
												<Grid.Row>
													<Form.Input style={{ maxWidth: 100 }}
														onChange={(e) => quantities[item.itemId] = e.target.value} />
													<h4 style={{ paddingLeft: 10, paddingTop: 5 }}>{item.units}</h4>
												</Grid.Row>
											</Grid.Column>
										</Grid.Row>
										<div className="ui section divider" />
									</div>
								)}

								<Button primary circular icon="add" onClick={() => this.redirectToAddItem()}></Button><br /><br />
								<Button primary onClick={() => this.updateInventory(quantities)}>Submit</Button>
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