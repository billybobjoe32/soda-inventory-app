import React, {Component} from 'react';
import {
    Button,
    Header,
    Icon,
    Message,
    MessageHeader,
    Modal,
    ModalActions,
    ModalContent,
    ModalHeader,
    Segment
} from "semantic-ui-react";
import PropTypes from 'prop-types';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import QuantityModal from "./QuantityModal";

class ItemModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: "cups",
            qty: 10,
            uom: "units",
            showAdjustInventoryModal: false,
        };
    }

    closeModal = () => {
        this.setState({showAdjustInventoryModal: false});
    };

    render() {

        const data = [
            {month: "Jan", value: 150},
            {month: "Feb", value: 200},
            {month: "March", value: 250},
            {month: "April", value: 100},
            {month: "June", value: 80},
            {month: "July", value: 100},
            {month: "Aug", value: 110},
            {month: "Sept", value: 108},
            {month: "Oct", value: 120},
            {month: "Nov", value: 256},
            {month: "Dec", value: 90},
        ];

        return (
            <div>
                <QuantityModal showModal={this.state.showAdjustInventoryModal} closeModal={this.closeModal} />
                <Modal open={this.props.showModal} onClose={this.props.closeModal} size={'large'} closeIcon>
                    <ModalHeader>Item</ModalHeader>
                    <ModalContent scrolling>
                        <Header as='h2'>
                            <Icon name='box' circular/>
                            <Header.Content>Cups - <span style={{fontStyle: 'italic'}}>10 Units in stock</span>
                                <Header.Subheader>
                                    Level: <span style={{color: 'red'}}>Urgent</span>
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                        <Segment attached>
                            <Message warning>
                                <MessageHeader>Suggested Action</MessageHeader>
                                Swap  <Icon name="long arrow alternate right"/>Gilbert
                            </Message>
                            <Message size="small">10 units short</Message>
                            <ResponsiveContainer width="99%" height={440}>
                            <BarChart data={data}
                                      margin={{top: 5, right: 70, left: 10, bottom: 5}}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="month"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="value" fill="#26BFE7" name="Inventory"/>
                                <ReferenceLine y={120} stroke="orange" label={{ position: 'right',  value: '120', fill: 'orange', fontSize: 14 }}/>
                                <ReferenceLine y={100} stroke="red" label={{ position: 'right',  value: '100', fill: 'red', fontSize: 14 }}/>
                            </BarChart>
                            </ResponsiveContainer>
                        </Segment>
                    </ModalContent>
                    <ModalActions style={{justifyContent: 'space-between'}}>
                        <Button primary>Edit Item Details<Icon className="pl-3" name='pencil alternate'/></Button>
                        <Button secondary onClick={() => this.setState({showAdjustInventoryModal: true})}>Adjust Inventory<Icon name='chevron right'/></Button>
                    </ModalActions>
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