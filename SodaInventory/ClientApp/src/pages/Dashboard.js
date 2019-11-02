import * as React from 'react';
import {connect} from 'react-redux';
import {GridRow, Header, Icon, Segment, Tab} from "semantic-ui-react";
import {Component} from "react";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            colors: ['red', 'yellow', 'green'],
            currentIndexColor: 'red',
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

    render() {
        const panes = [
            {
                menuItem: {key: 'urgent', icon: 'warning circle', content: 'Urgent'},
                render: () => <Header as='h3'>Tab 1 Content</Header>
            },
            {
                menuItem: {key: 'moderate', icon: 'warning sign', content: 'Moderate'},
                render: () => <Header as='h3'>Tab 2 Content</Header>
            },
            {
                menuItem: {key: 'good', icon: 'checkmark', content: 'Good'},
                render: () => <Header as='h3'>Tab 3 Content</Header>
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
                            <Header.Subheader style={{color: 'red'}}>Inventory levels as of November 1st, 2019</Header.Subheader>
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