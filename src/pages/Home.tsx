import React, { useEffect, useState } from 'react';

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
import { IUser } from 'models';
import users from 'service/users';

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
            <TopUsers items={popUsers} isLoading={isLoading} />
            {/* <CommentsBlock
              items={}
              isLoading={isLoading}
            /> */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
