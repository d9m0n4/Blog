import React, { Dispatch, SetStateAction } from 'react';
import { IPost, IUser } from 'models';
import { Post } from 'components/Layout/Post';
import { AddComment } from '../components/Layout/AddComment';
import { CommentsBlock } from 'components/Layout/CommentsBlock/CommentsBlock';
import PageProgress from 'components/UI/PageProgress';

interface IFullPost {
  postData: IPost | undefined;
  user: IUser | null;
  isAuth: boolean;
  isLoading: boolean;
  setPostData: Dispatch<SetStateAction<IPost | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const FullPost: React.FC<IFullPost> = ({
  postData,
  user,
  isAuth,
  setPostData,
  isLoading,
  setIsLoading,
}) => {
  return (
    <>
      {postData && (
        <>
          <PageProgress />
          <Post
            id={postData.id}
            title={postData.title}
            image={postData.previewImage}
            user={{
              id: postData.user.id,
              avatar: postData.user.avatar?.thumb,
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
            <AddComment
              user={user}
              postId={postData.id}
              currentComments={postData.comments}
              setPostData={setPostData}
              setIsLoading={setIsLoading}
            />
          )}
          {postData.comments.length > 0 && (
            <CommentsBlock items={postData.comments} isLoading={isLoading} />
          )}
        </>
      )}
    </>
  );
};
