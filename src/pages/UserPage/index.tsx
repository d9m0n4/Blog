import React from 'react';
import { Button, Grid, List, ListItem, Stack } from '@mui/material';
import { UserInfo } from 'components/UserInfo';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import styles from './userPage.module.scss';

const UserPage = () => {
  const { id } = useParams();
  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Stack>
          <UserInfo onlyAvatar={true} fullName="qwe" width={164} />
          <List>
            <ListItem></ListItem>
            <ListItem></ListItem>
            <ListItem></ListItem>
            <ListItem></ListItem>
          </List>
        </Stack>
      </Grid>
      <Grid item xs={8}>
        <List className={styles.navList}>
          <NavLink
            className={({ isActive }) =>
              [styles.navLink, isActive ? styles.active : null].filter(Boolean).join(' ')
            }
            end
            to={`/user/${id}/posts`}>
            <Button>Посты</Button>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              [styles.navLink, isActive ? styles.active : null].filter(Boolean).join(' ')
            }
            to={`/user/${id}/comments`}>
            <Button>Комментарии</Button>
          </NavLink>
        </List>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default UserPage;
