import updateShoppingCart from './shopping-cart';
import updateAuth from "./auth-reducer";
import updateError from "./error-reducer"
import updateProductList from "./product-list";

const reducer = (state, action) => {
  return {
    productList: updateProductList(state, action),
    shoppingCart: updateShoppingCart(state, action),
    auth: updateAuth(state, action),
    errors: updateError(state, action)
  };
};

export default reducer;
