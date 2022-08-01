import React from 'react';
import { Button, Grid, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { UserInfo } from 'components/UserInfo';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import styles from './userPage.module.scss';
import { Box } from '@mui/system';
import SortIcon from '@mui/icons-material/Sort';

const UserPage = () => {
  const { id } = useParams();
  return (
    <Grid container spacing={4} justifyContent="center">
      <Grid item xs={8}>
        <List className={styles.navList} sx={{ marginBottom: 2 }}>
          <NavLink
            className={({ isActive }) =>
              [styles.navLink, isActive ? styles.active : null].filter(Boolean).join(' ')
            }
            end
            to={`/user/${id}`}>
            <Button>Профиль</Button>
          </NavLink>
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
          {/* <Button  variant="text">
            <SortIcon />
          </Button> */}
        </List>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default UserPage;
