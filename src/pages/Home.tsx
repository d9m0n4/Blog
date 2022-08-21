import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { TagsBlock } from 'components/TagsBlock/TagsBlock';
import { TopUsers } from 'components/TopUsers';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchAllPosts, getTags } from 'store/actions/post';
import Alert from 'components/Alert';
import { BASEURL } from '../constants';
import { IUser } from 'models';
import users from 'service/users';
import { PostSkeleton } from 'components/Post/Skeleton';

export const Home = () => {
  const dispatch = useAppDispatch();
  const [popUsers, setPopUsers] = useState<IUser[]>([]);

  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(getTags());
    users
      .getUsers()
      .then(({ data }) => {
        setPopUsers(data);
      })
      .catch((error) => console.log(error));
  }, [dispatch]);

  const { items, tags, isLoading, error } = useAppSelector((state) => state.posts);

  return (
    <>
      {error && <Alert openState={true} message={'error'} />}
      <TagsBlock items={tags} isLoading={isLoading} />
      <Grid container spacing={3}>
        <Grid xs={8} item>
          {items.length ? (
            items.map((item) => (
              <Post
                key={item.id}
                id={item.id}
                title={item.title}
                imageUrl={item.previewImage}
                user={{
                  id: item.user.id,
                  avatarUrl: item.user.avatar,
                  fullName: item.user.fullName,
                  rating: item.user.rating,
                }}
                createdAt={item.createdAt}
                viewsCount={item.viewsCount}
                commentsCount={item.comments?.length}
                tags={item.tags}
                likesCount={item.likes}
                isLoading={isLoading}
                text={item.text}></Post>
            ))
          ) : (
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          )}
        </Grid>
        <Grid xs={4} item>
          <Grid item sx={{ position: 'sticky', top: '80px' }}>
            <TopUsers items={popUsers} isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
