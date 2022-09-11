import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { FullPost } from 'pages/FullPost';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from 'store/actions/post';

const FullPostContainer = () => {
  const { id } = useParams();

  const { currentPost } = useAppSelector((state) => state.posts);
  const { user, isAuth } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (id) {
      dispatch(getPostById(id));
    }
  }, [id, dispatch]);

  return <FullPost postData={currentPost} user={user} isAuth={isAuth} />;
};

export default FullPostContainer;
