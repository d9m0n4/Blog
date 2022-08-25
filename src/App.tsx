import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Registration } from 'pages/Registration';
import UserComments from 'pages/Profile/comments';
import { Login } from 'pages/Login';
import NotFound from 'pages/NotFound';
import { Home } from 'pages/Home';
import Profile from 'pages/Profile/profile';
import Posts from 'pages/Profile/posts';
import { Header } from 'components/Layout/Header';
import Footer from 'components/Layout/Footer';
import Alert from 'components/Shared/Alert';
import FullPostContainer from 'containers/FullPost';
import ProfileContainer from 'containers/Profile';
import { checkAuth } from 'store/actions/auth';
import { Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { PostsByTag } from 'pages/PostsByTag';
import ScrollTop from 'components/UI/ScrollTop';
import usePagePercent from 'hooks/usePagePercent';
import { fetchAllPosts } from 'store/actions/post';
import EditPost from 'pages/EditPost';
import AddPost from 'containers/AddPost';

function App() {
  const [scrollBtnVisible, setScrollBtnVisible] = React.useState(false);
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);
  const percent = usePagePercent();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
      dispatch(fetchAllPosts());
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
      <Header />
      <div className="Main_content">
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
            <Route path="posts/create" element={<AddPost />} />
            <Route path="posts/edit/:id" element={<EditPost />} />
            <Route path="/tag/:tag" element={<PostsByTag />} />
            <Route path="registration" element={<Registration />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default App;
