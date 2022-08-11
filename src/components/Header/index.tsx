import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

import Container from '@mui/material/Container';

import { Search } from '@mui/icons-material';

import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import {
  Backdrop,
  ClickAwayListener,
  Divider,
  Drawer,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  Paper,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { UserInfo } from 'components/UserInfo';
import useDebounce from 'hooks/useDebounce';
import { fetchAllPosts, searchPosts } from 'store/actions/post';

import posts from '../../service/posts';
import { IPost } from 'models';
import { BASEURL } from '../../constants';

export const Header = () => {
  const { user, error, loading, isAuth } = useAppSelector((state) => state.auth);
  const [searchValue, setSearchValue] = useState('');
  const [focusedInput, setFocusedInput] = useState(false);
  const [res, setRes] = useState<IPost[] | null>(null);
  const debouncedValue = useDebounce(searchValue, 1000);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const handleClickAway = () => {
    setSearchValue('');
    setOpen(false);
    setRes(null);
  };

  const onFocus = () => setFocusedInput(true);

  useEffect(() => {
    if (debouncedValue.length > 3) {
      posts.searchPosts(debouncedValue).then(({ data }) => setRes(data));
    }
    if (!debouncedValue.length && focusedInput) {
      console.log(13);
    }
  }, [debouncedValue, dispatch]);

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
            {isAuth && user ? (
              <>
                <Link to={`/user/${user.id}`}>
                  <UserInfo
                    avatarUrl={`${BASEURL}${user.avatar}`}
                    fullName={user.fullName}
                    onlyAvatar={true}
                  />
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
                    onFocus={onFocus}
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
              {res && (
                <Paper sx={{ marginBottom: 2, boxShadow: 'none' }}>
                  {res.map((post) => (
                    <Link className={styles.result} to={`/posts/${post.id}`}>
                      {post.title}
                    </Link>
                  ))}
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Drawer>
    </div>
  );
};
