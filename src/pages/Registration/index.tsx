import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';
import Alert from 'components/Alert';

export const Registration = () => {
  return (
    <Paper classes={{ root: styles.root }}>
      <Alert openState={true} />
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>

      <TextField size="small" className={styles.field} label="Полное имя" fullWidth />
      <TextField size="small" className={styles.field} label="E-Mail" fullWidth />
      <TextField size="small" className={styles.field} label="Пароль" fullWidth />
      <Button size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
    </Paper>
  );
};
