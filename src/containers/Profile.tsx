import React from 'react';
import UserPage from 'pages/UserPage';
import { IUser } from 'models';
import users from 'service/users';
import { useParams } from 'react-router-dom';

const ProfileContainer = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState<IUser | null>(null);

  React.useEffect(() => {
    if (id) {
      users.getUserById(id).then(({ data }) => console.log(data));
    }
  }, []);
  return <UserPage user={user} />;
};

export default ProfileContainer;
