/**
 * Auth User Reducers
 */
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE,
    LOGIN_USER_ID
} from 'Actions/types';

/**
 * initial auth user
 */
const INIT_STATE = {
    user: localStorage.getItem('user_id'),
    id: '',
    loading: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case LOGIN_USER:
            return { ...state, loading: true };

        case LOGIN_USER_ID:
            return { ...state,id:action.id };

        case LOGIN_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload };

        case LOGIN_USER_FAILURE:
            return { ...state, loading: false };

        case LOGOUT_USER:
            return { ...state, user: null };

        case SIGNUP_USER:
            return { ...state, loading: true };

        case SIGNUP_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload };

        case SIGNUP_USER_FAILURE:
            return { ...state, loading: false };

        default: return { ...state };
    }
}
