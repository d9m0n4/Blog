import React, { memo } from 'react';

import { SideBlock } from './SideBlock';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import { ICommentsBlock } from '../models';
import { BASEURL } from '../constants';
import { UserInfo } from './UserInfo';
import { Link } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';

export const CommentsBlock: React.FC<ICommentsBlock> = memo(({ items, isLoading }) => {
  return (
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
                    <Link to={`/user/${comment.user.id}/posts`}>
                      <UserInfo
                        avatarUrl={comment.user.avatar}
                        fullName={comment.user.fullName}
                        onlyAvatar={true}
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
                  <>
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: 1,
                          }}>
                          <Typography variant="body1">{comment.user?.fullName}</Typography>
                          <Typography sx={{ color: 'gray' }} variant="body1">
                            {comment.createdAt}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Stack>
                          <Typography sx={{ padding: 1, color: '#333' }} variant="body1">
                            {comment.text}
                          </Typography>
                          <Box sx={{ display: 'flex' }}>
                            {comment.files.map((file) => (
                              <div key={file} style={{ margin: '2px' }}>
                                <img
                                  style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                                  src={`${BASEURL}${file}`}
                                  alt=""
                                />
                              </div>
                            ))}
                          </Box>
                        </Stack>
                      }
                    />
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
