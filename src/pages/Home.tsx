import React from 'react';

import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { CommentsBlock } from '../components/CommentsBlock';
import { TagsBlock } from 'components/TagsBlock/TagsBlock';
import { TabsComponent } from 'components/Tabs';
import { TopUsers } from 'components/TopUsers';

export const Home = () => {
  return (
    <>
      <TagsBlock items={['react', 'typescript', 'заметки']} isLoading={false} />
      <TabsComponent />
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {[...Array(5)].map((_, i) => (
            <Post
              id={i}
              title="Roast the code #1 | Rock Paper Scissors"
              imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
              user={{
                avatarUrl:
                  'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                fullName: 'Дмитрий Чесноков',
                rating: 367,
              }}
              createdAt={'12 июня 2022 г.'}
              viewsCount={150}
              commentsCount={3}
              tags={['react', 'fun', 'typescript']}
              isEditable>
              {
                <p>
                  Hey there! 👋 I'm starting a new series called "Roast the Code", where I will
                  share some code, and let YOU roast and improve it. There's not much more to it,
                  just be polite and constructive, this is an exercise so we can all learn together.
                  Now then, head over to the repo and roast as hard as you can!!
                </p>
              }
            </Post>
          ))}
        </Grid>
        <Grid xs={4} item>
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
            isLoading={false}
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
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
