import React from 'react';
import { IPost, IUser } from 'models';
import { BASEURL } from '../constants';
import { Post } from 'components/Post';
import { AddComment } from '../components/AddComment';
import { CommentsBlock } from 'components/CommentsBlock/CommentsBlock';
import PageProgress from 'components/PageProgress';

interface IFullPost {
  postData: IPost | undefined;
  user: IUser | null;
  isAuth: boolean;
}

export const FullPost: React.FC<IFullPost> = ({ postData, user, isAuth }) => {
  return (
    <>
      {postData && (
        <>
          <PageProgress />
          <Post
            id={postData.id}
            title={postData.title}
            imageUrl={postData.previewImage}
            user={{
              id: postData.user.id,
              avatarUrl: postData.user.avatar,
              fullName: postData.user.fullName,
              rating: postData.user.rating,
            }}
            createdAt={postData.createdAt}
            viewsCount={postData.viewsCount}
            commentsCount={postData?.comments?.length}
            tags={postData.tags}
            likesCount={postData.likes}
            text={postData.text}
            isFullPost
            isEditable
          />

          {isAuth && user && (
            <AddComment user={user} postId={postData.id} currentComments={postData.comments} />
          )}
          {postData.comments.length > 0 && (
            <CommentsBlock items={postData.comments} isLoading={false} />
          )}
        </>
      )}
    </>
  );
};
