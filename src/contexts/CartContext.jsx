import { useReducer } from "react";
import { createContext } from "react";

const CartContext = createContext();

const initialState = {
  cart: [],
  showModal: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "addItem": {
      const existingCartItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.name === action.payload.name
      );
      const existingCartItem = state.cart[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          count: existingCartItem.count + 1,
        };
        const updatedItems = [...state.cart];
        updatedItems[existingCartItemIndex] = updatedItem;
        return { ...state, cart: updatedItems };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, count: 1 }],
        };
      }
    }
    case "minusItem": {
      const existingCartItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.name === action.payload.name
      );
      const existingCartItem = state.cart[existingCartItemIndex];

      if (existingCartItem.count > 0) {
        const updatedItem = {
          ...action.payload,
          count: existingCartItem.count--,
        };
        let updatedItems = [...state.cart];
        updatedItems[existingCartItemIndex] = updatedItem;
        return {
          ...state,
          cart: updatedItems,
        };
      } else {
        return {
          ...state,
          cart: state.cart.filter(
            (cartItem) => cartItem.name !== action.payload.name
          ),
        };
      }
    }
    case "deleteItem":
      return {
        ...state,
        cart: state.cart.filter(
          (cartItem) => cartItem.name !== action.payload.name
        ),
      };
    case "confirmOrder":
      return {
        ...state,
        showModal: true,
      };
    case "newOrder":
      return {
        ...state,
        cart: [],
        showModal: false,
      };
    default:
      throw new Error("Action not recognised");
  }
};

function CartProvider({ children }) {
  const [{ cart, showModal }, dispatch] = useReducer(reducer, initialState);

  const handleAddItemToCart = (item) => {
    dispatch({ type: "addItem", payload: item });
  };

  const handleMinusItemFromCart = (item) => {
    dispatch({ type: "minusItem", payload: item });
  };

  const handleDeleteItemFromCart = (item) => {
    dispatch({ type: "deleteItem", payload: item });
  };

  const handleConfirmOrder = () => {
    dispatch({ type: "confirmOrder" });
  };

  const handleNewOrder = () => {
    dispatch({ type: "newOrder" });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        showModal,
        handleAddItemToCart,
        handleMinusItemFromCart,
        handleDeleteItemFromCart,
        handleConfirmOrder,
        handleNewOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider, CartContext };
