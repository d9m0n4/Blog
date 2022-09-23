import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';
import BasicForm from 'components/Shared/BasicForm';
import { login } from 'store/actions/auth';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import Alert from 'components/Shared/Alert';
import Loader from 'components/UI/Loader';
import { IUserPostData } from 'models';

const Login = () => {
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.auth);

  const [openAlert, setOpenAlert] = React.useState(false);

  const submit = (data: IUserPostData) => {
    dispatch(login(data));
  };

  React.useEffect(() => {
    setOpenAlert(true);
  }, [error]);

  return (
    <>
      {error?.message && (
        <Alert message={error.message} open={openAlert} handleClose={() => setOpenAlert(false)} />
      )}
      {loading ? (
        <Loader />
      ) : (
        <Paper classes={{ root: styles.root }}>
          <Typography classes={{ root: styles.title }} variant="h5">
            Вход
          </Typography>
          <BasicForm onSubmit={submit}>
            <TextField
              size="small"
              className={styles.field}
              label="E-Mail"
              name="email"
              fullWidth
            />
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
      )}
    </>
  );
};

export default Login;
