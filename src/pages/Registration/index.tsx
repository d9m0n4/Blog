import React from 'react';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import BasicForm from 'components/Shared/BasicForm';

import AuthService from '../../service/auth';
import styles from './Login.module.scss';
import Alert from 'components/Shared/Alert';
import { IUserPostData } from 'models';

const Registration = () => {
  const [modalData, setModalData] = React.useState<string | null>(null);
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const submit = async (data: IUserPostData) => {
    setModalData(null);
    setOpenModal(false);
    await AuthService.registration(data)
      .then(({ data }) => {
        setModalData(`Пользователь ${data.userData.fullName} успешно зарегистрирован!`);
        setOpenModal(true);
      })
      .catch(({ response }) => {
        setModalData(response.data.message);
        setOpenModal(true);
      });
  };

  return (
    <>
      <Alert open={openModal} message={modalData} handleClose={() => setOpenModal(false)} />
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
