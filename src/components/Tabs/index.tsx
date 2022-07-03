import { Tab, Tabs } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Tabs.module.scss';

export const TabsComponent = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Tabs
      className={styles.tabs}
      value={value}
      onChange={handleChange}
      aria-label="basic tabs example">
      <Tab label="Новые" value={0} />
      <Tab label="Популярные" value={1} />
    </Tabs>
  );
};
