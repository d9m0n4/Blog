import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Registration } from 'pages/Registration';
import UserComments from 'pages/UserPage/comments';
import { AddPost } from 'pages/AddPost';
import MyProfilee from 'pages/Profile';
import MyProfile from 'pages/Profile/MyProfile';
import { Login } from 'pages/Login';
import NotFound from 'pages/NotFound';
import { Home } from 'pages/Home';
import MyPosts from 'pages/Profile/Posts';
import Profile from 'pages/UserPage/profile';
import Posts from 'pages/UserPage/posts';
import { Header } from 'components/Header';
import Footer from 'components/Footer';
import Alert from 'components/Alert';
import FullPostContainer from 'containers/FullPost';
import ProfileContainer from 'containers/Profile';
import { checkAuth } from 'store/actions/auth';
import { Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

function App() {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return (
    <>
      {error.message && <Alert openState={true} message={error.message} />}
      <Header />
      <div className="Main_content">
        <Container maxWidth="lg">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<MyProfilee />}>
              <Route index element={<MyProfile />} />
              <Route path="posts" element={<MyPosts />} />
            </Route>
            <Route path="posts/:id" element={<FullPostContainer />} />
            <Route path="user/:id" element={<ProfileContainer />}>
              <Route index element={<Profile />} />
              <Route path="posts" element={<Posts />} />
              <Route path="comments" element={<UserComments />} />
            </Route>
            <Route path="posts/create" element={<AddPost />} />
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
