import React from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface State extends SnackbarOrigin {
  open: boolean;
}

interface IAlert {
  openState: boolean;
  message: string | null;
}

export default function Alert({ openState, message }: IAlert) {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  React.useEffect(() => {
    setState({ ...state, open: openState });
  }, [openState]);

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      autoHideDuration={3000}
      message={message}
      key={vertical + horizontal}
      action={
        <IconButton aria-label="close" color="inherit" sx={{ p: 0.5 }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      }
    />
  );
}
