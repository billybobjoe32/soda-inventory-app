import * as React from 'react';
import {Button, Checkbox, Grid, Header, Icon, List, Segment} from 'semantic-ui-react'
import CreateItem from "../modals/CreateItemModal";
import { getCookie, apiAddress } from '../store/DataAccess';

class AddItem extends React.Component {

    constructor(props) {
		super(props);
		this.checkedItems = [];
        this.state = {
            showNewItemModal: false,
			items: [],
			quantities: []
        };
    }

	loadData = () => {
		var companyId = getCookie("companyId");
		var storeId = getCookie("storeId");
		fetch(apiAddress + '/api/Items?companyId=' + companyId)
			.then(results => { return results.json(); })
			.then(data => {
				let temp_items = [];
				let temp_quants = [];
				let temp_checkedItems = [];

				data.forEach((item) => {
					fetch(apiAddress + '/api/ItemQuantities?itemId=' + item.itemId)
						.then(results => { return results.json(); })
						.then(data => {
							data.forEach((quant) => {
								if (quant.storeId === parseInt(storeId)) {
									temp_quants[item.itemId] = quant;
									temp_checkedItems.push(item.itemId);
								}
							});

							temp_items.push(item);
							this.checkedItems = temp_checkedItems;
							this.setState({
								items: temp_items,
								quantities: temp_quants,
							});
						})
				});
			})
    }

	componentDidMount() {
		var companyId = getCookie("companyId");
		var storeId = getCookie("storeId");
		fetch(apiAddress + '/api/Items?companyId=' + companyId)
			.then(results => { return results.json(); })
			.then(data => {
				let temp_items = [];
				let temp_quants = [];
				let temp_checkedItems = [];

				data.forEach((item) => {
					fetch(apiAddress + '/api/ItemQuantities?itemId=' + item.itemId)
						.then(results => { return results.json(); })
						.then(data => {
							data.forEach((quant) => {
								if (quant.storeId === parseInt(storeId)) {
									temp_quants[item.itemId] = quant;
									temp_checkedItems.push(item.itemId);
								}
							});

							temp_items.push(item);
							this.setState({
								items: temp_items,
								quantities: temp_quants,
							});
							this.checkedItems = temp_checkedItems;
						})
				});
			})
    }

    closeModal = () => {
        this.loadData();
        this.setState({showNewItemModal: false});
    };

	createRows = (items, quantities) => {
		let rows = [];
		items.forEach((item) => {
			rows.push(<List.Item key={item.itemName}><Checkbox onClick={() => this.checkboxChanged(item.itemId)} key={item.itemId} label={item.itemName} defaultChecked={quantities[item.itemId] ? true : false} /></List.Item>)
		});

		return rows;
	};

    render() {

        return (
            <div>
                <CreateItem showModal={this.state.showNewItemModal} closeModal={this.closeModal} />
                <Header as='h2' attached='top'>Items</Header>
                <Grid className="m-2">
                    <Grid.Column>
                        <Header as='h3'>
                            <Icon name='boxes' circular/>
                            <Header.Content>Available Items</Header.Content>
                        </Header>
                        {/* <Header as='h5' textAlign='left'>Available Items</Header> */}
                        <Segment attached style={{overflow: 'auto', height: '40vh'}}>
                            <List style={{textAlign: 'left'}}>
								{this.createRows(this.state.items, this.state.quantities)}
                            </List>
						</Segment>
						<Button className='mt-3' color='teal' fluid size='large' onClick={() => this.redirectToInventoryFormAndUpdate()}>
							Update Inventory List
                        </Button>
                        <Button className='mt-3' color='teal' fluid size='large' onClick={() => this.setState({showNewItemModal: true})}>
                            Brand New Item
                        </Button>
                    </Grid.Column>
                </Grid>
            </div>
        );
	}

	checkboxChanged = (itemId) => {
		var found = false;
		let temp_checkedItems = [];
		for (var i = 0; i < this.checkedItems.length; i++) {
			if (this.checkedItems[i] == itemId) {
				found = true;
				continue;
			}
			else {
				temp_checkedItems.push(this.checkedItems[i]);
			}
		}
		if (!found) {
			temp_checkedItems.push(itemId);
		}
		this.checkedItems = temp_checkedItems;
	};

	async redirectToInventoryFormAndUpdate() {
		await this.checkedItems.forEach(async (itemId) => {
			if (!this.state.quantities[itemId]) {
				await fetch(apiAddress + '/api/ItemQuantities',
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							"itemQuantityId": 0,
							"itemId": itemId,
							"storeId": parseInt(getCookie("storeId")),
							"amount": 0,
							"moderateLevel": 100,
							"urgentLevel": 200
						})
					});
			}
		});
		this.props.history.push('/inventory-form');
	};
}

export default AddItem;