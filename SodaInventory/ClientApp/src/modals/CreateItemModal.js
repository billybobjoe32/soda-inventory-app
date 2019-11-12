import React, {Component} from 'react';

import {Button, Form, Header, Icon, Modal, ModalActions, ModalContent} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class CreateItemModal extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <Modal open={this.props.showModal} onClose={this.props.closeModal} size='small' closeIcon>
                    <ModalContent>
                        <Header as='h2'>Create New Item</Header>
                        <Header as='h3'>
                            <Icon name='box' circular/>
                            <Header.Content>Create Item</Header.Content>
                        </Header>
                        <Form size='large' style={{textAlign: 'left'}}>
                            <Form.Input fluid label='Name'/>
                            <Form.Input fluid label='Measured In' placeholder='i.e. liters, etc.'/>
                            <Form.Input fluid label='Moderate Threshold'/>
                            <Form.Input fluid label='Urgent Threshold'/>
                        </Form>
                    </ModalContent>
                    <ModalActions>
                        <Button primary onClick={this.props.closeModal}>Submit</Button>
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