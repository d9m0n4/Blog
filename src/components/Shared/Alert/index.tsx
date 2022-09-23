import React from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface State extends SnackbarOrigin {
  openState: boolean;
}

interface IAlert {
  open: boolean;
  message: string | null;
  handleClose: () => void;
}

export default function Alert({ open, message, handleClose }: IAlert) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={handleClose}
      autoHideDuration={3000}
      message={message}
      key={message}
      action={
        <IconButton aria-label="close" color="inherit" sx={{ p: 0.5 }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      }
    />
  );
}
