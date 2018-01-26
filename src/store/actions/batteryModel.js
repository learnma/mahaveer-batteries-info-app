import axios from 'axios';
import { getVehiclesWithBatteryModel, deleteVehicle } from './';
import { BATTERY_MODELS_RETRIEVED, BATTERY_MODEL_CREATED, BATTERY_MODEL_DELETED } from './types';

const baseUrl = 'https://firestore.googleapis.com/v1beta1';
//const baseDocumentsUrl = `${baseUrl}/projects/mahaveerbattries-dev/databases/(default)/documents`;

export const getBatteryModels = () => async (dispatch, getState) => {
    try {
        const auth = getState().auth;
        const url = 'https://firestore.googleapis.com/v1beta1/projects/mahaveerbattries-dev/databases/(default)/documents/batterymodels';
        const result = await axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + auth.token
            }
        });
        const batteryModels = result.data.documents.map(d => {
            return {
                ref: d.name,
                name: d.fields.name.stringValue,
                model: d.fields.model.stringValue,
                fullwarrenty: d.fields.fullwarrenty.integerValue,
                proratawarrenty: d.fields.proratawarrenty.integerValue,
                landingprice: d.fields.landingprice.doubleValue,
                mrp: d.fields.mrp.doubleValue
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

export const createBatteryModel = batteryModel => async (dispatch, getState) => {
    try {
        const auth = getState().auth;
        const url = 'https://firestore.googleapis.com/v1beta1/projects/mahaveerbattries-dev/databases/(default)/documents/batterymodels';
        const document = {
            fields: {
                "model": { stringValue: batteryModel.model },
                "name": { stringValue: batteryModel.name },
                "brand": { stringValue: 'Amron' },
                "fullwarrenty": { integerValue: batteryModel.fullwarrenty },
                "proratawarrenty": { integerValue: batteryModel.proratawarrenty },
                "landingprice": { doubleValue: batteryModel.landingprice },
                "mrp": { doubleValue: batteryModel.mrp }
            }
        }

        const result = await axios.post(url, document, {
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

export const deleteBatteryModel = batteryModel => async (dispatch, getState) => {
    try {
        const auth = getState().auth;
        const url = `${baseUrl}/${batteryModel.ref}`;

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