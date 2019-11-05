import { Action, Reducer } from 'redux';

//STATE
export interface InventoryState {
    items: Inventory[];
}

export interface Inventory {
    id: number;
    name: string;
    quantity: number;
}

//ACTION
export interface UpdateInventoryAction {
    type: 'UPDATE_INVENTORY';
    quantities: number[];
}

export type KnownAction = UpdateInventoryAction;

//ACTION CREATOR
export const actionCreator = {
    updateInventory: (quantities: number[]) => ({
        type: 'UPDATE_INVENTORY', quantities: quantities
    } as UpdateInventoryAction)
};

//REDUCER
export const reducer: Reducer<InventoryState> = (state: InventoryState | undefined, incomingAction: Action): InventoryState => {
    if (state === undefined) {
        return {
            items: [{ id: 0, name: "Cups", quantity: 0 },
                { id: 1, name: "Napkins", quantity: 0 },
                { id: 2, name: "Soda", quantity: 0 },
                { id: 3, name: "Straws", quantity: 0 },
                { id: 4, name: "Paper towels", quantity: 0 },
                { id: 5, name: "Cookies", quantity: 0 },
                { id: 6, name: "Wax paper", quantity: 0 },
                { id: 7, name: "Flour", quantity: 0 },]
        };
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'UPDATE_INVENTORY':
            return {
                items: state.items.map((item: Inventory): Inventory => {
                    action.quantities[item.id] === -1 ? item.quantity = item.quantity : item.quantity = action.quantities[item.id];
                    return item;
                })
            };
        default:
            return state;
    }
};