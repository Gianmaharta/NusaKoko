import React, { createContext, useContext, useState } from "react";
import bagImg from "../assets/bag.png";

const ProdukContext = createContext();

const dummyProducts = [
  {
    id: "01",
    image: bagImg,
    name: "Kantong Plastik",
    desc: "Kantong plastik ini terbuat dari serabut kelapa dan bahan biodegradable, sehingga lebih ramah lingkungan dibandingkan plastik konvensional. Serabut kelapa memberikan kekuatan tambahan, membuat kantong tidak mudah sobek namun tetap mudah terurai secara alami.",
    sku: "KNP-001",
    price: "Rp 10.000",
    stock: 150,
    status: "Tersedia",
  },
];

export function ProdukProvider({ children }) {
  const [produk, setProduk] = useState(dummyProducts);

  function addProduk(newProduk) {
    setProduk((prev) => [
      ...prev,
      { ...newProduk, id: (prev.length + 1).toString().padStart(2, '0') },
    ]);
  }

  return (
    <ProdukContext.Provider value={{ produk, addProduk }}>
      {children}
    </ProdukContext.Provider>
  );
}

export function useProduk() {
  return useContext(ProdukContext);
} 