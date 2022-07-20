import React from 'react';
import { Avatar } from '@mui/material';
import { IUserInfo } from '../../models';
import styles from './UserInfo.module.scss';
import stringToColor from 'helpers/stringToColor';
import stringAvatar from 'helpers/stringAvatar';

export const UserInfo: React.FC<IUserInfo> = ({ avatarUrl, fullName, onlyAvatar }) => {
  return (
    <div className={styles.root}>
      <Avatar alt={fullName} src={avatarUrl} sx={{ bgcolor: stringToColor(fullName) }}>
        {!avatarUrl && stringAvatar(fullName)}
      </Avatar>
      {!onlyAvatar && (
        <div className={styles.userDetails}>
          <span className={styles.userName}>{fullName}</span>
        </div>
      )}
    </div>
  );
};
