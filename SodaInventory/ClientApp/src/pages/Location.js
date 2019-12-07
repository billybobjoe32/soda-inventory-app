import * as React from 'react';
import {Component} from 'react';
import { connect } from 'react-redux';
import { getCookie, setCookie, apiAddress } from '../store/DataAccess';
import {Link} from 'react-router-dom';
import * as LocationStore from '../store/Location';
import {Button, Header, Icon, Segment} from 'semantic-ui-react';
import AddLocation from "../modals/AddLocationModal";

class Location extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddLocationModal: false,
            stores: [],
        }
    }

    loadData = () => {
        fetch(apiAddress + '/api/Stores?companyId=' + getCookie("companyId"))
            .then(results => { return results.json(); })
            .then(data => {
                this.setState({
                    stores: data,
                });
            })
    };

    componentDidMount() {
        this.loadData();
    }

    closeModal = () => {
        this.loadData();
        this.setState({ showAddLocationModal: false});
    };

    render() {
        return (
            <div style={{ textAlign: 'center'}} >
                <AddLocation showModal={this.state.showAddLocationModal} closeModal={this.closeModal}/>
                <Header as='h2' attached='top'>Locations</Header>
                <Segment attached>
                    <Header as='h3'>
                        <Icon name='building' circular/>
                        <Header.Content>Add a location</Header.Content>
                    </Header>

                    {this.state.stores.map((location) =>
                        <Link onClick={() => setCookie("storeId", location.storeId.toString())} to='/'>
                            <h3 key={location.storeId} style={{ color: 'black' }}>{location.storeName}</h3>
                            <div className="ui section divider"/>
                        </Link>
                    )}

                    <Button primary circular icon="big add" onClick={() => this.setState({ showAddLocationModal: true })}></Button>
                </Segment>

            </div>
        );
    }
};

export default connect(
    (state) => state.locations,
    LocationStore.actionCreator
)(Location);