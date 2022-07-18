import { IUserPostData, AuthResponse } from '../models/index';
import API from './axios';

class AuthService {
  async login(postData: IUserPostData) {
    return await API.post<AuthResponse>('/auth/login', postData);
  }
  async registration(postData: IUserPostData) {
    return await API.post('/auth/registration', postData);
  }
}

export default new AuthService();
