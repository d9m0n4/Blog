import React from 'react';
import { Button, Grid, List } from '@mui/material';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import styles from './userPage.module.scss';
import SortIcon from '@mui/icons-material/Sort';
import { CurrentUserData } from 'models';

interface IUserPage {
  userData: CurrentUserData | null;
}

const UserPage: React.FC<IUserPage> = ({ userData }) => {
  return (
    <Grid container spacing={4} justifyContent="center">
      <Grid item xs={8}>
        <List className={styles.navList} sx={{ marginBottom: 2 }}>
          <NavLink
            className={({ isActive }) =>
              [styles.navLink, isActive ? styles.active : null].filter(Boolean).join(' ')
            }
            end
            to={`/user/${userData?.id}`}>
            <Button>Профиль</Button>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              [styles.navLink, isActive ? styles.active : null].filter(Boolean).join(' ')
            }
            end
            to={`/user/${userData?.id}/posts`}>
            <Button>Посты</Button>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              [styles.navLink, isActive ? styles.active : null].filter(Boolean).join(' ')
            }
            to={`/user/${userData?.id}/comments`}>
            <Button>Комментарии</Button>
          </NavLink>
          {/* <Button  variant="text">
            <SortIcon />
          </Button> */}
        </List>
        <Outlet context={userData} />
      </Grid>
    </Grid>
  );
};

export default UserPage;
