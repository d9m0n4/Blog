import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';

import { SideBlock } from '../../Shared/SideBlock';
import { UserInfo } from '../../Shared/UserAvatar';

import { ICommentsBlock } from '../../../models';
import { toDate } from 'utils/toDate';

import { useAppSelector } from 'hooks/redux';
import styles from './commentsBlock.module.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ImageModal from 'components/Shared/ImageModal';

export const CommentsBlock = () => {
  const { isLoading } = useAppSelector((state) => state.posts);
  const { currentPost } = useAppSelector((state) => state.posts);

  const { hash, pathname, key } = useLocation();

  const [image, setImage] = React.useState<string>('');
  const [open, setOpen] = React.useState(false);

  const openModal = (e: any) => {
    setImage(e.target.src);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const comments = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (comments.current) {
      if (hash) {
        setTimeout(() => {
          if (comments.current) {
            comments.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, 0);
      }
    }
  }, [hash, pathname, key]);

  return (
    <>
      <ImageModal open={open} handleClose={handleClose} image={image} />
      <div ref={comments} id="comments">
        <SideBlock title="Комментарии">
          {
            <List>
              {isLoading && (
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Skeleton variant="circular" width={40} height={40} />
                  </ListItemAvatar>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Skeleton variant="text" height={25} width={120} />
                    <Skeleton variant="text" height={18} width={230} />
                  </div>
                </ListItem>
              )}
              {currentPost &&
                currentPost.comments.map((comment) => (
                  <React.Fragment key={comment.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Link to={`/user/${comment.user.id}/`}>
                          <UserInfo
                            avatarUrl={comment.user.avatar?.thumb}
                            fullName={comment.user.fullName}
                            onlyAvatar
                          />
                        </Link>
                      </ListItemAvatar>

                      <div className={styles.commentsItem}>
                        <div className={styles.commentsTop}>
                          <p className={styles.commentsUserName}> {comment.user?.fullName}</p>
                          <span className={styles.commentsDate}>
                            {toDate(comment.createdAt, { hour: 'numeric', minute: 'numeric' })}
                          </span>
                        </div>
                        <div>
                          <p>{comment.text}</p>
                          {comment.files && (
                            <div className={styles.commentsImagesBlock}>
                              {comment.files.map((file) => (
                                <div key={file.id} className={styles.commentsImageWrapper}>
                                  <LazyLoadImage
                                    placeholderSrc="data:image/gif;base64,R0lGODlhCgAIAIABAN3d3f///yH5BAEAAAEALAAAAAAKAAgAAAINjAOnyJv2oJOrVXrzKQA7"
                                    width={'100%'}
                                    height={'100%'}
                                    effect="blur"
                                    className={styles.commentsImage}
                                    src={file.thumb}
                                    alt={file.public_id}
                                    onClick={openModal}
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
            </List>
          }
        </SideBlock>
      </div>
    </>
  );
};
