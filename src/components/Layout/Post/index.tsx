import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import { UserInfo } from 'components/Shared/UserAvatar';
import { Markdown } from 'components/Shared/ReactMarkDown';
import AlertDialog from 'components/Shared/Dialog';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { toDate } from 'utils/toDate';
import posts from 'service/posts';

import { fetchAllPosts } from 'store/actions/post';
import { PAGE_LIMIT, DEFAULT_PAGE } from '../../../constants';
import { IFile, IUser } from 'models';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import clsx from 'clsx';
import styles from './Post.module.scss';

interface IFullPost {
  id: string;
  title: string;
  createdAt: Date;
  image: IFile;
  user: IUser;
  viewsCount: number;
  commentsCount: number;
  tags: string[] | null;
  isFullPost?: boolean;
  likesCount: string[];
  text: string;
  isLoading?: boolean;
}

export const Post: React.FC<IFullPost> = React.memo(
  ({
    id,
    title,
    createdAt,
    image,
    user,
    viewsCount,
    commentsCount,
    tags,
    isFullPost,
    likesCount,
    text,
  }) => {
    const { user: currentUser, isAuth } = useAppSelector((state) => state.auth);

    const [isLiked, setIsLiked] = useState(
      likesCount && currentUser && likesCount.includes(currentUser.id),
    );
    const [likes, setLikes] = useState<string[]>(likesCount ? likesCount : []);

    let isEditable = currentUser && user.id === currentUser?.id;

    const postContentRef = React.useRef<HTMLDivElement>(null);

    const [isOpenModal, setIsOpenModal] = React.useState(false);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

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
      setIsOpenModal(true);
    };

    const handleCloseModal = () => {
      setIsOpenModal(false);
    };

    const deletePost = async () => {
      await posts
        .deletePost(id)
        .then(() => dispatch(fetchAllPosts({ page: DEFAULT_PAGE, limit: PAGE_LIMIT })))
        .catch((err) => console.log(err));
      setIsOpenModal(false);
      navigate('/');
    };

    return (
      <>
        <AlertDialog
          open={isOpenModal}
          handleClose={handleCloseModal}
          handleSuccess={deletePost}
          title="Удалить пост"
          body={`Вы действительно хотите удалить пост: ${title}`}
        />

        <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
          <div className={styles.info}>
            <div className={styles.indention}>
              {isFullPost && (
                <div className={styles.author}>
                  <NavLink to={`/user/${user.id}`} className={styles.userLink}>
                    <UserInfo
                      avatarUrl={user.avatar?.thumb}
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
          {image && (
            <div className={clsx(styles.imageWrapper, { [styles.imageHeight]: isFullPost })}>
              <LazyLoadImage
                placeholderSrc="data:image/gif;base64,R0lGODlhCgAIAIABAN3d3f///yH5BAEAAAEALAAAAAAKAAgAAAINjAOnyJv2oJOrVXrzKQA7"
                width={'100%'}
                height={'100%'}
                effect="blur"
                className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
                src={isFullPost ? image.url : image.thumb}
                alt={title}
              />
            </div>
          )}
        </div>
      </>
    );
  },
);
