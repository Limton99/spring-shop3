import jwt_decode from 'jwt-decode'
import axios from 'axios'


const updateAuth = (state, action) => {

    if (state === undefined) {
        if(!localStorage.getItem('access_token'))
        {
            return {
                isAuth: false,
                currentUserId: null,
                signUpSuccess: false,
                username: null
            };
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('access_token')}`
        console.log(localStorage.getItem('access_token'));
        return {
            isAuth: true,
            currentUserId: localStorage.getItem('access_token'),
            signUpSuccess: false,
            username: localStorage.getItem('access_token')
        };

    }

    // console.log(action)
    switch(action.type){
        case 'USER_SIGNUP':
            return {
                signUpSuccess: !state.signUpSuccess,
                isAuth: false,
                currentUserId: null,
                username: null
            }
        case 'USER_LOGIN':
            const payload = jwt_decode(localStorage.getItem('access_token'))
            if(payload.exp < new Date().getTime() / 1000000) {
                return {
                    signUpSuccess: false,
                    isAuth: false,
                    currentUserId: null,
                    username: null
                }
            }
            axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('access_token')}`
            return {
                signUpSuccess: false,
                isAuth: true,
                currentUserId: payload.user_id,
                username: payload.user_id
            }
        case 'USER_LOGOUT':
            localStorage.removeItem('access_token')
            delete axios.defaults.headers.common["Authorization"]
            return {
                signUpSuccess: false,
                isAuth: false,
                currentUserId: null,
                username: null
            }
        default:
            return state.auth;
    }
};

export default updateAuth;







