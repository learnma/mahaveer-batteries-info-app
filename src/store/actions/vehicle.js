import axios from 'axios';

import {
    VEHICLES_RETRIEVED_FOR_BATTERY,
    VEHICLE_CREATED,
    VEHICLE_DELETED,
    VEHICLE_MODELS_RETRIEVED
} from './types'

const url = 'https://firestore.googleapis.com/v1beta1/projects/mahaveerbattries-dev/databases/(default)/documents:runQuery';

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

            const result = await axios.post(url, query, {
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
                        batteryname: data.document.fields.batteryname.stringValue,
                        batterymodel: data.document.fields.batterymodel.stringValue,
                        batteryfullwarrenty: data.document.fields.batteryfullwarrenty.integerValue,
                        batteryproratawarrenty: data.document.fields.batteryproratawarrenty.integerValue,
                        batterylandingprice: data.document.fields.batterylandingprice.doubleValue,
                        batterymrp: data.document.fields.batterymrp.doubleValue
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
        const url = 'https://firestore.googleapis.com/v1beta1/projects/mahaveerbattries-dev/databases/(default)/documents/vehiclemodels';
        const document = {
            fields: {
                type: { stringValue: vehicle.type },
                make: { stringValue: vehicle.make },
                model: { stringValue: vehicle.model },
                batterymodel: { stringValue: vehicle.batterymodel },
                batteryname: { stringValue: vehicle.batteryname },
                batteryfullwarrenty: { integerValue: vehicle.batteryfullwarrenty },
                batteryproratawarrenty: { integerValue: vehicle.batteryproratawarrenty },
                batterylandingprice: { doubleValue: vehicle.batterylandingprice },
                batterymrp: { doubleValue: vehicle.batterymrp }
            }
        }

        await axios.post(url, document, {
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
            const url = `https://firestore.googleapis.com/v1beta1/${vehicle.ref}`;
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
        const url = 'https://firestore.googleapis.com/v1beta1/projects/mahaveerbattries-dev/databases/(default)/documents/vehiclemodels';
        const result = await axios.get(url, {
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
                batteryname: document.fields.batteryname.stringValue,
                batterymodel: document.fields.batterymodel.stringValue,
                batteryfullwarrenty: document.fields.batteryfullwarrenty.integerValue,
                batteryproratawarrenty: document.fields.batteryproratawarrenty.integerValue,
                batterylandingprice: document.fields.batterylandingprice.doubleValue,
                batterymrp: document.fields.batterymrp.doubleValue
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
