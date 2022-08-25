import usePagePercent from 'hooks/usePagePercent';
import React from 'react';
import styles from './pageProgress.module.scss';

const PageProgress = () => {
  const percent = usePagePercent();
  return <div className={styles.progress} style={{ width: `${percent}%` }} />;
};

export default PageProgress;
