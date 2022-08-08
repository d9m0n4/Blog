import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { CommentsBlock } from '../components/CommentsBlock/CommentsBlock';
import { TagsBlock } from 'components/TagsBlock/TagsBlock';
import { TabsComponent } from 'components/Tabs';
import { TopUsers } from 'components/TopUsers';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchAllPosts, getTags } from 'store/actions/post';
import Alert from 'components/Alert';
import Loader from 'components/Loader';
import { BASEURL } from '../constants';
import { IComment, IUser } from 'models';
import users from 'service/users';

export const Home = () => {
  const dispatch = useAppDispatch();
  const [popUsers, setPopUsers] = useState<IUser[]>([]);
  const [comments, setComments] = useState<IComment[] | null>(null);

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
  useEffect(() => {
    let b = [] as IComment[];
    items.forEach((item) => {
      const a = item.comments.flat();
      if (a.length > 0) {
        a.forEach((comment) => b.push(comment));
      }
    });
    setComments(b);

    // const q = items.map((item) => item.comments);
    // const flatten = (arr: any) => [].concat(...arr);
    // console.log(q.flat());

    // console.log(flatten(q));
  }, [items]);
  return (
    <>
      {error && <Alert openState={true} message={'error'} />}
      <TagsBlock items={tags} isLoading={isLoading} />
      <Grid container spacing={3}>
        <Grid xs={8} item>
          <Grid>
            {items.length
              ? items.map((item) => (
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
                    text={item.text}></Post>
                ))
              : 'не найдено'}
          </Grid>
        </Grid>
        <Grid xs={4} item>
          <Grid sx={{ position: 'sticky', top: '80px' }}>
            <TopUsers items={popUsers} isLoading={isLoading} />
            {comments && <CommentsBlock items={comments} isLoading={isLoading} />}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
