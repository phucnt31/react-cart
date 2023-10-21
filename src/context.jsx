import React, { createContext, useContext, useReducer } from "react";
import {
  CLEAR_CART,
  DECREASE,
  DISPLAY_ITEMS,
  INCREASE,
  LOADING,
  REMOVE_ITEM,
} from "./action";
import { reducer } from "./reducer";
import cartItems from "./data";

const AppContext = createContext();

const defaultState = {
  cart: new Map(cartItems.map((item) => [item.id, item])),
  isLoading: false,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: { id } });
  };
  const increaseItem = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  };
  const decreaseItem = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  };

  return (
    <AppContext.Provider
      value={{ ...state, clearCart, removeItem, decreaseItem, increaseItem }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
