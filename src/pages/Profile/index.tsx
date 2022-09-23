import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Button, Grid, Link, List } from '@mui/material';
import Loader from 'components/UI/Loader';
import { CurrentUserData } from 'models';
import { useAppSelector } from 'hooks/redux';
import styles from './userPage.module.scss';

interface IUserPage {
  userData: CurrentUserData | null;
  handleLogout: () => void;
}

const UserPage: React.FC<IUserPage> = React.memo(({ userData, handleLogout }) => {
  const { isAuth } = useAppSelector((state) => state.auth);

  const profileNav = React.useMemo(
    () => [
      { title: 'Профиль', link: `/user/${userData?.id}` },
      { title: 'Посты', link: `/user/${userData?.id}/posts` },
      { title: 'Комментарии', link: `/user/${userData?.id}/comments` },
    ],
    [userData],
  );

  return (
    <>
      {userData ? (
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <List className={styles.navList} sx={{ marginBottom: 2, display: 'flex' }}>
              {profileNav.map((item) => (
                <NavLink
                  key={item.link}
                  className={({ isActive }) =>
                    [styles.navLink, isActive ? styles.active : null].filter(Boolean).join(' ')
                  }
                  end
                  to={item.link}>
                  <Button>{item.title}</Button>
                </NavLink>
              ))}

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
});

export default UserPage;
