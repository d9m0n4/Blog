import React, { useEffect, useState } from 'react';

import { Box, Pagination, Typography, useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';

import { PostSkeleton } from 'components/Layout/Post/Skeleton';
import { TagsBlock } from 'components/Layout/TagsBlock/TagsBlock';
import PopularPosts from 'components/Layout/PopularPosts';
import { TopUsers } from 'components/Layout/TopUsers';
import { Post } from '../components/Layout/Post';
import Alert from 'components/Shared/Alert';

import { DEFAULT_PAGE, PAGE_LIMIT } from '../constants';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchAllPosts, getTags } from 'store/actions/post';
import { postActions } from 'store/slices/post';
import { IPost, IUser } from 'models';
import users from 'service/users';
import posts from 'service/posts';

const Home = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const [popUsers, setPopUsers] = useState<IUser[]>([]);
  const [popPosts, setPopPosts] = React.useState<IPost[]>([]);

  const dispatch = useAppDispatch();

  const { items, count, currentPage, tags, isLoading, error } = useAppSelector(
    (state) => state.posts,
  );

  useEffect(() => {
    dispatch(fetchAllPosts({ page: DEFAULT_PAGE, limit: PAGE_LIMIT }));
    dispatch(getTags());

    posts.getPopularPosts().then(({ data }) => setPopPosts(data));

    users
      .getUsers()
      .then(({ data }) => {
        setPopUsers(data);
      })
      .catch((error) => console.log(error));
  }, [dispatch]);

  let pagesCount = Math.ceil(count / PAGE_LIMIT);

  const handleChangePage = React.useCallback(
    (_event: React.ChangeEvent<unknown>, page: number) => {
      dispatch(postActions.setCurrentPage(page));
      dispatch(fetchAllPosts({ page: page, limit: PAGE_LIMIT }));
    },
    [dispatch],
  );

  return (
    <>
      {error && <Alert openState={true} message={error} />}

      <Grid container spacing={3}>
        <Grid xs={12} md={8} item>
          <Box sx={{ marginBottom: 3 }}>
            <TagsBlock items={tags} isLoading={isLoading} />
          </Box>

          <Box sx={{ marginBottom: 3 }}>
            {isLoading ? (
              <PostSkeleton />
            ) : items.length > 0 ? (
              items.map((item) => (
                <Post
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.previewImage}
                  user={item.user}
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
        {matches && (
          <Grid xs={0} md={4} item sx={{ marginTop: 7 }}>
            <Grid item sx={{ position: 'sticky', top: '90px' }}>
              <TopUsers items={popUsers} />
              <PopularPosts items={popPosts} />
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Home;
