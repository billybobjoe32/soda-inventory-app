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
            selectedItem: {}
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
                <TableRow key={element.itemId} onClick={() => this.setState({
                    showItemModal: true,
                    selectedItem: element
                })} >
                    <TableCell>{element.itemName}</TableCell>
                    <TableCell>{element.amount} ({element.uom})</TableCell>
                </TableRow>
            );
        });

        return cells;
    };

    getDate(good, moderate, urgent) {
        let items = [];
        items = items.concat(good, moderate, urgent);

        const months = { "01": "January", "02": "February", "03": "March", "04": "April", "05": "May", "06": "June", "07": "July", "08": "August", "09": "September", "10": "October", "11": "November", "12": "December" };
        let chosenDate = "";
        let dates = [];

        items.forEach(item => {
            dates.push(new Date(item.lastUpdated.substring(0, 10)).toJSON().slice(0, 10));
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
        let tableHeader =
            <TableHeader>
                <TableRow>
                    <TableHeaderCell width={10}>Item</TableHeaderCell>
                    <TableHeaderCell width={1}>Qty</TableHeaderCell>
                </TableRow>
            </TableHeader>;

        const panes = [
            {
                menuItem: {key: 'urgent', icon: 'warning circle', content: 'Urgent'},
                render: () =>
                    <Table celled selectable striped>
                        {tableHeader}
                        <TableBody>
                            {this.createRows(this.state.urgent)}
                        </TableBody>
                    </Table>

            },
            {
                menuItem: {key: 'moderate', icon: 'warning sign', content: 'Moderate'},
                render: () =>
                    <Table celled striped>
                        {tableHeader}
                        <TableBody>
                            {this.createRows(this.state.moderate)}
                        </TableBody>
                    </Table>
            },
            {
                menuItem: {key: 'good', icon: 'checkmark', content: 'Good'},
                render: () =>
                    <Table celled striped>
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
                <ItemModal item={this.state.selectedItem} showModal={this.state.showItemModal} closeModal={this.closeModal} />
                <Header as='h2' attached='top'>Dashboard</Header>
                <Segment attached>
                    <Header as='h3'>
                        <Icon name='clipboard list' circular/>
                        <Header.Content>Inventory Quantities
                            <Header.Subheader style={{ color: 'red' }}>Inventory levels as of {this.getDate(this.state.good, this.state.moderate, this.state.urgent)}</Header.Subheader>
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