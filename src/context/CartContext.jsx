import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Nama fungsi diubah agar konsisten
  const addToCartContext = (item) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      if (exist) {
        return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + item.qty } : i);
      }
      return [...prev, { ...item, qty: item.qty || 1 }];
    });
  };

  // Nama fungsi diubah agar konsisten
  const updateQtyContext = (id, qty) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  // Nama fungsi diubah agar konsisten
  const removeFromCartContext = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setCart([]);

  // Pastikan nama fungsi yang di-export di value juga sudah diubah
  const value = {
    cart,
    setCart,
    addToCart: addToCartContext, // Kamu bisa tetap menggunakan nama lama jika mau, atau ganti semua
    updateQtyContext,
    removeFromCartContext,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}