import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const api = axios.create({
  baseURL: API_URL,
});
export const signup = async (data) => {
  return await api.post('/signup', data);
};
export const login = async (data) => {
  return await api.post('/login', data);
};
export const changePassword = async (data) => {
  return await api.post('/change-password', data);
};
export const logout = () => {
  localStorage.removeItem('token');
};
