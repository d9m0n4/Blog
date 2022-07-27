import React, { useEffect, useState } from 'react';

import posts from 'service/posts';
import { Post } from '../components/Post';
import { AddComment } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { useParams } from 'react-router-dom';
import { IPost } from 'models';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { BASEURL } from '../constants';
import { useAppSelector } from 'hooks/redux';
import PageProgress from 'components/PageProgress';

export const FullPost = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState<IPost>();

  const { user, isAuth } = useAppSelector((state) => state.auth);

  const fetchPost = async (id: string) => {
    return await posts
      .getPostById(id)
      .then(({ data }) => {
        setPostData(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

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
            isFullPost
            isEditable>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              children={postData.text}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      language="javascript"
                      style={dark}
                      children={postData.text}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            />
          </Post>
          {isAuth && <AddComment user={user} postId={postData.id} />}
          {postData.comments.length > 0 && (
            <CommentsBlock items={postData.comments} isLoading={false} />
          )}
        </>
      )}
    </>
  );
};
