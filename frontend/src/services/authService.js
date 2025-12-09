import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

class AuthService {
  async register(username, password, email) {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password,
      email
    });
    
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  }
  
  async login(username, password) {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password
    });
    
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  }
  
  logout() {
    localStorage.removeItem('user');
  }
  
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  
  getAuthHeader() {
    const user = this.getCurrentUser();
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return {};
  }
}

export default new AuthService();
