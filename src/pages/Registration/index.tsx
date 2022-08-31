import React from 'react';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import BasicForm from 'components/Shared/BasicForm';

import AuthService from '../../service/auth';
import styles from './Login.module.scss';
import Alert from 'components/Shared/Alert';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [modalData, setModalData] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const submit = async (data: any) => {
    setModalData(null);
    await AuthService.registration(data)
      .then(({ data }) => {
        setModalData(`Пользователь ${data.userData.fullName} успешно зарегистрирован!`);
        navigate('/login');
      })
      .catch(({ response }) => setModalData(response.data.message));
  };

  return (
    <>
      <Alert openState={!!modalData} message={modalData} />
      <Paper classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Регистрация
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
