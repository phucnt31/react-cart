import {
  CLEAR_CART,
  DECREASE,
  DISPLAY_ITEMS,
  INCREASE,
  LOADING,
  REMOVE_ITEM,
} from "./action";

export const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }
  if (action.type === REMOVE_ITEM) {
    const newCart = new Map(state.cart);
    newCart.delete(action.payload.id);
    return { ...state, cart: newCart };
  }
  if (action.type === INCREASE) {
    const newCart = new Map(state.cart);
    const newId = action.payload.id;
    const item = newCart.get(newId);
    const updateCart = { ...item, amount: item.amount + 1 };
    newCart.set(newId, updateCart);
    return { ...state, cart: newCart };
  }
  if (action.type === DECREASE) {
    const newCart = new Map(state.cart);
    const newId = action.payload.id;
    const item = newCart.get(newId);
    if (item.amount === 1) {
      newCart.delete(newId);
      return { ...state, cart: newCart };
    }
    const decreaseCart = { ...item, amount: item.amount - 1 };
    newCart.set(newId, decreaseCart);
    return { ...state, cart: newCart };
  }
  throw new Error(`Action ${action.type} is not being handled`);
};
