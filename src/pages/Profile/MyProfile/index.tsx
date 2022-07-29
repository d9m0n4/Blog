import React, { useState } from 'react';
import { UserInfo } from 'components/UserInfo';
import { toDate } from 'utils/toDate';
import { IUserContext } from 'models';
import StarOutlineTwoToneIcon from '@mui/icons-material/StarOutlineTwoTone';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styles from './profile.module.scss';
import useUploadFile from 'hooks/useUploadFile';
import { useAppDispatch } from 'hooks/redux';
import { updateUserInfo } from 'store/actions/user';

const MyProfile = () => {
  const { user } = useOutletContext<IUserContext>();
  const avatarUpload = React.useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    fullName: user.fullName,
    nickName: user.nickName,
    email: user.email,
    city: user.city,
  });

  const { image, imageUrl, handleChangeFile } = useUploadFile();

  const submitHandler = (e: any) => {
    e.preventDefault();
    formD.append('file', image);
    dispatch(updateUserInfo());
  };
  return (
    <>
      <Grid container>
        <Grid item sx={{ padding: 2 }}>
          <input ref={avatarUpload} onChange={handleChangeFile} type="file" hidden />
          {user && (
            <div className={styles.userAvatar}>
              <UserInfo
                onClick={() => avatarUpload.current?.click()}
                avatarUrl={user?.avatar ? user.avatar : imageUrl}
                fullName={user?.fullName}
                onlyAvatar={true}
                width={164}
              />
              <div onClick={() => avatarUpload.current?.click()} className={styles.upload}>
                <CloudUploadIcon color="primary" />
              </div>
            </div>
          )}
        </Grid>
        <Grid item sx={{ padding: 2 }}>
          <Stack sx={{ marginBottom: 2 }}>
            <Typography gutterBottom>Дата регистрации</Typography>
            <span className={styles.date}>{toDate(user?.createdAt!)}</span>
          </Stack>
          <Stack>
            <Typography sx={{ display: 'flex' }}>
              <StarOutlineTwoToneIcon color="primary" />
              <span className={styles.rating}>{user?.rating}</span>
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <form onSubmit={submitHandler}>
        <Grid container>
          <Grid item>
            <Grid item sx={{ padding: 2 }}>
              <TextField
                variant="standard"
                label="Имя"
                value={formData.fullName}
                onChange={(e) => setFormData((state) => ({ ...state, fullName: e.target.value }))}
              />
            </Grid>
            <Grid item sx={{ padding: 2 }}>
              <TextField
                variant="standard"
                label="Никнейм"
                value={formData.nickName}
                onChange={(e) => setFormData((state) => ({ ...state, nickName: e.target.value }))}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Grid item sx={{ padding: 2 }}>
              <TextField
                variant="standard"
                label="Электронная почта"
                value={formData.email}
                onChange={(e) => setFormData((state) => ({ ...state, email: e.target.value }))}
              />
            </Grid>
            <Grid item sx={{ padding: 2 }}>
              <TextField
                variant="standard"
                label="Город"
                value={formData.city}
                onChange={(e) => setFormData((state) => ({ ...state, city: e.target.value }))}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ padding: 2 }}>
          <Button type="submit" size="medium" variant="contained" sx={{ borderRadius: 16 }}>
            Сохранить
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default MyProfile;
