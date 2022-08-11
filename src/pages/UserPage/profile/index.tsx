import React from 'react';
import { Button, Grid, List, ListItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { UserInfo } from 'components/UserInfo';
import { CurrentUserData } from 'models';
import { useOutletContext } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import Loader from 'components/Loader';
import { toDate } from 'utils/toDate';
import useUploadFile from 'hooks/useUploadFile';

import styles from './profile.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { updateUserInfo } from 'store/actions/user';
import { BASEURL } from '../../../constants';

const Profile = () => {
  const userData = useOutletContext<CurrentUserData>();

  const avatarUpload = React.useRef<HTMLInputElement>(null);
  const { user, isAuth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = React.useState({
    fullName: userData.fullName,
    nickName: userData.nickName,
    email: userData.email,
    city: userData.city,
  });

  const { image, imageUrl, handleChangeFile } = useUploadFile();

  const submitHandler = (e: any) => {
    e.preventDefault();
    const formD = new FormData();
    formD.append('fullName', formData.fullName);
    formD.append('nickName', formData.nickName!);
    formD.append('email', formData.email);
    formD.append('city', formData.city!);
    formD.append('img', image);
    dispatch(updateUserInfo(formD));
  };
  return (
    <>
      {userData ? (
        <Paper sx={{ padding: 2 }}>
          <Grid container direction="column">
            <form onSubmit={submitHandler}>
              <Grid item justifyContent="center" display="flex">
                <input ref={avatarUpload} onChange={handleChangeFile} type="file" hidden />
                {user ? (
                  <div className={styles.userAvatar} onClick={() => avatarUpload.current?.click()}>
                    <UserInfo
                      onClick={() => avatarUpload.current?.click()}
                      avatarUrl={
                        imageUrl
                          ? imageUrl
                          : user.avatar
                          ? `${BASEURL}${user.avatar}`
                          : `${BASEURL}${userData.avatar}`
                      }
                      fullName={user?.fullName!}
                      onlyAvatar={true}
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
                        onClick={() => avatarUpload.current?.click()}
                        avatarUrl={userData?.avatar ? `${BASEURL}${userData.avatar}` : imageUrl}
                        fullName={userData?.fullName!}
                        onlyAvatar={true}
                        width={164}
                      />
                    )}
                  </>
                )}
              </Grid>
              <Grid item justifyContent="center" display="flex">
                <Stack sx={{ marginTop: 2 }}>
                  <Typography sx={{ textAlign: 'center' }} variant="h4">
                    {isAuth ? (
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
                          {isAuth && user ? (
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
                          {isAuth && user ? (
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
                          {isAuth && user ? (
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
              {isAuth && (
                <Grid item>
                  <Button type="submit">Сохранить</Button>
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
