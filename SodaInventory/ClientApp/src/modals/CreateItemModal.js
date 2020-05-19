import React, {Component} from 'react';

import {Button, Form, Header, Icon, Modal, ModalActions, ModalContent} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { apiAddress, getCookie } from '../store/DataAccess';

class CreateItemModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            units: '',
            moderateLevel: '',
			urgentLevel: '',
            itemId: 0,
            itemQuantityId: 0,
            isValid: true
        }
    }

    addItem = async () => {
        if (this.state.itemId > 0) {
            var results = await fetch(apiAddress + '/api/Inventory/UpdateItemInfo',
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "itemId": this.state.itemId,
                        "companyId": parseInt(getCookie("companyId")),
                        "itemName": this.state.name,
                        "storeId": parseInt(getCookie("storeId")),
                        "uom": this.state.units,
                        "moderateLevel": parseFloat(this.state.moderateLevel),
                        "urgentLevel": parseFloat(this.state.urgentLevel)
                    })
                }
            ).then(this.clearModal()).then(() => this.props.closeModal());
        }
        else {
            var results = await fetch(apiAddress + '/api/Items',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "itemId": 0,
                        "companyId": parseInt(getCookie("companyId")),
                        "itemName": this.state.name,
                        "units": this.state.units,
                        "itemAlerts": [],
                        "itemQuantities": []
                    })
                }
            );
            var json = await results.json();
            var itemId = json.itemId;
            await fetch(apiAddress + '/api/ItemQuantities',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "itemQuantityId": 0,
                        "itemId": itemId,
                        "storeId": parseInt(getCookie("storeId")),
                        "amount": 0,
                        "moderateLevel": parseFloat(this.state.moderateLevel),
                        "urgentLevel": parseFloat(this.state.urgentLevel)
                    })
                }).then(this.clearModal()).then(() => this.props.closeModal());
        }
    };

    validate = () => {
        if (this.state.name != '' && this.state.units != '') {
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
        if (this.props.editItemId) {
            this.loadData();
        }
    }

    clearModal = () => {
        this.setState({
            itemId: 0,
            name: '',
            units: '',
            moderateLevel: '',
            urgentLevel: '',
            isValid: true
        })
    };

    loadData = () => {
        var store = getCookie("storeId");
        fetch(`${apiAddress}/api/Inventory/GetSpecificInventoryItem?storeId=${store}&itemId=${this.props.editItemId}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    itemId: data.itemId,
                    itemQuantityId: data.itemQuantityId,
                    name: data.itemName,
                    units: data.uom,
                    moderateLevel: data.moderateLevel,
                    urgentLevel: data.urgentLevel,
                })
                this.props.clearRequest();
            })

    }

    render() {
        const {name, units, moderateLevel, urgentLevel} = this.state;

        return (
            <div>
                <Modal open={this.props.showModal} onClose={this.props.closeModal} size='small' closeIcon>
                    <ModalContent>
                        <Header as='h2'>Create New Item</Header>
                        <Header as='h3'>
                            <Icon name='box' circular/>
                            <Header.Content>Create Item</Header.Content>
                        </Header>
                        <Form className={this.state.isValid ? '' : 'error'} size='large' style={{textAlign: 'left'}}>
                            {/*<Form.Input fluid label='Name'/>*/}
                            <Form.Field>
                                <label htmlFor='item-name'>Name</label>
                                <input id='item-name' value={name}
                                    onChange={(e) => this.setState({name: e.target.value})}/>
                            </Form.Field>

                            {/* <Form.Input fluid label='Measured In' placeholder='i.e. liters, etc.'/> */}
                            <Form.Field>
                                <label htmlFor='units'>Units</label>
                                <input id='units' placeholder='i.e. liters, etc.' value={units}
                                    onChange={(e) => this.setState({units: e.target.value})}/>
                            </Form.Field>

                            {/* <Form.Input fluid label='Moderate Threshold'/> */}
                            <Form.Field>
                                <label htmlFor='moderate-threshold'>Moderate Threshold</label>
                                <input id='moderate-threshold' value={moderateLevel}
                                    onChange={(e) => this.setState({moderateLevel: e.target.value})}/>
                            </Form.Field>

                            {/* <Form.Input fluid label='Urgent Threshold'/> */}
                            <Form.Field>
                                <label htmlFor='urgent-threshold'>Urgent Threshold</label>
                                <input id='urgent-threshold' value={urgentLevel}
                                    onChange={(e) => this.setState({urgentLevel: e.target.value})}/>
                            </Form.Field>
                            <div className=" ui error message">
                                <div className="header">Mistake in Form</div>
                                <p>Make sure every field is filled before submitting this form.</p>
                            </div>
                        </Form>
                    </ModalContent>
                    <ModalActions>
                        {/* <Button primary onClick={this.props.closeModal}>Submit</Button> */}
                        <Button primary onClick={() => {
                            if (this.validate())
                                this.addItem();
                        }}>Submit</Button>
                    </ModalActions>
                </Modal>
            </div>
        )
    }
}

CreateItemModal.propsTypes = {
    showModal: PropTypes.bool,
    closeModal: PropTypes.func,
    editItemId: PropTypes.number,
    clearRequest: PropTypes.func,
};

export default CreateItemModal;