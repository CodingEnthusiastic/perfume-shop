// API Base Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
};

// Auth API calls
export const authAPI = {
  register: (data) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getMe: () => apiCall('/auth/me'),

  updateProfile: (data) =>
    apiCall('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Product API calls
export const productAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/products${queryString ? `?${queryString}` : ''}`);
  },

  getFeatured: () => apiCall('/products/featured'),

  getById: (id) => apiCall(`/products/${id}`),

  create: (data) =>
    apiCall('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiCall(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiCall(`/products/${id}`, {
      method: 'DELETE',
    }),

  getCategories: () => apiCall('/products/categories'),

  getBrands: () => apiCall('/products/brands'),
};

// Review API calls
export const reviewAPI = {
  getByProduct: (productId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(
      `/reviews/product/${productId}${queryString ? `?${queryString}` : ''}`
    );
  },

  create: (data) =>
    apiCall('/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiCall(`/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiCall(`/reviews/${id}`, {
      method: 'DELETE',
    }),
};

// Transaction API calls
export const transactionAPI = {
  create: (data) =>
    apiCall('/transactions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/transactions${queryString ? `?${queryString}` : ''}`);
  },

  getById: (id) => apiCall(`/transactions/${id}`),

  updateStatus: (id, status) =>
    apiCall(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
};

// Contact API calls
export const contactAPI = {
  create: (data) =>
    apiCall('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/contact${queryString ? `?${queryString}` : ''}`);
  },

  getById: (id) => apiCall(`/contact/${id}`),

  update: (id, data) =>
    apiCall(`/contact/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiCall(`/contact/${id}`, {
      method: 'DELETE',
    }),
};

// Default export for general API calls
export default {
  get: (endpoint, options = {}) => apiCall(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, data, options = {}) => apiCall(endpoint, { ...options, method: 'POST', body: JSON.stringify(data) }),
  put: (endpoint, data, options = {}) => apiCall(endpoint, { ...options, method: 'PUT', body: JSON.stringify(data) }),
  delete: (endpoint, options = {}) => apiCall(endpoint, { ...options, method: 'DELETE' }),
};
