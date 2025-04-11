import axios from "axios"

export const loginUser = (data) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:3000/user/login', data);

        if (response.status === 200) {
            // Make sure the response contains the correct user data
            dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
            console.log('User data:', response.data.user);
        } else {
            dispatch({ type: 'LOGIN_FAILURE', payload: 'Login failed' });
        }
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    }
};

