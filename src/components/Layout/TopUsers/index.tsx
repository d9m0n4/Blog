import React, { memo } from 'react';
import { SideBlock } from 'components/Shared/SideBlock';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import styles from './TopUsers.module.scss';
import { IUser } from 'models';
import { UserInfo } from 'components/Shared/UserAvatar';
import { NavLink } from 'react-router-dom';

interface ITopUsers {
  items: IUser[];
  isLoading?: boolean;
}

export const TopUsers: React.FC<ITopUsers> = memo(({ items }) => {
  return (
    <SideBlock title="Популярные авторы">
      <List>
        {items.length > 0 ? (
          items.map((user) => (
            <ListItem
              key={user.id}
              sx={{ paddingLeft: 3 }}
              alignItems="center"
              secondaryAction={<div className={styles.rating}>{user.rating}</div>}>
              <ListItemAvatar>
                <UserInfo avatarUrl={user.avatar?.thumb} fullName={user.fullName} onlyAvatar />
              </ListItemAvatar>

              <ListItemText
                primary={
                  <NavLink className={styles.userLink} to={`/user/${user.id}`}>
                    {user.fullName}
                  </NavLink>
                }
              />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemAvatar>
              <Skeleton variant="circular" width={40} height={40} />
            </ListItemAvatar>
            <ListItemText>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Skeleton variant="text" height={24} width={200} />
              </div>
            </ListItemText>
          </ListItem>
        )}
      </List>
    </SideBlock>
  );
});
