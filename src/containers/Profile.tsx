import React from 'react';
import UserPage from 'pages/UserPage';
import { CurrentUserData, IUser } from 'models';
import users from 'service/users';
import { useParams } from 'react-router-dom';

const ProfileContainer = () => {
  const { id } = useParams();
  const [userData, setUserData] = React.useState<CurrentUserData | null>(null);

  React.useEffect(() => {
    if (id) {
      users.getUserById(id).then(({ data }) => setUserData(data));
    }
  }, []);

  return <UserPage userData={userData} />;
};

export default ProfileContainer;
