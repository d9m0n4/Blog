import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Post } from 'components/Layout/Post';
import { CurrentUserData } from 'models';
import { useOutletContext } from 'react-router-dom';

const Posts = () => {
  const userData = useOutletContext<CurrentUserData>();

  return (
    <>
      {userData.posts.length > 0 ? (
        userData.posts?.map((post) => (
          <Grid item key={post.id}>
            <Post
              id={post.id}
              user={userData}
              title={post.title}
              image={post.previewImage}
              viewsCount={post.viewsCount}
              commentsCount={post.comments?.length}
              tags={post.tags}
              likesCount={post.likes}
              createdAt={post.createdAt}
              text={''}
            />
          </Grid>
        ))
      ) : (
        <Typography>Здесь пока ни чего нет...</Typography>
      )}
    </>
  );
};

export default Posts;
