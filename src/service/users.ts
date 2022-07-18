import API from './axios';

class UserService {
  getUsers = async () => {
    return await API.get('/users');
  };
}

export default new UserService();
