import React from 'react';

import {
  Button,
  Grid,
  List,
  ListItem,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Edit } from '@mui/icons-material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { UserInfo } from 'components/Shared/UserAvatar';
import Loader from 'components/UI/Loader';

import { toDate } from 'utils/toDate';

import styles from './profile.module.scss';
import { CurrentUserData, IUser, UserFormData } from 'models';

interface IUserInfo {
  userData: CurrentUserData;
  user: IUser | null;
  imageUrl: string;
  isAuth: boolean;
  loading: boolean;
  isEditable: boolean;
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsEditable: (e: React.SetStateAction<boolean>) => void;
  avatarUpload: React.RefObject<HTMLInputElement>;
  handleChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormData: (e: React.SetStateAction<UserFormData>) => void;
}

const Profile: React.FC<IUserInfo> = ({
  userData,
  user,
  isAuth,
  loading,
  submitHandler,
  isEditable,
  setIsEditable,
  avatarUpload,
  handleChangeFile,
  imageUrl,
  setFormData,
}) => {
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
                    {loading ? (
                      <Skeleton variant="circular" width={164} height={164} />
                    ) : (
                      userData.fullName && (
                        <UserInfo
                          avatarUrl={userData?.avatar?.thumb ? userData.avatar.thumb : imageUrl}
                          fullName={userData?.fullName!}
                          onlyAvatar
                          width={164}
                        />
                      )
                    )}
                  </>
                )}
              </Grid>
              <Grid item justifyContent="center" display="flex">
                <Stack sx={{ marginTop: 2 }} alignItems="center">
                  {loading ? (
                    <Skeleton width={215} height={36} />
                  ) : (
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
                  )}
                  <Box textAlign="center" marginTop={2}>
                    <Typography variant="subtitle1" sx={{ color: 'gray', whiteSpace: 'nowrap' }}>
                      Дата регистрации
                    </Typography>
                    {loading ? (
                      <Skeleton width={'100%'} height={28} />
                    ) : (
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        {toDate(userData.createdAt)}
                      </Typography>
                    )}
                  </Box>
                  {
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <List
                        className={styles.formInputs}
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
                              {loading ? (
                                <Skeleton width={'100%'} height={28} />
                              ) : (
                                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                  {userData.nickName}
                                </Typography>
                              )}
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
                              {loading ? (
                                <Skeleton width={'100%'} height={28} />
                              ) : (
                                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                  {userData.email}
                                </Typography>
                              )}
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
                              {loading ? (
                                <Skeleton width={'100%'} height={28} />
                              ) : (
                                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                  {userData.city}
                                </Typography>
                              )}
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
                className={styles.formButtons}
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
