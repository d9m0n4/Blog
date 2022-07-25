import { Grid } from '@mui/material';
import { Post } from 'components/Post';
import { BASEURL } from '../../../constants';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import posts from 'service/posts';
import { IPost } from 'models';

const Posts = () => {
  const { id } = useParams();
  const [postsData, setPostsData] = useState<IPost[]>();

  useEffect(() => {
    if (id) {
      posts
        .fetchUserPosts(id)
        .then(({ data }) => setPostsData(data))
        .catch((e) => console.log(e));
    }
  }, []);

  return (
    <>
      {postsData?.map((post) => (
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
      ))}
    </>
  );
};

export default Posts;
