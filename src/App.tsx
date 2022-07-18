import { Header } from 'components/Header';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Home } from 'pages/Home';
import { FullPost } from 'pages/FullPost';
import { AddPost } from 'pages/AddPost';
import { Registration } from 'pages/Registration';
import { Login } from 'pages/Login';
import Footer from 'components/Footer';
import NotFound from 'pages/NotFound';
import { useEffect } from 'react';
import { checkAuth } from 'store/actions/auth';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import Alert from 'components/Alert';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

  const { error } = useAppSelector((state) => state.auth);

  return (
    <>
      {error.message && <Alert openState={true} message={error.message} />}
      <Header />
      <div className="Main_content">
        <Container maxWidth="lg">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="posts/:id" element={<FullPost />} />
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
