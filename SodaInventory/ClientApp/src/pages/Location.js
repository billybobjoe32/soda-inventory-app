import * as React from 'react';
import {Component} from 'react';
import {apiAddress, getCookie, setCookie} from '../store/DataAccess';
import {Button, Card, Container, Header, Icon, Segment} from 'semantic-ui-react';
import AddLocation from "../modals/AddLocationModal";

class Location extends Component {

    constructor(props) {
        super(props);
        this.state = {
            storeList: [],
            selectedStoreId: getCookie("storeId"),
            editStoreId: null,
            showAddLocationModal: false,
        }
    }

    componentDidMount() {
        if (!getCookie("companyId")) {
            window.location.href = '/'
        }

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

    setStoreId = (selectedStoreId) => {
        setCookie("storeId", selectedStoreId);
        this.setState({selectedStoreId})
        document.location.href="/";
    };

    getList = (data) => {
        let list = [];
        data.forEach((item) => {
            list.push(
                <Card key={item.storeId} fluid color={this.state.selectedStoreId == item.storeId ? 'green' : 'black'} onClick={() => this.setStoreId(item.storeId)}>
                    <Card.Content>
                        <Button primary style={{float: 'right'}}  icon='edit' className='mt-1' onClick={() => this.showModal(item.storeId)}/>
                        <Card.Header>{item.storeName}</Card.Header>
                        <Card.Meta>{item.streetAddress} {item.city}, {item.state} {item.zipCode}</Card.Meta>
                    </Card.Content>
                </Card>
            );
        });

        return list;
    };

    clearRequest = () => {
        this.setState({editStoreId: null})
    };

    render() {
        return (
            <div>
                <AddLocation showModal={this.state.showAddLocationModal} editStoreId={this.state.editStoreId} closeModal={this.closeModal} clearRequest={this.clearRequest}/>
                <Container>
                    <Header as='h2' attached='top'>
                        Select Store
                        <Button floated='right' primary onClick={() => this.setState({showAddLocationModal: true})}>
                            Add Store
                        </Button>
                    </Header>
                    <Segment attached>
                        <Header as='h3' className='mb-4'>
                            <Icon name='building' circular/>
                            <Header.Content>Store selection</Header.Content>
                        </Header>
                        <Container>
                            {this.getList(this.state.storeList)}
                        </Container>
                    </Segment>
                </Container>
            </div>
        );
    }

    loadData = () => {
        fetch(`${apiAddress}/api/Stores?companyId=${getCookie("companyId")}`)
            .then(response => response.json())
            .then(storeList => this.setState({storeList: storeList}));
    }
}

export default (Location);