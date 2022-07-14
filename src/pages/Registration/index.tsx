import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';
import Alert from 'components/Alert';
import { useForm } from 'react-hook-form';
import BasicForm from 'components/BasicForm';

interface IInputTypes {
  name: string;
  email: string;
  password: string;
}

export const Registration = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<IInputTypes>({
  //   mode: 'all',
  // });

  // const registerOptions = {
  //   name: { required: 'Введите имя' },
  //   email: {
  //     required: 'Введите адрес email',
  //     pattern: {
  //       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  //       message: 'Введите корректный адрес email',
  //     },
  //   },
  //   password: {
  //     required: 'Введите пароль',
  //     minLength: {
  //       value: 8,
  //       message: 'Пароль должен содержать не менее 8 символов',
  //     },
  //   },
  // };

  const submit = (data: any) => {
    console.log(data);
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
            name="name"
            fullWidth
          />
          <TextField size="small" className={styles.field} label="E-Mail" name="email" fullWidth />
          <TextField
            size="small"
            className={styles.field}
            label="Пароль"
            name="password"
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
