import React from 'react';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import { ISideBlock } from '../../../models';

import styles from './SideBlock.module.scss';

export const SideBlock: React.FC<ISideBlock> = ({ title, children }) => {
  return (
    <Paper classes={{ root: styles.root }} sx={{ borderRadius: 2, boxShadow: 'none' }}>
      <Typography variant="h6" classes={{ root: styles.title }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};
