import * as React from 'react';
import {connect} from 'react-redux';
import {
    GridRow,
    Header,
    Icon,
    Segment,
    Tab,
    Table,
    TableBody, TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow
} from "semantic-ui-react";
import {Component} from "react";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            colors: ['red', 'yellow', 'green'],
            currentIndexColor: 'red',
            urgent: [{item: "napkins", qty: 5},{item: "cups", qty: 10},{item: "spoons", qty: 50}],
            moderate: [{item: "paper", qty: 5},{item: "containers", qty: 10}],
            good: [{item: "drinks", qty: 1000}],
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

    createRows = (data) => {
        let cells = [];
        data.forEach((element) => {
            cells.push(
                <TableRow>
                    <TableCell>{element.item}</TableCell>
                    <TableCell>{element.qty}</TableCell>
                </TableRow>
            );
        });

        return cells;
    };


    render() {
        let tableHeader = <TableHeader>
            <TableRow>
                <TableHeaderCell>Item</TableHeaderCell>
                <TableHeaderCell>Qty</TableHeaderCell>
            </TableRow>
        </TableHeader>;

        const panes = [
            {
                menuItem: {key: 'urgent', icon: 'warning circle', content: 'Urgent'},
                render: () =>
                    <Table celled>
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