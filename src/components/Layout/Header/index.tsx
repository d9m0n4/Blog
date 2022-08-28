import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

import Container from '@mui/material/Container';

import { Search } from '@mui/icons-material';

import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { ClickAwayListener, Drawer, Grid, InputBase, Paper, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { UserInfo } from 'components/Shared/UserAvatar';
import useDebounce from 'hooks/useDebounce';

import posts from '../../../service/posts';
import { IPost } from 'models';

const Header = () => {
  const { user, isAuth } = useAppSelector((state) => state.auth);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState<IPost[] | null>(null);
  const debouncedValue = useDebounce(searchValue, 1000);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const handleClickAway = () => {
    setSearchValue('');
    setOpen(false);
    setSearchResult(null);
  };

  useEffect(() => {
    if (debouncedValue.length > 3) {
      posts.searchPosts(debouncedValue).then(({ data }) => setSearchResult(data.posts));
    }
  }, [debouncedValue, dispatch]);

  useEffect(() => {
    console.log(user?.avatar);
  }, [user?.avatar]);

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            {`<MY BLOG />`}
          </Link>

          <div className={styles.buttons}>
            <Button variant="text" sx={{ borderRadius: 16 }} onClick={() => setOpen(true)}>
              <Search />
            </Button>
            {user ? (
              <>
                <Link to={`/user/${user.id}`}>
                  <UserInfo avatarUrl={user.avatar?.thumb} fullName={user.fullName} onlyAvatar />
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
      <Drawer open={open} anchor="top" onClose={() => setOpen(false)}>
        <Container maxWidth="lg">
          <Grid container direction="column">
            <Grid item xs={12} sx={{ paddingTop: 2, paddingBottom: 2 }}>
              <ClickAwayListener onClickAway={handleClickAway}>
                <div className={styles.search}>
                  <InputBase
                    className={styles.searchInput}
                    placeholder="Поиск... "
                    inputProps={{ 'aria-label': 'Поиск... ' }}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </ClickAwayListener>
            </Grid>

            <Grid item xs={12}>
              {searchResult && (
                <Paper sx={{ marginBottom: 2, boxShadow: 'none' }}>
                  {searchResult.length > 0 ? (
                    searchResult.map((post) => (
                      <Link key={post.id} className={styles.result} to={`/posts/${post.id}`}>
                        {post.title}
                      </Link>
                    ))
                  ) : (
                    <Typography sx={{ paddingLeft: 3 }}>{'Ничего не найдено...'}</Typography>
                  )}
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Drawer>
    </div>
  );
};

export default Header;
