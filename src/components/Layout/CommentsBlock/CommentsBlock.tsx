import React, { memo } from 'react';

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

export const CommentsBlock: React.FC<ICommentsBlock> = memo(({ items }) => {
  const { isLoading } = useAppSelector((state) => state.posts);

  const { hash, pathname, key } = useLocation();

  const comments = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (comments.current) {
      if (hash) {
        setTimeout(() => {
          const hashId = hash.replace('#', '');
          const element = document.getElementById(hashId);

          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 0);
      }
    }
  }, [hash, pathname, key]);

  return (
    <>
      <div ref={comments} id="comments">
        <SideBlock title="Комментарии">
          {items && (
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
              {items.map((comment) => (
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
                                <img
                                  className={styles.commentsImage}
                                  src={file.thumb}
                                  alt={file.public_id}
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
          )}
        </SideBlock>
      </div>
    </>
  );
});
