import { IUserPostData } from './../types/index';
import { API } from './axios';

class AuthService {
  async login(postData: IUserPostData) {
    return await API.post('/auth/login', postData);
  }
}

export default new AuthService();
