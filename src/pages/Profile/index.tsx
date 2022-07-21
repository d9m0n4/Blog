import * as React from 'react';

import { Grid, List, ListItem } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';

import styles from './profile.module.scss';
import { useAppSelector } from 'hooks/redux';

export default function Profile() {
  const { user } = useAppSelector((state) => state.auth);

  return (
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
              to="/"
              className={({ isActive }) =>
                [styles.navLink, isActive ? styles.active : null].filter(Boolean).join(' ')
              }>
              Выйти
            </NavLink>
          </ListItem>
        </List>
      </Grid>

      <Grid xs={9} item sx={{ padding: 2 }}>
        <Outlet context={{ user }} />
      </Grid>
    </Grid>
  );
}
