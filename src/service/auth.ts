import axios from 'axios';
import { BASEURL } from '../constants';
import { IUserPostData, AuthResponse } from '../models/index';
import API from './axios';

class AuthService {
  async login(postData: IUserPostData) {
    return await API.post<AuthResponse>('/auth/login', postData);
  }
  async registration(postData: IUserPostData) {
    return await API.post('/auth/registration', postData);
  }
  async logout() {
    return await API.post('/auth/logout');
  }
  async refreshToken() {
    return await axios.get(`${BASEURL}api/auth/refresh`, { withCredentials: true });
  }
}

export default new AuthService();
