import React, { useEffect } from 'react';

import Grid from '@mui/material/Grid';

import Alert from 'components/Shared/Alert';
import { Post } from 'components/Layout/Post';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchPostsByTag } from 'store/actions/post';
import { useParams } from 'react-router-dom';

import styles from './postsByTag.module.scss';
import { Typography } from '@mui/material';
import Loader from 'components/UI/Loader';

const PostsByTag = () => {
  const dispatch = useAppDispatch();
  const { tag } = useParams();

  useEffect(() => {
    if (tag) {
      dispatch(fetchPostsByTag(tag));
    }
  }, [tag, dispatch]);

  const { items, isLoading, error } = useAppSelector((state) => state.posts);

  return (
    <>
      {/* <Alert open={!!error} message={error} /> */}
      <Typography className={styles.title} variant="h4">{`Статьи по тегу #${tag}`}</Typography>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid container spacing={3} sx={{ marginTop: '24px', marginLeft: 0, width: '100%' }}>
          {items.map((item) => (
            <Grid
              item
              className={styles.postWrapper}
              lg={6}
              md={9}
              xl={6}
              sm={12}
              key={item.id}
              sx={{ display: 'flex', padding: 2, paddingLeft: 2, paddingTop: 2 }}>
              <Post
                id={item.id}
                title={item.title}
                text={item.text}
                image={item.previewImage}
                user={item.user}
                createdAt={item.createdAt}
                viewsCount={item.viewsCount}
                commentsCount={item.comments?.length}
                tags={item.tags}
                likesCount={item.likes}
                isLoading={isLoading}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default PostsByTag;
