import axios from 'axios';
import { getVehiclesWithBatteryModel, deleteVehicle } from './';
import {
    BATTERY_MODELS_RETRIEVED,
    BATTERY_MODEL_CREATED,
    BATTERY_MODEL_DELETED,
    BATTERY_MODEL_UPDATED
} from './types';

import {
    firestoreBaseUrl,
    firestoreDocumentsBaseUrl,
    firestoreDoumentsQueryUrl
} from '../../config';
const batterymodelsUrl = `${firestoreDocumentsBaseUrl}/batterymodels`;

export const getBatteryModels = () => async (dispatch, getState) => {
    try {
        const auth = getState().auth;
        const result = await axios.get(batterymodelsUrl, {
            headers: {
                'Authorization': 'Bearer ' + auth.token
            }
        });
        const batteryModels = result.data.documents.map(d => {
            return {
                ref: d.name,
                brand: d.fields.brand ? d.fields.brand.stringValue : 'Amron',
                name: d.fields.name.stringValue,
                model: d.fields.model.stringValue,
                fullwarrenty: d.fields.fullwarrenty.integerValue,
                proratawarrenty: d.fields.proratawarrenty.integerValue,
                landingprice: d.fields.landingprice.doubleValue,
                mrp: d.fields.mrp.doubleValue,
                stock: d.fields.stock ? d.fields.stock.integerValue : 0,
                ah: d.fields.ah ? d.fields.ah.doubleValue : 0
            }
        });
        dispatch({
            type: BATTERY_MODELS_RETRIEVED,
            payload: batteryModels
        });
    } catch (err) {
        console.error(err);
        alert('Error while retriveing battery models ' + err);
    }
}

export const getBatteryModel = batteryModel => async (dispatch, getState) => {
    try {
        const auth = getState().auth;
        const query = {
            structuredQuery: {
                where: {
                    fieldFilter: {
                        field: { fieldPath: 'model' },
                        op: 'EQUAL',
                        value: { stringValue: batteryModel }
                    }
                },
                from: [
                    { collectionId: 'batterymodels' }
                ]
            }
        };

        const result = await axios.post(firestoreDoumentsQueryUrl, query, {
            headers: {
                'Authorization': 'Bearer ' + auth.token
            }
        });
        let batteryModels = [];
        if (result.data[0].document) {
            batteryModels = result.data.map(data => {
                const d = data.document;
                return {
                    ref: data.document.name,
                    brand: d.fields.brand ? d.fields.brand.stringValue : 'Amron',
                    name: d.fields.name.stringValue,
                    model: d.fields.model.stringValue,
                    fullwarrenty: d.fields.fullwarrenty.integerValue,
                    proratawarrenty: d.fields.proratawarrenty.integerValue,
                    landingprice: d.fields.landingprice.doubleValue,
                    mrp: d.fields.mrp.doubleValue,
                    stock: d.fields.stock ? d.fields.stock.integerValue : 0,
                    ah: d.fields.ah ? d.fields.ah.doubleValue : 0
                }
            });
        }

        dispatch({
            type: BATTERY_MODELS_RETRIEVED,
            payload: batteryModels
        });

    } catch (err) {
        console.error(err);
        alert(`Error while retrieving batteryModel ${batteryModel} - ${err}`);
    }
}

export const createBatteryModel = batteryModel => async (dispatch, getState) => {
    try {
        const auth = getState().auth;
        const document = {
            fields: {
                "model": { stringValue: batteryModel.model },
                "name": { stringValue: batteryModel.name },
                "brand": { stringValue: 'Amron' },
                "fullwarrenty": { integerValue: batteryModel.fullwarrenty },
                "proratawarrenty": { integerValue: batteryModel.proratawarrenty },
                "landingprice": { doubleValue: batteryModel.landingprice },
                "mrp": { doubleValue: batteryModel.mrp },
                "stock": { integerValue: batteryModel.stock },
                "ah": { doubleValue: batteryModel.ah }
            }
        }

        const result = await axios.post(batterymodelsUrl, document, {
            headers: {
                'Authorization': 'Bearer ' + auth.token
            }
        });
        dispatch({
            type: BATTERY_MODEL_CREATED,
            payload: { ...batteryModel, ref: result.data.name }
        });
    } catch (err) {
        console.error(err);
        alert('Error while adding a battery model' + err);
    }
}

export const updateBatteryModel = batteryModel => async (dispatch, getState) => {
    try {
        const auth = getState().auth;
        const url = `${firestoreBaseUrl}/${batteryModel.ref}`;
        const document = {
            fields: {
                "model": { stringValue: batteryModel.model },
                "name": { stringValue: batteryModel.name },
                "brand": { stringValue: batteryModel.brand },
                "fullwarrenty": { integerValue: batteryModel.fullwarrenty },
                "proratawarrenty": { integerValue: batteryModel.proratawarrenty },
                "landingprice": { doubleValue: batteryModel.landingprice },
                "mrp": { doubleValue: batteryModel.mrp },
                "stock": { integerValue: batteryModel.stock },
                "ah": { doubleValue: batteryModel.ah }
            }
        }

        await axios.patch(url, document, {
            headers: {
                'Authorization': 'Bearer ' + auth.token
            }
        });

        dispatch({
            type: BATTERY_MODEL_UPDATED,
            payload: batteryModel
        });

    } catch (err) {
        console.error(err);
        alert('Error while updating a battery model' + err);
    }
}

export const deleteBatteryModel = batteryModel => async (dispatch, getState) => {
    try {
        const auth = getState().auth;
        const url = `${firestoreBaseUrl}/${batteryModel.ref}`;

        const promises = [];
        const vehiclesAssociatedWithBattery = await dispatch(getVehiclesWithBatteryModel(batteryModel));
        vehiclesAssociatedWithBattery.forEach(vehicle => {
            const promise = dispatch(deleteVehicle(vehicle));
            promises.push(promise);
        })

        await Promise.all(promises);

        await axios.delete(url, {
            headers: {
                'Authorization': 'Bearer ' + auth.token
            }
        });

        dispatch({
            type: BATTERY_MODEL_DELETED,
            payload: batteryModel.ref
        })

    } catch (err) {
        console.error(err);
        alert('Error while deleting battery model' + err);
    }
}

