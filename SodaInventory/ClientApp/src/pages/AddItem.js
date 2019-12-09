import * as React from 'react';
import {Button, Checkbox, Grid, Header, Icon, List, Segment} from 'semantic-ui-react'
import CreateItem from "../modals/CreateItemModal";
import { getCookie, apiAddress } from '../store/DataAccess';

class AddItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showNewItemModal: false,
            items: [],
        };
    }

    loadData = () => {
        fetch(apiAddress + '/api/Items?itemId=' + getCookie("itemId"))
            .then(results => { return results.json(); })
            .then(data => {
                this.setState({
                    items: data,
                });
            })
    }

    componentDidMount() {
        this.loadData();
    }

    closeModal = () => {
        this.loadData();
        this.setState({showNewItemModal: false});
    };

    createRows = (data) => {
        let rows = [];
        data.forEach((item) => {
            rows.push(<List.Item><Checkbox label={item}/></List.Item>)
        });

        return rows;
    };

    render() {
        const data = [
            'Dr. Pepper',
            'Gingerale',
            'Carbonated Water',
            'Orange Soda',
            'Plastic Cups',
            'Water Bottles',
            'Napkins',
            'Oranges',
            'Vanilla Syrup',
            'Chocolate Chip Cookies',
            'Plastic Straws',
            '7-up',
            'Dr. Pepper',
            'Gingerale',
            'Carbonated Water',
            'Orange Soda',
        ];

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
                                {this.state.items.map((item) =>
                                    <List.Item><Checkbox label={item.name}/></List.Item>
                                )}
                                {/* {this.createRows(data)} */}
                            </List>
                        </Segment>
                        <Button className='mt-3' color='teal' fluid size='large' onClick={() => this.setState({showNewItemModal: true})}>
                            Brand New Item
                        </Button>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }

}

export default AddItem;