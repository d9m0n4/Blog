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
import { Box, Pagination, Typography } from '@mui/material';
import { DEFAULT_PAGE, PAGE_LIMIT } from '../constants';
import { postActions } from 'store/slices/post';

const Home = () => {
  const dispatch = useAppDispatch();
  const [popUsers, setPopUsers] = useState<IUser[]>([]);

  const { items, count, currentPage, tags, isLoading, error } = useAppSelector(
    (state) => state.posts,
  );

  let pagesCount = Math.ceil(count / PAGE_LIMIT);

  useEffect(() => {
    dispatch(fetchAllPosts({ page: DEFAULT_PAGE, limit: PAGE_LIMIT }));
    dispatch(getTags());
    users
      .getUsers()
      .then(({ data }) => {
        setPopUsers(data);
      })
      .catch((error) => console.log(error));
  }, [dispatch]);

  const i = React.useMemo(() => items, [items]);
  const t = React.useMemo(() => tags, [tags]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(postActions.setCurrentPage(page));
    dispatch(fetchAllPosts({ page: page, limit: PAGE_LIMIT }));
  };

  return (
    <>
      {error && <Alert openState={true} message={'error'} />}

      <Grid container spacing={3}>
        <Grid xs={8} item>
          <Box sx={{ marginBottom: 3 }}>
            <TagsBlock items={t} isLoading={isLoading} />
          </Box>

          <Box sx={{ marginBottom: 3 }}>
            {isLoading ? (
              <PostSkeleton />
            ) : i.length > 0 ? (
              i.map((item) => (
                <Post
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.previewImage}
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
                  text={item.text}
                />
              ))
            ) : (
              <Typography>Посты не найдены</Typography>
            )}
          </Box>
          {count > PAGE_LIMIT && (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
              <Pagination
                page={currentPage}
                defaultPage={DEFAULT_PAGE}
                onChange={handleChangePage}
                sx={{ paddingTop: 2 }}
                count={pagesCount}
              />
            </Box>
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
