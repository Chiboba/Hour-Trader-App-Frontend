import axios from 'axios';

export const TOGGLE_LOGIN_STATUS = 'TOGGLE_LOGIN_STATUS';

export const FETCHING_USER_INFO = 'FETCHING_USER_INFO';
export const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS';
export const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE';

export const toggleLoginStatus = () => dispatch => {
    const token = localStorage.getItem('user-token')
    if(token) {
        axios.defaults.headers.common['Authorization'] = token;
    }
    dispatch({type: TOGGLE_LOGIN_STATUS});
}

export const fetchUser = (user) => dispatch => {
    dispatch({type: FETCHING_USER_INFO});
    
    return axios
    .get('https://hourlybgf.herokuapp.com/api/user')
    .then(res => {
        dispatch({type: FETCHING_USER_SUCCESS, payload: res.data})
    })
    .catch(err => {
        dispatch({type: FETCHING_USER_FAILURE, payload: err})
    })
}