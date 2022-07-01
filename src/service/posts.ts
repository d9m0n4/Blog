import { IPost } from './../types/index';
import { API } from './axios';
class PostService {
  async getAll() {
    return await API.get<IPost>('/posts');
  }
}

export default new PostService();
