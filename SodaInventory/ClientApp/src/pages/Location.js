import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as LocationStore from '../store/Location';
import {Button, Header, Icon, Segment} from 'semantic-ui-react';
import AddLocation from "../modals/AddLocationModal";

class Counter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddLocationModal: false,
        }
    }

    closeModal = () => {
      this.setState({showAddLocationModal: false})
    };

    render() {
        return (
            <div>
                <AddLocation showModal={this.state.showAddLocationModal} closeModal={this.closeModal}/>
                <Header as='h2' attached='top'>Locations</Header>
                <Segment attached>
                    <Header as='h3'>
                        <Icon name='building' circular/>
                        <Header.Content>Add a location</Header.Content>
                    </Header>

                    {this.props.locations.map((location) =>
                        <Link to='/'>
                            <h3 key={location.id}>{location.name}</h3>
                            <div className="ui section divider"/>
                        </Link>
                    )}

                    <Button primary onClick={() => this.setState({showAddLocationModal: true})}>Add Store</Button>
                </Segment>

            </div>
        );
    }
};

export default connect(
    (state) => state.locations,
    LocationStore.actionCreator
)(Counter);