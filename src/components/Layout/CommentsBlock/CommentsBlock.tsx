import React, { memo } from 'react';

import { SideBlock } from '../../Shared/SideBlock';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import { ICommentsBlock } from '../../../models';
import { UserInfo } from '../../Shared/UserAvatar';
import { Link } from 'react-router-dom';
import { toDate } from 'utils/toDate';

import styles from './commentsBlock.module.scss';

export const CommentsBlock: React.FC<ICommentsBlock> = memo(({ items, isLoading }) => {
  return (
    <>
      <div id="comments">
        <SideBlock title="Комментарии">
          {items && (
            <List>
              {items.map((comment) => (
                <React.Fragment key={comment.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      {isLoading ? (
                        <Skeleton variant="circular" width={40} height={40} />
                      ) : (
                        <Link to={`/user/${comment.user.id}/`}>
                          <UserInfo
                            avatarUrl={comment.user.avatar?.thumb}
                            fullName={comment.user.fullName}
                            onlyAvatar
                          />
                        </Link>
                      )}
                    </ListItemAvatar>
                    {isLoading ? (
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Skeleton variant="text" height={25} width={120} />
                        <Skeleton variant="text" height={18} width={230} />
                      </div>
                    ) : (
                      <div className={styles.commentsItem}>
                        <div className={styles.commentsTop}>
                          <p className={styles.commentsUserName}> {comment.user?.fullName}</p>
                          <span className={styles.commentsDate}>
                            {toDate(comment.createdAt, { hour: 'numeric', minute: 'numeric' })}
                          </span>
                        </div>
                        <div>
                          <p>{comment.text}</p>
                          {comment.assets && (
                            <div className={styles.commentsImagesBlock}>
                              {comment.assets.map((file) => (
                                <div key={file.id} className={styles.commentsImageWrapper}>
                                  <img className={styles.commentsImage} src={file.thumb} alt="" />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
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
