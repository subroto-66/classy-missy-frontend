import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "classy-missy-cart";
const CartContext = createContext(null);

function readStoredCart() {
  try {
    const storedCart = localStorage.getItem(STORAGE_KEY);
    if (!storedCart) return [];

    const parsedCart = JSON.parse(storedCart);
    if (!Array.isArray(parsedCart)) {
      throw new TypeError("Saved cart data must be an array.");
    }

    return parsedCart.filter(
      (item) =>
        item &&
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        typeof item.price === "number" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    );
  } catch (error) {
    console.error("Could not load the saved cart.", error);
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Could not save the cart.", error);
    }
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...currentItems, { ...product, quantity }];
    });
  };

  const setQuantity = (productId, quantity) => {
    setItems((currentItems) =>
      quantity < 1
        ? currentItems.filter((item) => item.id !== productId)
        : currentItems.map((item) =>
            item.id === productId ? { ...item, quantity } : item,
          ),
    );
  };

  const removeFromCart = (productId) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  };

  return (
    <CartContext.Provider
      value={{ items, addToCart, setQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error("useCart must be used within a CartProvider.");
  }
  return cart;
}
