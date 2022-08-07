import React from 'react';
import { Grid } from '@mui/material';
import { Post } from 'components/Post';
import { BASEURL } from '../../../constants';
import { CurrentUserData, IPost } from 'models';
import { useOutletContext } from 'react-router-dom';

const Posts = () => {
  const userData = useOutletContext<CurrentUserData>();

  return (
    <>
      {userData.posts?.map((post) => (
        <Grid item key={post.id}>
          <Post
            id={post.id}
            user={{
              id: userData.id,
            }}
            title={post.title}
            imageUrl={`${BASEURL}/${post.previewImage}`}
            viewsCount={post.viewsCount}
            commentsCount={post.comments?.length}
            tags={post.tags}
            likesCount={post.likes}
          />
        </Grid>
      ))}
    </>
  );
};

export default Posts;
