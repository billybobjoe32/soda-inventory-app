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
import ItemModal from "../modals/ItemModal";
import {apiAddress, getCookie} from "../store/DataAccess";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            colors: ['red', 'yellow', 'green'],
            currentIndexColor: 'red',
            showItemModal: false,
            urgent: [],
            moderate: [],
            good: [],
        }
    }

    componentDidMount() {
        if (window.location.pathname + window.location.search !== '/') {
            window.location.href = '/'
        }

        this.loadData()
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
                <TableRow key={element.itemId} onClick={() => this.setState({showItemModal: true})}>
                    <TableCell>{element.itemName}</TableCell>
                    <TableCell>{element.amount}</TableCell>
                    <TableCell>{element.uom}</TableCell>
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
                    <TableHeaderCell>Uom</TableHeaderCell>
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

    loadData = () => {
        fetch(`${apiAddress}/api/Inventory/?storeId=${getCookie("storeId")}`)
            .then(response => response.json())
            .then(data => {
                let urgent = [];
                let moderate = [];
                let good = [];

                data.forEach(item => {
                    if (item.amount <= item.moderateLevel && item.amount > item.urgentLevel) {
                        moderate.push(item)
                    } else if (item.amount <= item.urgentLevel) {
                        urgent.push(item)
                    } else {
                        good.push(item)
                    }
                });

                this.setState({
                    urgent,
                    moderate,
                    good
                });
            })
    }
}

export default connect()(Dashboard);