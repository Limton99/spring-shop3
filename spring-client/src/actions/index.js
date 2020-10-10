import axios from 'axios';




export const bookAddedToCart = (productId) => {
  return {
      type: 'BOOK_ADDED_TO_CART',
      payload: productId
  }
};

export const bookRemovedToCart = (productId) => {
  return {
      type: 'BOOK_REMOVED_FROM_CART',
      payload: productId
  }
};
export const allbookRemovedToCart = (productId) => {
  return {
      type: 'ALL_BOOKS_REMOVED_FROM_CART',
      payload: productId
  }
};

export const fetchBooks = () => (dispatch) => {
    axios.get('/api/v1/admin/products/list').then(res => {
        // console.log(res, res.data)
        dispatch({
            type: 'FETCH_BOOKS_SUCCESS',
            payload: res.data
        })
    }).catch(err => console.log(err))
}







export const saveBook = data => dispatch =>{
    console.log(data)
    const fm = new FormData()
    Object.keys(data).map(key => {
        fm.append([key],data[key])
    })
    console.log(fm.get('name'))


    axios.post('/api/v1/admin/products/createProduct', fm, {
        headers: {
            "Content-type": undefined
        }})
        .then(res => {
            console.log(res.data)

            dispatch({
                type: 'FETCH_BOOK_ADD',
                payload: res.data
            })
        })
        .catch(err => console.log(err))
};

export const updateProduct = (data, id) => dispatch => {
    console.log(data)
    const fm = new FormData()
    Object.keys(data).map(key => {
        fm.append([key],data[key])
    })
    console.log(fm.get('name'))


    axios.post('/api/v1/admin/products/update/' + id, fm, {
        headers: {
            "Content-type": undefined
        }})
        .then(res => {
            dispatch({
                type: 'FETCH_BOOK_UPDATE',
                payload: res.data
            })

        })
        .catch(err => console.log(err))

}



export const signUp = (user) => dispatch =>{
    console.log(user)
    const fm = new FormData()
    Object.keys(user).map(key => {
        fm.append([key],user[key])
    })
    console.log("FormData: " + fm.get('username'))
    axios.post('/users/add', fm, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    })
        .then(res => {
            console.log("Response: ", res.data)
            dispatch({
                type: 'USER_SIGNIN',
            })

            setTimeout(() => {
                dispatch({
                    type: 'USER_SIGNUP',
                })
            }, 1000)

        })
        .catch(err => {
            // console.log(err.message)
            dispatch({
                type: 'ERROR_HANDLE',
                payload: err.response.data
            })
        })

};


export const logIn = (user) => dispatch =>{
    console.log(user)
    const fm = new FormData()
    Object.keys(user).map(key => {
        fm.append([key],user[key])
    })
    console.log("FormData: " + fm.get('username'))
    axios.post('/users/login', fm)
        .then(res => {
            localStorage.setItem('access_token', res.data.access)
            dispatch({
                type: 'USER_LOGIN',
                payload: res.data.access
            })
        })
        .catch(err => {
            // console.log(err.message)
            dispatch({
                type: 'ERROR_HANDLE',
                payload: err.response.data
            })
        })
};

export const logOut = () => dispatch =>{
    dispatch({
        type: 'USER_LOGOUT'
    })
};


export const deleteArticle = (id) => dispatch =>{
    axios.delete('/api/v1/admin/products/delete/' + id)
        .then(res => {
            dispatch({
                type: 'DELETE_BOOK',
                payload: id
            })
        })
        .catch(err => console.log(err))
};









export const setError = (err) => dispatch =>{
    dispatch({
        type: "ERROR_HANDLE",
        payload: {}
    })
};





