const API_BASE_URL = "http://localhost:8080"; // Updated to match backend context-path

export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, { // Removed duplicate /api
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
    credentials: 'include' // Added for CORS with credentials
  });
  
  if (!res.ok) {
    // Enhanced error handling
    const text = await res.text();
    let errorData;
    try {
      errorData = text ? JSON.parse(text) : {};
    } catch {
      errorData = { message: text || 'Registration failed' };
    }
    throw new Error(errorData.message || 'Registration failed');
  }
  
  return res.json();
};

export const loginUser = async (loginData) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, { // Removed duplicate /api
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
    credentials: 'include'
  });
  
  if (!res.ok) {
    const text = await res.text();
    let errorData;
    try {
      errorData = text ? JSON.parse(text) : {};
    } catch {
      errorData = { message: text || 'Login failed' };
    }
    throw new Error(errorData.message || 'Login failed');
  }
  
  return res.json();
};

export const updateUserProfile = async (profile, token) => {
  const res = await fetch(`${API_BASE_URL}/user/profile`, { // Removed duplicate /api
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    credentials: 'include'
  });
  
  if (!res.ok) {
    const text = await res.text();
    let errorData;
    try {
      errorData = text ? JSON.parse(text) : {};
    } catch {
      errorData = { message: text || 'Update failed' };
    }
    throw new Error(errorData.message || 'Failed to update profile');
  }
  
  return res.json();
};