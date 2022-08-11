import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import styles from './Post.module.scss';
import { PostSkeleton } from './Skeleton';
import { Link, NavLink } from 'react-router-dom';
import { UserInfo } from 'components/UserInfo';
import { useAppSelector } from 'hooks/redux';
import { toDate } from 'utils/toDate';
import posts from 'service/posts';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';

export const Post: React.FC<any> = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  isFullPost,
  isLoading,
  likesCount,
  text,
}) => {
  const { user: currentUser, isAuth } = useAppSelector((state) => state.auth);
  const [isLiked, setIsLiked] = useState(
    likesCount && currentUser && likesCount.includes(currentUser.id),
  );
  const [likes, setLikes] = useState<string[]>(likesCount ? likesCount : []);

  let isEditable = currentUser && user.id === currentUser?.id;

  const onClickRemove = () => {};

  useEffect(() => {
    setIsLiked(currentUser && likes.includes(currentUser.id));
  }, [likes, currentUser]);

  const handleLike = () => {
    if (isAuth) {
      return posts.likePost(id).then(({ data }) => {
        setLikes(data);
      });
    }
  };

  if (isLoading) {
    return <PostSkeleton />;
  }

  const cutText = (text: string) => {
    return text.substring(0, 90) + '...';
  };

  return (
    <>
      <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
        <div className={styles.info}>
          <div className={styles.indention}>
            {isFullPost && (
              <div className={styles.author}>
                <NavLink
                  to={isEditable ? `/profile` : `/user/${user.id}`}
                  className={styles.userLink}>
                  <UserInfo
                    avatarUrl={user.avatarUrl}
                    fullName={user.fullName}
                    rating={user.rating}
                    onlyAvatar={false}
                  />
                </NavLink>
                <span className={styles.date}>{toDate(createdAt)}</span>
              </div>
            )}
            <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
              {isFullPost ? title : <NavLink to={`/posts/${id}`}>{title}</NavLink>}
            </h2>

            <ul className={clsx(styles.tags, { [styles.padding]: isFullPost })}>
              {tags &&
                tags.map((name: string) => (
                  <li key={name}>
                    <Link to={`/tag/${name}`}>#{name}</Link>
                  </li>
                ))}
            </ul>
            {text && (
              <div className={clsx(styles.content, { [styles.last]: isFullPost })}>
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  children={isFullPost ? text : cutText(text)}
                />
              </div>
            )}
            <ul className={styles.postDetails}>
              <li>
                <EyeIcon />
                <span>{viewsCount}</span>
              </li>
              <li className={styles.postDetailItem}>
                <Link to={`/posts/${id}/#comments`}>
                  <CommentIcon />
                  <span>{commentsCount}</span>
                </Link>
              </li>
              {
                <li
                  className={clsx(styles.postDetailItem, { [styles.liked]: isLiked })}
                  onClick={handleLike}>
                  <FavoriteBorderIcon />
                  <span>{likes.length}</span>
                </li>
              }
            </ul>
          </div>
        </div>
        {isEditable && (
          <div className={clsx(styles.editButtons, { [styles.Top]: isFullPost })}>
            <Link to={`/posts/edit/${id}`}>
              <IconButton color="info">
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton onClick={onClickRemove} color="secondary">
              <DeleteIcon />
            </IconButton>
          </div>
        )}
        {imageUrl && (
          <div className={clsx(styles.imageWrapper, { [styles.imageHeight]: isFullPost })}>
            <img
              className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
              src={imageUrl}
              alt={title}
              loading="lazy"
            />
          </div>
        )}
      </div>
    </>
  );
};
