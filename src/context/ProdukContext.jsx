import React, { createContext, useContext, useState, useEffect } from "react";
import bagImg from "../assets/bag.png";
import { productAPI } from "../services/apiService";

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
  const [produk, setProduk] = useState([]);

  // Ambil data produk dari backend
  const fetchProduk = async () => {
    try {
      const data = await productAPI.getAllProducts();
      const BASE_IMAGE_URL = "http://localhost:5000/static/uploads/products/";
      // Mapping field dari backend ke frontend
      const mapped = data.map((item) => {
        const stock = item.stock_quantity ?? item.stock ?? item.stok ?? 0;
        let image = item.image || item.image_url || "";
        if (image && !image.startsWith("http")) {
          image = BASE_IMAGE_URL + image;
        }
        return {
          ...item,
          image,
          desc: item.desc || item.description || "",
          stock,
          status: stock > 0 ? "Tersedia" : "Tidak tersedia",
        };
      });
      setProduk(mapped);
    } catch (err) {
      alert("Gagal mengambil data produk");
    }
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  async function addProduk(newProduk) {
    try {
      await productAPI.addProduct(newProduk);
      await fetchProduk();
    } catch (err) {
      console.error("Tambah produk error:", err);
      alert("Gagal menambah produk");
    }
  }

  async function editProduk(id, updatedProduk) {
    try {
      await productAPI.editProduct(id, updatedProduk);
      await fetchProduk();
    } catch (err) {
      alert("Gagal mengedit produk");
    }
  }

  async function deleteProduk(id) {
    try {
      // Tambahkan fungsi delete produk ke productAPI jika belum ada
      if (productAPI.deleteProduct) {
        await productAPI.deleteProduct(id);
        setProduk((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Fungsi hapus produk belum tersedia di API");
      }
    } catch (err) {
      alert("Gagal menghapus produk");
    }
  }

  return (
    <ProdukContext.Provider value={{ produk, addProduk, editProduk, deleteProduk, fetchProduk }}>
      {children}
    </ProdukContext.Provider>
  );
}

export function useProduk() {
  return useContext(ProdukContext);
} 