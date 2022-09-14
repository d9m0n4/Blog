import React from 'react';
import { IPost, IUser } from 'models';
import { Post } from 'components/Layout/Post';
import { AddComment } from '../components/Layout/AddComment';
import { CommentsBlock } from 'components/Layout/CommentsBlock/CommentsBlock';
import PageProgress from 'components/UI/PageProgress';

interface IFullPost {
  postData: IPost | null;
  user: IUser | null;
  isAuth: boolean;
}

export const FullPost: React.FC<IFullPost> = React.memo(({ postData, user, isAuth }) => {
  return (
    <>
      {postData && (
        <>
          <PageProgress />
          <Post
            id={postData.id}
            title={postData.title}
            image={postData.previewImage}
            user={postData.user}
            createdAt={postData.createdAt}
            viewsCount={postData.viewsCount}
            commentsCount={postData?.comments?.length}
            tags={postData.tags}
            likesCount={postData.likes}
            text={postData.text}
            isFullPost
          />

          {isAuth && user && <AddComment />}

          {postData.comments.length > 0 && <CommentsBlock />}
        </>
      )}
    </>
  );
});
