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

  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
