import { Action, Reducer } from 'redux';

//STATE
export interface LocationState {
    locations: Location[];
}

export interface Location {
    id: number;
    name: string;
    street: string;
    city: string;
    state: string;
    zip: number;
}

//ACTION
export interface AddLocationAction {
    type: 'ADD_LOCATION';
    id: number;
    name: string;
    street: string;
    city: string;
    state: string;
    zip: number;
}

export type KnownAction = AddLocationAction;

//ACTION CREATOR
let nextId = 1;
export const actionCreator = {
    addLocation: (name: string, street: string, city: string, state: string, zip: number) => ({
        type: 'ADD_LOCATION', id: nextId++, name: name, street: street, city: city, state: state, zip: zip
    } as AddLocationAction)
};

//REDUCER
export const reducer: Reducer<LocationState> = (state: LocationState | undefined, incomingAction: Action): LocationState => {
    if (state === undefined) {
        return { locations: [] };
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'ADD_LOCATION':
            return {
                locations:
                    [...state.locations,
                        { id: action.id, name: action.name, street: action.street, city: action.city, state: action.state, zip: action.zip }]
            };
        default:
            return state;
    }
};