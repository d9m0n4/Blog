import React, { useEffect, useState } from 'react';

import posts from 'service/posts';
import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { useParams } from 'react-router-dom';
import { IPost } from 'types';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const FullPost = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState<IPost>();

  const fetchPost = async (id: string) => {
    return await posts.getPostById(id).then(({ data }) => {
      setPostData(data);
    });
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
          <Post
            id={1}
            title={postData?.title}
            imageUrl={`http://localhost:5000/${postData?.previewImage}`}
            user={{
              avatarUrl: postData?.user.avatar,
              fullName: postData?.user.fullName,
              rating: postData?.user.rating,
            }}
            createdAt={postData?.createdAt}
            viewsCount={postData?.views}
            commentsCount={postData?.comments?.length}
            tags={postData?.tags}
            isFullPost>
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
          <Index />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий 555555',
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
        </>
      )}
    </>
  );
};
