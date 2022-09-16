import { useAppDispatch, useAppSelector } from 'hooks/redux';
import useUploadFile from 'hooks/useUploadFile';
import { CurrentUserData, UserFormData } from 'models';
import Profile from 'pages/Profile/profile';
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { updateUserInfo } from 'store/actions/user';

const UserInfo = () => {
  const userData = useOutletContext<CurrentUserData>();

  const avatarUpload = React.useRef<HTMLInputElement>(null);
  const { user, isAuth, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [isEditable, setIsEditable] = React.useState(false);

  const { image, imageUrl, handleChangeFile } = useUploadFile();

  const [formData, setFormData] = React.useState<UserFormData>({
    fullName: userData.fullName,
    nickName: userData.nickName,
    email: userData.email,
    city: userData.city,
    avatar: userData.avatar,
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formD = new FormData();
    formD.append('fullName', formData.fullName);
    formD.append('nickName', formData.nickName || '');
    formD.append('email', formData.email);
    formD.append('city', formData.city || '');
    formD.append('avatar', formData.avatar?.thumb || '');
    formD.append('img', image);
    dispatch(updateUserInfo(formD));
    setIsEditable(false);
  };
  return (
    <Profile
      userData={userData}
      user={user}
      isAuth={isAuth}
      loading={loading}
      imageUrl={imageUrl}
      isEditable={isEditable}
      submitHandler={submitHandler}
      setIsEditable={setIsEditable}
      avatarUpload={avatarUpload}
      handleChangeFile={handleChangeFile}
      setFormData={setFormData}
    />
  );
};

export default UserInfo;
