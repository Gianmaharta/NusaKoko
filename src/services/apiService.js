import api from '../utils/api.jsx';

const BASE_URL = "http://localhost:5000/api/nusakoko";

// API functions untuk produk
export const productAPI = {
  getAllProducts: async () => {
    try {
      const response = await api.get('/api/nusakoko/products/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getProductById: async (id) => {
    try {
      const response = await api.get(`/api/nusakoko/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  searchProducts: async (query) => {
    try {
      const response = await api.get(`/api/nusakoko/products/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Menghapus produk berdasarkan ID
  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/api/nusakoko/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Menambah produk baru
  addProduct: async (productData) => {
    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('price', productData.price);
      formData.append('description', productData.desc || productData.description || '');
      formData.append('sku', productData.sku);
      formData.append('stock_quantity', productData.stock);
      if (productData.image) {
        formData.append('product_image', productData.image);
      }
      const response = await api.post('/api/nusakoko/products/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Edit produk
  editProduct: async (id, productData) => {
    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('price', productData.price);
      formData.append('description', productData.desc || productData.description || '');
      formData.append('sku', productData.sku);
      formData.append('stock_quantity', productData.stock);
      if (productData.image && typeof productData.image !== 'string') {
        formData.append('product_image', productData.image);
      }
      const response = await api.put(`/api/nusakoko/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// API functions untuk autentikasi
export const authAPI = {
  login: async (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    const response = await api.post('/api/nusakoko/auth/login', formData);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/api/nusakoko/auth/register', userData);
    return response.data;
  },
  logout: () => {
    localStorage.clear(); // Menggunakan clear() lebih aman
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  getUserRole: () => {
    return localStorage.getItem('role');
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// ===== BAGIAN YANG DIPERBARUI: API UNTUK KERANJANG =====
export const cartAPI = {
  /** Mengambil semua item di keranjang user yang login */
  getCart: async () => {
    const response = await api.get('/api/nusakoko/cart/');
    return response; // Mengembalikan seluruh response agar bisa diakses .data di komponen
  },

  /** Menambah item ke keranjang (atau menambah kuantitas jika sudah ada) */
  addToCart: async (productId, quantity = 1) => {
    return await api.post('/api/nusakoko/cart/add', { product_id: productId, quantity });
  },

  /** Mengubah kuantitas item di keranjang */
  updateCartItem: async (productId, quantity) => {
    return await api.put(`/api/nusakoko/cart/update/${productId}`, { quantity });
  },

  /** Menghapus item dari keranjang */
  removeFromCart: async (productId) => {
    return await api.delete(`/api/nusakoko/cart/remove/${productId}`);
  },
};
// =========================================================

// API functions untuk User Profile
export const userAPI = {
  getProfile: async () => {
    // 'api' dari utils sudah otomatis menambahkan header Authorization
    const response = await api.get('/api/nusakoko/auth/profile');
    return response.data;
  },
  updateProfile: async (data) => {
    const formData = new FormData();
    if (data.username) formData.append('username', data.username);
    if (data.address) formData.append('address', data.address);
    if (data.profile_photo) formData.append('profile_photo', data.profile_photo);
    const response = await api.put('/api/nusakoko/auth/profile', formData);
    return response.data;
  },
  updateAddress: async (address) => {
    const formData = new FormData();
    formData.append('address', address);
    const response = await api.put('/api/nusakoko/auth/profile', formData);
    return response.data;
  },
};

// API functions untuk Pesanan (Order)
export const orderAPI = {
  // Disesuaikan agar menggunakan 'api' (axios) dan form-data
  createOrder: async (data) => {
    const formData = new FormData();
    formData.append('user_id', data.user_id);
    formData.append('items_json', data.items_json);
    const response = await api.post('/api/nusakoko/orders/', formData);
    return response.data;
  },
  
  getOrderById: async (orderId) => {
    const response = await api.get(`/api/nusakoko/orders/${orderId}`);
    return response.data;
  },

  getMyOrders: async () => {
    const response = await api.get('/api/nusakoko/orders/my-orders');
    return response.data;
  },

  updatePaymentStatus: async (orderId, status) => {
    const response = await api.put(`/api/nusakoko/orders/${orderId}/payment-status`, { payment_status: status });
    return response.data;
  },

  getAllOrders: async () => {
    const response = await api.get('/api/nusakoko/orders/');
    return response.data;
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`/api/nusakoko/orders/${orderId}/order-status`, { order_status: status });
    return response.data;
  },
};

// Health check (jika masih digunakan)
export const healthAPI = {
  checkHealth: async () => {
    try {
      const response = await api.get('/api/nusakoko/health');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default {
  productAPI,
  authAPI,
  cartAPI,
  healthAPI,
  userAPI,
  orderAPI
};