const updateProductList = (state, action) => {

  if (state === undefined) {
    return {
      products: [],
      loading: true,
      error: null
    };
  }

  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
      return {
        products: [],
        loading: true,
        error: null
      };

    case 'FETCH_BOOKS_SUCCESS':
      return {
        products: action.payload,
        loading: false,
        error: null
      };
    case 'FETCH_BOOK_ADD':
      return {
        products: [...state.products, action.payload],
        loading: false,
        error: null
      }
    case 'FETCH_BOOKS_FAILURE':
      return {
        products: [],
        loading: false,
        error: action.payload
      };
      case 'FETCH_DETAIL_SUCCESS':
      return {
        products: action.payload,
        loading: false,
        error: null
      };
    case 'DELETE_BOOK':
      console.log(action.payload) // id article

      return {
        ...state,
        products: removeById(state.products, action.payload)
      }
    default:
      return state.productList;
  }


};

function removeById(list, id) {
  for(let i = list.length - 1; i >= 0; i--) {
    if(list[i].id === id) {
      list.splice(i, 1)
      break
    }
  }
  return [...list]
}

export default updateProductList;
