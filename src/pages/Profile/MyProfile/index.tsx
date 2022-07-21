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

const MyProfile = () => {
  const { user } = useOutletContext<IUserContext>();
  const avatarUpload = React.useRef<HTMLInputElement>(null);

  const { image, imageUrl, handleChangeFile } = useUploadFile();
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
                fullName={user?.fullName!}
                onlyAvatar={true}
                width={164}
              />
              <div className={styles.upload}>
                <CloudUploadIcon onClick={() => avatarUpload.current?.click()} color="primary" />
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
      <form action="">
        <Grid container>
          <Grid item>
            <Grid item sx={{ padding: 2 }}>
              <TextField
                defaultValue={user?.fullName}
                placeholder={user?.fullName}
                variant="standard"
                label="Имя"
              />
            </Grid>
            <Grid item sx={{ padding: 2 }}>
              <TextField
                defaultValue={user?.fullName}
                placeholder={user?.fullName}
                variant="standard"
                label="Никнейм"
              />
            </Grid>
          </Grid>
          <Grid item>
            <Grid item sx={{ padding: 2 }}>
              <TextField
                defaultValue={user?.fullName}
                placeholder={user?.fullName}
                variant="standard"
                label="Электронная почта"
              />
            </Grid>
            <Grid item sx={{ padding: 2 }}>
              <TextField
                defaultValue={user?.fullName}
                placeholder={user?.fullName}
                variant="standard"
                label="Город"
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
