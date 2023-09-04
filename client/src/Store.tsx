/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-case-declarations */
import React from "react";
import { Cart, CartItem } from "./types/Cart";

type AppState = {
  cart: Cart;
};

const initialState: AppState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems")!)
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress")!)
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")!
      : "PayPal",
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
};

type Action =
  | { type: "CART_ADD_ITEM"; payload: CartItem }
  | { type: "CART_REMOVE_ITEM"; payload: CartItem };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item: CartItem) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item: CartItem) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item: CartItem) => item._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    default:
      return state;
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState;

const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
});

function StoreProvider(props: React.PropsWithChildren<object>) {
  const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  );

  return <Store.Provider value={{ state, dispatch }} {...props} />;
}

export { Store, StoreProvider };
