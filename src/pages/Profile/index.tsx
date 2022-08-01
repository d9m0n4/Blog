import * as React from 'react';

import { Grid, Link, List, ListItem } from '@mui/material';
import { Navigate, NavLink, Outlet } from 'react-router-dom';

import styles from './profile.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { logout } from 'store/actions/auth';

export default function MyProfilee() {
  const { user, isAuth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {isAuth && localStorage.getItem('token') ? (
        <Grid container>
          <Grid xs={3} item sx={{ padding: 2 }}>
            <List component="nav">
              <ListItem>
                <NavLink
                  end
                  to="/profile"
                  className={({ isActive }) =>
                    [styles.navLink, isActive ? styles.active : null].filter(Boolean).join(' ')
                  }>
                  Мой профиль
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink
                  to="posts"
                  className={({ isActive }) =>
                    [styles.navLink, isActive ? styles.active : null].filter(Boolean).join(' ')
                  }>
                  Мои посты
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink
                  to="comments"
                  className={({ isActive }) =>
                    [styles.navLink, isActive ? styles.active : null].filter(Boolean).join(' ')
                  }>
                  Мои комментарии
                </NavLink>
              </ListItem>
              <ListItem>
                <Link underline="none" className={styles.navLink} onClick={handleLogout}>
                  Выход
                </Link>
              </ListItem>
            </List>
          </Grid>

          <Grid xs={9} item sx={{ padding: 2 }}>
            <Outlet context={{ user }} />
          </Grid>
        </Grid>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
