import { useAppSelector } from 'hooks/redux';
import { IPost } from 'models';
import { FullPost } from 'pages/FullPost';
import React from 'react';
import { useParams } from 'react-router-dom';
import posts from 'service/posts';

const FullPostContainer = () => {
  const { id } = useParams();
  const { items } = useAppSelector((state) => state.posts);
  const [postData, setPostData] = React.useState<IPost | undefined>();
  const [isLoading, setIsLoading] = React.useState(false);

  const { user, isAuth } = useAppSelector((state) => state.auth);

  const fetchPost = async (id: string) => {
    return await posts
      .getPostById(id)
      .then(({ data }) => {
        setPostData(data);
      })
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    if (id) {
      setPostData(items.find((item) => item.id === id));
    }
  }, [id, items]);

  React.useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  return (
    <FullPost
      postData={postData}
      user={user}
      isAuth={isAuth}
      setPostData={setPostData}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  );
};

export default FullPostContainer;
