import { Tab, Tabs } from '@mui/material';
import styles from './Tabs.module.scss';

export const TabsComponent = () => {
  return (
    <Tabs className={styles.tabs} value={0} aria-label="basic tabs example">
      <Tab label="Новые" />
      <Tab label="Популярные" />
    </Tabs>
  );
};
