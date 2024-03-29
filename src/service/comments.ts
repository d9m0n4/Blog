import API from './axios';

class CommentsService {
  createComment = async (postData: FormData) => {
    return await API.post('/comments', postData);
  };
  getUserComments = async (id: string) => {
    return await API.get(`/comments/user/${id}`);
  };
}

export default new CommentsService();
