import { IPost } from './../types/index';
import { API } from './axios';

class PostService {
  async getAll() {
    return await API.get<IPost>('/posts');
  }
  async getPostById(id: string) {
    return await API.get<IPost>(`/posts/${id}`);
  }
  async createPost(postData: FormData) {
    return await API.post('/posts', postData);
  }
  async getTags() {
    return await API.get('/tags');
  }
}

export default new PostService();
