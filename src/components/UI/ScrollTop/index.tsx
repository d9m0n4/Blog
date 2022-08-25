import React from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import styles from './scrollTop.module.scss';

const ScrollTop = () => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.scrollBtn} onClick={scrollTop}>
      <ExpandLessIcon />
    </div>
  );
};

export default ScrollTop;
