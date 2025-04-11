// userReducer.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./actionType"; // Importing action types

const initialState = {
    user: null,
    error: null,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, user: action.payload, error: null };
        case 'LOGIN_FAILURE':
            return { ...state, user: null, error: action.payload };
        case 'LOGOUT':
            return { ...state, user: null };
        default:
            return state;
    }
};
