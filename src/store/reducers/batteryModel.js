import {
    BATTERY_MODELS_RETRIEVED,
    BATTERY_MODEL_CREATED,
    BATTERY_MODEL_UPDATED,
    BATTERY_MODEL_DELETED
} from '../actions/types';

const initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BATTERY_MODELS_RETRIEVED:
            return action.payload;

        case BATTERY_MODEL_CREATED:
            return [...state, action.payload]

        case BATTERY_MODEL_UPDATED: {
            let updatedTasks = state.filter(bm => bm.ref !== action.payload.ref);
            updatedTasks = [...updatedTasks, action.payload]
            return updatedTasks;
        }

        case BATTERY_MODEL_DELETED:
            return state.filter(bm => bm.ref !== action.payload);

        default:
            return state;
    }
}

export default reducer;