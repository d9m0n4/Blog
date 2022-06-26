import React from 'react';
import { Container, Grid } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.root}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            © 2022, MyBlog. При копировании материала ссылка на источник обязательна.
          </Grid>
          <Grid item xs={4}>
            <a
              className={styles.link}
              href="https://github.com/d9m0n4"
              target="_blank"
              rel="noreferrer">
              <GitHubIcon />
            </a>
            <a
              className={styles.link}
              href="https://github.com/d9m0n4"
              target="_blank"
              rel="noreferrer">
              <TelegramIcon color="primary" />
            </a>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Footer;
