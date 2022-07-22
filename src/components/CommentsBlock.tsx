import React, { memo } from 'react';

import { SideBlock } from './SideBlock';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import { ICommentsBlock } from '../models';
import { BASEURL } from '../constants';
import { UserInfo } from './UserInfo';

export const CommentsBlock: React.FC<ICommentsBlock> = memo(({ items, isLoading }) => {
  console.log(items);

  return (
    <SideBlock title="Последние комментарии">
      {items && (
        <List>
          {items.map((comment) => (
            <React.Fragment key={comment.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  {isLoading ? (
                    <Skeleton variant="circular" width={40} height={40} />
                  ) : (
                    <UserInfo
                      avatarUrl={comment.user.avatar}
                      fullName={comment.user.fullName}
                      onlyAvatar={true}
                    />
                  )}
                </ListItemAvatar>
                {isLoading ? (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Skeleton variant="text" height={25} width={120} />
                    <Skeleton variant="text" height={18} width={230} />
                  </div>
                ) : (
                  <>
                    <ListItemText primary={comment.user?.fullName} secondary={comment.text} />
                    {comment.files.map((file) => (
                      <span key={file} style={{ margin: '2px' }}>
                        <img
                          style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                          src={`${BASEURL}${file}`}
                          alt=""
                        />
                      </span>
                    ))}
                  </>
                )}
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
    </SideBlock>
  );
});
