import React, { useState } from 'react';

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

export const PostsByTag = () => {
  const dispatch = useAppDispatch();
  const { tag } = useParams();

  useState(() => {
    if (tag) {
      dispatch(fetchPostsByTag(tag));
    }
    dispatch(getTags());
  });

  const { items, tags, isLoading, error } = useAppSelector((state) => state.posts);

  return (
    <>
      {error && <Alert openState={true} message="error" />}
      <TagsBlock items={tags} isLoading={isLoading} />
      <Grid container spacing={4} sx={{ marginTop: '32px', marginLeft: 0 }}>
        {items.map((item) => (
          <div className={styles.postWrapper}>
            <Post
              className={styles.root}
              id={item.id}
              title={item.title}
              imageUrl={`http://localhost:5000/${item.previewImage}`}
              user={{
                avatarUrl:
                  'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                fullName: item.user.fullName,
                rating: item.user.rating,
              }}
              createdAt={item.createdAt}
              viewsCount={item.viewsCount}
              commentsCount={item.comments?.length}
              tags={item.tags}
              likesCount={item.likes}
              isLoading={isLoading}
              isEditable>
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                children={item.text.split(/\.|-|:|;/, 1).join()}
              />
            </Post>
          </div>
        ))}
      </Grid>
    </>
  );
};
