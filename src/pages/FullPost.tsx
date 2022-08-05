import { IPost, IUser } from 'models';
import { BASEURL } from '../constants';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Post } from 'components/Post';
import PageProgress from 'components/PageProgress';
import { AddComment } from '../components/AddComment';
import { CommentsBlock } from 'components/CommentsBlock/CommentsBlock';

interface IFullPost {
  postData: IPost | undefined;
  user: IUser;
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
            imageUrl={`${BASEURL}/${postData.previewImage}`}
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

          {isAuth && <AddComment user={user} postId={postData.id} />}
          {postData.comments.length > 0 && (
            <CommentsBlock items={postData.comments} isLoading={false} />
          )}
        </>
      )}
    </>
  );
};
