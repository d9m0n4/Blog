import React from 'react';
import { Fade, Modal } from '@mui/material';
import styles from './imageModal.module.scss';

interface IImageModal {
  open: boolean;
  handleClose: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
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
      open={open}
      disableAutoFocus
      closeAfterTransition
      onClose={handleClose}>
      <Fade in={open}>
        <img className={styles.image} src={image} alt="123" />
      </Fade>
    </Modal>
  );
});

export default ImageModal;
