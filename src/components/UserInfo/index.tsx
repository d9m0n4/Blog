import React from 'react';
import { Avatar } from '@mui/material';
import { IUserInfo } from '../../models';
import styles from './UserInfo.module.scss';

export const UserInfo: React.FC<IUserInfo> = ({ avatarUrl, fullName }) => {
  return (
    <div className={styles.root}>
      <Avatar alt="Cindy Baker" src={avatarUrl} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
      </div>
    </div>
  );
};
