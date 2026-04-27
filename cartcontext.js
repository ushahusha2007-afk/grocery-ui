import React, { createContext, useContext, useReducer, useCallback } from "react";

const initialState = { items: [] };

const ADD_ITEM      = "ADD_ITEM";
const REMOVE_ITEM   = "REMOVE_ITEM";
const INCREMENT_QTY = "INCREMENT_QTY";
const DECREMENT_QTY = "DECREMENT_QTY";
const CLEAR_CART    = "CLEAR_CART";

function cartReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM: {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case REMOVE_ITEM:
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case INCREMENT_QTY:
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case DECREMENT_QTY:
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload ? { ...i, quantity: Math.max(i.quantity - 1, 1) } : i
        ),
      };
    case CLEAR_CART:
      return { ...state, items: [] };
    default:
      return state;
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const itemCount  = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const addItem      = useCallback(product => dispatch({ type: ADD_ITEM,      payload: product }), []);
  const removeItem   = useCallback(id      => dispatch({ type: REMOVE_ITEM,   payload: id }), []);
  const incrementQty = useCallback(id      => dispatch({ type: INCREMENT_QTY, payload: id }), []);
  const decrementQty = useCallback(id      => dispatch({ type: DECREMENT_QTY, payload: id }), []);
  const clearCart    = useCallback(()      => dispatch({ type: CLEAR_CART }), []);
  const isInCart     = useCallback(id      => state.items.some(i => i.id === id), [state.items]);

  return (
    <CartContext.Provider value={{ items: state.items, itemCount, totalPrice, addItem, removeItem, incrementQty, decrementQty, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export default CartContext;
