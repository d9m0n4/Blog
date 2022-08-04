import React from 'react';
import { Grid } from '@mui/material';
import { Post } from 'components/Post';
import { BASEURL } from '../../../constants';
import { IPost } from 'models';

const Posts = () => {
  return (
    <>
      {/* {postsData?.map((post) => (
        <Grid item key={post.id}>
          <Post
            id={post.id}
            user={{
              id,
            }}
            title={post.title}
            imageUrl={`${BASEURL}/${post.previewImage}`}
            viewsCount={post.viewsCount}
            commentsCount={post.comments?.length}
            tags={post.tags}
            likesCount={post.likes}
          />
        </Grid>
      ))} */}
    </>
  );
};

export default Posts;
