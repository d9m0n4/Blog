import React from 'react';
import { Button, Grid, Link, List } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './userPage.module.scss';
import { CurrentUserData } from 'models';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { logout } from 'store/actions/auth';
import Loader from 'components/UI/Loader';

interface IUserPage {
  userData: CurrentUserData | null;
}

const UserPage: React.FC<IUserPage> = ({ userData }) => {
  const dispatch = useAppDispatch();

  const { isAuth } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      {userData ? (
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={8}>
            <List className={styles.navList} sx={{ marginBottom: 2, display: 'flex' }}>
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

              {isAuth && (
                <Link
                  sx={{ textDecoration: 'none', marginLeft: 'auto' }}
                  className={styles.navLink}
                  onClick={handleLogout}>
                  <Button color="error">Выход</Button>
                </Link>
              )}
            </List>
            <Outlet context={userData} />
          </Grid>
        </Grid>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default UserPage;
