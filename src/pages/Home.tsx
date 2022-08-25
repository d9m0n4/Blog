import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import { Post } from '../components/Layout/Post';
import { TagsBlock } from 'components/Layout/TagsBlock/TagsBlock';
import { TopUsers } from 'components/Layout/TopUsers';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchAllPosts, getTags } from 'store/actions/post';
import Alert from 'components/Shared/Alert';
import { IUser } from 'models';
import users from 'service/users';
import { PostSkeleton } from 'components/Layout/Post/Skeleton';

const Home = () => {
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

  const i = React.useMemo(() => items, [items]);
  const t = React.useMemo(() => tags, [tags]);

  return (
    <>
      {error && <Alert openState={true} message={'error'} />}

      <Grid container spacing={3}>
        <Grid xs={8} item>
          <TagsBlock items={t} isLoading={isLoading} />

          {i.length ? (
            i.map((item) => (
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
        <Grid xs={4} item sx={{ marginTop: 7 }}>
          <Grid item sx={{ position: 'sticky', top: '90px' }}>
            <TopUsers items={popUsers} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
