import jwt_decode from 'jwt-decode'
import axios from 'axios'


const updateAuth = (state, action) => {

    if (state === undefined) {
        return {
            isAuth: false,
            currentUserId: null,
            signUpSuccess: false,
            username: null
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
            const payload = jwt_decode(action.payload)
            if(payload.exp < new Date().getTime() / 1000) {
                return {
                    signUpSuccess: false,
                    isAuth: false,
                    currentUserId: null,
                    username: null
                }
            }
            axios.defaults.headers.common["Authorization"] = `Bearer ${action.payload}`
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







