import { useReducer, useEffect } from "react";
import { createContext } from "react";

const CartContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [], // Load from local storage or start with an empty cart
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

      if (existingCartItem.count > 1) {
        const updatedItem = {
          ...existingCartItem,
          count: existingCartItem.count - 1,
        };
        const updatedItems = [...state.cart];
        updatedItems[existingCartItemIndex] = updatedItem;
        return { ...state, cart: updatedItems };
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

  // Save cart to localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddItemToCart = (item) => {
    dispatch({ type: "addItem", payload: item });
  };

  const handleMinusItemFromCart = (item) => {
    dispatch({ type: "minusItem", payload: item });
  };

  const handleDeleteItemFromCart = (item) => {
    dispatch({ type: "deleteItem", payload: item });
  };

  const handleConfirmOrder = async () => {
    console.log("Submitting cart:", cart);
    try {
      const response = await fetch(import.meta.env.VITE_CONFIRM_ORDER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      });

      if (!response.ok) {
        throw new Error("Failed to confirm order");
      }

      // Dispatch to show the modal after successful submission
      dispatch({ type: "confirmOrder" });
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  const handleNewOrder = () => {
    dispatch({ type: "newOrder" });
    localStorage.removeItem("cart"); // Clear cart from localStorage on new order
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
