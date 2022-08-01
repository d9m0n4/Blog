import { Header } from 'components/Header';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Home } from 'pages/Home';
import { AddPost } from 'pages/AddPost';
import { Registration } from 'pages/Registration';
import { Login } from 'pages/Login';
import Footer from 'components/Footer';
import NotFound from 'pages/NotFound';
import { useEffect } from 'react';
import { checkAuth } from 'store/actions/auth';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import Alert from 'components/Alert';
import MyPosts from 'pages/Profile/Posts';
import MyProfile from 'pages/Profile/MyProfile';
import UserPage from 'pages/UserPage';
import Posts from 'pages/UserPage/posts';
import UserComments from 'pages/UserPage/comments';
import FullPostContainer from 'containers/FullPost';
import Profile from 'pages/UserPage/profile';
import MyProfilee from 'pages/Profile';

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
            <Route path="user/:id" element={<UserPage />}>
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
