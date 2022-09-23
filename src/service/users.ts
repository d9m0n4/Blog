import API from './axios';

class UserService {
  getUsers = async () => {
    return await API.get('/users');
  };
  getUserById = async (id: string) => {
    return await API.get(`/users/${id}`);
  };
  updateUserInfo = async (postData: FormData) => {
    return await API.post('/users/update', postData);
  };
}

export default new UserService();
