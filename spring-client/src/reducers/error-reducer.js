const updateError = (state, action) => {

    if (state === undefined) {
        return {
            error: {}
        };
    }

    switch (action.type) {
        case 'ERROR_HANDLE':
            console.log(action)
            return {
                ...state,
                error: action.payload
            };


        default:
            return state.errors;
    }


};



export default updateError;
