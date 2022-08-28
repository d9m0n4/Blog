import React from 'react';

import { useOutletContext } from 'react-router-dom';

import { Button, Grid, List, ListItem, Paper, Stack, TextField, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Edit } from '@mui/icons-material';
import { Box } from '@mui/system';

import { UserInfo } from 'components/Shared/UserAvatar';
import Loader from 'components/UI/Loader';

import { CurrentUserData } from 'models';

import { toDate } from 'utils/toDate';

import useUploadFile from 'hooks/useUploadFile';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

import { updateUserInfo } from 'store/actions/user';

import styles from './profile.module.scss';
import users from 'service/users';

const Profile = () => {
  const userData = useOutletContext<CurrentUserData>();

  const avatarUpload = React.useRef<HTMLInputElement>(null);
  const { user, isAuth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [isEditable, setIsEditable] = React.useState(false);

  const [formData, setFormData] = React.useState({
    fullName: userData.fullName,
    nickName: userData.nickName,
    email: userData.email,
    city: userData.city,
    avatar: userData.avatar,
  });

  const { image, imageUrl, handleChangeFile } = useUploadFile();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const formD = new FormData();
    formD.append('fullName', formData.fullName);
    formD.append('nickName', formData.nickName || '');
    formD.append('email', formData.email);
    formD.append('city', formData.city || '');
    formD.append('avatar', formData.avatar?.thumb || '');
    formD.append('img', image);
    await users.updateUserInfo(formD).then(() => {
      users.getUserById(user!.id);
    });
    setIsEditable(false);
  };
  return (
    <>
      {userData ? (
        <Paper sx={{ padding: 2, position: 'relative' }}>
          {!isEditable && user && (
            <Box className={styles.editProfile}>
              <Button onClick={() => setIsEditable(true)} sx={{ minWidth: 'auto' }} variant="text">
                <Edit />
              </Button>
            </Box>
          )}
          <Grid container direction="column">
            <form onSubmit={submitHandler}>
              <Grid item justifyContent="center" display="flex" paddingTop={2}>
                <input
                  ref={avatarUpload}
                  onChange={handleChangeFile}
                  type="file"
                  hidden
                  accept=".jpg, .jpeg, .png"
                />
                {user && isEditable ? (
                  <div className={styles.userAvatar} onClick={() => avatarUpload.current?.click()}>
                    <UserInfo
                      onClick={() => avatarUpload.current?.click()}
                      avatarUrl={
                        imageUrl
                          ? imageUrl
                          : user.avatar?.thumb
                          ? user.avatar.thumb
                          : userData.avatar?.thumb
                      }
                      fullName={user?.fullName!}
                      onlyAvatar
                      width={164}
                    />
                    <div className={styles.upload}>
                      <CloudUploadIcon color="primary" />
                    </div>
                  </div>
                ) : (
                  <>
                    {userData.fullName && (
                      <UserInfo
                        avatarUrl={userData?.avatar?.thumb ? userData.avatar.thumb : imageUrl}
                        fullName={userData?.fullName!}
                        onlyAvatar
                        width={164}
                      />
                    )}
                  </>
                )}
              </Grid>
              <Grid item justifyContent="center" display="flex">
                <Stack sx={{ marginTop: 2 }}>
                  <Typography sx={{ textAlign: 'center' }} variant="h4">
                    {isAuth && isEditable ? (
                      <TextField
                        defaultValue={user?.fullName}
                        placeholder={user?.fullName}
                        variant="standard"
                        label="Имя"
                        onChange={(e) =>
                          setFormData((state) => ({ ...state, fullName: e.target.value }))
                        }
                      />
                    ) : (
                      `${userData.fullName}`
                    )}
                  </Typography>
                  <Box textAlign="center" marginTop={2}>
                    <Typography variant="subtitle1" sx={{ color: 'gray', whiteSpace: 'nowrap' }}>
                      Дата регистрации
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      {toDate(userData.createdAt)}
                    </Typography>
                  </Box>
                  {
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <List
                        sx={{
                          padding: 2,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                        }}>
                        <ListItem>
                          {isEditable && user ? (
                            <TextField
                              defaultValue={user.nickName}
                              placeholder={user.nickName}
                              variant="standard"
                              label="Никнейм"
                              onChange={(e) =>
                                setFormData((state) => ({ ...state, nickName: e.target.value }))
                              }
                            />
                          ) : (
                            <Box sx={{ textAlign: 'center' }}>
                              <Typography
                                variant="subtitle1"
                                sx={{ color: 'gray', whiteSpace: 'nowrap' }}>
                                Никнейм
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                {userData.nickName}
                              </Typography>
                            </Box>
                          )}
                        </ListItem>
                        <ListItem>
                          {isEditable && user ? (
                            <TextField
                              defaultValue={user.email}
                              placeholder={user.email}
                              variant="standard"
                              label="Электронная почта"
                              onChange={(e) =>
                                setFormData((state) => ({ ...state, email: e.target.value }))
                              }
                            />
                          ) : (
                            <Box sx={{ textAlign: 'center' }}>
                              <Typography
                                variant="subtitle1"
                                sx={{ color: 'gray', whiteSpace: 'nowrap' }}>
                                Электронная почта
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                {userData.email}
                              </Typography>
                            </Box>
                          )}
                        </ListItem>
                        <ListItem>
                          {isEditable && user ? (
                            <TextField
                              defaultValue={user.city}
                              placeholder={user.city}
                              variant="standard"
                              label="Город"
                              onChange={(e) =>
                                setFormData((state) => ({ ...state, city: e.target.value }))
                              }
                            />
                          ) : (
                            <Box sx={{ textAlign: 'center' }}>
                              <Typography
                                variant="subtitle1"
                                sx={{ color: 'gray', whiteSpace: 'nowrap' }}>
                                Город
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                {userData.city}
                              </Typography>
                            </Box>
                          )}
                        </ListItem>
                      </List>
                    </Box>
                  }
                </Stack>
              </Grid>
              {isAuth && isEditable && (
                <Grid
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    paddingLeft: 2,
                    paddingRight: 2,
                  }}
                  item>
                  <Box sx={{ padding: 2 }}>
                    <Button
                      onClick={() => setIsEditable(false)}
                      color="error"
                      variant="outlined"
                      sx={{ borderRadius: 8 }}>
                      Отмена
                    </Button>
                  </Box>
                  <Box sx={{ padding: 2 }}>
                    <Button variant="outlined" sx={{ borderRadius: 8 }} type="submit">
                      Сохранить
                    </Button>
                  </Box>
                </Grid>
              )}
            </form>
          </Grid>
        </Paper>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Profile;
