import axios from 'axios';

// Fetch the API Base URL from environment or default to local port 5000
const API_BASE_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Automatically extract and inject the Bearer JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('devpulse_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Standardize error formats
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const formattedError = {
      message: error.response?.data?.message || 'Something went wrong with the connection. Please try again.',
      status: error.response?.status,
      errors: error.response?.data?.errors || null
    };
    return Promise.reject(formattedError);
  }
);

// Helper methods to abstract endpoints
export const authAPI = {
  register: (payload) => api.post('/auth/register', payload),
  login: (payload) => api.post('/auth/login', payload),
  getMe: () => api.get('/auth/me')
};

export const profileAPI = {
  getMe: () => api.get('/profile/me'),
  update: (payload) => api.put('/profile/update', payload),
  sync: () => api.post('/profile/sync'),
  full: (payload) => api.post('/profile/full', payload)
};

export const resumeAPI = {
  upload: (formData) => api.post('/resume/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  analyze: (payload) => api.post('/analyzer/analyze', payload),
  tailor: (payload) => api.post('/tailor/tailor', payload)
};

export const codingAPI = {
  getGithub: (username) => api.get(`/github/${username}`),
  getLeetcode: (username) => api.get(`/leetcode/${username}`),
  getCodeforces: (username) => api.get(`/codeforces/${username}`),
  getCodechef: (username) => api.get(`/codechef/${username}`)
};

export const progressAPI = {
  getDashboard: () => api.get('/dashboard'),
  saveProgress: (payload) => api.post('/progress/save', payload),
  getProgress: () => api.get('/progress'),
  updateProgress: (id, payload) => api.put(`/progress/update/${id}`, payload),
  deleteProgress: (id) => api.delete(`/progress/delete/${id}`)
};

export const goalAPI = {
  getGoal: () => api.get('/goals'),
  createGoal: (payload) => api.post('/goals', payload),
  updateGoal: (payload) => api.put('/goals/update', payload)
};

export const contestAPI = {
  getContests: () => api.get('/contests')
};
