import axios from "axios"

export const loginUser = (data) => async (dispatch) => {
    try {
        const response = await axios.post('https://efa-ioi5.onrender.com/user/login', data);

        if (response.status === 200) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.token });
            console.log('User data:', response.data);
            localStorage.setItem("token", response.data.token);
        } else {
            dispatch({ type: 'LOGIN_FAILURE', payload: 'Login failed' });
        }
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    }
};

