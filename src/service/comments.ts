import API from './axios';

class CommentsService {
  createComment = async (postData: any) => {
    return await API.post('/comments', postData);
  };
}

export default new CommentsService();
