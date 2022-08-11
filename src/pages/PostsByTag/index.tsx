import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Alert from 'components/Alert';
import { TagsBlock } from 'components/TagsBlock/TagsBlock';
import { Post } from 'components/Post';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchPostsByTag, getTags } from 'store/actions/post';
import { useParams } from 'react-router-dom';

import styles from './postsByTag.module.scss';
import { Typography } from '@mui/material';
import { BASEURL } from '../../constants';
import Loader from 'components/Loader';

export const PostsByTag = () => {
  const dispatch = useAppDispatch();
  const { tag } = useParams();

  useEffect(() => {
    if (tag) {
      dispatch(fetchPostsByTag(tag));
    }
    // dispatch(getTags());
  }, [tag, dispatch]);

  const { items, isLoading, error } = useAppSelector((state) => state.posts);

  return (
    <>
      {error && <Alert openState={true} message="error" />}
      <Typography className={styles.title} variant="h4">{`Статьи по тегу #${tag}`}</Typography>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid container spacing={3} sx={{ marginTop: '24px', marginLeft: 0, width: '100%' }}>
          {items.map((item) => (
            <Grid
              className={styles.postWrapper}
              lg={6}
              md={9}
              xl={6}
              key={item.id}
              sx={{ display: 'flex', padding: 2 }}>
              <Post
                className={styles.root}
                id={item.id}
                title={item.title}
                text={item.text}
                imageUrl={`${BASEURL}/${item.previewImage}`}
                user={{
                  id: item.user.id,
                  fullName: item.user.fullName,
                  rating: item.user.rating,
                }}
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
