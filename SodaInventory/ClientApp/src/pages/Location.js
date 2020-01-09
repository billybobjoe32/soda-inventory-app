import * as React from 'react';
import {Component} from 'react';
import * as DataAccess from '../store/DataAccess';
import {Button, Card, Container, Header, Icon, Modal, ModalActions, Segment} from 'semantic-ui-react';
import AddLocation from "../modals/AddLocationModal";

class Location extends Component {

    constructor(props) {
        super(props);
        this.state = {
            storeList: [],
            selectedStoreId: DataAccess.getCookie("storeId"),
            editStoreId: null,
            showAddLocationModal: false,
        }
    }

    componentDidMount() {
        if (!DataAccess.getCookie("companyId")) {
            window.location.href = '/'
        }

        this.loadData();
    }

    closeModal = () => {
        this.loadData();
        this.setState({showAddLocationModal: false});
    };

    showModal = (editStoreId) => {
        this.setState({
            editStoreId: editStoreId,
            showAddLocationModal: true
        })
    };

    setStoreId = (event, selectedStoreId) => {
        if (event.target.classList.contains("edit")) {
            return;
        }

        DataAccess.setCookie("storeId", selectedStoreId);
        this.setState({selectedStoreId});
        document.location.href = "/";
    };

    getList = (data) => {
        let list = [];
        data.forEach((item) => {
            list.push(
                <Card key={item.storeId} fluid color={this.state.selectedStoreId == item.storeId ? 'green' : 'black'}
                      onClick={(e) => this.setStoreId(e, item.storeId)}>
                    <Card.Content>
                        <Button primary style={{float: 'right'}} icon='edit' className='mt-1'
                                onClick={() => this.showModal(item.storeId)}/>
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
                <AddLocation showModal={this.state.showAddLocationModal} editStoreId={this.state.editStoreId}
                             closeModal={this.closeModal} clearRequest={this.clearRequest}/>
                <Modal open={true} size={"small"}>
                    <Modal.Content scrolling>
                        <Header as='h2'>
                            Select Store
                            <Button floated='right' primary
                                    onClick={() => this.setState({showAddLocationModal: true})}>
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
                    </Modal.Content>
                    <ModalActions>
                        <Button onClick={this.logout}>Logout</Button>
                    </ModalActions>
                </Modal>
            </div>
        );
    }

    logout = () => {
        DataAccess.clearCookies();
        sessionStorage.clear();
        document.location.href="/login"
    };

    loadData = () => {
        fetch(`${DataAccess.apiAddress}/api/Stores?companyId=${DataAccess.getCookie("companyId")}`)
            .then(response => response.json())
            .then(storeList => this.setState({storeList: storeList}));
    };
}

export default (Location);