import React from 'react';
import Button from '@mui/material/Button';

import Container from '@mui/material/Container';

import { Search } from '@mui/icons-material';

import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { IconButton, InputBase } from '@mui/material';

export const Header = () => {
  const isAuth = true;

  const onClickLogout = () => {};

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>{`</MY BLOG>`}</div>
          </Link>
          <div className={styles.search}>
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <Search />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Поиск... "
              inputProps={{ 'aria-label': 'Поиск... ' }}
            />
          </div>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/posts/create">
                  <Button variant="contained" sx={{ borderRadius: 16 }}>
                    Написать статью
                  </Button>
                </Link>
                <Button onClick={onClickLogout} variant="outlined" sx={{ borderRadius: 16 }}>
                  Выйти
                </Button>
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
