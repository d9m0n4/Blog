import React from 'react';

import { ITagsblock } from '../../types';
import { Chip } from '@mui/material';
import styles from './Tags.module.scss';

export const TagsBlock: React.FC<ITagsblock> = ({ items, isLoading = true }) => {
  return (
    <div className={styles.tags}>
      {(isLoading ? [...Array(5)] : items).map((name, i) => (
        <a className={styles.link} href={`/tags/${name}`}>
          <Chip label={`#${name}`} component="a" key={i} clickable />
        </a>
      ))}
    </div>
  );
};
