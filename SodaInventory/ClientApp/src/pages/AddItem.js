import * as React from 'react';
import { Button, Checkbox, Grid, Header, Icon, List, Segment } from 'semantic-ui-react'
import CreateItem from "../modals/CreateItemModal";
import { apiAddress, getCookie } from '../store/DataAccess';

class AddItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showNewItemModal: false,
			items: [],
			itemQuantities: []
		};
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
								itemQuantities: temp_quants,
							});
						})
				});
			})
	}

	createRows = (data) => {
		let rows = [];
		data.forEach((item) => {
			rows.push(<List.Item><Checkbox label={item.itemName} /></List.Item>)
		});

		return rows;
	};

	closeModal = () => {
		this.setState({ showNewItemModal: false });
	};

	render() {
		return (
			<div>
				<CreateItem showModal={this.state.showNewItemModal} closeModal={this.closeModal} />
				<Header as='h2' attached='top'>Items</Header>
				<Grid className="m-2">
					<Grid.Column>
						<Header as='h3'>
							<Icon name='boxes' circular />
							<Header.Content>Available Items</Header.Content>
						</Header>
						{/* <Header as='h5' textAlign='left'>Available Items</Header> */}
						<Segment attached style={{ overflow: 'auto', height: '40vh' }}>
							<List style={{ textAlign: 'left' }}>
								{this.createRows(this.state.items)}
							</List>
						</Segment>
						<Button className='mt-3' color='teal' fluid size='large' onClick={() => this.setState({ showNewItemModal: true })}>
							Brand New Item
                        </Button>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

export default AddItem;