import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "classy-missy-wishlist";
const WishlistContext = createContext(null);

function readStoredWishlist() {
  try {
    const storedWishlist = localStorage.getItem(STORAGE_KEY);
    if (!storedWishlist) return [];

    const parsedWishlist = JSON.parse(storedWishlist);
    if (!Array.isArray(parsedWishlist)) {
      throw new TypeError("Saved wishlist data must be an array.");
    }

    return parsedWishlist.filter(
      (product) =>
        product &&
        typeof product.id === "string" &&
        typeof product.name === "string" &&
        typeof product.price === "number",
    );
  } catch (error) {
    console.error("Could not load the saved wishlist.", error);
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(readStoredWishlist);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Could not save the wishlist.", error);
    }
  }, [items]);

  const isWishlisted = (productId) =>
    items.some((product) => product.id === productId);

  const toggleWishlist = (product) => {
    setItems((currentItems) =>
      currentItems.some((item) => item.id === product.id)
        ? currentItems.filter((item) => item.id !== product.id)
        : [...currentItems, product],
    );
  };

  const removeFromWishlist = (productId) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  };

  return (
    <WishlistContext.Provider
      value={{ items, isWishlisted, toggleWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const wishlist = useContext(WishlistContext);
  if (!wishlist) {
    throw new Error("useWishlist must be used within a WishlistProvider.");
  }
  return wishlist;
}
