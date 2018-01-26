import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import batteryModelReducer from './reducers/batteryModel';
import vehicleModelReducer from './reducers/vehicleModel';

const rootReducer = combineReducers({
    auth: authReducer,
    batteryModels: batteryModelReducer,
    vehicleModels: vehicleModelReducer
});

const configureStore = () => {
    return createStore(rootReducer, {}, applyMiddleware(thunk));
};

export default configureStore;
