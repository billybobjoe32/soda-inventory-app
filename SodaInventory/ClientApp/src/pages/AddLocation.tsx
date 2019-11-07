import * as React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {ApplicationState} from '../store';
import {Link} from 'react-router-dom';
import * as LocationStore from '../store/Location';
import {Form, Grid} from 'semantic-ui-react';

type LocationProps =
    LocationStore.AddLocationAction &
    typeof LocationStore.actionCreator &
    RouteComponentProps<{}>;

class AddLocation extends React.PureComponent<LocationProps> {
    public render() {
        let name: any;
        let street: any;
        let city: any;
        let state: any;
        let zip: any;

        return (
            <React.Fragment>
                <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle' >
                    <Grid.Column style={{width: '70%', maxWidth: 450}}>
                        <h1 style={{marginBottom: 20}}>Add Store</h1>

                        <Form>
                            <Form.Field>
                                <label htmlFor='store-name' style={{textAlign: 'left'}}>Store Name:</label>
                                <input id='store-name' value={name} onChange={(e) => name = e.target.value} />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor='street' style={{ textAlign: 'left' }}>Street:</label>
                                <input id='street' value={street} onChange={(e) => street = e.target.value}/>
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor='city' style={{ textAlign: 'left' }}>City:</label>
                                <input id='city' value={city} onChange={(e) => city = e.target.value}/>
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor='state' style={{ textAlign: 'left' }}>State:</label>
                                <input id='state' value={state} onChange={(e) => state = e.target.value}/>
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor='zip' style={{ textAlign: 'left' }}>ZIP:</label>
                                <input id='zip' value={zip} onChange={(e) => zip = e.target.value}/>
                            </Form.Field>

                            <Link className="btn btn-primary btn-lg" to='/select-store' onClick={() => {
                                this.props.addLocation(name, street, city, state, zip);
                            }}>
                                Add Location
                            </Link>
                        </Form>
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.locations,
    LocationStore.actionCreator
)(AddLocation);