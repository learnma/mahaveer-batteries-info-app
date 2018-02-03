import axios from 'axios';

import {
    VEHICLES_RETRIEVED_FOR_BATTERY,
    VEHICLE_CREATED,
    VEHICLE_DELETED,
    VEHICLE_MODELS_RETRIEVED
} from './types'

import {
    firestoreBaseUrl,
    firestoreDocumentsBaseUrl,
    firestoreDoumentsQueryUrl
} from '../../config';

const vehiclemodelsUrl = `${firestoreDocumentsBaseUrl}/vehiclemodels`;

export const getVehiclesWithBatteryModel = batteryModel => (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
        try {
            const auth = getState().auth;
            const query = {
                structuredQuery: {
                    where: {
                        fieldFilter: {
                            field: { fieldPath: 'batterymodel' },
                            op: 'EQUAL',
                            value: { stringValue: batteryModel.model }
                        }
                    },
                    from: [
                        { collectionId: 'vehiclemodels' }
                    ]
                }
            };

            const result = await axios.post(firestoreDoumentsQueryUrl, query, {
                headers: {
                    'Authorization': 'Bearer ' + auth.token
                }
            });
            let vehicles = [];
            if (result.data[0].document) {
                vehicles = result.data.map(data => {
                    return {
                        ref: data.document.name,
                        type: data.document.fields.type.stringValue,
                        make: data.document.fields.make.stringValue,
                        model: data.document.fields.model.stringValue,
                        batterymodel: data.document.fields.batterymodel.stringValue
                    }
                });
            }

            dispatch({
                type: VEHICLES_RETRIEVED_FOR_BATTERY,
                payload: vehicles
            })
            resolve(vehicles);
        } catch (err) {
            console.error(err);
            resolve(err);
            alert('Error in getVehiclesWithBatteryModel action ' + err);
        }
    });
}

export const addVehicle = vehicle => async (dispatch, getState) => {
    try {
        const auth = getState().auth;
        const document = {
            fields: {
                type: { stringValue: vehicle.type },
                make: { stringValue: vehicle.make },
                model: { stringValue: vehicle.model },
                batterymodel: { stringValue: vehicle.batterymodel }
            }
        }

        await axios.post(vehiclemodelsUrl, document, {
            headers: {
                'Authorization': 'Bearer ' + auth.token
            }
        });
        dispatch({
            type: VEHICLE_CREATED,
            payload: vehicle
        });
    }
    catch (err) {
        console.error(err);
        alert('Error during addvehicle action ' + err);
    }
}

export const deleteVehicle = vehicle => (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
        try {
            const auth = getState().auth;
            const url = `${firestoreBaseUrl}/${vehicle.ref}`;
            await axios.delete(url, {
                headers: {
                    'Authorization': 'Bearer ' + auth.token
                }
            });
            dispatch({
                type: VEHICLE_DELETED,
                payload: vehicle.name
            });
            resolve();
        } catch (err) {
            console.error(err);
            reject(err);
            alert('Error during deleteVehicle action ' + err);
        }
    });
}

export const loadAllVehicles = () => async (dispatch, getState) => {
    try {
        const auth = getState().auth;
        const result = await axios.get(vehiclemodelsUrl, {
            headers: {
                'Authorization': 'Bearer ' + auth.token
            }
        });

        const vehicles = result.data.documents.map(document => {
            return {
                ref: document.name,
                type: document.fields.type.stringValue,
                make: document.fields.make.stringValue,
                model: document.fields.model.stringValue,
                batterymodel: document.fields.batterymodel.stringValue
            }
        });

        dispatch({
            type: VEHICLE_MODELS_RETRIEVED,
            payload: vehicles
        });
    } catch (err) {
        console.error(err);
        alert('Error in loadAllvehiclesAction ' + err);
    }
}
