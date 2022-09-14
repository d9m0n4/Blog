import React from 'react';
import { Modal } from '@mui/material';

interface IImageModal {
  open: boolean;
  handleClose: () => void;
  image: string;
}

const ImageModal: React.FC<IImageModal> = React.memo(({ open, handleClose, image }) => {
  return (
    <Modal
      sx={{
        display: 'flex',
        p: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      keepMounted
      disableEnforceFocus
      open={open}
      disableAutoFocus
      onClose={handleClose}>
      <img src={image} alt="123" />
    </Modal>
  );
});

export default ImageModal;
