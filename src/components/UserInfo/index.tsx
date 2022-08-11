import React from 'react';
import { Avatar } from '@mui/material';
import { IUserInfo } from '../../models';
import styles from './UserInfo.module.scss';
import stringToColor from 'utils/stringToColor';
import stringAvatar from 'utils/stringAvatar';
import { BASEURL } from '../../constants';

export const UserInfo: React.FC<IUserInfo> = ({
  avatarUrl,
  fullName,
  onlyAvatar,
  onClick,
  width,
}) => {
  return (
    <div className={styles.root}>
      <Avatar
        onClick={onClick}
        alt={fullName}
        src={avatarUrl ? `${avatarUrl}` : ''}
        sx={{
          bgcolor: stringToColor(fullName),
          width: width ? width : '40px',
          height: width ? width : '40px',
        }}>
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
