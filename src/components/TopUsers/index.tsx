import React, { memo } from 'react';
import { SideBlock } from 'components/SideBlock';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import styles from './TopUsers.module.scss';

export const TopUsers: React.FC<any> = memo(({ items, children, isLoading }) => {
  isLoading = false;
  return (
    <SideBlock title="Популярные авторы">
      <List>
        {items.map((user: any, index: any) => (
          <ListItem
            key={index}
            alignItems="center"
            secondaryAction={
              isLoading ? (
                <Skeleton height={24} width={32} />
              ) : (
                <div className={styles.rating}>{user.rating}</div>
              )
            }>
            <ListItemAvatar>
              {isLoading ? (
                <Skeleton variant="circular" width={40} height={40} />
              ) : (
                <Avatar alt={user.fullName} src={user.avatarUrl} />
              )}
            </ListItemAvatar>
            {isLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Skeleton variant="text" height={24} width={200} />
              </div>
            ) : (
              <ListItemText primary={user.fullName} />
            )}
          </ListItem>
        ))}
      </List>
      {/* {children} */}
    </SideBlock>
  );
});
