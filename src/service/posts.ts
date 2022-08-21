import { IPost } from '../models/index';
import API from './axios';

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
  async fetchPostsByTag(tag: string) {
    return await API.get(`/posts/tags/${tag}`);
  }
  async fetchUserPosts(id: string) {
    return await API.get(`/posts/user/${id}`);
  }
  async searchPosts(query: string) {
    return await API.get(`/posts?query=${query}`);
  }
  async getTags() {
    return await API.get('/tags');
  }
  async likePost(id: any) {
    return await API.post('/posts/like', { id });
  }
  async uploadImage(file: FormData) {
    return await API.post('/upload', file);
  }
  async updatePost(post: FormData, id: string) {
    console.log(post);

    return await API.post(`/posts/edit/${id}`, post);
  }
}

export default new PostService();
