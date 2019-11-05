import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import { Link } from 'react-router-dom';
import * as LocationStore from '../store/Location';
import { Grid } from 'semantic-ui-react';

type LocationProps =
    LocationStore.LocationState &
    typeof LocationStore.actionCreator &
    RouteComponentProps<{}>;

class Counter extends React.PureComponent<LocationProps>{
    public render() {
        return (
            <React.Fragment>
                <Grid textAlign="center" verticalAlign="middle">
                    <Grid.Column style={{ width: '100%', maxWidth: 850 }}>
                        <h1 style={{ marginBottom: 20 }}>Select Store</h1>

                        <div className="ui section divider" />

                        {this.props.locations.map((location: LocationStore.Location) =>
                            <Link to='/'>
                                <h3 key={location.id}>{location.name}</h3>
                                <div className="ui section divider" />
                            </Link>
                        )}

                        <Link to='/add-store' className="btn btn-primary btn-lg">Add Store</Link>
                    </Grid.Column>
                </Grid>

            </React.Fragment>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.locations,
    LocationStore.actionCreator
)(Counter);