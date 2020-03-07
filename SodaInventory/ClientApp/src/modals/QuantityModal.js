import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormInput, Modal, ModalActions, ModalContent, ModalHeader} from "semantic-ui-react";

class QuantityModal extends Component {
    render() {
        return (
            <div>
                <Modal open={this.props.showModal} onClose={this.props.closeModal} size="mini" closeIcon>
                    <ModalHeader>Adjust Inventory: {this.props.item.itemName}</ModalHeader>
                    <ModalContent>
                        <h5>Current Inventory: <span className="font-weight-bold">{this.props.item.amount} {this.props.item.uom}</span></h5>
                        <Form>
                            <FormInput label="Quantity" />
                        </Form>
                    </ModalContent>
                    <ModalActions>
                        <Button primary onClick={this.props.closeModal}>Cancel</Button>
                        <Button secondary onClick={this.props.closeModal}>Update</Button>
                    </ModalActions>
                </Modal>
            </div>
        );
    }
}

QuantityModal.propTypes = {
    showModal: PropTypes.bool,
    closeModal: PropTypes.func,
    item: PropTypes.object
};

export default QuantityModal;