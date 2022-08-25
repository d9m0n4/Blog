import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import { useAppSelector } from 'hooks/redux';
import { toDate } from 'utils/toDate';
import posts from 'service/posts';

import { UserInfo } from 'components/Shared/UserAvatar';
import { Markdown } from 'components/Shared/ReactMarkDown';

import clsx from 'clsx';

import styles from './Post.module.scss';

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
  likesCount,
  text,
  setOpenModal,
}) => {
  const { user: currentUser, isAuth } = useAppSelector((state) => state.auth);
  const [isLiked, setIsLiked] = useState(
    likesCount && currentUser && likesCount.includes(currentUser.id),
  );
  const [likes, setLikes] = useState<string[]>(likesCount ? likesCount : []);

  let isEditable = currentUser && user.id === currentUser?.id;

  const postContentRef = React.useRef<HTMLDivElement>(null);

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

  const cutText = (text: string) => {
    return text.substring(0, 90) + '...';
  };

  const onClickRemove = () => {
    console.log('remove item');
    setOpenModal(true);
  };

  console.log(commentsCount);

  return (
    <>
      <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
        <div className={styles.info}>
          <div className={styles.indention}>
            {isFullPost && (
              <div className={styles.author}>
                <NavLink to={`/user/${user.id}`} className={styles.userLink}>
                  <UserInfo
                    avatarUrl={user.avatarUrl}
                    fullName={user.fullName}
                    rating={user.rating}
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
              <div
                ref={postContentRef}
                className={clsx(styles.content, { [styles.last]: isFullPost })}>
                <Markdown text={isFullPost ? text : cutText(text)} />
              </div>
            )}
            <ul className={styles.postDetails}>
              <li>
                <EyeIcon />
                <span>{viewsCount}</span>
              </li>
              {commentsCount > 0 ? (
                <li className={styles.postDetailItem}>
                  <Link to={{ pathname: `/posts/${id}`, hash: `#comments` }}>
                    <CommentIcon />
                    <span>{commentsCount}</span>
                  </Link>
                </li>
              ) : (
                <li>
                  <CommentIcon />
                  <span>{commentsCount}</span>
                </li>
              )}
              {currentUser ? (
                <li
                  className={clsx(styles.postDetailItem, { [styles.liked]: isLiked })}
                  onClick={handleLike}>
                  <FavoriteBorderIcon />
                  <span>{likes.length}</span>
                </li>
              ) : (
                <li>
                  <FavoriteBorderIcon />
                  <span>{likes.length}</span>
                </li>
              )}
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
