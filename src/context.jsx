import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  CLEAR_CART,
  DECREASE,
  DISPLAY_ITEMS,
  INCREASE,
  LOADING,
  REMOVE_ITEM,
} from "./action";
import { reducer } from "./reducer";
import { calculateTotal } from "./utils";

const url = "https://www.course-api.com/react-useReducer-cart-project";

const AppContext = createContext();

const defaultState = {
  cart: new Map(),
  isLoading: false,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const { totalAmount, totalInCart } = calculateTotal(state.cart);

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
  const displayItems = async () => {
    dispatch({ type: LOADING });
    const resp = await fetch(url);
    const data = await resp.json();
    dispatch({ type: DISPLAY_ITEMS, payload: { data } });
  };

  useEffect(() => {
    displayItems();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        decreaseItem,
        increaseItem,
        totalAmount,
        totalInCart,
        displayItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
