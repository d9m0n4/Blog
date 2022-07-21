import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import styles from './Post.module.scss';
import { PostSkeleton } from './Skeleton';
import { Link } from 'react-router-dom';
import { UserInfo } from 'components/UserInfo';
import { useAppSelector } from 'hooks/redux';
import { toDate } from 'utils/toDate';

export const Post: React.FC<any> = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
  likesCount,
}) => {
  const { user: currentUser } = useAppSelector((state) => state.auth);

  isEditable = currentUser && user.id === currentUser?.id;

  const onClickRemove = () => {};

  if (isLoading) {
    return <PostSkeleton />;
  }

  return (
    <>
      <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
        <div className={styles.wrapper}>
          <div className={styles.indention}>
            {isFullPost && (
              <div className={styles.author}>
                <UserInfo
                  avatarUrl={user.avatarUrl}
                  fullName={user.fullName}
                  rating={user.rating}
                  onlyAvatar={false}
                />
                <span className={styles.date}>{toDate(createdAt)}</span>
              </div>
            )}
            <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
              {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
            </h2>

            <ul className={styles.tags}>
              {tags &&
                tags.map((name: string) => (
                  <li key={name}>
                    <Link to={`/tag/${name}`}>#{name}</Link>
                  </li>
                ))}
            </ul>
            {children && (
              <div
                className={clsx(
                  styles.content,
                  { [styles.last]: isFullPost },
                  { [styles.preview]: !isFullPost },
                )}>
                {children}
              </div>
            )}
            <ul className={styles.postDetails}>
              <li>
                <EyeIcon />
                <span>{viewsCount}</span>
              </li>
              <li className={styles.postDetailItem}>
                <CommentIcon />
                <span>{commentsCount}</span>
              </li>
              {
                <li className={styles.postDetailItem}>
                  <FavoriteBorderIcon />
                  <span>{likesCount}</span>
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
            />
          </div>
        )}
      </div>
    </>
  );
};
