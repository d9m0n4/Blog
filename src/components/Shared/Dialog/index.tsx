import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';

interface IAlertDialog {
  open: boolean;
  handleClose: () => void;
  title: string;
  body: string;
  handleSuccess: () => void;
}

const AlertDialog: React.FC<IAlertDialog> = ({ open, handleClose, handleSuccess, title, body }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{body}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Отмена
        </Button>
        <Button color="primary" onClick={handleSuccess} autoFocus>
          Да
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
