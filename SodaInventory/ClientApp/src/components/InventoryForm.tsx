import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import { Link } from 'react-router-dom';
import * as InventoryStore from '../store/Inventory';
import { Form, Grid } from 'semantic-ui-react';

type InventoryProps =
    InventoryStore.InventoryState &
    typeof InventoryStore.actionCreator &
    RouteComponentProps<{}>;

class InventoryForm extends React.PureComponent<InventoryProps> {
    public render() {
        let itemArr: number[] = [-1,-1,-1,-1,-1,-1,-1,-1];

        return (
            <React.Fragment>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' >
                    <Grid.Column style={{ width: '70%', maxWidth: 650 }}>
                        <h1 style={{marginBottom: 20}}>Take Inventory</h1>
                        <div className="ui section divider" />
                        <Form>
                            {this.props.items.map((item: InventoryStore.Inventory) =>
                                <div>
                                    <Grid.Row style={{marginBottom: 20}}>
                                        <Grid.Column style={{ width: '50%'}}>
                                        <h3 style={{textAlign: "center"}}>{item.name}</h3>
                                        </Grid.Column>
                                        <Grid.Column style={{ width: '50%' }}>
                                            <h4 style={{ textAlign: "center" }}>Current Value: {item.quantity}</h4>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Form.Input style={{maxWidth: 300}}
                                        onChange={(e) => itemArr[item.id] = parseInt(e.target.value)} />
                                    <div className="ui section divider" />
                                </div>
                            )}

                            <Link className="btn btn-primary btn-lg" to='/' onClick={() => {
                                this.props.updateInventory(itemArr);
                            }}>
                                Submit
                            </Link>
                        </Form>
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.items,
    InventoryStore.actionCreator
)(InventoryForm);