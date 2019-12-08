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
            isValid: true
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

    clearModal = () => {
        this.setState({
            storeId: '',
            name: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            isValid: true
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
                        <Button primary onClick={() => {
                            if (this.validate())
                                this.addLocation();
                        }}> Add Location</Button>
                    </ModalActions>
                </Modal>
            </div>
        );
    }
}

AddLocationModal.propTypes = {
    showModal: PropTypes.bool,
    closeModal: PropTypes.func,
};

export default (AddLocationModal);