import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';
import BasicForm from 'components/Shared/BasicForm';
import { useAppDispatch } from 'hooks/redux';
import { registration } from 'store/actions/auth';
import AuthService from '../../service/auth';

const Registration = () => {
  const submit = async (data: any) => {
    await AuthService.registration(data)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Paper classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Создание аккаунта
        </Typography>

        <BasicForm onSubmit={submit}>
          <TextField
            size="small"
            className={styles.field}
            label="Полное имя"
            name="fullName"
            fullWidth
          />
          <TextField size="small" className={styles.field} label="E-Mail" name="email" fullWidth />
          <TextField
            size="small"
            className={styles.field}
            label="Пароль"
            name="password"
            type="password"
            fullWidth
          />

          <Button type="submit" size="large" variant="contained" fullWidth>
            Зарегистрироваться
          </Button>
        </BasicForm>
      </Paper>
    </>
  );
};

export default Registration;
