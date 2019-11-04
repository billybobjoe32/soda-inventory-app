import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import { Link } from 'react-router-dom';
import * as LocationStore from '../store/Location';

type LocationProps =
    LocationStore.LocationState &
    typeof LocationStore.actionCreator &
    RouteComponentProps<{}>;

class Counter extends React.PureComponent<LocationProps>{
    public render() {
        return (
            <React.Fragment>
                <h1>Select Store</h1>

                <p>This is the list of store locations</p>

                <ul>
                    {this.props.locations.map((location: LocationStore.Location) =>
                        <li key={location.id}>{location.name}</li>
                    )}
                </ul>

                <Link to='/add-store' className="btn btn-primary btn-lg">Add Store</Link>
            </React.Fragment>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.locations,
    LocationStore.actionCreator
)(Counter);