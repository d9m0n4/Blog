import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

import Container from '@mui/material/Container';

import { Search } from '@mui/icons-material';

import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { IconButton, InputBase } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { UserInfo } from 'components/UserInfo';
import useDebounce from 'hooks/useDebounce';
import { searchPosts } from 'store/actions/post';

export const Header = () => {
  const { user, error, loading } = useAppSelector((state) => state.auth);
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue, 1000);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (debouncedValue.length > 3) {
      dispatch(searchPosts(debouncedValue));
    }
  }, [debouncedValue, dispatch]);

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            {`<MY BLOG />`}
          </Link>
          <div className={styles.search}>
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <Search />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Поиск... "
              inputProps={{ 'aria-label': 'Поиск... ' }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className={styles.buttons}>
            {user ? (
              <>
                <Link to="/profile">
                  <UserInfo avatarUrl={user.avatar} fullName={user.fullName} onlyAvatar={true} />
                </Link>
                <Link to="/posts/create">
                  <Button variant="contained" sx={{ borderRadius: 16 }}>
                    Написать статью
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button size="medium" variant="text" sx={{ borderRadius: 16 }}>
                    Войти
                  </Button>
                </Link>
                <Link to="/registration">
                  <Button size="medium" variant="outlined" sx={{ borderRadius: 16 }}>
                    Создать аккаунт
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
