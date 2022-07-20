import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';
import BasicForm from 'components/BasicForm';
import { login } from 'store/actions/auth';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useNavigate } from 'react-router-dom';
import Alert from 'components/Alert';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, error } = useAppSelector((state) => state.auth);

  const submit = (data: any) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <>
      {error.message && <Alert message={error.message} openState={true} />}
      <Paper classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Вход в аккаунт
        </Typography>
        <BasicForm onSubmit={submit}>
          <TextField size="small" className={styles.field} label="E-Mail" name="email" fullWidth />
          <TextField
            size="small"
            className={styles.field}
            label="Пароль"
            name="password"
            fullWidth
            type="password"
          />
          <Button type="submit" size="large" variant="contained" fullWidth>
            Войти
          </Button>
        </BasicForm>
      </Paper>
    </>
  );
};
