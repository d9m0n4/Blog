import React from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { IconButton, Input } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const Index: React.FC = () => {
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Оставьте свой комментарий"
            variant="outlined"
            maxRows={10}
            minRows={2}
            multiline
            fullWidth
          />
          <div className={styles.formFooter}>
            <div className={styles.addFile}>
              <label htmlFor="icon-button-file">
                <input id="icon-button-file" type="file" hidden />
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <AddIcon />
                </IconButton>
              </label>
            </div>
            <Button variant="contained" sx={{ borderRadius: '16px' }}>
              Отправить
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
