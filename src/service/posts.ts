import { IPosts, IPost, postsQuery } from './../models/index';
import API from './axios';

class PostService {
  async getAll({ page, limit }: postsQuery) {
    return await API.get<IPosts>(`/posts?page=${page}&limit=${limit}`);
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
    return await API.get(`/posts?search=${query}`);
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
    return await API.post(`/posts/edit/${id}`, post);
  }
  async deletePost(id: string) {
    return await API.post('/posts/delete', { id });
  }
  async getPopularPosts() {
    return await API.get('/posts/popular');
  }
}

export default new PostService();
