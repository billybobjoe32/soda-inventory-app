import * as React from 'react';
import {Component} from 'react';
import {apiAddress, getCookie, setCookie} from '../store/DataAccess';
import {Button, Card, Container, Header, Icon, Segment} from 'semantic-ui-react';
import AddLocation from "../modals/AddLocationModal";

class Location extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddLocationModal: false,
        }
    }

    componentDidMount() {
        this.loadData();
    }

    closeModal = () => {
        this.loadData();
        this.setState({ showAddLocationModal: false});
    };

    showModal = (editStoreId) => {
        this.setState({
            editStoreId: editStoreId,
            showAddLocationModal: true
        })
    };

    render() {
        return (
            <div>
                <AddLocation showModal={this.state.showAddLocationModal} editStoreId={this.state.editStoreId} closeModal={this.closeModal} clearRequest={this.clearRequest}/>
                <Container>
                    <Header as='h2' attached='top'>
                        Select Store
                        <Button floated='right' primary onClick={() => this.setState({showAddLocationModal: true})}>Add Store</Button>
                    </Header>
                    <Segment attached>
                        <Header as='h3' className='mb-4'>
                            <Icon name='building' circular/>
                            <Header.Content>Store selection</Header.Content>
                        </Header>
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

export default (Location);