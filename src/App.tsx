import React, { lazy, Suspense } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import ScrollTop from 'components/UI/ScrollTop';
import Footer from 'components/Layout/Footer';
import Alert from 'components/Shared/Alert';
import Loader from 'components/UI/Loader';

import { Container, useMediaQuery, useTheme } from '@mui/material';

import { checkAuth } from 'store/actions/auth';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import usePagePercent from 'hooks/usePagePercent';

const AddPost = lazy(() => import('./containers/AddPost'));
const EditPost = lazy(() => import('./containers/EditPost'));
const FullPostContainer = lazy(() => import('containers/FullPost'));
const UserPageContainer = lazy(() => import('containers/UserPage'));
const UserInfo = lazy(() => import('containers/UserInfo'));
const HeaderContainer = lazy(() => import('containers/Header'));

const Registration = lazy(() => import('pages/Registration'));
const Login = lazy(() => import('pages/Login'));

const Home = lazy(() => import('pages/Home'));
const Posts = lazy(() => import('pages/Profile/posts'));
const PostsByTag = lazy(() => import('pages/PostsByTag'));
const UserComments = lazy(() => import('pages/Profile/comments'));
const NotFound = lazy(() => import('pages/NotFound'));

function App() {
  const [scrollBtnVisible, setScrollBtnVisible] = React.useState(false);

  const dispatch = useAppDispatch();

  const { error, isAuth } = useAppSelector((state) => state.auth);

  const percent = usePagePercent();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (percent > 30) {
      setScrollBtnVisible(true);
    } else {
      setScrollBtnVisible(false);
    }
  }, [percent]);

  return (
    <>
      {scrollBtnVisible && <ScrollTop />}
      {error.message && <Alert openState message={error.message} />}
      <HeaderContainer />
      <div className="main__content">
        <Container maxWidth="lg">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Home />} />
              <Route path="posts/:id" element={<FullPostContainer />} />
              <Route path="user/:id" element={<UserPageContainer />}>
                <Route index element={<UserInfo />} />
                <Route path="posts" element={<Posts />} />
                <Route path="comments" element={<UserComments />} />
              </Route>
              <Route path="posts/create" element={<AddPost />} />
              <Route path="posts/edit/:id" element={<EditPost />} />
              <Route path="/tag/:tag" element={<PostsByTag />} />
              <Route
                path="registration"
                element={isAuth ? <Navigate to="/" /> : <Registration />}
              />
              <Route path="login" element={isAuth ? <Navigate to="/" /> : <Login />} />
            </Routes>
          </Suspense>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default App;
