import React from 'react';
import UserPage from 'pages/Profile';
import { CurrentUserData } from 'models';
import users from 'service/users';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { logout } from 'store/actions/auth';

const ProfileContainer = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.auth);
  const [userData, setUserData] = React.useState<CurrentUserData | null>(null);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (id) {
      users.getUserById(id).then(({ data }) => setUserData(data));
    }
  }, [id, user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return <UserPage userData={userData} handleLogout={handleLogout} />;
};

export default ProfileContainer;
