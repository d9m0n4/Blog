import { Grid } from '@mui/material';
import { Post } from 'components/Post';
import { BASEURL } from '../../../constants';
import { IPost, IUserContext } from 'models';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import posts from 'service/posts';

const MyPosts = React.memo(() => {
  const { user } = useOutletContext<IUserContext>();
  const [postsData, setPostsData] = useState<IPost[]>();

  useEffect(() => {
    if (user) {
      posts
        .fetchUserPosts(user.id)
        .then(({ data }) => setPostsData(data))
        .catch((e) => console.log(e));
    }
  }, []);

  return (
    <>
      {postsData?.map((post) => (
        <Grid key={post.id} item>
          <Post
            id={post.id}
            user={{
              id: user.id,
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
});

export default MyPosts;
