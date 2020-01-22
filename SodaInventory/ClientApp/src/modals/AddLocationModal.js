import React, {Component} from 'react';
import {apiAddress, getCookie} from '../store/DataAccess';
import {Button, Form, Header, Icon, Modal, ModalActions, ModalContent, Segment} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class AddLocationModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            storeId: '',
            name: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            isValid: true,
            showDelete: false,
        }
    }

    validate = () => {
        if (this.state.name != '' && this.state.street != '' && this.state.city != '' &&
            this.state.state != '' && this.state.zip != '' && !isNaN(this.state.zip)) {
            this.setState({
                isValid: true
            });
            return true;
        }
        else {
            this.setState({
                isValid: false
            });
            return false;
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.editStoreId) {
            this.loadData();
        }
    }

    clearModal = () => {
        this.setState({
            storeId: '',
            name: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            isValid: true,
            showDelete: false,
        })
    };

    render() {
        const {name, street, city, state, zip} = this.state;

        return (
            <div>
                <Modal open={this.props.showModal} onClose={() => { this.clearModal(); this.props.closeModal(); }} closeIcon size='small'>
                    <ModalContent scrolling>
                        <Header as='h2'>
                            <Icon name='building outline' circular/>
                            <Header.Content>Add Store</Header.Content>
                        </Header>
                        <Segment attached>
                            <Form className={this.state.isValid ? '' : 'error'}>
                                <Form.Field>
                                    <label htmlFor='store-name' style={{textAlign: 'left'}}>Store Name:</label>
                                    <input id='store-name' value={name}
                                           onChange={(e) => this.setState({name: e.target.value})}/>
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor='street' style={{textAlign: 'left'}}>Street:</label>
                                    <input id='street' value={street}
                                           onChange={(e) => this.setState({street: e.target.value})}/>
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor='city' style={{textAlign: 'left'}}>City:</label>
                                    <input id='city' value={city}
                                           onChange={(e) => this.setState({city: e.target.value})}/>
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor='state' style={{textAlign: 'left'}}>State:</label>
                                    <input id='state' value={state}
                                           onChange={(e) => this.setState({state: e.target.value})}/>
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor='zip' style={{textAlign: 'left'}}>ZIP:</label>
                                    <input id='zip' value={zip}
                                           onChange={(e) => this.setState({zip: e.target.value})}/>
                                </Form.Field>
                                <div className="ui error message">
                                    <div className="header">Mistake in Form</div>
                                    <p>Make sure every field is filled before submitting this form.</p>
                                </div>
                            </Form>
                        </Segment>
                    </ModalContent>
                    <ModalActions>
                        {this.state.showDelete && <Button primary style={{ backgroundColor: 'red', float: 'left' }} onClick={() => {
                            this.deleteLocation();
                        }}>Delete</Button>}
                        <Button primary onClick={() => {
                            if (this.validate())
                                this.addLocation();
                        }}> Add Location</Button>
                    </ModalActions>
                </Modal>
            </div>
        );
    }

    addLocation = () => {
        let saveMethod = this.state.storeId !== '' ? 'PUT' : 'POST';
        let request = {
            storeId: 0,
            companyId: parseInt(getCookie("companyId")),
            storeName: this.state.name,
            streetAddress: this.state.street,
            city: this.state.city,
            state: this.state.state,
            zipCode: parseInt(this.state.zip),
            itemAlerts: [],
            itemQuantities: []
        };

        if (this.state.storeId !== '') {
            request = {...request, storeId: this.state.storeId}
        }

        fetch(`${apiAddress}/api/Stores/${this.state.storeId}`,
            {
                method: saveMethod,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request)
            }).then(this.clearModal()).then(() => this.props.closeModal())
    };

    deleteLocation = () => {
        fetch(`${apiAddress}/api/Stores/${this.state.storeId}`,
            {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "storeId": 0,
                    "companyId": parseInt(getCookie("companyId")),
                    "storeName": this.state.name,
                    "streetAddress": this.state.street,
                    "city": this.state.city,
                    "state": this.state.state,
                    "zipCode": parseInt(this.state.zip),
                })
            }
        ).then(this.clearModal()).then(() => this.props.closeModal())
    }

    loadData = () => {
        fetch(`${apiAddress}/api/Stores/${this.props.editStoreId}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    storeId: data.storeId,
                    name: data.storeName,
                    street: data.streetAddress,
                    city: data.city,
                    state: data.state,
                    zip: data.zipCode,
                    showDelete: true,
                });
                this.props.clearRequest();
            })
    }
}

AddLocationModal.propTypes = {
    showModal: PropTypes.bool,
    closeModal: PropTypes.func,
    editStoreId: PropTypes.number,
    clearRequest: PropTypes.func,
};

export default (AddLocationModal);