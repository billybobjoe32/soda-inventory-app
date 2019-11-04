import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {
    Header,
    Icon,
    Segment,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow
} from "semantic-ui-react";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import ItemModal from "./ItemModal";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            colors: ['red', 'yellow', 'green'],
            currentIndexColor: 'red',
            showItemModal: false,
            urgent: [{id: 1, item: "napkins", qty: 5}, {id: 2, item: "cups", qty: 10}, {id: 3, item: "spoons", qty: 50}],
            moderate: [{id: 4, item: "paper", qty: 5}, {id: 5, item: "containers", qty: 10}],
            good: [{id: 6, item: "drinks", qty: 1000}],
        }
    }

    componentDidMount() {
        if (window.location.pathname + window.location.search !== '/') {
            window.location.href = '/'
        }
    }

    handleTabChange = (e, data) => {
        this.setState({currentIndexColor: this.state.colors[data.activeIndex]});
    };

    closeModal = () => {
        this.setState({showItemModal: false});
    };

    createRows = (data) => {
        let cells = [];
        data.forEach((element) => {
            cells.push(
                <TableRow key={element.id} onClick={() => this.setState({showItemModal: true})}>
                    <TableCell>{element.item}</TableCell>
                    <TableCell>{element.qty}</TableCell>
                </TableRow>
            );
        });

        return cells;
    };


    render() {
        let tableHeader =
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>Item</TableHeaderCell>
                    <TableHeaderCell>Qty</TableHeaderCell>
                </TableRow>
            </TableHeader>;

        const panes = [
            {
                menuItem: {key: 'urgent', icon: 'warning circle', content: 'Urgent'},
                render: () =>
                    <Table celled selectable>
                        {tableHeader}
                        <TableBody>
                            {this.createRows(this.state.urgent)}
                        </TableBody>
                    </Table>

            },
            {
                menuItem: {key: 'moderate', icon: 'warning sign', content: 'Moderate'},
                render: () =>
                    <Table celled>
                        {tableHeader}
                        <TableBody>
                            {this.createRows(this.state.moderate)}
                        </TableBody>
                    </Table>
            },
            {
                menuItem: {key: 'good', icon: 'checkmark', content: 'Good'},
                render: () =>
                    <Table celled>
                        {tableHeader}
                        <TableBody>
                            {this.createRows(this.state.good)}
                        </TableBody>
                    </Table>
            }
        ];

        const color = this.state.currentIndexColor;
        return (
            <div>
                <ItemModal showModal={this.state.showItemModal} closeModal={this.closeModal} />
                <Header as='h2' attached='top'>Dashboard</Header>
                <Segment attached>
                    <Header as='h3'>
                        <Icon name='clipboard list' circular/>
                        <Header.Content>Inventory Quantities
                            <Header.Subheader style={{color: 'red'}}>Inventory levels as of November 1st,
                                2019</Header.Subheader>
                        </Header.Content>
                    </Header>
                    <Grid columns={1}>
                        <Grid.Column width={16}>
                            <Tab menu={{color, fluid: true, widths: 3}} panes={panes}
                                 onTabChange={this.handleTabChange}/>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </div>
        );
    }
}

export default connect()(Dashboard);