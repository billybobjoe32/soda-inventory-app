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
            isValid: true
        }
    }

	addItem = () => {
		fetch(apiAddress + '/api/Items',
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
			}).then(results => { return results.json(); })
			.then(data => {
				
				fetch(apiAddress + '/api/ItemQuantities',
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							"itemQuantityId": 0,
							"itemId": data.itemId,
							"storeId": parseInt(getCookie("storeId")),
							"amount": 0,
							"moderateLevel": this.state.moderateLevel,
							"urgentLevel": this.state.urgentLevel
						})
					});
			}).then(this.clearModal()).then(() => this.props.closeModal());
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

    clearModal = () => {
        this.setState({
            name: '',
            units: '',
            moderateLevel: '',
            urgentLevel: '',
            isValid: true
        })
    };

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
};

export default CreateItemModal;