"use client";

import { createContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load wishlist from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("wishlist");

      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch (error) {
      console.log(error);
    }

    setLoaded(true);
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.log(error);
    }
  }, [wishlist, loaded]);

  const addWishlist = (product) => {
    setWishlist((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        console.log("ALREADY EXISTS");
        return prev;
      }
      const updateWishList = [...prev , product];
      console.log("UPDATED WISHLIST:", updateWishList)

      return updateWishList;
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item)=> item.id !== id))
  };

  const isInWishlist = (id) => wishlist.some((item)=>item.id === id)

  return (
    <WishlistContext.Provider
      value={{ wishlist, setWishlist, addWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistContext;