import API from './axios';

class UserService {
  getUsers = async () => {
    return await API.get('/users');
  };
  updateUserInfo = async (postData: any) => {
    return await API.post('/users/update', postData);
  };
}

export default new UserService();
