import axios from 'axios';
import authService from './authService';
import API_BASE_URL from '../config/api';

const API_URL = `${API_BASE_URL}/api/groups`;

class GroupService {
  async getAllGroups() {
    const response = await axios.get(API_URL, {
      headers: authService.getAuthHeader()
    });
    return response.data;
  }
  
  async createGroup(name) {
    const response = await axios.post(API_URL, { name }, {
      headers: authService.getAuthHeader()
    });
    return response.data;
  }
  
  async getGroup(id) {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: authService.getAuthHeader()
    });
    return response.data;
  }
  
  async addMember(groupId, userId) {
    const response = await axios.post(`${API_URL}/${groupId}/members/${userId}`, {}, {
      headers: authService.getAuthHeader()
    });
    return response.data;
  }
  
  async removeMember(groupId, userId) {
    const response = await axios.delete(`${API_URL}/${groupId}/members/${userId}`, {
      headers: authService.getAuthHeader()
    });
    return response.data;
  }
  
  async deleteGroup(id) {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: authService.getAuthHeader()
    });
    return response.data;
  }
}

export default new GroupService();
