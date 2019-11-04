import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import { Link } from 'react-router-dom';
import * as LocationStore from '../store/Location';

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
                <h1>Add Store</h1>

                <p>This is a form to add a new store</p>
                <div className="form-fields">
                    <label htmlFor='store-name'>Store Name:</label>
                    <input id='store-name' value={name} onChange={(e) => name = e.target.value} />
                </div>
                <div className="form-fields">
                    <label htmlFor='street'>Street:</label>
                    <input id='street' value={street} onChange={(e) => street = e.target.value}/>
                </div>
                <div className="form-fields">
                    <label htmlFor='city'>City:</label>
                    <input id='city' value={city} onChange={(e) => city = e.target.value}/>
                </div>
                <div className="form-fields">
                    <label htmlFor='state'>State:</label>
                    <input id='state' value={state} onChange={(e) => state = e.target.value}/>
                </div>
                <div className="form-fields">
                    <label htmlFor='zip'>ZIP:</label>
                    <input id='zip' value={zip} onChange={(e) => zip = e.target.value}/>
                </div>

                <Link type="submit" className="btn btn-primary btn-lg" to='/select-store' onClick={() => {
                    this.props.addLocation(name, street, city, state, zip);
                }}>
                    Add Location
                </Link>
            </React.Fragment>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.locations,
    LocationStore.actionCreator
)(AddLocation);