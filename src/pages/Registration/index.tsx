import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';
import Alert from 'components/Alert';
import { useForm } from 'react-hook-form';

export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const registerOptions = {
    name: { required: 'Name is required' },
    email: {
      required: true,
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Enter a valid e-mail address',
      },
    },
    password: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters',
      },
    },
  };

  const submit = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <Paper classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Создание аккаунта
        </Typography>

        <form onSubmit={handleSubmit(submit)}>
          <TextField
            {...register('name', registerOptions.name)}
            size="small"
            className={styles.field}
            label="Полное имя"
            fullWidth
            error={Boolean(errors.name?.message)}
          />
          <TextField
            {...register('email', registerOptions.email)}
            size="small"
            className={styles.field}
            label="E-Mail"
            fullWidth
            error={Boolean(errors.email?.message)}
            helperText={<span>{123123}</span>}
          />
          <TextField
            {...register('password', registerOptions.password)}
            size="small"
            className={styles.field}
            label="Пароль"
            fullWidth
            error={Boolean(errors.password?.message)}
          />
          <Button type="submit" size="large" variant="contained" fullWidth>
            Зарегистрироваться
          </Button>
        </form>
      </Paper>
    </>
  );
};
