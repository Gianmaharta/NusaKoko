import api from '../utils/api.jsx';

// API functions untuk produk
export const productAPI = {
  // Mendapatkan semua produk
  getAllProducts: async () => {
    try {
      const response = await api.get('/api/nusakoko/products/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Mendapatkan produk berdasarkan ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/api/nusakoko/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Mencari produk
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
  // Login
  login: async (username, password) => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await api.post('/api/nusakoko/auth/login', formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Register
  register: async (userData) => {
    try {
      const response = await api.post('/api/nusakoko/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
  },

  // Cek apakah user sudah login
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Mendapatkan role user
  getUserRole: () => {
    return localStorage.getItem('role');
  },

  // Mendapatkan data user dari localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// API functions untuk keranjang (jika ada)
export const cartAPI = {
  // Mendapatkan keranjang user
  getCart: async () => {
    try {
      const response = await api.get('/api/nusakoko/cart');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Menambah item ke keranjang
  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await api.post('/api/nusakoko/cart/add', {
        product_id: productId,
        quantity: quantity
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Menghapus item dari keranjang
  removeFromCart: async (itemId) => {
    try {
      const response = await api.delete(`/api/nusakoko/cart/remove/${itemId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update quantity item di keranjang
  updateCartItem: async (itemId, quantity) => {
    try {
      const response = await api.put(`/api/nusakoko/cart/update/${itemId}`, {
        quantity: quantity
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Health check
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
  healthAPI
}; 