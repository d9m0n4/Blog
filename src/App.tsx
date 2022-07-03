import { Header } from 'components/Header';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Home } from 'pages/Home';
import { FullPost } from 'pages/FullPost';
import { AddPost } from 'pages/AddPost';
import { Registration } from 'pages/Registration';
import { Login } from 'pages/Login';
import Footer from 'components/Footer';

function App() {
  return (
    <>
      <Header />
      <div className="Main_content">
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/tags:tag" element={<Home />} />
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
