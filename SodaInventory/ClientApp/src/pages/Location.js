import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {apiAddress, getCookie, setCookie} from '../store/DataAccess';
import {Link} from 'react-router-dom';
import * as LocationStore from '../store/Location';
import {Button, Card, Container, Header, Icon, Segment} from 'semantic-ui-react';
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
            <div>
                <AddLocation showModal={this.state.showAddLocationModal} closeModal={this.closeModal}/>
                <Container>
                    <Header as='h2' attached='top'>
                        Select Store
                        <Button floated='right' primary onClick={() => this.setState({showAddLocationModal: true})}>Add Store</Button>
                    </Header>
                    <Segment attached>
                        <Header as='h3' className='mb-4'>
                            <Icon name='building' circular/>
                            <Header.Content>Add a store</Header.Content>
                        </Header>

                    {this.state.stores.map((location) =>
                        <Link onClick={() => setCookie("storeId", location.storeId.toString())} to='/'>
                            <h3 key={location.storeId} style={{ color: 'black' }}>{location.storeName}</h3>
                            <div className="ui section divider"/>
                        </Link>
                    )}
                        <Container>
                            <Card fluid onClick={() => console.log("Click on item")}>
                                <Card.Content>
                                    <Icon name="edit" style={{float:'right'}} size={"big"} className="mt-1"/>
                                    <Card.Header>Store 1</Card.Header>
                                    <Card.Meta>1234 E. 567 S. Provo UT</Card.Meta>
                                </Card.Content>
                            </Card>

                        {this.props.locations.map((location) =>
                            <Link to='/'>
                                <h3 key={location.id}>{location.name}</h3>
                                <div className="ui section divider"/>
                            </Link>
                        )}

                        </Container>
                    </Segment>
                </Container>
            </div>
        );
    }
};

export default connect(
    (state) => state.locations,
    LocationStore.actionCreator
)(Location);