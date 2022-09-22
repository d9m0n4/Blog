import React from 'react';

import Header from 'components/Layout/Header';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import useDebounce from 'hooks/useDebounce';
import { IPost } from 'models';
import posts from 'service/posts';
import { useLocation } from 'react-router-dom';

const HeaderContainer = () => {
  const location = useLocation();
  const { user, loading } = useAppSelector((state) => state.auth);
  const [searchValue, setSearchValue] = React.useState('');
  const [searchResult, setSearchResult] = React.useState<IPost[] | null>(null);
  const debouncedValue = useDebounce(searchValue, 1000);
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);

  const handleClickAway = () => {
    setSearchValue('');
    setOpen(false);

    setSearchResult(null);
  };

  React.useEffect(() => {
    if (debouncedValue.length > 3) {
      posts.searchPosts(debouncedValue).then(({ data }) => setSearchResult(data.posts));
    }
  }, [debouncedValue, dispatch]);

  return (
    <Header
      user={user}
      open={open}
      setOpen={setOpen}
      openMenu={openMenu}
      setOpenMenu={setOpenMenu}
      handleClickAway={handleClickAway}
      searchValue={searchValue}
      searchResult={searchResult}
      setSearchValue={setSearchValue}
      loading={loading}
    />
  );
};

export default HeaderContainer;
