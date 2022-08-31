import React from 'react';

import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Registration from 'pages/Registration';
import PostsByTag from 'pages/PostsByTag';
import UserComments from 'pages/Profile/comments';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
import Home from 'pages/Home';
import EditPost from 'pages/EditPost';
import Profile from 'pages/Profile/profile';
import Posts from 'pages/Profile/posts';

import Header from 'components/Layout/Header';
import ScrollTop from 'components/UI/ScrollTop';
import Footer from 'components/Layout/Footer';
import Alert from 'components/Shared/Alert';
import FullPostContainer from 'containers/FullPost';
import ProfileContainer from 'containers/Profile';
import AddPost from 'containers/AddPost';

import { Container } from '@mui/material';

import { fetchAllPosts } from 'store/actions/post';
import { checkAuth } from 'store/actions/auth';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import usePagePercent from 'hooks/usePagePercent';
import { DEFAULT_PAGE, PAGE_LIMIT } from './constants';

function App() {
  const [scrollBtnVisible, setScrollBtnVisible] = React.useState(false);

  const dispatch = useAppDispatch();

  const { error, isAuth } = useAppSelector((state) => state.auth);

  const percent = usePagePercent();

  const { hash, pathname, key } = useLocation();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
      dispatch(fetchAllPosts({ page: DEFAULT_PAGE, limit: PAGE_LIMIT }));
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (percent > 30) {
      setScrollBtnVisible(true);
    } else {
      setScrollBtnVisible(false);
    }
  }, [percent]);

  React.useEffect(() => {
    if (hash === '') {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [hash, pathname, key]);

  return (
    <>
      {scrollBtnVisible && <ScrollTop />}
      {error.message && <Alert openState message={error.message} />}
      <Header />
      <div className="main__content">
        <Container maxWidth="lg">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="posts/:id" element={<FullPostContainer />} />
            <Route path="user/:id" element={<ProfileContainer />}>
              <Route index element={<Profile />} />
              <Route path="posts" element={<Posts />} />
              <Route path="comments" element={<UserComments />} />
            </Route>
            <Route path="posts/create" element={isAuth ? <AddPost /> : <Navigate to="/login" />} />
            <Route
              path="posts/edit/:id"
              element={isAuth ? <EditPost /> : <Navigate to="/login" />}
            />
            <Route path="/tag/:tag" element={<PostsByTag />} />
            <Route path="registration" element={isAuth ? <Navigate to="/" /> : <Registration />} />
            <Route path="login" element={isAuth ? <Navigate to="/" /> : <Login />} />
          </Routes>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default App;
