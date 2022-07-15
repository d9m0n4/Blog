import { IUser, IUserPostData } from './../types/index';
import { API } from './axios';

class AuthService {
  async login(postData: IUserPostData) {
    return await API.post<IUser>('/auth/login', postData);
  }
  async registration(postData: IUserPostData) {
    return await API.post('/auth/registration', postData);
  }
}

export default new AuthService();
