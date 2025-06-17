const API_BASE_URL = "http://127.0.0.1:8000";

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.detail || `HTTP error! status: ${response.status}`
    );
  }
  return response.json();
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Chemical Catalogue API
export const chemicalCatalogueAPI = {
  // Get all chemicals
  getAll: async (skip = 0, limit = 100) => {
    const response = await fetch(
      `${API_BASE_URL}/chemical-catalogue/?skip=${skip}&limit=${limit}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return handleResponse(response);
  },

  // Get single chemical
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/chemical-catalogue/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Create new chemical
  create: async (chemicalData) => {
    const response = await fetch(`${API_BASE_URL}/chemical-catalogue/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(chemicalData),
    });
    return handleResponse(response);
  },

  // Update chemical
  update: async (id, chemicalData) => {
    const response = await fetch(`${API_BASE_URL}/chemical-catalogue/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(chemicalData),
    });
    return handleResponse(response);
  },

  // Delete chemical
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/chemical-catalogue/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `HTTP error! status: ${response.status}`
      );
    }
    return true;
  },
};

// Location API
export const locationAPI = {
  // Get all locations
  getAll: async (skip = 0, limit = 100) => {
    const response = await fetch(
      `${API_BASE_URL}/location/?skip=${skip}&limit=${limit}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return handleResponse(response);
  },

  // Get single location
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/location/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Create new location
  create: async (locationData) => {
    const response = await fetch(`${API_BASE_URL}/location/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(locationData),
    });
    return handleResponse(response);
  },

  // Update location
  update: async (id, locationData) => {
    const response = await fetch(`${API_BASE_URL}/location/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(locationData),
    });
    return handleResponse(response);
  },

  // Delete location
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/location/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `HTTP error! status: ${response.status}`
      );
    }
    return true;
  },
};

// Department API
export const departmentAPI = {
  // Get all departments
  getAll: async (skip = 0, limit = 100) => {
    const response = await fetch(
      `${API_BASE_URL}/department/?skip=${skip}&limit=${limit}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return handleResponse(response);
  },

  // Get single department
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/department/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Create new department
  create: async (departmentData) => {
    const response = await fetch(`${API_BASE_URL}/department/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(departmentData),
    });
    return handleResponse(response);
  },

  // Update department
  update: async (id, departmentData) => {
    const response = await fetch(`${API_BASE_URL}/department/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(departmentData),
    });
    return handleResponse(response);
  },

  // Delete department
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/department/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `HTTP error! status: ${response.status}`
      );
    }
    return true;
  },
};

// Order API
export const orderAPI = {
  // Get all orders
  getAll: async (skip = 0, limit = 100) => {
    const response = await fetch(
      `${API_BASE_URL}/order/?skip=${skip}&limit=${limit}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return handleResponse(response);
  },

  // Get single order
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/order/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Create new order
  create: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/order/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(orderData),
    });
    return handleResponse(response);
  },

  // Update order
  update: async (id, orderData) => {
    const response = await fetch(`${API_BASE_URL}/order/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(orderData),
    });
    return handleResponse(response);
  },

  // Delete order
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/order/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `HTTP error! status: ${response.status}`
      );
    }
    return true;
  },
};

// User API
export const userAPI = {
  // Get all users
  getAll: async (skip = 0, limit = 100) => {
    const response = await fetch(
      `${API_BASE_URL}/users/?skip=${skip}&limit=${limit}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return handleResponse(response);
  },

  // Get single user
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Create new user
  create: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Update user
  update: async (id, userData) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Delete user
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `HTTP error! status: ${response.status}`
      );
    }
    return true;
  },
};

// Auth API
export const authAPI = {
  // Login
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(credentials),
    });
    return handleResponse(response);
  },

  // Register
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },
};
