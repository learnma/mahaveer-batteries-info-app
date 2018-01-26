import { USER_AUTHENTICATED, LOGOFF } from '../actions/types';

const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_AUTHENTICATED:
            return action.payload;

        case LOGOFF:
            return null;

        default:
            return state;
    }
}

export default reducer;