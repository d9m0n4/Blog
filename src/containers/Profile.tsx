import React from 'react';
import UserPage from 'pages/Profile';
import { CurrentUserData } from 'models';
import users from 'service/users';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';

const ProfileContainer = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.auth);
  const [userData, setUserData] = React.useState<CurrentUserData | null>(null);

  React.useEffect(() => {
    if (id) {
      users.getUserById(id).then(({ data }) => setUserData(data));
    }
  }, [user, id]);

  return <UserPage userData={userData} />;
};

export default ProfileContainer;
