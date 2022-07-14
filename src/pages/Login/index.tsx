import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';
import BasicForm from 'components/BasicForm';
import { login } from 'store/actions/auth';
import { useAppDispatch } from 'hooks/redux';

export const Login = () => {
  const dispatch = useAppDispatch();

  const submit = (data: any) => {
    dispatch(login(data));
  };
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <BasicForm onSubmit={submit}>
        <TextField size="small" className={styles.field} label="E-Mail" name="email" fullWidth />
        <TextField size="small" className={styles.field} label="Пароль" name="password" fullWidth />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </BasicForm>
    </Paper>
  );
};
