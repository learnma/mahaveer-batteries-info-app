import axios from 'axios';

import { USER_AUTHENTICATED, LOGOFF } from '../actions/types'
import { config } from '../../config';

export const loginWithEmail = (email, password) => async (dispatch) => {
    try {
        const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${config.FIREBASE_KEY}`;
        const result = await axios.post(url, {
            email: email, password: password, returnSecureToken: true
        });
        const authInfo = {
            token: result.data.idToken,
            refreshToken: result.data.refreshToken,
            email: result.data.email,
            displayName: result.data.displayName || result.data.email
        };

        dispatch({
            type: USER_AUTHENTICATED,
            payload: authInfo
        });
    } catch (err) {
        alert('error in loginWithEmailPassword ' + err);
    }
}

export const logOff = () => dispatch => {
    dispatch({
        type: LOGOFF
    });
}