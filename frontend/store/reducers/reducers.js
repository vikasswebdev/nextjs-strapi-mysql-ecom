import cartActions from "../actions/cartActions";

export const initialState = {
  cart: [],
  total: 0,
  isCartOpen: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case cartActions.ADD_CART:
      return {
        cart: [...state.cart, action.payload],
        total: state.total + action.payload.price,
      };

    case cartActions.TOGGLE_CART:
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };

    case cartActions.REMOVE_CART_ITEM:
      return {
        cart: state.cart.filter((item) => item.slug !== action.payload),
        total: state.total - action.payload.price,
      };

    default:
      return state;
  }
};

export default reducer;
