import {
    VEHICLES_RETRIEVED_FOR_BATTERY,
    VEHICLE_CREATED,
    VEHICLE_DELETED,
    VEHICLE_MODELS_RETRIEVED
} from '../actions/types';

const initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case VEHICLES_RETRIEVED_FOR_BATTERY:
            let vehicleModels = [...state];
            action.payload.forEach(vm => {
                vehicleModels = vehicleModels.filter(v => v.batterymodel !== vm.batterymodel
                    && v.type !== vm.type
                    && v.make !== vm.make
                    && v.model !== vm.model);
            });
            action.payload.forEach(d => vehicleModels.push(d));
            return vehicleModels;

        case VEHICLE_CREATED:
            return [...state, action.payload];

        case VEHICLE_DELETED:
            const vehicles = state.filter(v => v.name !== action.payload);
            return vehicles;

        case VEHICLE_MODELS_RETRIEVED:
            return action.payload;

        default:
            return state;
    }
}

export default reducer;