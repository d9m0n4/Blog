import React, { useEffect } from 'react';

import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { CommentsBlock } from '../components/CommentsBlock';
import { TagsBlock } from 'components/TagsBlock/TagsBlock';
import { TabsComponent } from 'components/Tabs';
import { TopUsers } from 'components/TopUsers';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchAllPosts, getTags } from 'store/actions/post';
import Alert from 'components/Alert';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Loader from 'components/Loader';
import { BASEURL } from '../constants';

export const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(getTags());
  }, [dispatch]);

  const { items, tags, isLoading, error } = useAppSelector((state) => state.posts);

  return (
    <>
      {error && <Alert openState={true} message={'error'} />}
      <TagsBlock items={tags} isLoading={isLoading} />
      <TabsComponent />
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {isLoading ? (
            <Loader />
          ) : (
            items.map((item) => (
              <Post
                key={item.id}
                id={item.id}
                title={item.title}
                imageUrl={`${BASEURL}/${item.previewImage}`}
                user={{
                  avatarUrl:
                    'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                  fullName: item.user.fullName,
                  rating: item.user.rating,
                }}
                createdAt={item.createdAt}
                viewsCount={item.views}
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
            ))
          )}
        </Grid>
        <Grid xs={4} item>
          <Grid sx={{ position: 'sticky', top: '80px' }}>
            <TopUsers
              items={[
                {
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                  fullName: 'Иван Иванов',
                  rating: 367,
                },
                {
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                  fullName: 'Василий Пупкин',
                  rating: 343,
                },
                {
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                  fullName: 'Петр Петров',
                  rating: 212,
                },
                {
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                  fullName: 'Сергеев Сергей',
                  rating: 156,
                },
                {
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                  fullName: 'Дмитрий Чесноков',
                  rating: 11,
                },
              ]}
              isLoading={isLoading}
            />
            <CommentsBlock
              items={[
                {
                  user: {
                    fullName: 'Вася Пупкин',
                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                  },
                  text: 'Это тестовый комментарий',
                },
                {
                  user: {
                    fullName: 'Иван Иванов',
                    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                  },
                  text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                },
              ]}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
