import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as LocationStore from '../store/Location';
import {Button, Form, Header, Icon, Modal, ModalActions, ModalContent, Segment} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class AddLocationModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            street: '',
            city: '',
            state: '',
            zip: ''
        }
    }

    clearModal = () => {
        this.setState({
            name: '',
            street: '',
            city: '',
            state: '',
            zip: ''
        })
    };

    render() {
        const {name, street, city, state, zip} = this.state;

        return (
            <div>
                <Modal open={this.props.showModal} onClose={this.props.closeModal} closeIcon size='small'>
                    <ModalContent scrolling>
                        <Header as='h2'>
                            <Icon name='building outline' circular/>
                            <Header.Content>Add Store</Header.Content>
                        </Header>
                        <Segment attached>
                            <Form>
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
                            </Form>
                        </Segment>
                    </ModalContent>
                    <ModalActions>
                        <Button primary onClick={() => {
                            this.props.addLocation(name, street, city, state, zip);
                            this.clearModal();
                            this.props.closeModal()
                        }}> Add Location</Button>
                    </ModalActions>
                </Modal>
            </div>
        );
    }
};

AddLocationModal.propTypes = {
    showModal: PropTypes.bool,
    closeModal: PropTypes.func,
};

export default connect(
    (state) => state.locations,
    LocationStore.actionCreator
)(AddLocationModal);