import React, {Component} from 'react';
import {Header, Icon, Message, Modal, ModalContent, ModalHeader, Segment} from "semantic-ui-react";
import PropTypes from 'prop-types';

class ItemModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: "cups",
            qty: 10,
            uom: "units",
        };
    }

    render() {
        return (
            <div>
                <Modal open={this.props.showModal} onClose={this.props.closeModal} size={'fullscreen'} closeIcon>
                    <ModalHeader>Item</ModalHeader>
                    <ModalContent>
                        <Header as='h2'>
                            <Icon name='box' circular/>
                            <Header.Content>Cups - <span style={{fontStyle: 'italic'}}>10 Units</span>
                                <Header.Subheader>
                                    Level: <span style={{color: 'red'}}>Urgent</span>
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                        <Segment attached>
                            <Message size="small">10 units</Message>
                        </Segment>
                    </ModalContent>
                </Modal>
            </div>
        );
    }
}

ItemModal.propTypes = {
    showModal: PropTypes.bool,
    closeModal: PropTypes.func,
};

export default ItemModal;